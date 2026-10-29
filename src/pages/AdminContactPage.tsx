import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Container } from '@/components/common/Container'
import { PageMeta } from '@/components/common/PageMeta'
import { AdminBar } from '@/pages/AdminContactsPage'
import { adminMe, getAdminContact, updateContactStatus, type AdminContact } from '@/services/adminService'

export function AdminContactPage() {
  const { id = '' } = useParams()
  const [allowed, setAllowed] = useState<boolean | null>(null)
  const [contact, setContact] = useState<AdminContact | null>(null)
  const [message, setMessage] = useState('Loading enquiry…')

  useEffect(() => {
    void adminMe().then((user) => setAllowed(Boolean(user)))
  }, [])

  useEffect(() => {
    if (!allowed || !id) return
    void getAdminContact(id)
      .then((result) => {
        setContact(result)
        setMessage('')
      })
      .catch((error: unknown) => setMessage(error instanceof Error ? error.message : 'The enquiry could not be loaded.'))
  }, [allowed, id])

  if (allowed === false) return <Navigate to="/admin/login" replace />

  return (
    <>
      <PageMeta title="Enquiry | SS Nexus admin" description="A single contact enquiry." path="/admin/contacts" />
      <section className="bg-[#f4f8ff]">
        <Container className="max-w-3xl py-12">
          <AdminBar />
          {contact ? (
            <article className="rounded-[28px] bg-white p-8">
              <p className="text-sm uppercase text-[#0096f7]">{contact.status.replaceAll('_', ' ')}</p>
              <h1 className="mt-2 text-4xl font-semibold text-[#000d3b]">{contact.full_name}</h1>
              <dl className="mt-6 grid gap-3 text-sm leading-6 text-black/70">
                <div><dt className="font-semibold text-black">Email</dt><dd>{contact.email}</dd></div>
                <div><dt className="font-semibold text-black">Phone</dt><dd>{contact.phone}</dd></div>
                <div><dt className="font-semibold text-black">Company</dt><dd>{contact.company}</dd></div>
                <div><dt className="font-semibold text-black">Country</dt><dd>{contact.country}</dd></div>
                <div><dt className="font-semibold text-black">Received</dt><dd>{new Date(contact.created_at).toLocaleString()}</dd></div>
              </dl>
              <p className="mt-6 whitespace-pre-wrap leading-7">{contact.message}</p>
              <label className="mt-8 grid gap-2 text-sm font-semibold" htmlFor="status">
                Status
                <select
                  id="status"
                  className="h-12 rounded-xl border border-black/10 px-4 font-normal"
                  value={contact.status}
                  onChange={(event) => {
                    const status = event.target.value as AdminContact['status']
                    void updateContactStatus(contact.id, status).then(setContact).catch((error: unknown) => {
                      setMessage(error instanceof Error ? error.message : 'The status could not be saved.')
                    })
                  }}
                >
                  <option value="new">New</option>
                  <option value="in_review">In review</option>
                  <option value="closed">Closed</option>
                </select>
              </label>
              {message ? <p className="mt-4 text-sm text-red-700">{message}</p> : null}
            </article>
          ) : (
            <p>{message}</p>
          )}
        </Container>
      </section>
    </>
  )
}
