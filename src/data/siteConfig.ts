export const siteConfig = {
  name: 'SS Nexus',
  tagline: 'Global Payment Solutions',
  description:
    'SS Nexus is a global payment gateway built for businesses operating across borders, connecting merchants to local payment methods and fast, secure payouts.',
  siteUrl: (import.meta.env.VITE_SITE_URL as string | undefined) || 'https://www.ssnexus.com',
  loginUrl: (import.meta.env.VITE_LOGIN_URL as string | undefined) || '',
  docsUrl: (import.meta.env.VITE_DOCS_URL as string | undefined) || '',
  contactEndpoint: (import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined) || '',
  telegram: {
    handle: '@SSnexus',
    url: 'https://t.me/SSnexus',
  },
}

export const demoMetrics = {
  notice: 'Demonstration figures — not verified SS Nexus performance.',
  merchants: '6,000+',
  merchantLabel: 'Merchants',
  transactionsValue: '200 Million',
  transactionsLabel: 'Transactions/month',
  methods: '100+',
  methodsLabel: 'Payment methods',
  successRate: '99.99%',
  todayAmount: '$ 3,521,134.02',
  yesterdayAmount: '$ 5,919,568.90',
  successAmount: '$ 5,860,373.21',
  payoutAmount: '$ 5,495,338.06',
  totalPayment: '$ 5,919,568.90 Total payment',
}

export const coverageMarkets = [
  'Peru',
  'Colombia',
  'Chile',
  'Argentina',
  'Pakistan',
  'Kenya',
  'Indonesia',
  'Korea',
  'Japan',
  'India',
  'Bangladesh',
] as const
