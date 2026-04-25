// ============================================================
// DIAGNOSTIC DATA LAYER
// Each presenting symptom maps to a case file (project).
// ============================================================

export type Vital = {
  label: string;
  value: string;
  delta?: string;
  trend?: 'up' | 'down' | 'flat';
};

export type CaseFile = {
  // The symptom the visitor clicks
  domain: 'ACQUISITION' | 'CONVERSION' | 'RETENTION' | 'PRICING';
  symptom: string;            // The diagnostic phrase shown on click
  caseNumber: string;         // 001, 002, ...
  slug: string;               // /projects/[slug]
  patient: string;            // Client/company name
  patientMeta: string;        // "India, 2024" — geography & period
  category: 'GROWTH' | 'STRATEGY' | 'BRAND' | 'OPERATIONS';

  // Diagnosis content
  presenting: string;         // Subject and presenting symptom
  intervention: string;       // What was done
  outcome: string;            // What happened — short
  duration: string;           // How long

  // Vitals — the measurable outcomes (max 3 — restraint)
  vitals: Vital[];

  // BMAD chart
  build: string;
  measure: string;
  analyze: string;
  deploy: string;

  // For project deep page
  fullSummary: string;
  artifacts: string[];
  stack: string[];
};

export const cases: CaseFile[] = [
  {
    domain: 'CONVERSION',
    symptom: 'Your conversion is leaking at the demo-to-deal handoff.',
    caseNumber: '001',
    slug: 'crio-revenue-engine',
    patient: 'Crio.Do',
    patientMeta: 'India · 2023–2024 · EdTech',
    category: 'GROWTH',

    presenting:
      'A high-intent EdTech inbound funnel was over-indexing on top-of-funnel demand and under-converting at the demo stage. Sales team capacity was saturated; lead quality was the bottleneck, not lead volume.',
    intervention:
      'Rebuilt qualification at the pre-call stage. Introduced a scoring model on intent signals — career stage, prior coursework, employer match. Re-routed unqualified leads into a nurture sequence; routed qualified leads to senior advisors with personalized prep notes.',
    outcome:
      'Demo-to-deal conversion lifted 12 percentage points in 90 days. Revenue contribution of ₹4.2M from a single quarterly cohort. CAC payback compressed from 8 months to 5.',
    duration: '90 DAYS',

    vitals: [
      { label: 'CONVERSION LIFT', value: '+12pp', trend: 'up' },
      { label: 'REVENUE GENERATED', value: '₹4.2M', trend: 'up' },
      { label: 'CAC PAYBACK', value: '5 mo', delta: 'from 8 mo', trend: 'down' },
    ],

    build:
      'Lead-scoring framework on six intent signals; routing rules into HubSpot; nurture sequence in Iterable.',
    measure:
      'Daily cohort dashboards: lead-to-demo, demo-to-deal, lead-to-deal, time-to-close. Per-source attribution.',
    analyze:
      'Identified that 38% of demo no-shows shared one disqualifier — career stage. Rebuilt the qualification quiz around it.',
    deploy:
      'Migrated all paid traffic to qualified routing within 14 days. Trained sales team on new prep notes.',

    fullSummary:
      'A B2C-to-B2B EdTech motion where the bottleneck wasn\'t demand — it was the demo team\'s ability to triage. The fix was upstream: better qualification meant fewer demos but higher close rates and faster cycles.',
    artifacts: [
      'Lead Scoring Model (Sheets)',
      'Qualification Quiz Spec',
      'Nurture Sequence Map',
      'Pipeline Velocity Dashboard',
    ],
    stack: ['HubSpot', 'Iterable', 'Mixpanel', 'Sheets', 'Notion'],
  },
  {
    domain: 'PRICING',
    symptom: 'Your unit economics break before the second purchase.',
    caseNumber: '002',
    slug: 'marselia-vertical-integration',
    patient: 'Marselia',
    patientMeta: 'France · 2024 · M&A · ESSEC consulting',
    category: 'STRATEGY',

    presenting:
      'A specialty wholesaler in food & beverage was being squeezed at both ends — input prices rising, retailers pushing margin demands. Repeat-buyer cohort margin was thinner than initial-purchase margin.',
    intervention:
      'Modeled three vertical-integration scenarios: backwards (acquire supplier), forwards (acquire DTC channel), and platform (build own marketplace). Built unit economics, capex, and 5-year payback for each.',
    outcome:
      'Recommended backwards integration via tuck-in acquisition of a tier-2 supplier. Modeled +210bps gross margin within 18 months and 4.2-year payback at base case.',
    duration: '12 WEEKS',

    vitals: [
      { label: 'GM IMPROVEMENT', value: '+210bps', trend: 'up' },
      { label: 'PAYBACK', value: '4.2 yr', trend: 'flat' },
      { label: 'IRR (5Y)', value: '21%', trend: 'up' },
    ],

    build:
      'Three-scenario financial model in Excel. Stress-tested across input cost volatility and retail consolidation scenarios.',
    measure:
      'Payback period, IRR, breakeven shift, sensitivity to tier-2 supplier deal multiple.',
    analyze:
      'Forwards integration looked attractive on margin but cannibalized existing channel. Backwards model preserved relationships and de-risked input volatility.',
    deploy:
      'Final deck delivered with deal sourcing shortlist and a 90-day diligence checklist.',

    fullSummary:
      'A consulting engagement where the board wanted "growth" but the actual unlock was structural — protect the margin floor before chasing top-line. Recommendation reframed the strategic question.',
    artifacts: [
      'Three-Scenario Financial Model',
      'Deal Sourcing Shortlist',
      'Diligence Checklist',
      'Board Recommendation Deck',
    ],
    stack: ['Excel', 'PowerPoint', 'Capital IQ', 'Industry filings'],
  },
  {
    domain: 'ACQUISITION',
    symptom: 'You are paying for awareness in a category where awareness is not the constraint.',
    caseNumber: '003',
    slug: 'bvlgari-corpo-architettura',
    patient: 'Bvlgari',
    patientMeta: 'Italy · 2024 · Luxury · ESSEC consulting',
    category: 'BRAND',

    presenting:
      'A heritage luxury maison was launching a new fragrance collection in a saturated prestige category. Mass-awareness media was expensive and saturated; the brief was to find a launch architecture that didn\'t depend on outspending the category.',
    intervention:
      'Mapped the prestige fragrance archetype landscape — every major maison plotted on consumer-resonance vs. uniqueness axes. Identified an underserved archetypal quadrant and reframed the launch as a category re-entry, not a line extension.',
    outcome:
      'Repositioned the launch around an archetypal whitespace ("Architettura"). Recommended a 70-30 budget split toward owned channels and curated retail moments instead of broadcast. Forecasted CPM efficiency of +35% versus category benchmark.',
    duration: '10 WEEKS',

    vitals: [
      { label: 'CPM EFFICIENCY', value: '+35%', trend: 'up' },
      { label: 'OWNED CHANNEL MIX', value: '70%', trend: 'up' },
      { label: 'ARCHETYPE WHITESPACE', value: 'Q3', trend: 'flat' },
    ],

    build:
      'Archetype map of 28 prestige fragrance houses. Consumer-resonance scoring from 12 brand-ladder interviews.',
    measure:
      'Forecast CPM, share of voice projection, owned-channel reach modeling.',
    analyze:
      'The "structured / architectural / coded" quadrant was empty in luxury fragrance — opposite of the dominant "ethereal / poetic" pole.',
    deploy:
      'Launch architecture brief delivered with creative territories, channel mix, and a 12-month rollout calendar.',

    fullSummary:
      'A brand consulting case proving that media efficiency in luxury doesn\'t come from buying smarter — it comes from being conceptually unmistakable. Whitespace beats budget.',
    artifacts: [
      'Archetype Landscape Map',
      'Brand Ladder Interview Synthesis',
      'Launch Architecture Deck',
      'Channel Mix Model',
    ],
    stack: ['Figma', 'Excel', 'Mintel', 'WGSN'],
  },
  {
    domain: 'RETENTION',
    symptom: 'Your operations are not the bottleneck. Your routing is.',
    caseNumber: '004',
    slug: 'knr-operational-grid',
    patient: 'KNR Traders',
    patientMeta: 'India · 2021–2022 · Events Operations',
    category: 'OPERATIONS',

    presenting:
      'A regional events operations business was running 70+ events per year with growing client churn. Diagnostic interviews surfaced that complaints clustered around the activation phase — clients felt re-explained to at every handoff.',
    intervention:
      'Designed a rotational staffing grid across 8 functional zones. Each zone had a primary owner and a hot-handoff protocol. Built a single source-of-truth client brief that traveled with the project.',
    outcome:
      'Repeat-client rate climbed from 22% to 68% in twelve months. Revenue grew 11x over the period as the business shifted from one-off bookings to multi-event retainers.',
    duration: '12 MONTHS',

    vitals: [
      { label: 'REPEAT CLIENTS', value: '68%', delta: 'from 22%', trend: 'up' },
      { label: 'REVENUE GROWTH', value: '11×', trend: 'up' },
      { label: 'EVENTS / YEAR', value: '70+', trend: 'up' },
    ],

    build:
      '8-zone activation grid (logistics, talent, AV, F&B, hospitality, brand, comms, contingency). Rotational staffing model. Client brief template.',
    measure:
      'NPS by event phase. Handoff-related complaint frequency. Repeat-booking rate by client segment.',
    analyze:
      'Complaints clustered in the 48 hours before activation — a handoff blackout window. The fix was protocol, not headcount.',
    deploy:
      'Grid model rolled out across all event types over two quarters. Training cycle for full operations team.',

    fullSummary:
      'An operational design problem disguised as a service-quality problem. The output looked premium once the workflow felt premium.',
    artifacts: [
      '8-Zone Activation Grid',
      'Hot-Handoff Protocol',
      'Client Brief Template',
      'Repeat-Client Tracking Sheet',
    ],
    stack: ['Notion', 'Sheets', 'WhatsApp Business', 'Custom CRM'],
  },
  {
    domain: 'CONVERSION',
    symptom: 'Your distribution partners do not know how to sell you.',
    caseNumber: '005',
    slug: 'comtesse-trade-marketing',
    patient: 'Comtesse du Barry',
    patientMeta: 'France · 2024 · Trade Marketing · ESSEC consulting',
    category: 'BRAND',

    presenting:
      'A heritage French gastronomy brand had strong direct-to-consumer affinity but weak velocity through specialty retail. Retailers stocked the products but did not actively recommend them.',
    intervention:
      'Diagnosed retailer-side friction — staff training, in-store assets, sell-in margin transparency. Built a 4-phase trade marketing roadmap focused on activating the retailer as a sales asset, not just a shelf.',
    outcome:
      'Roadmap projected 18% velocity lift in pilot retailers within two seasons. Sell-in margin clarity removed a known objection in 8 of 10 retail interviews.',
    duration: '8 WEEKS',

    vitals: [
      { label: 'PROJECTED VELOCITY LIFT', value: '+18%', trend: 'up' },
      { label: 'PILOT RETAILERS', value: '12', trend: 'flat' },
      { label: 'OBJECTION RESOLUTION', value: '8/10', trend: 'up' },
    ],

    build:
      '4-phase roadmap: train · equip · incentivize · measure. In-store activation kit. Sell-in margin calculator.',
    measure:
      'Velocity per SKU per retailer. Staff recommendation rate. Co-marketing ROI.',
    analyze:
      'Retailer interviews revealed margin opacity was the #1 blocker, not consumer demand. Reframed the deck.',
    deploy:
      'Pilot proposed across 12 specialty retailers in two regions, with quarterly velocity tracking.',

    fullSummary:
      'A trade marketing engagement where the brand-side team had been pushing harder on consumer marketing — but the leverage point was the retailer\'s motivation, not the consumer\'s awareness.',
    artifacts: [
      'Trade Marketing Roadmap',
      'In-Store Activation Kit',
      'Sell-in Margin Calculator',
      'Pilot Tracking Framework',
    ],
    stack: ['PowerPoint', 'Excel', 'Figma', 'Retailer interviews'],
  },
];

export const profile = {
  name: 'Musharraf Shaik',
  role: 'Data-Driven B2B Marketing Strategist',
  location: 'Paris, France',
  available: 'September 2026',
  email: 'contact.shaikmusharraf@gmail.com',
  phone: '+33 780 74 2351',
  education: [
    {
      school: 'ESSEC Business School',
      program: 'Master in Management',
      period: '2025 — 2027',
      note: 'GMAT 735',
    },
    {
      school: 'Panimalar Institute',
      program: 'B.Tech, Electronics & Communication',
      period: '2019 — 2023',
      note: '',
    },
  ],
  // Symptoms shown on the home screen — the four diagnostic domains
  domains: [
    { id: 'ACQUISITION', label: 'Acquisition' },
    { id: 'CONVERSION', label: 'Conversion' },
    { id: 'RETENTION', label: 'Retention' },
    { id: 'PRICING', label: 'Pricing' },
  ] as const,
};
