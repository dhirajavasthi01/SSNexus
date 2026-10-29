export type AdminContact = {
  id: string
  full_name: string
  email: string
  phone: string
  company: string
  country: string
  solution: string
  volume: string | null
  message: string
  status: 'new' | 'in_review' | 'closed'
  created_at: string
  updated_at: string
}

export type AdminPayment = {
  id: string
  kind: 'pay-in' | 'pay-out'
  amount: string
  currency: string
  reference: string
  method: string
  status: string
  message: string
  created_at: string
  email: string | null
  beneficiary_name: string | null
  destination_masked: string | null
  provider: string
}

type ContactPage = { items: AdminContact[]; page: number; page_size: number; total: number }
type PaymentPage = { items: AdminPayment[]; page: number; page_size: number; total: number }

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    ...init,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json', ...init?.headers },
  })
  const raw = await response.text()
  let body = {} as T & { message?: string }
  if (raw) {
    try {
      body = JSON.parse(raw) as T & { message?: string }
    } catch {
      body = {} as T & { message?: string }
    }
  }
  if (!response.ok) {
    throw new Error(body.message || 'The admin API is not available. Start it from the backend folder on port 8001.')
  }
  return body
}

export async function adminLogin(email: string, password: string) {
  return request<{ email: string }>('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export async function adminLogout() {
  await fetch('/api/v1/auth/logout', { method: 'POST', credentials: 'include' })
}

export async function adminMe() {
  try {
    return await request<{ email: string; role: string }>('/api/v1/auth/me')
  } catch {
    return null
  }
}

export function listAdminContacts(params: { q?: string; status?: string; page?: number }) {
  const search = new URLSearchParams()
  if (params.q) search.set('q', params.q)
  if (params.status) search.set('status', params.status)
  search.set('page', String(params.page ?? 1))
  search.set('page_size', '20')
  return request<ContactPage>(`/api/v1/admin/contacts?${search.toString()}`)
}

export function getAdminContact(id: string) {
  return request<AdminContact>(`/api/v1/admin/contacts/${id}`)
}

export function updateContactStatus(id: string, status: AdminContact['status']) {
  return request<AdminContact>(`/api/v1/admin/contacts/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  })
}

export function listAdminPayments(page = 1) {
  return request<PaymentPage>(`/api/v1/admin/payments?page=${page}&page_size=20`)
}
