export type Metric = {
  id: string
  label: string
  value: string
  delta: number
  spark: { x: string; v: number }[]
  color: string
}

const spark = (base: number, seed: number) =>
  Array.from({ length: 12 }, (_, i) => ({
    x: `${i}`,
    v: Math.round(
      base +
        Math.sin(i * 0.9 + seed) * base * 0.14 +
        (i / 11) * base * 0.35 +
        Math.cos(i * 1.7 + seed) * base * 0.06,
    ),
  }))

export const metrics: Metric[] = [
  {
    id: 'arr',
    label: 'Annual recurring revenue',
    value: '$4.82M',
    delta: 12.4,
    spark: spark(320, 1),
    color: 'var(--chart-1)',
  },
  {
    id: 'accounts',
    label: 'Active accounts',
    value: '1,284',
    delta: 8.1,
    spark: spark(210, 3),
    color: 'var(--chart-2)',
  },
  {
    id: 'nrr',
    label: 'Net revenue retention',
    value: '118%',
    delta: 3.2,
    spark: spark(160, 5),
    color: 'var(--chart-3)',
  },
  {
    id: 'churn',
    label: 'Logo churn',
    value: '1.9%',
    delta: -0.6,
    spark: spark(90, 7),
    color: 'var(--chart-5)',
  },
]

export const revenueSeries = [
  { month: 'Jan', mrr: 268, expansion: 41 },
  { month: 'Feb', mrr: 289, expansion: 48 },
  { month: 'Mar', mrr: 301, expansion: 52 },
  { month: 'Apr', mrr: 318, expansion: 61 },
  { month: 'May', mrr: 342, expansion: 58 },
  { month: 'Jun', mrr: 366, expansion: 72 },
  { month: 'Jul', mrr: 389, expansion: 79 },
  { month: 'Aug', mrr: 412, expansion: 88 },
  { month: 'Sep', mrr: 438, expansion: 94 },
  { month: 'Oct', mrr: 461, expansion: 101 },
  { month: 'Nov', mrr: 489, expansion: 112 },
  { month: 'Dec', mrr: 522, expansion: 128 },
]

export const segmentSeries = [
  { segment: 'Enterprise', value: 48 },
  { segment: 'Mid-market', value: 31 },
  { segment: 'Startup', value: 14 },
  { segment: 'Self-serve', value: 7 },
]

export const retentionSeries = [
  { month: 'Jan', nrr: 109, gross: 96 },
  { month: 'Feb', nrr: 111, gross: 95 },
  { month: 'Mar', nrr: 112, gross: 96 },
  { month: 'Apr', nrr: 114, gross: 97 },
  { month: 'May', nrr: 113, gross: 96 },
  { month: 'Jun', nrr: 116, gross: 97 },
  { month: 'Jul', nrr: 117, gross: 98 },
  { month: 'Aug', nrr: 118, gross: 98 },
]

export const acquisitionSeries = [
  { month: 'Mar', added: 84, churned: 21 },
  { month: 'Apr', added: 96, churned: 18 },
  { month: 'May', added: 78, churned: 26 },
  { month: 'Jun', added: 112, churned: 19 },
  { month: 'Jul', added: 104, churned: 23 },
  { month: 'Aug', added: 131, churned: 17 },
]

export type CustomerFile = {
  id: string
  company: string
  initials: string
  plan: 'Enterprise' | 'Growth' | 'Scale' | 'Starter'
  records: string
  size: string
  region: string
  status: 'Synced' | 'Syncing' | 'Stale'
  updated: string
}

export const customerFiles: CustomerFile[] = [
  {
    id: 'f-8842',
    company: 'Northwind Trading Co.',
    initials: 'NT',
    plan: 'Enterprise',
    records: '184,209',
    size: '2.4 GB',
    region: 'us-east-1',
    status: 'Synced',
    updated: '2m ago',
  },
  {
    id: 'f-8814',
    company: 'Lumen Robotics',
    initials: 'LR',
    plan: 'Scale',
    records: '92,410',
    size: '1.1 GB',
    region: 'eu-west-2',
    status: 'Syncing',
    updated: '9m ago',
  },
  {
    id: 'f-8790',
    company: 'Atlas Freight Systems',
    initials: 'AF',
    plan: 'Enterprise',
    records: '311,880',
    size: '4.8 GB',
    region: 'us-west-2',
    status: 'Synced',
    updated: '21m ago',
  },
  {
    id: 'f-8763',
    company: 'Verdant Health',
    initials: 'VH',
    plan: 'Growth',
    records: '48,203',
    size: '612 MB',
    region: 'us-east-1',
    status: 'Stale',
    updated: '3h ago',
  },
  {
    id: 'f-8741',
    company: 'Cobalt Financial',
    initials: 'CF',
    plan: 'Enterprise',
    records: '204,551',
    size: '3.2 GB',
    region: 'ap-south-1',
    status: 'Synced',
    updated: '5h ago',
  },
  {
    id: 'f-8729',
    company: 'Meridian Media Group',
    initials: 'MM',
    plan: 'Scale',
    records: '77,932',
    size: '980 MB',
    region: 'eu-central-1',
    status: 'Synced',
    updated: '8h ago',
  },
  {
    id: 'f-8702',
    company: 'Rivet Manufacturing',
    initials: 'RM',
    plan: 'Growth',
    records: '39,118',
    size: '540 MB',
    region: 'us-east-1',
    status: 'Stale',
    updated: '1d ago',
  },
  {
    id: 'f-8688',
    company: 'Solstice Energy',
    initials: 'SE',
    plan: 'Starter',
    records: '12,004',
    size: '210 MB',
    region: 'us-west-1',
    status: 'Synced',
    updated: '1d ago',
  },
]

/* ---------- Accounts ---------- */

export type Account = {
  id: string
  company: string
  initials: string
  owner: string
  industry: string
  seats: number
  mrr: string
  health: number
  plan: CustomerFile['plan']
  status: 'Active' | 'Onboarding' | 'At risk'
}

export const accounts: Account[] = [
  { id: 'a-01', company: 'Northwind Trading Co.', initials: 'NT', owner: 'Ava Chen', industry: 'Logistics', seats: 240, mrr: '$42.0K', health: 94, plan: 'Enterprise', status: 'Active' },
  { id: 'a-02', company: 'Lumen Robotics', initials: 'LR', owner: 'Marcus Reed', industry: 'Hardware', seats: 88, mrr: '$18.4K', health: 71, plan: 'Scale', status: 'Onboarding' },
  { id: 'a-03', company: 'Atlas Freight Systems', initials: 'AF', owner: 'Ava Chen', industry: 'Logistics', seats: 410, mrr: '$61.2K', health: 88, plan: 'Enterprise', status: 'Active' },
  { id: 'a-04', company: 'Verdant Health', initials: 'VH', owner: 'Priya Nair', industry: 'Healthcare', seats: 62, mrr: '$9.8K', health: 48, plan: 'Growth', status: 'At risk' },
  { id: 'a-05', company: 'Cobalt Financial', initials: 'CF', owner: 'Diego Alvarez', industry: 'Fintech', seats: 305, mrr: '$54.6K', health: 91, plan: 'Enterprise', status: 'Active' },
  { id: 'a-06', company: 'Meridian Media Group', initials: 'MM', owner: 'Marcus Reed', industry: 'Media', seats: 120, mrr: '$21.1K', health: 79, plan: 'Scale', status: 'Active' },
  { id: 'a-07', company: 'Rivet Manufacturing', initials: 'RM', owner: 'Priya Nair', industry: 'Manufacturing', seats: 54, mrr: '$8.2K', health: 52, plan: 'Growth', status: 'At risk' },
  { id: 'a-08', company: 'Solstice Energy', initials: 'SE', owner: 'Diego Alvarez', industry: 'Energy', seats: 22, mrr: '$3.4K', health: 83, plan: 'Starter', status: 'Onboarding' },
]

/* ---------- Pipelines ---------- */

export type Deal = {
  id: string
  company: string
  initials: string
  value: string
  owner: string
  age: string
}

export type PipelineStage = {
  id: string
  name: string
  accent: string
  deals: Deal[]
}

export const pipelineStages: PipelineStage[] = [
  {
    id: 'lead',
    name: 'Lead',
    accent: 'var(--chart-2)',
    deals: [
      { id: 'd-1', company: 'Orbit Analytics', initials: 'OA', value: '$24K', owner: 'AC', age: '2d' },
      { id: 'd-2', company: 'Fathom Labs', initials: 'FL', value: '$16K', owner: 'MR', age: '4d' },
      { id: 'd-3', company: 'Nimbus Retail', initials: 'NR', value: '$31K', owner: 'PN', age: '1d' },
    ],
  },
  {
    id: 'qualified',
    name: 'Qualified',
    accent: 'var(--chart-4)',
    deals: [
      { id: 'd-4', company: 'Harbor Logistics', initials: 'HL', value: '$58K', owner: 'DA', age: '6d' },
      { id: 'd-5', company: 'Pinewood Care', initials: 'PC', value: '$22K', owner: 'AC', age: '3d' },
    ],
  },
  {
    id: 'proposal',
    name: 'Proposal',
    accent: 'var(--chart-1)',
    deals: [
      { id: 'd-6', company: 'Vertex Semis', initials: 'VS', value: '$96K', owner: 'MR', age: '8d' },
      { id: 'd-7', company: 'Cascade Foods', initials: 'CF', value: '$44K', owner: 'PN', age: '5d' },
      { id: 'd-8', company: 'Ironclad Ins.', initials: 'II', value: '$120K', owner: 'DA', age: '11d' },
    ],
  },
  {
    id: 'closing',
    name: 'Closing',
    accent: 'var(--chart-3)',
    deals: [
      { id: 'd-9', company: 'Summit Bank', initials: 'SB', value: '$210K', owner: 'AC', age: '14d' },
      { id: 'd-10', company: 'Delta Freight', initials: 'DF', value: '$72K', owner: 'MR', age: '9d' },
    ],
  },
]

/* ---------- Databases ---------- */

export type DbInstance = {
  id: string
  name: string
  engine: 'PostgreSQL' | 'MySQL' | 'Redis' | 'ClickHouse'
  version: string
  region: string
  size: string
  connections: number
  maxConnections: number
  status: 'Healthy' | 'Degraded' | 'Provisioning'
}

export const databases: DbInstance[] = [
  { id: 'db-01', name: 'prod-accounts', engine: 'PostgreSQL', version: '16.2', region: 'us-east-1', size: '48 GB', connections: 142, maxConnections: 200, status: 'Healthy' },
  { id: 'db-02', name: 'prod-analytics', engine: 'ClickHouse', version: '24.3', region: 'us-east-1', size: '1.2 TB', connections: 38, maxConnections: 100, status: 'Healthy' },
  { id: 'db-03', name: 'sessions-cache', engine: 'Redis', version: '7.2', region: 'us-west-2', size: '12 GB', connections: 890, maxConnections: 1000, status: 'Degraded' },
  { id: 'db-04', name: 'eu-accounts', engine: 'PostgreSQL', version: '16.2', region: 'eu-west-2', size: '31 GB', connections: 76, maxConnections: 200, status: 'Healthy' },
  { id: 'db-05', name: 'billing-ledger', engine: 'MySQL', version: '8.4', region: 'us-east-1', size: '22 GB', connections: 54, maxConnections: 150, status: 'Healthy' },
  { id: 'db-06', name: 'apac-replica', engine: 'PostgreSQL', version: '16.2', region: 'ap-south-1', size: '18 GB', connections: 0, maxConnections: 200, status: 'Provisioning' },
]
