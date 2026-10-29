from collections import defaultdict, deque
from time import monotonic

from fastapi import HTTPException, Request


class RateLimiter:
    def __init__(self) -> None:
        self._hits: dict[str, deque[float]] = defaultdict(deque)

    def check(self, request: Request, bucket: str, limit: int, window_seconds: int) -> None:
        host = request.client.host if request.client else "unknown"
        key = f"{bucket}:{host}"
        now = monotonic()
        hits = self._hits[key]
        while hits and now - hits[0] > window_seconds:
            hits.popleft()
        if len(hits) >= limit:
            raise HTTPException(status_code=429, detail="Too many requests. Try again shortly.")
        hits.append(now)

    def reset(self) -> None:
        self._hits.clear()


limiter = RateLimiter()
