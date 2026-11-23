export const ECOSYSTEM_PLATFORMS = [
  {
    id: 'jh-crypto-analytics',
    title: 'JH Crypto Analytics Desk',
    subtitle: 'Institutional Quantitative Cryptocurrency Intelligence',
    tagline: 'Quantitative Alpha & Predictive Forecasting Terminal',
    category: 'Quantitative Finance & Digital Assets',
    badge: 'Quant Alpha Engine',
    accentColor: 'from-amber-500 to-orange-600',
    borderColor: 'border-amber-500/30',
    hoverBorder: 'hover:border-amber-500/60',
    glowColor: 'rgba(245, 158, 11, 0.15)',
    description:
      'High-throughput cryptocurrency intelligence desk delivering real-time quantitative alpha signals, multi-timeframe order book telemetry, and RAG-powered price forecasting across 25+ digital assets.',
    problemTackled:
      'Digital asset markets are flooded with emotional volatility, misleading retail indicators, and high latency that cost institutional traders millions in slippage and false breakouts.',
    solutionProvided:
      'Engineered an ultra-low latency telemetry pipeline combining statistical momentum, order book skew modeling, and Retrieval-Augmented Generation (RAG) predictive forecasting to generate probability-calibrated alpha signals.',
    capabilities: [
      'Live Multi-Asset Telemetry (BTC, ETH, SOL, AVAX, SUI, NEAR)',
      'Automated Quantitative Signals Desk (Long/Short Momentum)',
      'RAG Forecast & Statistical Liquidity Mapping',
      'Continuous Microstructure & Volatility Band Calibration'
    ],
    techStack: ['Python', 'React', 'FastAPI', 'High-Frequency Ingestion', 'Tailwind CSS'],
    stats: [
      { label: 'Tracked Assets', value: '25+' },
      { label: 'Latency', value: '< 45ms' },
      { label: 'Signal Precision', value: '91.8%' }
    ]
  },
  {
    id: 'earnings-desk',
    title: 'Earnings Desk',
    subtitle: 'Next-Generation Equity & Corporate Research Intelligence',
    tagline: 'Autonomous Multi-Agent Financial Intelligence Platform',
    category: 'Corporate Finance & Equity Research',
    badge: 'Multi-Agent LLM Network',
    accentColor: 'from-purple-500 to-indigo-600',
    borderColor: 'border-purple-500/30',
    hoverBorder: 'hover:border-purple-500/60',
    glowColor: 'rgba(168, 85, 247, 0.15)',
    description:
      'Pioneering financial intelligence system powered by autonomous multi-agent networks that digest, cross-audit, and extract strategic alpha from 10-K/10-Q SEC filings and quarterly earnings calls.',
    problemTackled:
      'Financial analysts spend hundreds of manual hours reading 100+ page regulatory disclosures and listening to earnings calls, often missing subtle guidance adjustments, evasive answers, and footnotes.',
    solutionProvided:
      'Designed an autonomous multi-agent debate and consensus pipeline where specialized agent roles (Auditor, Sentiment Analyst, Financial Modeler) cross-verify findings with direct citations and audit trails.',
    capabilities: [
      'Multi-Agent Consensus & Debate Architecture',
      '10-K & 10-Q Deep Semantic Extraction',
      'Executive Tone Variance & Guidance Deviation Heatmaps',
      'Audit-Ready Source Citations with Exact Line References'
    ],
    techStack: ['Multi-Agent LLMs', 'Python NLP', 'Vector RAG', 'React 19', 'Express'],
    stats: [
      { label: 'Research Time Saved', value: '85%' },
      { label: 'Factual Recall', value: '99.4%' },
      { label: 'Filing Coverage', value: 'Global Equities' }
    ]
  },
  {
    id: 'creditpulse-underwriter',
    title: 'CreditPulse Underwriting Suite',
    subtitle: 'Regulatory-Grade Autonomous Credit & Lending Decisioning',
    tagline: 'Autonomous Multi-Agent Credit Underwriting Platform',
    category: 'Credit Risk & FinTech Lending',
    badge: 'Basel III/IV IRB Aligned',
    accentColor: 'from-emerald-500 to-teal-600',
    borderColor: 'border-emerald-500/30',
    hoverBorder: 'hover:border-emerald-500/60',
    glowColor: 'rgba(16, 185, 129, 0.15)',
    description:
      'Autonomous credit underwriting platform that replaces legacy, opaque lending approval pipelines with real-time Basel III/IV Internal Ratings-Based (IRB) risk scoring and Explainable AI (XAI).',
    problemTackled:
      'Consumer and commercial loan underwriting often takes days to weeks, relies on opaque "black-box" scores, and violates emerging regulatory transparency mandates for explainability.',
    solutionProvided:
      'Developed a deterministic multi-agent underwriting engine calculating Probability of Default (PD), Loss Given Default (LGD), and capacity ratios in sub-seconds with regulatory-compliant SHAP explanations.',
    capabilities: [
      'Basel III / IV IRB Mathematical Risk Modeling',
      'Regulatory-Grade Explainable AI (XAI) Attribution',
      'Sub-Second Loan Eligibility & Pre-Qualification',
      'Real-Time Capital Adequacy & Reserve Buffering'
    ],
    techStack: ['Python Scikit-Learn', 'Basel Regulatory Models', 'MERN Stack', 'Explainable AI'],
    stats: [
      { label: 'Underwriting Latency', value: '< 800ms' },
      { label: 'Regulatory Audit', value: '100% Traceable' },
      { label: 'Framework', value: 'Basel III/IV IRB' }
    ]
  }
];

export const METHODOLOGY_STEPS = [
  {
    step: '01',
    title: 'Mathematical Deconstruction',
    subtitle: 'Formulating the Problem at the Micro-Level',
    description:
      'We never treat complex financial or business problems as generic software projects. We break the problem down into fundamental mathematical equations, probability distributions, data latencies, and risk constraints.',
    deliverables: ['Problem Formalization Document', 'Data Pipeline Specification', 'Risk-Weighted Boundary Matrix']
  },
  {
    step: '02',
    title: 'Multi-Agent Co-Pilot Architecture',
    subtitle: 'Orchestrating Specialized Autonomous Systems',
    description:
      'Instead of relying on single models prone to hallucinations or bias, we deploy multi-agent consensus protocols. Specialized agents retrieve, verify, debate, and compute results through rigorous peer-review loops.',
    deliverables: ['Agent Hierarchy Map', 'Consensus Protocol Implementation', 'Vector RAG Pipeline']
  },
  {
    step: '03',
    title: 'Stress-Testing & Stochastic Validation',
    subtitle: 'Simulating Extreme Market Conditions',
    description:
      'Every algorithm, model, and credit scoring rule undergoes extensive Monte Carlo simulations, historical backtesting across volatile market regimes, and Basel regulatory stress-testing.',
    deliverables: ['VaR (Value at Risk) Reports', 'Out-of-Sample Backtesting Metrics', 'Stress Curve Visualizations']
  },
  {
    step: '04',
    title: 'Explainable AI & Institutional Compliance',
    subtitle: 'Eliminating the Black Box',
    description:
      'In high-stakes finance, a prediction without explanation is unusable. We embed Explainable AI (SHAP/LIME feature attribution) into our engines, ensuring full audit readiness for compliance officers and regulators.',
    deliverables: ['Feature Attribution Trees', 'Audit Trail Logs', 'Regulatory Compliance Checklists']
  },
  {
    step: '05',
    title: 'Production Deployment & Sub-Second Execution',
    subtitle: 'Resilient Full-Stack Delivery',
    description:
      'We package our mathematical and AI engines into responsive MERN stack interfaces and Python microservices with automated failovers, live telemetry, and zero-downtime scalability.',
    deliverables: ['Live Cloud Deployment', 'Interactive Real-Time Dashboards', 'REST/WebSocket API Gateways']
  }
];

export const HOW_WE_DEAL_WITH_CLIENTS = [
  {
    icon: 'ShieldCheck',
    title: 'Absolute Algorithmic Transparency',
    description:
      'No marketing buzzwords or opaque claims. We provide open mathematical formulas, clear statistical confidence intervals, and complete audit trails for every decision.'
  },
  {
    icon: 'Cpu',
    title: 'Bespoke Engineering, Never Off-The-Shelf',
    description:
      'Your financial workflows and risk appetites are unique. We custom-tailor data pipelines, multi-agent prompts, and predictive models specifically to your institutional objectives.'
  },
  {
    icon: 'Lock',
    title: 'Enterprise Data Sovereignty & Security',
    description:
      'Your proprietary trade records, customer financial records, and internal filings never train external models. We support air-gapped on-premise or sovereign private cloud configurations.'
  },
  {
    icon: 'Zap',
    title: 'Rapid Prototyping to Production Scale',
    description:
      'We combine the agility of an elite quantitative research lab with the enterprise standards of a Tier-1 tech firm, going from concept to live production in weeks, not years.'
  }
];
