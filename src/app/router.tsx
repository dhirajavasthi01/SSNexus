import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { LazyPage } from '@/components/common/LazyPage'
import { SiteLayout } from '@/components/layout/SiteLayout'

const HomePage = lazy(() => import('@/pages/HomePage').then((module) => ({ default: module.HomePage })))
const PayInPage = lazy(() => import('@/pages/PayInPage').then((module) => ({ default: module.PayInPage })))
const PayOutPage = lazy(() => import('@/pages/PayOutPage').then((module) => ({ default: module.PayOutPage })))
const IntegrationPage = lazy(() => import('@/pages/IntegrationPage').then((module) => ({ default: module.IntegrationPage })))
const SecurityPage = lazy(() => import('@/pages/SecurityPage').then((module) => ({ default: module.SecurityPage })))
const AboutPage = lazy(() => import('@/pages/AboutPage').then((module) => ({ default: module.AboutPage })))
const SupportPage = lazy(() => import('@/pages/SupportPage').then((module) => ({ default: module.SupportPage })))
const FAQsPage = lazy(() => import('@/pages/FAQsPage').then((module) => ({ default: module.FAQsPage })))
const BlogPage = lazy(() => import('@/pages/BlogPage').then((module) => ({ default: module.BlogPage })))
const BlogArticlePage = lazy(() => import('@/pages/BlogArticlePage').then((module) => ({ default: module.BlogArticlePage })))
const ContactPage = lazy(() => import('@/pages/ContactPage').then((module) => ({ default: module.ContactPage })))
const PrivacyPolicyPage = lazy(() => import('@/pages/PrivacyPolicyPage').then((module) => ({ default: module.PrivacyPolicyPage })))
const SustainabilityPage = lazy(() => import('@/pages/SustainabilityPage').then((module) => ({ default: module.SustainabilityPage })))
const TermsPage = lazy(() => import('@/pages/TermsPage').then((module) => ({ default: module.TermsPage })))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })))
const UaePayInFlowPage = lazy(() => import('@/pages/UaePayInFlowPage').then((module) => ({ default: module.UaePayInFlowPage })))
const UaePayOutFlowPage = lazy(() => import('@/pages/UaePayOutFlowPage').then((module) => ({ default: module.UaePayOutFlowPage })))
const UaeActivityPage = lazy(() => import('@/pages/UaeActivityPage').then((module) => ({ default: module.UaeActivityPage })))
const AdminLoginPage = lazy(() => import('@/pages/AdminLoginPage').then((module) => ({ default: module.AdminLoginPage })))
const AdminContactsPage = lazy(() => import('@/pages/AdminContactsPage').then((module) => ({ default: module.AdminContactsPage })))
const AdminContactPage = lazy(() => import('@/pages/AdminContactPage').then((module) => ({ default: module.AdminContactPage })))
const AdminPaymentsPage = lazy(() => import('@/pages/AdminPaymentsPage').then((module) => ({ default: module.AdminPaymentsPage })))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SiteLayout />,
    children: [
      { index: true, element: <LazyPage><HomePage /></LazyPage> },
      { path: 'pay-in', element: <LazyPage><PayInPage /></LazyPage> },
      { path: 'pay-out', element: <LazyPage><PayOutPage /></LazyPage> },
      { path: 'pay/collect', element: <LazyPage><UaePayInFlowPage /></LazyPage> },
      { path: 'pay/collect/:id', element: <LazyPage><UaePayInFlowPage /></LazyPage> },
      { path: 'pay/disburse', element: <LazyPage><UaePayOutFlowPage /></LazyPage> },
      { path: 'pay/disburse/:id', element: <LazyPage><UaePayOutFlowPage /></LazyPage> },
      { path: 'pay/activity', element: <LazyPage><UaeActivityPage /></LazyPage> },
      { path: 'integration', element: <LazyPage><IntegrationPage /></LazyPage> },
      { path: 'security', element: <LazyPage><SecurityPage /></LazyPage> },
      { path: 'about', element: <LazyPage><AboutPage /></LazyPage> },
      { path: 'support', element: <LazyPage><SupportPage /></LazyPage> },
      { path: 'faqs', element: <LazyPage><FAQsPage /></LazyPage> },
      { path: 'blog', element: <LazyPage><BlogPage /></LazyPage> },
      { path: 'blog/:slug', element: <LazyPage><BlogArticlePage /></LazyPage> },
      { path: 'contact', element: <LazyPage><ContactPage /></LazyPage> },
      { path: 'admin/login', element: <LazyPage><AdminLoginPage /></LazyPage> },
      { path: 'admin/contacts', element: <LazyPage><AdminContactsPage /></LazyPage> },
      { path: 'admin/contacts/:id', element: <LazyPage><AdminContactPage /></LazyPage> },
      { path: 'admin/payments', element: <LazyPage><AdminPaymentsPage /></LazyPage> },
      { path: 'privacy-policy', element: <LazyPage><PrivacyPolicyPage /></LazyPage> },
      { path: 'sustainability', element: <LazyPage><SustainabilityPage /></LazyPage> },
      { path: 'terms', element: <LazyPage><TermsPage /></LazyPage> },
      { path: '*', element: <LazyPage><NotFoundPage /></LazyPage> },
    ],
  },
])
