export function DashboardPreview() {
  const line =
    "M8 132 C48 128, 88 122, 128 116 S196 104, 236 96 S300 78, 348 70 S410 58, 452 60 C470 61, 484 56, 492 48 C498 42, 500 34, 502 24"

  return (
    <div className="float-card relative mx-auto w-full max-w-[540px] pb-7">
      <article className="rounded-[30px] bg-white px-7 pt-7 pb-5 shadow-[0_22px_50px_rgba(30,60,110,0.10)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[15px] font-medium text-[#8b95a3]">Today</p>
            <p className="mt-1.5 text-[1.85rem] leading-none font-bold tracking-tight text-[#121826] sm:text-[2rem]">
              $3,631,973.91
            </p>
            <p className="mt-2.5 text-[15px] text-[#8b95a3]">Yesterday $5,719,568.90</p>
          </div>
          <div className="rounded-[22px] bg-[#0c2340] px-5 py-3.5 text-center text-white">
            <p className="text-xl leading-none font-bold tracking-tight">99.99%</p>
            <p className="mt-1.5 text-xs font-medium text-white/75">Success rate</p>
          </div>
        </div>
        <svg viewBox="0 0 520 168" className="mt-3 h-44 w-full" aria-hidden="true">
          <defs>
            <linearGradient id="chart-stroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7ec4ff" />
              <stop offset="100%" stopColor="#3b93ea" />
            </linearGradient>
            <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#b9dcff" stopOpacity="0.7" />
              <stop offset="55%" stopColor="#d7ecff" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="24" y1="52" x2="496" y2="52" stroke="#e4edf5" strokeWidth="1.25" />
          <line x1="24" y1="78" x2="496" y2="78" stroke="#e4edf5" strokeWidth="1.25" />
          <line x1="24" y1="104" x2="496" y2="104" stroke="#e4edf5" strokeWidth="1.25" />
          <path d={`${line} L502 158 L8 158 Z`} fill="url(#chart-fill)" />
          <path
            d={line}
            fill="none"
            stroke="url(#chart-stroke)"
            strokeWidth="2.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength="480"
            className="chart-line"
          />
        </svg>
      </article>
      <div className="absolute inset-x-4 bottom-0 flex items-center justify-between gap-4">
        <p className="rounded-full bg-[#0c2340] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_22px_rgba(12,35,64,0.28)]">
          Sales $4,351,420.67
        </p>
        <p className="rounded-full bg-[#0c2340] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_22px_rgba(12,35,64,0.28)]">
          Payouts $95,680.20
        </p>
      </div>
    </div>
  )
}
