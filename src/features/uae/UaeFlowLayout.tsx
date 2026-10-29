import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '@/components/common/Container'
import { getPaymentReadiness } from '@/services/uaePaymentService'
import type { ProviderReadiness } from '@/domain/uaePayments'

const requiredDetails = [
  'UAE company legal name, trade license, and registered address',
  'Licensed acquirer contract, or your own CBUAE retail payment services application',
  'AED settlement account IBAN in the company name',
  'PayPal sandbox client id and secret, with AED payouts confirmed on that account',
  'Acquirer hosted checkout URL for cards and Google Pay',
  'Public HTTPS address for the PayPal return page',
]

export function UaeFlowLayout({
  title,
  lede,
  children,
}: {
  title: string
  lede: string
  children: ReactNode
}) {
  const [readiness, setReadiness] = useState<ProviderReadiness | null | undefined>(undefined)

  useEffect(() => {
    let active = true
    void getPaymentReadiness().then((result) => {
      if (active) setReadiness(result)
    })
    return () => {
      active = false
    }
  }, [])

  return (
    <section className="bg-gradient-to-b from-[#dce9ff] to-white">
      <Container className="py-16">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#0096f7]">Dubai / UAE</p>
        <h1 className="mt-3 max-w-3xl text-[40px] font-semibold leading-tight text-[#1a1a1a] md:text-[56px]">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-black/65">{lede}</p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
          <Link to="/pay/collect" className="rounded-full bg-white px-4 py-2 text-[#000d3b]">Collect</Link>
          <Link to="/pay/disburse" className="rounded-full bg-white px-4 py-2 text-[#000d3b]">Pay out</Link>
          <Link to="/pay/activity" className="rounded-full bg-white px-4 py-2 text-[#000d3b]">Activity</Link>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[28px] bg-white p-6 shadow-[0_20px_40px_rgba(15,50,90,0.08)] md:p-8">{children}</div>
          <aside className="rounded-[28px] bg-[#06284a] p-6 text-white md:p-8">
            <h2 className="text-2xl font-semibold">Needed before live money</h2>
            <p className="mt-3 text-sm leading-6 text-white/75" role="status">
              {readiness === undefined && 'Checking provider configuration…'}
              {readiness === null && 'The payment API is not running. Start the FastAPI service, then refresh this page.'}
              {readiness && readiness.note}
            </p>
            <ul className="mt-6 space-y-3 text-sm leading-6 text-white/85">
              {requiredDetails.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </div>
      </Container>
    </section>
  )
}
