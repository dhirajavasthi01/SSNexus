import { BrowserRouter, Route, Routes } from "react-router-dom"

import { SiteLayout } from "@/layouts/site-layout.tsx"
import { AboutPage } from "@/pages/about-page.tsx"
import { BlogPage } from "@/pages/blog-page.tsx"
import { ContactPage } from "@/pages/contact-page.tsx"
import { FaqsPage } from "@/pages/faqs-page.tsx"
import { HomePage } from "@/pages/home-page.tsx"
import { IntegrationPage } from "@/pages/integration-page.tsx"
import { LoginPage } from "@/pages/login-page.tsx"
import { LegalPage } from "@/pages/legal-page.tsx"
import { PayInPage } from "@/pages/pay-in-page.tsx"
import { PayOutPage } from "@/pages/pay-out-page.tsx"
import { SecurityPage } from "@/pages/security-page.tsx"
import { SupportPage } from "@/pages/support-page.tsx"

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="pay-in" element={<PayInPage />} />
          <Route path="pay-out" element={<PayOutPage />} />
          <Route path="integration" element={<IntegrationPage />} />
          <Route path="security" element={<SecurityPage />} />
          <Route path="support" element={<SupportPage />} />
          <Route path="faqs" element={<FaqsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="privacy" element={<LegalPage slug="privacy" />} />
          <Route
            path="sustainability"
            element={<LegalPage slug="sustainability" />}
          />
          <Route path="terms" element={<LegalPage slug="terms" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
