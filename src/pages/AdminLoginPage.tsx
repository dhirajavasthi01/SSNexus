import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container } from '@/components/common/Container'
import { PageMeta } from '@/components/common/PageMeta'
import { PrimaryButton } from '@/components/common/PrimaryButton'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { adminLogin } from '@/services/adminService'

export function AdminLoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    setPending(true)
    setError('')
    try {
      await adminLogin(email, password)
      navigate('/admin/contacts')
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Sign in failed.')
    } finally {
      setPending(false)
    }
  }

  return (
    <>
      <PageMeta title="Admin sign in | SS Nexus" description="Administrator sign in for SS Nexus." path="/admin/login" />
      <section className="bg-gradient-to-b from-[#dce9ff] to-white">
        <Container className="max-w-xl py-20">
          <h1 className="text-4xl font-semibold text-[#000d3b]">Admin sign in</h1>
          <p className="mt-3 text-black/65">Only an administrator account can review enquiries and payment records.</p>
          <form className="mt-8 grid gap-5 rounded-[28px] bg-white p-8 shadow-[0_20px_40px_rgba(15,50,90,0.08)]" onSubmit={onSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="admin-email">Email</Label>
              <Input id="admin-email" type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="admin-password">Password</Label>
              <Input id="admin-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </div>
            {error ? <p className="text-sm text-red-700">{error}</p> : null}
            <PrimaryButton type="submit" disabled={pending}>{pending ? 'Signing in…' : 'Sign in'}</PrimaryButton>
          </form>
        </Container>
      </section>
    </>
  )
}
