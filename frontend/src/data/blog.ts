export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  readMinutes: number
  sample: true
  paragraphs: string[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'local-payment-methods-overview',
    title: 'How local payment methods change checkout',
    excerpt: 'A sample briefing on why bank transfer, wallets, and QR belong in a global collection story.',
    date: '2026-03-12',
    category: 'Payments',
    readMinutes: 4,
    sample: true,
    paragraphs: [
      'This is sample editorial content for the SS Nexus blog layout. It is not a published SS Nexus research note.',
      'Shoppers often prefer the method they already use: a local bank transfer, a wallet balance, or a QR code at checkout. A global payments page should show those options with the same visual weight as cards.',
      'The Pay In layout on this site follows that idea. Cash, ATM or offline, card, QR, e-wallet, and local bank are presented as method families. Which of them a merchant can offer is a commercial question, not a claim made by this article.',
      'When official SS Nexus articles are approved, replace this sample entry in src/data/blog.ts.',
    ],
  },
  {
    slug: 'designing-payout-operations',
    title: 'What payout operations need before go-live',
    excerpt: 'Sample notes on batch files, routing, and reconciliation for disbursement teams.',
    date: '2026-02-02',
    category: 'Payouts',
    readMinutes: 5,
    sample: true,
    paragraphs: [
      'This sample article describes the sections on the Pay Out page. It does not confirm that every control is live for SS Nexus.',
      'Disbursement teams usually need three things: a way to send one payment, a way to send many, and a report they can match to their ledger.',
      'The page presents automated payouts, file-based batches, dashboard actions, and downloadable reports as the operating picture. Limits, bank lists, and cut-off times stay out of the copy until they are approved.',
      'Use the contact form if you want to discuss a payout workflow. The form will say clearly if delivery is not connected.',
    ],
  },
  {
    slug: 'integration-without-invented-apis',
    title: 'Presenting an integration page before the docs exist',
    excerpt: 'Why this site shows a workflow instead of sample endpoints.',
    date: '2026-01-20',
    category: 'Integration',
    readMinutes: 3,
    sample: true,
    paragraphs: [
      'This is sample content. SS Nexus has not published API documentation on this website.',
      'A useful integration page can still explain the sequence: enquire, receive credentials through an approved channel, connect a checkout or payout call, then test reconciliation.',
      'Inventing URLs, SDKs, or language lists would look precise and be wrong. The Integration page keeps those links configurable.',
    ],
  },
  {
    slug: 'reading-a-payments-dashboard',
    title: 'How to read a payments dashboard illustration',
    excerpt: 'The homepage cards are a visual, and the numbers are marked as demonstration figures.',
    date: '2025-12-09',
    category: 'Product',
    readMinutes: 3,
    sample: true,
    paragraphs: [
      'Sample article. The homepage uses dashboard-style cards because the reference site does.',
      'Amounts, success rates, and merchant counts on that screen are stored as demonstration metrics. They are labeled on the page so they are not read as SS Nexus results.',
      'When real reporting is approved, update src/data/siteConfig.ts and remove the demonstration notice.',
    ],
  },
  {
    slug: 'security-language-for-a-public-site',
    title: 'Security language that stays accurate',
    excerpt: 'A sample note on describing controls without claiming certifications.',
    date: '2025-11-18',
    category: 'Security',
    readMinutes: 4,
    sample: true,
    paragraphs: [
      'Sample article for the blog template.',
      'Public pages can describe monitoring, access control, and data handling as intended practices. They should not display a certification badge the company has not provided.',
      'The Security page follows that rule. It is a presentation, not an audit report.',
    ],
  },
  {
    slug: 'planning-a-contact-enquiry',
    title: 'What to include in a payment enquiry',
    excerpt: 'Sample guidance for the contact form fields used on this site.',
    date: '2025-10-01',
    category: 'Company',
    readMinutes: 3,
    sample: true,
    paragraphs: [
      'Sample article. It explains the enquiry form, not a completed onboarding.',
      'A useful enquiry names the company, a business email, the country, and whether the interest is pay-in, pay-out, or both. Volume is optional because it is not required to start a conversation.',
      'Until an endpoint is configured, the form will not pretend the message was delivered.',
    ],
  },
]

export function getPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}

export function relatedPosts(slug: string) {
  const current = getPost(slug)
  const sameCategory = blogPosts.filter(
    (post) => post.slug !== slug && post.category === current?.category,
  )
  if (sameCategory.length >= 2) return sameCategory.slice(0, 3)
  return blogPosts.filter((post) => post.slug !== slug).slice(0, 3)
}
