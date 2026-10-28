export type FaqItem = {
  id: string
  category: 'Payments' | 'Payouts' | 'Integration' | 'Security' | 'Account'
  question: string
  answer: string
}

export const faqCategories = ['Payments', 'Payouts', 'Integration', 'Security', 'Account'] as const

/**
 * The reference FAQ page returned 404, so these answers are sample support copy
 * for the SS Nexus presentation. They are not verified product commitments.
 */
export const faqs: FaqItem[] = [
  {
    id: 'pay-methods',
    category: 'Payments',
    question: 'Which local payment methods can be discussed?',
    answer:
      'The Pay In page describes cash, ATM or offline payment, cards, QR, e-wallets, local bank transfer, virtual accounts, and payment links as the method families in this presentation. The methods available to a business are confirmed during onboarding.',
  },
  {
    id: 'pay-platforms',
    category: 'Payments',
    question: 'Which platforms are described for checkout?',
    answer:
      'The presentation describes compatibility across iOS, Android, Web, and H5-style mobile web. A live integration guide is not published on this site yet.',
  },
  {
    id: 'pay-realtime',
    category: 'Payments',
    question: 'Are collections settled in real time?',
    answer:
      'Real-time transfer is part of the product story. Settlement speed depends on the method, bank, and agreement. This website does not promise a specific clearing time.',
  },
  {
    id: 'payout-bulk',
    category: 'Payouts',
    question: 'Can payouts be sent in a batch?',
    answer:
      'The Pay Out page describes API payouts, a dashboard for manual payouts, and batch processing such as a file upload. Batch limits are not published until operations confirms them.',
  },
  {
    id: 'payout-uses',
    category: 'Payouts',
    question: 'What payout use cases are shown?',
    answer:
      'The layout covers peer-to-peer disbursement, fintech transfers, player-oriented local payouts, and merchant payouts to partners. Suitability is reviewed per business.',
  },
  {
    id: 'payout-reports',
    category: 'Payouts',
    question: 'How is reconciliation described?',
    answer:
      'The presentation includes real-time tracking and downloadable reconciliation reports from a dashboard. Report formats are part of a future documentation pack.',
  },
  {
    id: 'api-docs',
    category: 'Integration',
    question: 'Where is the API documentation?',
    answer:
      'A public API reference is not connected yet. The Integration page explains the intended flow and will link to documentation when VITE_DOCS_URL is configured. No endpoints are invented on this site.',
  },
  {
    id: 'api-support',
    category: 'Integration',
    question: 'How do we ask for technical support during integration?',
    answer:
      'Use the contact form and choose Integration. Until a support backend is connected, the form explains that the message was not delivered.',
  },
  {
    id: 'security-certs',
    category: 'Security',
    question: 'Which certifications does SS Nexus hold?',
    answer:
      'This website does not claim PCI DSS, ISO, licensing, or other certifications. Any compliance statement must be supplied and reviewed before it is published.',
  },
  {
    id: 'security-fraud',
    category: 'Security',
    question: 'How is fraud prevention described?',
    answer:
      'The security page outlines monitoring, review of unusual activity, and operational controls as intended capabilities. It is not a live fraud-detection product demo.',
  },
  {
    id: 'account-login',
    category: 'Account',
    question: 'Where do merchants log in?',
    answer:
      'A merchant portal is not linked unless VITE_LOGIN_URL is configured. This site does not include a simulated dashboard login.',
  },
  {
    id: 'account-enquiry',
    category: 'Account',
    question: 'How do we start an enquiry?',
    answer:
      'Use Contact Us or Enquire Now. Provide a business email, company, country, and the solution you want to discuss. Submission succeeds only when a real endpoint accepts it.',
  },
]
