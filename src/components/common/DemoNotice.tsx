export function DemoNotice({ children }: { children: string }) {
  return (
    <p className="mt-4 text-sm font-medium text-[#0096f7]" role="note">
      {children}
    </p>
  )
}
