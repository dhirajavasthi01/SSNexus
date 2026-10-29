import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Container } from '@/components/common/Container'
import { PageMeta } from '@/components/common/PageMeta'
import { AdminBar } from '@/pages/AdminContactsPage'
import { adminMe, listAdminPayments, type AdminPayment } from '@/services/adminService'

export function AdminPaymentsPage() {
  const [allowed, setAllowed] = useState<boolean | null>(null)
  const [items, setItems] = useState<AdminPayment[]>([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [message, setMessage] = useState('Loading payments…')

  useEffect(() => {
    void adminMe().then((user) => setAllowed(Boolean(user)))
  }, [])

  useEffect(() => {
    if (!allowed) return
    void listAdminPayments(page)
      .then((result) => {
        setItems(result.items)
        setTotal(result.total)
        setMessage(result.total === 0 ? 'No payment requests have been stored.' : '')
      })
      .catch((error: unknown) => setMessage(error instanceof Error ? error.message : 'Payments could not be loaded.'))
  }, [allowed, page])

  if (allowed === false) return <Navigate to="/admin/login" replace />

  return (
    <>
      <PageMeta title="Payments | SS Nexus admin" description="Administrator view of payment requests." path="/admin/payments" />
      <section className="bg-[#f4f8ff]">
        <Container className="py-12">
          <AdminBar />
          <h1 className="text-4xl font-semibold text-[#000d3b]">Payment requests</h1>
          <p className="mt-3 max-w-2xl text-black/65">
            These records are collection and payout requests. A row is not settled money unless its status came back from PayPal or a licensed acquirer.
          </p>
          {message ? <p className="mt-6 text-black/60">{message}</p> : null}
          <ul className="mt-6 grid gap-3">
            {items.map((item) => (
              <li key={item.id} className="rounded-2xl bg-white px-5 py-4">
                <p className="font-semibold text-[#000d3b]">AED {item.amount} · {item.kind}</p>
                <p className="mt-1 text-sm text-black/60">{item.reference} · {item.method}</p>
                <p className="mt-1 text-sm text-black/60">{item.destination_masked || item.email}</p>
                <p className="mt-2 text-sm uppercase text-[#0096f7]">{item.status.replaceAll('_', ' ')}</p>
                <p className="mt-2 text-sm leading-6 text-black/70">{item.message}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center gap-4 text-sm">
            <button type="button" disabled={page === 1} onClick={() => setPage((current) => current - 1)}>Previous</button>
            <span>Page {page} · {total} requests</span>
            <button type="button" disabled={page * 20 >= total} onClick={() => setPage((current) => current + 1)}>Next</button>
          </div>
        </Container>
      </section>
    </>
  )
}
