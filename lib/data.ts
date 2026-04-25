// ============================================================
// DIAGNOSTIC DATA LAYER · v2
// Source-of-truth: master resume + 3 deployed strategy platforms
//   · marselia-strategy.netlify.app (NordAir vertical integration)
//   · bulgari-corpoarchitettura.netlify.app (Corpo Architettura)
//   · comtesse-du-barry-stratergy.netlify.app (Trade Marketing)
// All numbers reconciled against Shaik_Master_.pdf.
// ============================================================

export type Vital = {
  label: string;
  value: string;
  delta?: string;
  trend?: 'up' | 'down' | 'flat';
};

export type CaseFile = {
  domain: 'ACQUISITION' | 'CONVERSION' | 'RETENTION' | 'PRICING';
  symptom: string;
  caseNumber: string;
  slug: string;
  patient: string;
  patientMeta: string;
  category: 'GROWTH' | 'STRATEGY' | 'BRAND' | 'OPERATIONS';

  presenting: string;
  intervention: string;
  outcome: string;
  duration: string;

  vitals: Vital[];

  build: string;
  measure: string;
  analyze: string;
  deploy: string;

  fullSummary: string;
  artifacts: string[];
  stack: string[];

  // Optional: link to the deployed strategy platform
  externalUrl?: string;
};

export const cases: CaseFile[] = [
  // ============================================================
  // 001 · CRIO.DO — B2B revenue engine (Conversion)
  // ============================================================
  {
    domain: 'CONVERSION',
    symptom: 'Your B2B pipeline is leaking conversion across 124+ active accounts.',
    caseNumber: '001',
    slug: 'crio-revenue-engine',
    patient: 'Crio.Do',
    patientMeta: 'India · 2024–2025 · EdTech (Series A)',
    category: 'GROWTH',

    presenting:
      'A Series A EdTech B2B pipeline was leaking conversion across 124+ active commercial accounts. Inconsistent activation outreach combined with no monitoring infrastructure left a 20.7% cycle inefficiency invisible to regional leadership. Sales cycle was running 11.6 days; pitch-to-conversion was below team baseline.',
    intervention:
      'Independently redesigned pitch sequencing across the funnel and briefed the cross-functional team on the revised workflow. Built an analytical tracking framework from zero — surfacing root-cause cycle inefficiencies. Stood up weekly KPI dashboards for regional leadership during a 3-month interim lead tenure managing a 6-person team.',
    outcome:
      'Conversion rate lifted to 28.6% — +12pp above team average. Sales cycle compressed from 11.6 to 9.2 days (35.4% pitch-to-conversion improvement). ₹4.2M in direct B2B revenue delivered in 6 months — 20.3% of regional topline. New-associate ramp-up cut by 18%, output consistency up 22%, 100% SLA compliance.',
    duration: '6 MONTHS',

    vitals: [
      { label: 'CONVERSION LIFT', value: '+12pp', delta: 'team avg → 28.6%', trend: 'up' },
      { label: 'REVENUE GENERATED', value: '₹4.2M', delta: '20.3% of regional topline', trend: 'up' },
      { label: 'SALES CYCLE', value: '9.2 days', delta: 'from 11.6 days', trend: 'down' },
    ],

    build:
      'Redesigned pitch sequencing across 124+ active accounts. Analytical tracking framework from zero. Weekly KPI dashboards. Structured onboarding curriculum for 5+ new associates.',
    measure:
      'Conversion rate, sales-cycle days, pitch-to-conversion ratio, regional revenue contribution, SLA compliance, new-hire ramp-up time.',
    analyze:
      'Identified a 20.7% cycle inefficiency invisible to leadership. Diagnosed pipeline root causes via systematic competitive analysis. Tracked performance trends across 3 regional clusters.',
    deploy:
      'Briefed regional leadership weekly during 3-month interim lead tenure. Onboarded 5+ associates with structured training. Achieved 100% SLA compliance during ownership window.',

    fullSummary:
      'A diagnostic-first revenue engineering engagement. The bottleneck wasn\'t demand — it was the absence of an instrumentation layer. Build the dashboard, surface the inefficiency, fix the workflow, brief the team, deliver the revenue.',
    artifacts: [
      'KPI Tracking Framework (Sheets)',
      'Revised Pitch Sequencing Playbook',
      'Weekly Regional Leadership Dashboard',
      'New-Associate Onboarding Curriculum',
    ],
    stack: ['Sheets', 'CRM', 'Pipeline Analytics', 'Internal Dashboards'],
  },

  // ============================================================
  // 002 · MARSELIA — Air cargo vertical integration (Pricing)
  // ============================================================
  {
    domain: 'PRICING',
    symptom: 'You are surrendering 38–42% of gross cargo margin to ACMI counterparties.',
    caseNumber: '002',
    slug: 'marselia-vertical-integration',
    patient: 'Marselia Group · Air Cargo Division',
    patientMeta: 'EU · April 2026 · M&A Strategy · ESSEC consulting',
    category: 'STRATEGY',

    presenting:
      'Marselia\'s air cargo division was structurally surrendering 38–42% of gross cargo margin to ACMI counterparties — €8.86M in annual value destruction. Each block hour cost €1,480 under ACMI versus €890 under owned operations. €14.2M in pharmaceutical contracts up for renewal Q3 2026 now require owned-aircraft SLA guarantees that ACMI cannot deliver.',
    intervention:
      'Screened 14 acquisition candidates across 5 strategic criteria. Modeled four strategic options through a multi-criteria weighted matrix. Recommended NordAir Cargo Solutions (Copenhagen, 4× B737-800F, fit score 89/100, EV €34–43M) under a Hybrid Ownership model. Built the proprietary 4C Synergy Framework (Combination · Connection · Customisation · Consolidation) generating €14.05M annual value at full run-rate.',
    outcome:
      '€14.05M projected annual synergy at run-rate. 33.7-month acquisition payback (Base Case) — well within 36-month IC threshold. €8.4M Y3 EBITDA (Base) at 29% margin. DSCR clears 1.25× covenant floor by Month 12, reaches 3.4× by Year 4. Hybrid model returns positive across Bear/Base/Bull scenarios.',
    duration: '42 MONTHS',

    vitals: [
      { label: 'ANNUAL SYNERGY', value: '€14.05M', delta: '4C Framework run-rate', trend: 'up' },
      { label: 'ACQUISITION PAYBACK', value: '33.7 mo', delta: 'IC threshold: 36 mo', trend: 'down' },
      { label: 'Y3 EBITDA · BASE', value: '€8.4M', delta: '29% margin', trend: 'up' },
    ],

    build:
      'Multi-criteria evaluation matrix across 14 acquisition candidates on 5 strategic criteria. 4C Synergy Framework. 4-phase 42-month implementation programme with embedded IC go/no-go gates. €68.2M total programme CapEx structure.',
    measure:
      'EBITDA accretion across Bear/Base/Bull. DSCR vs 1.25× covenant. Block-hour unit cost. Crew internalisation savings. ACMI dependency ratio. Pharma contract retention rate.',
    analyze:
      'Identified €590/block hour cost delta (€1,480 ACMI vs €890 owned) compounding to €8.86M annual leakage at 15,000 block hours. Hybrid Option 3 scored 409/500 against Status Quo (278), Partial (307), and Full Fleet (280).',
    deploy:
      'Recommendation: enter LOI on NordAir within 30 days. Bid ceiling €44M EV. €12M equity + €26.5M acquisition debt + €28.8M aircraft lease finance. Window: 9 months wide before valuation re-rates.',

    fullSummary:
      'A vertical-integration M&A engagement built on a margin-archaeology insight: where the value is being surrendered, and to whom. The 4C Framework reframed the acquisition from "cost reduction" to "structural value capture" — making the IC case unambiguous across all three macro scenarios.',
    artifacts: [
      'Multi-Criteria Strategic Options Matrix',
      '4C Synergy Framework Model',
      'Three-Scenario P&L (Bear / Base / Bull)',
      'NordAir Valuation Football Field',
      '42-Month Phased Implementation Programme',
      'Risk Register & Mitigation Architecture',
    ],
    stack: ['Excel', 'PowerPoint', 'Capital IQ', 'Industry filings'],
    externalUrl: 'https://marselia-strategy.netlify.app/',
  },

  // ============================================================
  // 003 · BVLGARI — Corpo Architettura launch (Acquisition)
  // ============================================================
  {
    domain: 'ACQUISITION',
    symptom: 'A $52.6B luxury jewelry market has no maison occupying the body-architecture position.',
    caseNumber: '003',
    slug: 'bvlgari-corpo-architettura',
    patient: 'Bvlgari · Corpo Architettura',
    patientMeta: 'LVMH · March 2026 · Luxury Brand Launch · ESSEC consulting',
    category: 'BRAND',

    presenting:
      'A $52.6B luxury jewelry market with 8.1% CAGR — and no major maison occupying the architectural body-jewelry positioning. Tiffany\'s Peretti runs $470M/yr, Messika built $360M from zero, Schiaparelli proved viral demand with no fine-jewelry distribution. Bvlgari already owned Tubogas, Viper Links, Roman heritage, 390 boutiques — but no occupation of the category. Richemont\'s jewelry division was outgrowing LVMH W&J by €4.8B.',
    intervention:
      'Designed an 8 hero SKU collection across 4 price tiers ($5K–$100K+) referencing specific anatomical structures (Vertebra Collar, Clavicle Arc, Costa Chain, Scapula Brooch, Metacarpal Cage, Sternum Line, Radius Cuff, Phalange Set). Segmented Bvlgari\'s 2.4M global CRM into 5 customer archetypes with LTV:CAC ranging from 23.2× to 74.2×. Built a 3-wave 18-month rollout across 100+ boutiques in 40 countries. Modelled €25M total investment with three-method valuation triangulation.',
    outcome:
      '$1.17B Base-Case 5Y revenue projection at 19.5× ROI on €25M investment. Y5 operating margin ~45%. Bear $785M (13.7×) / Base $1.17B (19.5×) / Bull $1.58B (26.4×). Month 16 breakeven (Base). Blended GM 72.3% across the 8 hero SKUs.',
    duration: '18 MONTHS',

    vitals: [
      { label: '5Y REVENUE · BASE', value: '$1.17B', delta: 'Bear $785M / Bull $1.58B', trend: 'up' },
      { label: 'ROI ON €25M', value: '19.5×', delta: 'Base case · 5Y', trend: 'up' },
      { label: 'BLENDED GM', value: '72.3%', delta: '8 hero SKUs', trend: 'up' },
    ],

    build:
      '8 hero SKUs across 4 price tiers. 5 customer archetypes from 2.4M CRM segmentation. Corpo Studio retrofit programme (10 flagships @ €150K). 3-wave 18-month launch. Patent filing programme: EU + US + China.',
    measure:
      'Boutique sell-through, AOV by archetype, LTV:CAC by segment, earned-media equivalent value, scarcity-tier waitlist depth, Y3 operating margin, Cartier competitive response probability.',
    analyze:
      '"Body Architecture Jewelry" had zero search volume — uncontested category language. Cartier scored highest competitive threat at Month 6 (~70%) but Bvlgari\'s moat reaches 80% via filed patents and Corpo Studio infrastructure. Asymmetric upside: even worst-case 3-risk scenario returns 8.2×.',
    deploy:
      'Wave 0 (M3–4): VIP private preview. Wave 1 (M5–7): Tubogas launch. Wave 2 (M8–12): gender-fluid + Gyllenhaal campaign. Wave 3 (M13–18): High Jewelry — Vertebra Collar & Costa Chain. Zendaya red-carpet activation pre-loaded.',

    fullSummary:
      'A brand consulting engagement that started as positioning and became a category-creation thesis. The data argument was the one that closed it: not "Bvlgari should build body jewelry" but "this category will exist within 24 months — Bvlgari either defines it or follows it."',
    artifacts: [
      'Corpo Architettura White Paper',
      '8 Hero SKU Architecture',
      '5-Archetype Segmentation Model',
      'Three-Scenario Financial Build',
      'Competitive Moat Architecture',
      'Risk Register × 10 Primary Risks',
    ],
    stack: ['Figma', 'Excel', 'Bvlgari CRM (analysis)', 'Bain · McKinsey · Euromonitor'],
    externalUrl: 'https://bulgari-corpoarchitettura.netlify.app/',
  },

  // ============================================================
  // 004 · KNR TRADERS — Operational systems (Retention)
  // ============================================================
  {
    domain: 'RETENTION',
    symptom: 'Your operations are not the bottleneck. Your routing is.',
    caseNumber: '004',
    slug: 'knr-operational-grid',
    patient: 'KNR Traders',
    patientMeta: 'India · 2023–2024 · Events & Brand Activations',
    category: 'OPERATIONS',

    presenting:
      'A regional events operations business was running 70+ flagship brand activations simultaneously across multiple geographic zones. Logistics, staffing agencies, and vendor partners were fragmenting under competing deadlines. Vendor performance failures across catering, logistics, and equipment partners were eroding client confidence. Underperforming formats by segment were invisible to leadership.',
    intervention:
      'Implemented a rotational staffing model across 8 functional zones. Negotiated cost controls with vendors and briefed client stakeholders on corrective action recommendations. Designed an incentive coordination plan tied to KPI performance trends across 70+ activations. Automated 100% of billing and end-to-end project monitoring for ₹2M+ in concurrent brand-driven workstreams.',
    outcome:
      '92% event success rate across 70+ activations. 50% retail operations efficiency gain. 25% vendor cost savings. 2× revenue expansion in 18 months. 30% repeat-client growth. 40% new-client acquisition. 11× overall business growth over the operating period. 45% client experience score improvement.',
    duration: '18 MONTHS',

    vitals: [
      { label: 'BUSINESS GROWTH', value: '11×', delta: '18-month operating period', trend: 'up' },
      { label: 'EVENT SUCCESS RATE', value: '92%', delta: '70+ activations', trend: 'up' },
      { label: 'VENDOR COST SAVINGS', value: '25%', delta: 'negotiated controls', trend: 'down' },
    ],

    build:
      '8-zone rotational staffing model. End-to-end project monitoring across concurrent workstreams. Vendor cost-control protocols. Incentive coordination plan. 100% billing automation.',
    measure:
      'Event success rate, repeat-client growth, new-client acquisition, vendor cost variance, client experience score, retail operations efficiency.',
    analyze:
      'Performance trends surfaced underperforming formats by segment and geographic region. Vendor performance failures clustered in catering, logistics, and equipment under concurrent deadlines.',
    deploy:
      'Rotational staffing rolled across all event types. Vendor renegotiations across catering, logistics, equipment partners. Billing automation deployed across 100% of accounts.',

    fullSummary:
      'An operational design problem disguised as a service-quality problem. The output looked premium once the workflow felt premium. The 8-zone routing replaced ad-hoc handoffs — efficiency followed structure.',
    artifacts: [
      '8-Zone Activation Grid',
      'Vendor Cost Control Protocol',
      'Incentive Coordination Plan',
      'Billing Automation System',
    ],
    stack: ['Sheets', 'Custom CRM', 'WhatsApp Business', 'Vendor Portals'],
  },

  // ============================================================
  // 005 · COMTESSE DU BARRY — 360 Trade Marketing (Conversion)
  // ============================================================
  {
    domain: 'CONVERSION',
    symptom: '45% of revenue lands in December alone. Your model cannot fund itself the rest of the year.',
    caseNumber: '005',
    slug: 'comtesse-trade-marketing',
    patient: 'Comtesse du Barry',
    patientMeta: 'France · 2026 · Trade Marketing · ESSEC consulting',
    category: 'BRAND',

    presenting:
      'A 117-year-old French gourmet maison (€16.2M revenue, owned by Maïsadour) at structural inflection: chronic negative EBITDA, 45% revenue concentration in December, average customer age 61, 450-SKU portfolio bloat. The brand had high awareness but collapsing desirability among 25–40 cohort. Fixed costs (41 POS, logistics, admin) could not be covered by the 11 non-Christmas months.',
    intervention:
      'Conducted quantitative & qualitative research across 150K active customers and 41 POS. Designed three moment-driven ranges (L\'Apéro Maison · Le Moment Pour Moi · Le Cadeau Bien Pensé) targeting Creative Socialisers and Independent Epicureans. Rationalised SKU portfolio from 450 → 250. Built 24-month roadmap across 4 phases with go/no-go KPI gates.',
    outcome:
      '€23M Y3 revenue target (Base Case · +42% on current). €3M EBITDA positive by Year 3 (from negative today). Christmas dependency reduced 45% → 30% by Year 2. SKU productivity +20%. €1.63M total CapEx — 4× ROI by Month 24. DTC revenue share scales 12% → 25%.',
    duration: '24 MONTHS',

    vitals: [
      { label: 'Y3 REVENUE TARGET', value: '€23M', delta: 'from €16.2M · +42%', trend: 'up' },
      { label: 'Y3 EBITDA', value: '€3M', delta: 'from negative', trend: 'up' },
      { label: 'CAPEX ROI · M24', value: '4×', delta: '€1.63M deployed', trend: 'up' },
    ],

    build:
      'Three moment-driven ranges. SKU rationalisation 450→250. Behavioural CRM segmentation (festive / everyday / solo). Corpo Studio digital activation. 4-phase 24-month roadmap with embedded go/no-go gates.',
    measure:
      'Christmas dependency ratio, SKU revenue contribution, millennial desirability score, DTC revenue share, EBITDA trajectory, basket size, KPI radar across 6 dimensions.',
    analyze:
      'High awareness, low desirability gap collapses in 25–40 cohort. Foie gras + pâtés = 45% of revenue at 60% GM — unambiguous core to amplify. SKU bloat created €1.2M in operational complexity recoverable by rationalisation.',
    deploy:
      'Phase 1 (M0–6): SKU audit + visual identity refresh. Phase 2 (M6–12): three ranges + DTC rebuild + 15 influencer partnerships. Phase 3 (M12–18): seasonal collections + B2B corporate gifting. Phase 4 (M18–24): subscription model scale.',

    fullSummary:
      'A trade marketing engagement where the bottleneck wasn\'t consumer demand — it was retailer motivation, calendar concentration, and SKU bloat. Reframing the portfolio around moments (not products) unlocked year-round occasions without inventing new categories.',
    artifacts: [
      '24-Month Phased Roadmap',
      'SKU Rationalisation Map (450→250)',
      'Three Moment-Driven Ranges Brief',
      '5-Pillar KPI Governance Framework',
      'Risk Register × 5 Material Risks',
    ],
    stack: ['PowerPoint', 'Excel', 'Figma', 'Nielsen-style consumer panels'],
    externalUrl: 'https://comtesse-du-barry-stratergy.netlify.app/',
  },
];

export const profile = {
  name: 'Musharraf Shaik',
  role: 'B2B Marketing Strategist',
  location: 'Paris, France',
  available: 'September 2026',
  email: 'contact.shaikmusharraf@gmail.com',
  phone: '+33 780 74 2351',
  domains: [
    { id: 'ACQUISITION', label: 'Acquisition' },
    { id: 'CONVERSION', label: 'Conversion' },
    { id: 'RETENTION', label: 'Retention' },
    { id: 'PRICING', label: 'Pricing' },
  ] as const,
};
