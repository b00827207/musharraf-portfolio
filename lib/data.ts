// ============================================================================
// THE ARCHITECTURE OF INTENT — DATA LAYER
// Sourced from Shaik Musharraf's resume; single source of truth.
// ============================================================================

export type Project = {
  slug: string;
  index: string;
  title: string;
  subtitle: string;
  client: string;
  year: string;
  location: string;
  category: 'STRATEGY' | 'GROWTH' | 'OPERATIONS' | 'BRAND';
  hero: {
    eyebrow: string;
    headline: string;
    accent: 'signal' | 'ember';
  };
  summary: string;
  bmad: {
    build: string;
    measure: string;
    analyze: string;
    deploy: string;
  };
  metrics: { label: string; value: string; unit?: string }[];
  stack: string[];
  embed?: {
    type: 'iframe' | 'video' | 'figma' | 'dashboard';
    src?: string;
    note: string;
  };
  artifacts: { label: string; type: string }[];
};

export const projects: Project[] = [
  {
    slug: 'b2b-revenue-engine',
    index: '01',
    title: 'The Revenue Engine',
    subtitle: 'B2B Pipeline Architecture / EdTech',
    client: 'Crio.Do — Series A',
    year: '2024–25',
    location: 'Karnataka, IN',
    category: 'GROWTH',
    hero: {
      eyebrow: 'CASE 01 / GROWTH SYSTEMS',
      headline: 'Engineered a 124-account pipeline into a predictable revenue machine.',
      accent: 'signal',
    },
    summary:
      'Inherited a leaking B2B pipeline with no monitoring infrastructure. Rebuilt the activation sequence, instrumented the funnel, and converted noise into a predictable conversion engine — delivering ₹4.2M direct revenue in 6 months.',
    bmad: {
      build:
        'Designed an intent-based filtering layer on top of LeadSquared + HubSpot CRM data. Rewrote pitch sequencing across 124+ active accounts. Built a weekly KPI dashboard surfacing pipeline velocity, stage drop-off, and cycle inefficiency by cluster.',
      measure:
        'Tracked conversion rate, sales cycle days, pitch-to-close ratio, SLA compliance, and ramp-up time across a 6-person cross-functional team. Established baseline metrics where none had previously existed.',
      analyze:
        'Diagnosed a 20.7% cycle inefficiency hiding inside otherwise healthy top-of-funnel volume. Root-caused conversion leakage to inconsistent activation outreach and pitch-stage friction. Segmented performance across 3 regional clusters.',
      deploy:
        'Lifted conversion to 28.6% (+12pp above team average). Reduced cycle from 11.6 → 9.2 days. Onboarded 5+ associates with structured frameworks, cutting ramp-up by 18% and elevating output consistency by 22%. Delivered ₹4.2M (20.3% of regional topline).',
    },
    metrics: [
      { label: 'CONVERSION LIFT', value: '+12', unit: 'pp' },
      { label: 'CYCLE COMPRESSION', value: '−20.7', unit: '%' },
      { label: 'DIRECT REVENUE', value: '₹4.2', unit: 'M' },
      { label: 'TOPLINE SHARE', value: '20.3', unit: '%' },
      { label: 'SLA COMPLIANCE', value: '100', unit: '%' },
      { label: 'RAMP REDUCTION', value: '−18', unit: '%' },
    ],
    stack: ['LeadSquared', 'HubSpot', 'Excel', 'Power BI', 'Notion'],
    embed: {
      type: 'dashboard',
      note: 'Live KPI surface — pipeline velocity, conversion by cluster, cycle days. Rebuilt from sanitised production data.',
    },
    artifacts: [
      { label: 'Pipeline Velocity Dashboard', type: 'PBI' },
      { label: 'Activation Sequence v2.1', type: 'DOC' },
      { label: 'Cluster Performance Matrix', type: 'XLSX' },
    ],
  },
  {
    slug: 'marselia-vertical-integration',
    index: '02',
    title: 'Vertical Integration',
    subtitle: 'M&A Target Evaluation / Air Cargo',
    client: 'Marselia Group — ESSEC Strategy Consulting',
    year: 'APR 2026',
    location: 'Paris, FR',
    category: 'STRATEGY',
    hero: {
      eyebrow: 'CASE 02 / M&A STRATEGY',
      headline: '€8.86M of value destruction, intercepted by a 4C analytical framework.',
      accent: 'ember',
    },
    summary:
      'Multi-criteria evaluation of 14 acquisition candidates against 5 strategic criteria. Recommended Nord Air (EV €34–44M, score 89/100), projecting €14.05M annual run-rate synergy through vertical integration.',
    bmad: {
      build:
        'Constructed a 4C analytical framework spanning fleet compatibility, route overlap, labor integration, capital structure, and cultural fit. Built financial reporting model with 3 scenarios (Bear €4.8M / Base €8.4M / Bull €11.2M Y3 EBITDA).',
      measure:
        'Scored 14 candidates across 5 weighted criteria. Modelled €590/block-hour leakage (38–42% margin loss) in incumbent operations. Tracked DSCR, payback, and EBITDA convergence over 42 months.',
      analyze:
        'Identified Nord Air at 89/100 as the dominant target. Quantified €8.86M annual value destruction in status quo. Modelled €2.6M digital analytics stack generating €6.3M annual ROI across the supply chain.',
      deploy:
        'Designed 42-month, 4-phase implementation roadmap with KPI governance gates. Recommended capital deployment yielding 33.7-month payback and DSCR > 1.25× from Month 12. Briefed senior stakeholders on €14.05M synergy thesis.',
    },
    metrics: [
      { label: 'ANNUAL SYNERGY', value: '€14.05', unit: 'M' },
      { label: 'PAYBACK PERIOD', value: '33.7', unit: 'mo' },
      { label: 'TARGET SCORE', value: '89', unit: '/100' },
      { label: 'CANDIDATES EVALUATED', value: '14' },
      { label: 'DIGITAL STACK ROI', value: '€6.3', unit: 'M/yr' },
      { label: 'IMPLEMENTATION', value: '42', unit: 'mo' },
    ],
    stack: ['Excel', 'Financial Modeling', 'PowerPoint', 'Porter 5F', '4C Framework'],
    embed: {
      type: 'iframe',
      note: 'Three-scenario EBITDA convergence over 42 months. Bear / Base / Bull projections with payback overlay.',
    },
    artifacts: [
      { label: 'Target Evaluation Matrix', type: 'XLSX' },
      { label: 'Financial Model — 3 Scenarios', type: 'XLSX' },
      { label: 'Implementation Roadmap', type: 'PDF' },
    ],
  },
  {
    slug: 'bvlgari-corpo-architettura',
    index: '03',
    title: 'Corpo Architettura',
    subtitle: 'Luxury Brand Launch / Body-Jewelry',
    client: 'Bvlgari — ESSEC Brand Strategy',
    year: '2026',
    location: 'Paris, FR',
    category: 'BRAND',
    hero: {
      eyebrow: 'CASE 03 / LUXURY POSITIONING',
      headline: 'A $52.6B market gap, mapped to 8 hero SKUs and 2.4M segmented buyers.',
      accent: 'ember',
    },
    summary:
      'Positioning strategy for an anatomical body-jewelry line. Segmented a 2.4M global CRM into 5 archetypes, designed a 3-wave global launch across 100+ boutiques in 40 countries, and modelled $1.17B base-case 5-year revenue.',
    bmad: {
      build:
        'Defined positioning territory at the intersection of anatomical wearable art and high jewelry. Proposed 8 hero SKUs ($5K–$100K+). Designed 3-wave global launch architecture across 100+ boutiques in 40 countries with ambassador strategy (Gyllenhaal, Zendaya).',
      measure:
        'Segmented 2.4M global CRM into 5 customer archetypes with LTV:CAC profiles ranging 23.2× to 42.9×. Built full P&L with €25M investment, 72.3% blended gross margin, Month 16 breakeven.',
      analyze:
        'Identified The Inheritor (AOV $145K) and Cultural Collector (AOV $22K) as primary acquisition targets generating 50% of Y1 revenue. Mapped €4–6M earned media value from press + editorial.',
      deploy:
        'Modelled Bear $785M / Base $1.17B / Bull $1.58B 5-year revenue. Y5 operating margin ~45%, ROI 13.7×–26.4×. Delivered creative agency brief, communications calendar, and dealer rollout sequence.',
    },
    metrics: [
      { label: 'BASE-CASE REVENUE', value: '$1.17', unit: 'B' },
      { label: 'MARKET GAP', value: '$52.6', unit: 'B' },
      { label: 'BREAKEVEN', value: 'M16' },
      { label: 'GROSS MARGIN', value: '72.3', unit: '%' },
      { label: 'CRM SEGMENTS', value: '5' },
      { label: 'GLOBAL ROLLOUT', value: '40', unit: 'countries' },
    ],
    stack: ['Figma', 'Excel', 'CRM Segmentation', 'Brand Architecture', 'Keynote'],
    embed: {
      type: 'figma',
      note: 'Brand territory map + customer archetype canvas. Five segments rendered against AOV × frequency axes.',
    },
    artifacts: [
      { label: 'Brand Territory Map', type: 'FIG' },
      { label: 'Customer Archetype Canvas', type: 'FIG' },
      { label: 'Launch Sequence Plan', type: 'PDF' },
    ],
  },
  {
    slug: 'comtesse-trade-marketing',
    index: '04',
    title: '360° Trade Marketing',
    subtitle: 'Retail Transformation / FMCG Gourmet',
    client: 'Comtesse du Barry — ESSEC',
    year: '2026',
    location: 'Paris, FR',
    category: 'STRATEGY',
    hero: {
      eyebrow: 'CASE 04 / RETAIL TRANSFORMATION',
      headline: '€16.2M revenue stagnation, decoded across 41 POS and 150K customers.',
      accent: 'signal',
    },
    summary:
      'Quantitative + qualitative consumer insights research at scale. Designed 360° trade marketing calendars with 12 innovation concepts, projecting €23M revenue and €3M EBITDA by Month 24.',
    bmad: {
      build:
        'Built 24-month retail operations roadmap across 4 phases with go/no-go KPI gates. Designed 360° trade marketing calendar with 12 innovation concepts and 3 gift-occasion campaigns. Allocated €1.63M CapEx across digital-first activation and flagship execution.',
      measure:
        'Analysed market performance and consumer panel data across 41 POS and 150K customer base. Conducted Nielsen-style competitive intelligence across 5 major FMCG gourmet brand competitors.',
      analyze:
        'Identified de-personalization as primary leakage vector. Surfaced €3.2M B2B innovation pipeline opportunity. Diagnosed seasonal dependencies and underperforming segments by geography and format.',
      deploy:
        'Projected 22% revenue uplift, 30% off-peak sales growth. Modelled €23M revenue, €3M EBITDA, 4× CapEx ROI by M24. Delivered selling-story recommendations and cross-functional packaging alignment.',
    },
    metrics: [
      { label: 'REVENUE TARGET', value: '€23', unit: 'M' },
      { label: 'EBITDA TARGET', value: '€3', unit: 'M' },
      { label: 'CAPEX ROI', value: '4', unit: '×' },
      { label: 'POS ANALYZED', value: '41' },
      { label: 'CUSTOMERS', value: '150', unit: 'K' },
      { label: 'INNOVATION SKUs', value: '12' },
    ],
    stack: ['Consumer Panel', 'Nielsen', 'Excel', 'Power BI', 'Trade Calendar'],
    embed: {
      type: 'dashboard',
      note: 'POS heatmap + 24-month phased rollout — go/no-go gates rendered against KPI thresholds.',
    },
    artifacts: [
      { label: 'POS Performance Heatmap', type: 'PBI' },
      { label: '24-Month Roadmap', type: 'PDF' },
      { label: 'Innovation Pipeline', type: 'XLSX' },
    ],
  },
  {
    slug: 'knr-operational-grid',
    index: '05',
    title: 'The Operational Grid',
    subtitle: 'Brand Activation Operations / Events',
    client: 'KNR Traders',
    year: '2023–24',
    location: 'Andhra Pradesh, IN',
    category: 'OPERATIONS',
    hero: {
      eyebrow: 'CASE 05 / SYSTEMS UNDER PRESSURE',
      headline: '70+ flagship activations, simultaneously, at 92% success rate.',
      accent: 'signal',
    },
    summary:
      'Coordinated retail activation operations across 70+ concurrent brand events. Implemented a rotational staffing model and end-to-end vendor governance, driving 11× business growth and 2× revenue expansion in 18 months.',
    bmad: {
      build:
        'Implemented rotational staffing model across multi-zone operations. Designed vendor governance framework spanning catering, logistics, and equipment partners. Automated 100% of billing operations across the commercial segment.',
      measure:
        'Tracked retail KPIs across 70+ activations — segment performance, geographic format efficiency, vendor SLA, client experience scores. Monitored ₹2M+ in brand-driven initiatives end-to-end.',
      analyze:
        'Identified underperforming formats by segment and geographic region. Diagnosed vendor performance failures across 3 vendor categories. Surfaced incentive design opportunities for repeat client growth.',
      deploy:
        'Achieved 92% event success rate, 50% retail operations efficiency gain, 25% vendor cost savings. Drove 30% repeat client growth, 40% new acquisition, 11× business growth, 2× revenue expansion in 18 months. Lifted client experience scores by 45%.',
    },
    metrics: [
      { label: 'BUSINESS GROWTH', value: '11', unit: '×' },
      { label: 'REVENUE EXPANSION', value: '2', unit: '×' },
      { label: 'EVENT SUCCESS', value: '92', unit: '%' },
      { label: 'OPS EFFICIENCY', value: '+50', unit: '%' },
      { label: 'VENDOR SAVINGS', value: '25', unit: '%' },
      { label: 'CX SCORE LIFT', value: '+45', unit: '%' },
    ],
    stack: ['Excel', 'Vendor Mgmt', 'Logistics Coord.', 'Billing Automation'],
    embed: {
      type: 'iframe',
      note: '70-event operational grid — staffing rotations rendered as a Gantt over 18 months.',
    },
    artifacts: [
      { label: 'Rotational Staffing Model', type: 'XLSX' },
      { label: 'Vendor Governance Doc', type: 'PDF' },
      { label: 'Activation Performance Log', type: 'XLSX' },
    ],
  },
];

export const profile = {
  name: 'Musharraf Shaik',
  alias: 'Athreya',
  role: 'Data-Driven B2B Marketing Strategist',
  tagline: "I don't just market. I engineer revenue.",
  thesis: 'The Architecture of Intent',
  philosophy: 'BMAD — Build · Measure · Analyze · Deploy',
  location: 'Paris, France',
  available: 'September 2026',
  contact: {
    email: 'contact.shaikmusharraf@gmail.com',
    phone: '+33 780 74 2351',
    linkedin: 'LinkedIn',
  },
  education: [
    {
      year: '2025–27',
      institution: 'ESSEC Business School',
      degree: 'Masters in Management (MiM)',
      detail: 'Marketing & Digital Strategy · GMAT 735/800 (Top 5% Global) · Top 10 Global FT Ranking',
      location: 'Paris, FR',
    },
    {
      year: '2019–23',
      institution: 'Panimalar Institute of Technology',
      degree: 'B.Tech, Electronics & Communications Engineering',
      detail: 'CGPA 8.6/10 · First Class with Distinction · Engineering systems foundation',
      location: 'Chennai, IN',
    },
  ],
  stack: {
    'Data & Analytics': ['SQL', 'Python', 'Power BI', 'Tableau', 'Excel Adv.', 'GA4'],
    'CRM & Growth': ['LeadSquared', 'HubSpot', 'Salesforce (familiar)', 'Pipeline Velocity', 'Intent Filtering'],
    'Strategy & Modeling': ['4C / Porter / SWOT', 'Financial Modeling', 'Scenario Planning', 'Consumer Panel'],
    'Design & Tools': ['Figma', 'HTML / CSS', 'Notion', 'Keynote', 'PowerPoint Adv.'],
  },
  languages: ['English (Fluent)', 'French (A2, developing)', 'Hindi', 'Telugu', 'Tamil', 'Urdu', 'Arabic (Beginner)'],
};

export const timeline = [
  {
    id: 'now',
    period: 'NOW',
    year: '2026',
    title: 'Available — Sept 2026 Alternance',
    place: 'Paris, FR',
    role: 'B2B Marketing Strategy',
    type: 'milestone',
    bullets: [
      'Open to alternance / strategic marketing roles',
      'Specialization: B2B Growth, Brand, Trade Marketing',
    ],
  },
  {
    id: 'essec',
    period: '2025–27',
    year: '2026',
    title: 'ESSEC Business School',
    place: 'Paris, FR',
    role: 'MiM — Marketing & Digital Strategy',
    type: 'education',
    bullets: [
      'Three live consulting projects: Marselia, Bvlgari, Comtesse du Barry',
      'GMAT 735/800 — Top 5% Global',
      'Coursework: Marketing Analytics · Brand · Digital Transformation',
    ],
  },
  {
    id: 'crio',
    period: '2024–25',
    year: '2024',
    title: 'Crio.Do — Series A EdTech',
    place: 'Karnataka, IN',
    role: 'Business Development Associate',
    type: 'experience',
    bullets: [
      '₹4.2M direct B2B revenue · 20.3% of regional topline',
      'Built KPI dashboards on LeadSquared + HubSpot',
      'Conversion +12pp · Cycle −20.7% · 6-person team lead',
    ],
  },
  {
    id: 'knr',
    period: '2023–24',
    year: '2023',
    title: 'KNR Traders',
    place: 'Andhra Pradesh, IN',
    role: 'Client Manager · Operations Head',
    type: 'experience',
    bullets: [
      '70+ concurrent brand activations · 92% success rate',
      '11× business growth · 2× revenue expansion in 18 months',
      'Vendor governance · 25% cost savings · 100% billing automation',
    ],
  },
  {
    id: 'panimalar',
    period: '2019–23',
    year: '2019',
    title: 'Panimalar Institute of Technology',
    place: 'Chennai, IN',
    role: 'B.Tech ECE — 8.6/10',
    type: 'education',
    bullets: [
      'First Class with Distinction',
      'Founder · TITA Cultural Club (40 → 298 members across 12+ institutions)',
      'Founder · Educating Deserving Generation NGO — 150+ girls served',
    ],
  },
];
