// Every word on the site lives here. Source of truth: practice/profile/master.md.
// Change master.md first, then copy the change into this file.

export const profile = {
  name: 'Ayush Bhagwat',
  role: 'Backend Engineer (Go)',
  pitch:
    'I build Go backends that stay correct when things go wrong: under concurrent requests, when the AI model is wrong, when a server fails halfway through setup.',
  location: 'Nagpur, India · open to remote or relocation',
  email: 'ayushbhagwat921@gmail.com',
  resume: '/ayush_resume.pdf',
  links: [
    { label: 'GitHub', href: 'https://github.com/MidNight91119' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/ayush-bhagwat-853695196' },
    { label: 'X', href: 'https://x.com/aybuilds' },
  ],
}

export const about = [
  "At Radisys I worked on Deutsche Telekom's Access 4.0 fibre broadband platform, on the Go control plane that replaced a legacy Python controller and turns racks of blank servers into running Kubernetes clusters, for a rollout of about 900 sites across Germany.",
  'Now I build backends where correctness is the hard part: an AI support agent whose backend, not the model, enforces the rules, and a perpetual-futures exchange with a real matching engine.',
]

export const experience = [
  {
    company: 'Radisys',
    role: 'Software Engineer, Backend',
    period: 'Jan 2023 – Feb 2024',
    place: 'Bengaluru',
    context: 'Infrastructure and Edge Cloud Compute teams · Deutsche Telekom Access 4.0, cloud-native FTTH broadband platform',
    points: [
      "Worked on the Go control plane for Deutsche Telekom's ~900-site FTTH rollout, on the team that built the Pod Bring-up Service (PBS): a stateless Go/Gin microservice that replaced a legacy Python controller and provisions bare-metal servers into Rancher-managed K3s clusters.",
      'Extended the notification proxy mock (Go/Gin) with node-level notification endpoints, so per-server bring-up progress could be verified in CI without the live notification system.',
      "Resolved 19+ bugs across pod bring-up, installation/deployment and graceful shutdown in a distributed microservice platform; reviewed code and wrote the team's docs for those flows.",
      'Traced the provisioning code end to end into 6 sequence diagrams (server install, DNS/DHCP, OS profiles, K8s install status, kubeconfig), used by the team as the reference for the flow.',
      'Helped deploy and maintain Terraform-provisioned virtual PODs, so squads without physical hardware could test end to end.',
    ],
    stack: ['Go', 'Gin', 'MongoDB', 'Kubernetes (K3s)', 'Rancher', 'Helm', 'SUSE Manager', 'IPMI', 'GitLab CI', 'Terraform', 'Linux'],
  },
]

export type Project = {
  name: string
  tagline: string
  repo: string
  flow: string[]
  points: string[]
  stack: string[]
}

export const projects: Project[] = [
  {
    name: 'AI Customer Support Agent',
    tagline: 'The model decides what to do. The backend decides whether it is allowed.',
    repo: 'https://github.com/MidNight91119/ai-support-agent',
    flow: ['ticket', 'agent loop', '⇄ LLM', 'tools', 'store · one lock'],
    points: [
      'An AI agent works each support ticket by calling backend tools (order lookup, policy search, stock check), then resolves it, asks for details, waits for approval, or hands it to a human.',
      'Every rule is enforced in Go, not in the prompt: customers touch only their own orders, refunds above ₹2,000 wait for a human, one refund or replacement per order, and every argument the model writes is validated.',
      'Safe under concurrency: state changes happen in one short locked section that never waits on the model, so no order is refunded twice. If the AI provider is down, the ticket fails safely.',
    ],
    stack: ['Go', 'net/http', 'LLM tool calling', 'JWT', 'argon2id'],
  },
  {
    name: 'Perpetual Futures Exchange',
    tagline: 'A crypto perps exchange: matching, margin, funding, liquidation.',
    repo: 'https://github.com/MidNight91119/perps-exchange',
    flow: ['order', 'margin check', 'matching engine', 'positions', 'liquidation'],
    points: [
      'Matching engine with price-time priority: limit and market orders, best price then oldest first, partial fills, post-only.',
      'Margin and leverage: collateral is locked before an order can trade; positions track average entry price and profit or loss.',
      'Liquidates on mark price, not last trade, so one bad print cannot force a liquidation; funding payments tie the contract to a live Binance index price.',
    ],
    stack: ['Go', 'net/http', 'order book', 'Binance feed'],
  },
  {
    name: 'SimpleBank',
    tagline: 'A payments backend where two transfers can never deadlock.',
    repo: 'https://github.com/MidNight91119/simplebank',
    flow: ['gRPC / REST', 'auth', 'transfer tx', 'Postgres', 'Redis worker'],
    points: [
      'Transfers run in one database transaction and lock rows in a fixed order, so two opposite transfers cannot deadlock; every money movement is recorded in a ledger.',
      'The same API over gRPC and REST, PASETO/JWT auth with roles, and verification emails sent by a background worker through a Redis queue.',
      'Tested against a real Postgres in CI; every push to main builds a Docker image and deploys it to AWS EKS.',
    ],
    stack: ['Go', 'gRPC', 'PostgreSQL', 'sqlc', 'Redis', 'Docker', 'AWS EKS', 'GitHub Actions'],
  },
]

export const skills = [
  { group: 'Languages', items: ['Go', 'SQL', 'TypeScript', 'Python'] },
  { group: 'Backend', items: ['Microservices', 'distributed systems', 'concurrency', 'REST', 'gRPC', 'Gin', 'net/http', 'PostgreSQL', 'sqlc', 'MongoDB', 'Redis'] },
  { group: 'AI', items: ['LLM tool calling', 'agent loops', 'OpenAI-compatible APIs'] },
  { group: 'Infrastructure', items: ['Docker', 'Kubernetes', 'Helm', 'Terraform', 'AWS (EKS, ECR)', 'Linux', 'GitHub Actions', 'GitLab CI'] },
  { group: 'Testing', items: ['unit + integration tests', 'gomock', 'race detector', 'API contract tests'] },
]

export const education = {
  degree: 'B.Tech, Information Technology',
  school: 'IIIT Lucknow',
  period: '2019 – 2023',
  note: 'CGPA 8.27',
}

export const achievements = [
  '1000+ problems solved on Codeforces, AtCoder and LeetCode',
  '1st place, Hack-O-Heist hackathon, IIIT Lucknow',
  'Best Presentation Award, Radisys 2023',
]
