import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Container } from '@/components/common/Container'
import { PageMeta } from '@/components/common/PageMeta'
import { adminLogout, adminMe, listAdminContacts, type AdminContact } from '@/services/adminService'

export function AdminContactsPage() {
  const [allowed, setAllowed] = useState<boolean | null>(null)
  const [items, setItems] = useState<AdminContact[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('')
  const [message, setMessage] = useState('Loading enquiries…')

  useEffect(() => {
    void adminMe().then((user) => setAllowed(Boolean(user)))
  }, [])

  useEffect(() => {
    if (!allowed) return
    void listAdminContacts({ q: query, status, page })
      .then((result) => {
        setItems(result.items)
        setTotal(result.total)
        setMessage(result.total === 0 ? 'No enquiries match this filter.' : '')
      })
      .catch((error: unknown) => setMessage(error instanceof Error ? error.message : 'The enquiries could not be loaded.'))
  }, [allowed, query, status, page])

  if (allowed === false) return <Navigate to="/admin/login" replace />

  return (
    <>
      <PageMeta title="Enquiries | SS Nexus admin" description="Administrator view of contact enquiries." path="/admin/contacts" />
      <section className="bg-[#f4f8ff]">
        <Container className="py-12">
          <AdminBar />
          <h1 className="text-4xl font-semibold text-[#000d3b]">Contact enquiries</h1>
          <div className="mt-6 flex flex-wrap gap-3">
            <input
              value={query}
              onChange={(event) => {
                setPage(1)
                setQuery(event.target.value)
              }}
              placeholder="Search name, email, or company"
              className="h-12 min-w-64 rounded-xl border border-black/10 px-4"
            />
            <select
              value={status}
              onChange={(event) => {
                setPage(1)
                setStatus(event.target.value)
              }}
              className="h-12 rounded-xl border border-black/10 bg-white px-4"
            >
              <option value="">All statuses</option>
              <option value="new">New</option>
              <option value="in_review">In review</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          {message ? <p className="mt-6 text-black/60">{message}</p> : null}
          <ul className="mt-6 grid gap-3">
            {items.map((item) => (
              <li key={item.id}>
                <Link to={`/admin/contacts/${item.id}`} className="block rounded-2xl bg-white px-5 py-4">
                  <span className="font-semibold text-[#000d3b]">{item.full_name}</span>
                  <span className="mt-1 block text-sm text-black/60">{item.email} · {item.phone}</span>
                  <span className="mt-2 block text-sm uppercase text-[#0096f7]">{item.status.replaceAll('_', ' ')}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center gap-4 text-sm">
            <button type="button" disabled={page === 1} onClick={() => setPage((current) => current - 1)}>Previous</button>
            <span>Page {page} · {total} enquiries</span>
            <button type="button" disabled={page * 20 >= total} onClick={() => setPage((current) => current + 1)}>Next</button>
          </div>
        </Container>
      </section>
    </>
  )
}

export function AdminBar() {
  return (
    <div className="mb-6 flex flex-wrap gap-4 text-sm font-semibold">
      <Link to="/admin/contacts">Enquiries</Link>
      <Link to="/admin/payments">Payments</Link>
      <button
        type="button"
        onClick={() => {
          void adminLogout().then(() => {
            window.location.href = '/admin/login'
          })
        }}
      >
        Sign out
      </button>
    </div>
  )
}
