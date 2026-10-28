export function DashboardPreview() {
  return (
    <div className="relative mx-auto h-[420px] w-full max-w-xl sm:h-[460px]">
      <article className="absolute top-0 left-0 w-[68%] rounded-3xl bg-white p-5 shadow-[0_20px_50px_rgba(15,40,80,0.08)]">
        <p className="text-xs text-muted-foreground">Transaction graphic</p>
        <p className="mt-3 text-sm font-semibold text-ink">
          Today $2,418,903.40
        </p>
        <p className="text-sm font-semibold text-ink">
          Yesterday $4,102,550.18
        </p>
        <svg viewBox="0 0 280 90" className="mt-4 h-20 w-full" aria-hidden="true">
          <polyline
            fill="none"
            stroke="#32b9ff"
            strokeWidth="3"
            points="0,70 30,62 55,66 80,40 110,48 140,28 170,36 200,18 230,30 260,14 280,22"
          />
          <polyline
            fill="none"
            stroke="#9ecff5"
            strokeWidth="3"
            points="0,78 40,74 80,70 120,64 160,68 200,58 240,60 280,52"
          />
        </svg>
      </article>

      <article className="absolute top-6 right-0 w-[42%] rounded-3xl bg-white p-4 shadow-[0_16px_40px_rgba(15,40,80,0.08)]">
        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="inline-flex size-5 items-center justify-center rounded-full bg-sky/15 text-[10px] text-sky">
            $
          </span>
          Amount of Success
        </p>
        <p className="mt-3 text-lg font-semibold text-ink">$4,280,116.04</p>
        <p className="text-xs text-success">$3,102,440.12 Total payment</p>
      </article>

      <article className="absolute top-[210px] left-6 w-[62%] rounded-3xl bg-white p-5 shadow-[0_20px_50px_rgba(15,40,80,0.08)]">
        <p className="text-sm font-semibold text-ink">Partner</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Trusted by growing merchants worldwide
        </p>
        <div className="mt-4 flex gap-2">
          {["#32b9ff", "#7c5cbf", "#1ac475", "#f0a202", "#ef5b6a"].map(
            (color) => (
              <span
                key={color}
                className="size-8 rounded-full"
                style={{ backgroundColor: color }}
              />
            )
          )}
        </div>
      </article>

      <article className="absolute right-2 bottom-16 w-[44%] rounded-3xl bg-white p-4 shadow-[0_16px_40px_rgba(15,40,80,0.08)]">
        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="inline-flex size-5 items-center justify-center rounded-full bg-rose-100 text-[10px] text-rose-500">
            ↓
          </span>
          Payout
        </p>
        <p className="mt-3 text-lg font-semibold text-ink">$3,905,772.55</p>
        <p className="text-xs text-success">$3,102,440.12 Total payment</p>
      </article>

      <article className="absolute bottom-2 left-[18%] flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_16px_40px_rgba(15,40,80,0.12)]">
        <span className="inline-flex size-8 items-center justify-center rounded-full bg-success text-sm text-white">
          ✓
        </span>
        <span>
          <span className="block text-lg leading-none font-semibold text-ink">
            99.99%
          </span>
          <span className="text-xs text-muted-foreground">Success rate</span>
        </span>
      </article>
    </div>
  )
}
