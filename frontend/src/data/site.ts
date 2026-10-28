export const containerClass = "mx-auto w-full max-w-6xl px-4 sm:px-6"

export const solutionLinks = [
  { label: "Pay in", to: "/pay-in" },
  { label: "Pay out", to: "/pay-out" },
  { label: "Integration", to: "/integration" },
  { label: "Security", to: "/security" },
  { label: "Support", to: "/support" },
  { label: "FAQs", to: "/faqs" },
] as const

export const pageLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Contact Us", to: "/contact" },
] as const

export const legalLinks = [
  { label: "Data Privacy", to: "/privacy" },
  { label: "Sustainability", to: "/sustainability" },
  { label: "Terms & Conditions", to: "/terms" },
] as const

export const markets = [
  "Peru",
  "Colombia",
  "Mexico",
  "Chile",
  "Argentina",
  "Pakistan",
  "Kenya",
  "Indonesia",
  "Korea",
  "Japan",
  "India",
  "Bangladesh",
] as const

export const faqs = [
  {
    question: "Which payment methods can my customers use?",
    answer:
      "SS Nexus supports cards, local bank transfers, virtual accounts, e-wallets, QR payments, and payment links. Coverage is configured per market so checkout stays familiar for local customers.",
  },
  {
    question: "How fast are settlements and payouts?",
    answer:
      "Collections can be settled as they clear, and payouts can be sent in real time through the dashboard or API. Routing retries a transfer when a bank path is unavailable.",
  },
  {
    question: "Can payouts be sent in bulk?",
    answer:
      "Yes. Finance teams can upload a batch file or call the payout API. The same flow covers partner settlements, player withdrawals, and peer-to-peer disbursements.",
  },
  {
    question: "How do we integrate?",
    answer:
      "A REST API, webhooks, and a sandbox environment cover pay-in, payout, and reconciliation. Most teams start in the sandbox and move to live keys after certification.",
  },
  {
    question: "How is transaction data protected?",
    answer:
      "Traffic is encrypted in transit, access is role-based, and screening rules flag unusual activity before funds move. Audit logs stay available for reconciliation.",
  },
  {
    question: "How do we start an enquiry?",
    answer:
      "Use the contact page to share your company, markets, and volume. The SS Nexus team uses that brief to recommend a pay-in and payout setup.",
  },
] as const
