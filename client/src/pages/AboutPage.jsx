import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Cpu,
  Lock,
  Zap,
  Code2,
  Database,
  Terminal,
  Activity,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  FileText,
  Workflow,
  Sparkles
} from 'lucide-react';
import { METHODOLOGY_STEPS, HOW_WE_DEAL_WITH_CLIENTS } from '../data/ecosystemData';

export default function AboutPage() {
  const techPillars = [
    {
      category: 'Frontend & Experience',
      items: ['React 19', 'Vite 8', 'Tailwind CSS v4', 'Three.js 3D WebGL', 'Responsive Glass Micro-UIs']
    },
    {
      category: 'Backend & Data Layer (MERN)',
      items: ['Node.js & Express', 'MongoDB & Mongoose', 'RESTful API Gateways', 'Resilient JSON Storage Fallback']
    },
    {
      category: 'Quantitative & AI Engine (Python)',
      items: ['Python 3.14 & FastAPI', 'Multi-Agent LLM Orchestration', 'Scikit-Learn & PyTorch', 'Vector RAG Pipelines']
    },
    {
      category: 'Financial & Regulatory Standards',
      items: ['Basel III / IV IRB Modeling', 'Explainable AI (SHAP & LIME)', 'SEC 10-K/10-Q Taxonomies', 'Statistical VaR Backtesting']
    }
  ];

  return (
    <div className="selection:bg-purple-600 selection:text-white pt-28 pb-24">
      {/* HEADER HERO */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-600/20 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            About JH Group
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-tight">
            Where Mathematical Precision Meets{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-blue-400">
              Autonomous Intelligence
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            JH Group is a technology and quantitative engineering firm that builds, deploys, and operates high-performance financial systems. We bridge the gap between abstract algorithmic research and mission-critical production platforms.
          </p>
        </div>
      </section>

      {/* OUR STORY & TRIAD OF COMPETENCIES */}
      <section className="py-20 relative">
        <div className="section-divider mb-16" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 uppercase tracking-wider">
                Our Genesis
              </span>
              <h2 className="text-3xl font-extrabold text-silver mt-2 tracking-tight">
                From Quantitative Research to a Tri-Platform Production Ecosystem
              </h2>
              <div className="mt-6 space-y-4 text-sm text-slate-200 leading-relaxed">
                <p>
                  JH Group originated from a straightforward observation: the financial services and fintech sectors were trapped between two extremes. On one side stood legacy systems that were slow, opaque, and manual; on the other stood ungrounded "black-box" AI systems that hallucinated and failed regulatory audits.
                </p>
                <p>
                  We set out to engineer a different standard: <strong className="text-white">Deterministic Quantitative Intelligence</strong>. By combining modern MERN stack web applications with specialized Python algorithmic microservices and multi-agent consensus networks, we built platforms that are simultaneously blazing fast, mathematically verifiable, and legally compliant.
                </p>
                <p>
                  Today, our firm proudly owns, powers, and maintains three live platforms: <strong className="text-blue-300">JH Crypto Analytics</strong> (high-frequency alpha telemetry), <strong className="text-purple-300">Earnings Desk</strong> (multi-agent corporate intelligence), and <strong className="text-indigo-300">CreditPulse</strong> (Basel III/IV IRB credit underwriting).
                </p>
              </div>
            </div>

            <div className="glass-card rounded-3xl p-8 border border-white/10 shadow-2xl relative">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Workflow className="w-5 h-5 text-purple-400" />
                The Triad of JH Group Competencies
              </h3>
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-blue-400 shrink-0 mt-1" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Quantitative Asset Intelligence</h4>
                    <p className="text-xs text-slate-200 mt-1">Real-time order book analysis, momentum extraction, and statistical signal filtering for volatile markets.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 flex items-start gap-3">
                  <FileText className="w-5 h-5 text-purple-400 shrink-0 mt-1" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Multi-Agent Cognitive Reasoning</h4>
                    <p className="text-xs text-slate-200 mt-1">Autonomous agent networks that read, debate, and verify complex corporate filings and earnings disclosures with zero hallucination.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0 mt-1" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Regulatory-Grade Risk Underwriting</h4>
                    <p className="text-xs text-slate-200 mt-1">Strict adherence to Basel III/IV IRB frameworks with Explainable AI attribution for instant credit approval.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE DEAL WITH CLIENTS */}
      <section className="py-20 relative">
        <div className="section-divider mb-16" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 uppercase tracking-wider">
              Partnership & Culture
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-silver mt-2">
              How We Deal With Clients & Institutional Projects
            </h2>
            <p className="text-sm text-slate-300 mt-4 leading-relaxed">
              We operate with uncompromising integrity. In quantitative engineering, false promises cost capital. Here is how we conduct every client engagement:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {HOW_WE_DEAL_WITH_CLIENTS.map((item, idx) => (
              <div
                key={idx}
                className="glass-card glass-card-hover p-8 rounded-3xl border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 mb-6">
                    {idx === 0 && <ShieldCheck className="w-6 h-6" />}
                    {idx === 1 && <Cpu className="w-6 h-6" />}
                    {idx === 2 && <Lock className="w-6 h-6" />}
                    {idx === 3 && <Zap className="w-6 h-6" />}
                  </div>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="text-sm text-slate-300 mt-3 leading-relaxed">{item.description}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-medium text-purple-300">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Guaranteed Institutional Standard</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE TACKLE PROBLEMS AND SOLVE THEM (5-STEP METHODOLOGY) */}
      <section className="py-24 relative">
        <div className="section-divider mb-16" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
              Engineering Rigor
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-silver mt-2">
              How We Tackle Problems & Solve Them
            </h2>
            <p className="text-sm text-slate-300 mt-4 leading-relaxed">
              Every complex problem we undertake follows our tested 5-stage deterministic methodology, ensuring predictable, auditable, and production-ready results.
            </p>
          </div>

          <div className="space-y-6">
            {METHODOLOGY_STEPS.map((m) => (
              <div
                key={m.step}
                className="glass-card glass-card-hover p-8 rounded-3xl border border-white/10"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex items-start gap-5">
                    <span className="text-3xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-br from-purple-400 via-indigo-300 to-blue-400 shrink-0">
                      {m.step}
                    </span>
                    <div>
                      <h3 className="text-xl font-bold text-white">{m.title}</h3>
                      <p className="text-xs font-semibold text-purple-300 mt-0.5">{m.subtitle}</p>
                      <p className="text-sm text-slate-300 mt-3 leading-relaxed max-w-3xl">
                        {m.description}
                      </p>
                    </div>
                  </div>

                  <div className="lg:w-80 shrink-0 p-4 rounded-2xl bg-black/40 border border-white/10">
                    <p className="text-[11px] font-bold text-silver uppercase tracking-wider mb-2">
                      Key Deliverables
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {m.deliverables.map((d, dIdx) => (
                        <li key={dIdx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK GRID */}
      <section className="py-20 relative">
        <div className="section-divider mb-16" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 uppercase tracking-wider">
              Architecture & Stack
            </span>
            <h2 className="text-3xl font-extrabold text-silver mt-2">
              Our Core Technology Stack
            </h2>
            <p className="text-sm text-slate-300 mt-3">
              Built on the high-productivity MERN stack with modern Python algorithmic microservices and 3D WebGL visualizations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techPillars.map((p, idx) => (
              <div key={idx} className="glass-card glass-card-hover p-6 rounded-3xl border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300 mb-4">
                    {idx === 0 && <Code2 className="w-5 h-5" />}
                    {idx === 1 && <Database className="w-5 h-5" />}
                    {idx === 2 && <Terminal className="w-5 h-5" />}
                    {idx === 3 && <Activity className="w-5 h-5" />}
                  </div>
                  <h4 className="text-sm font-bold text-white mb-4">{p.category}</h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {p.items.map((item, iIdx) => (
                      <li key={iIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-xl shadow-purple-600/30 inline-flex items-center gap-2 border border-white/20"
            >
              <span>Partner With JH Group Quants</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
