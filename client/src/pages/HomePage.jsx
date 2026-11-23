import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  TrendingUp,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Zap,
  Lock,
  ChevronRight,
  Terminal,
  Calculator,
  Sparkles,
  Layers
} from 'lucide-react';
import { ECOSYSTEM_PLATFORMS, HOW_WE_DEAL_WITH_CLIENTS, METHODOLOGY_STEPS } from '../data/ecosystemData';

export default function HomePage() {
  // State for interactive underwriting sandbox
  const [loanInput, setLoanInput] = useState({
    income: 95000,
    debt: 750,
    creditScore: 750,
    requestedAmount: 32000,
    termMonths: 36
  });

  const [simResult, setSimResult] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const runSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      const monthlyIncome = loanInput.income / 12;
      const proposedPayment = (loanInput.requestedAmount / loanInput.termMonths) * 1.065;
      const totalDebt = loanInput.debt + proposedPayment;
      const dti = (totalDebt / monthlyIncome) * 100;

      let pd = 0.045;
      if (loanInput.creditScore >= 750) pd = 0.012;
      else if (loanInput.creditScore >= 700) pd = 0.026;
      else if (loanInput.creditScore >= 640) pd = 0.068;
      else pd = 0.14;

      if (dti > 45) pd *= 1.6;

      const isEligible = loanInput.creditScore >= 630 && dti <= 48;
      const tier =
        loanInput.creditScore >= 750
          ? 'Tier 1 • Prime Institutional'
          : loanInput.creditScore >= 680
          ? 'Tier 2 • Near Prime'
          : 'Tier 3 • Standard Reserve';

      setSimResult({
        isEligible,
        tier,
        dti: dti.toFixed(1) + '%',
        pd: (pd * 100).toFixed(2) + '%',
        monthlyEstimate: '$' + proposedPayment.toFixed(0),
        status: isEligible ? 'QUALIFIED (Basel III IRB Compliant)' : 'ELEVATED RISK WEIGHT'
      });
      setIsSimulating(false);
    }, 400);
  };

  return (
    <div className="selection:bg-purple-600 selection:text-white">
      {/* HERO SECTION */}
      <section className="relative pt-36 pb-24 sm:pt-44 sm:pb-32 overflow-hidden">
        {/* Ambient Atmospheric Radial Gradients */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] bg-gradient-to-tr from-purple-600/25 via-indigo-600/20 to-blue-600/15 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[350px] bg-gradient-to-bl from-blue-600/20 via-indigo-600/15 to-purple-600/20 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Main Headline with Silver & Purple/Blue Color Grading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-5xl mx-auto leading-[1.12]">
            Engineering the Future of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-blue-400 drop-shadow-sm">
              Quantitative Intelligence
            </span>{' '}
            & Multi-Agent FinTech
          </h1>

          {/* Subtitle */}
          <p className="mt-8 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            JH Group develops high-performance algorithmic intelligence, institutional cryptocurrency telemetry, autonomous multi-agent equity research, and Basel III/IV compliant automated underwriting engines.
          </p>

          {/* Call to Actions */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/works"
              className="px-8 py-3.5 rounded-xl font-bold text-sm tracking-wide bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-[1.02] transition-all duration-200 flex items-center gap-2 border border-white/20"
            >
              <span>Explore Our Ecosystem</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/contact"
              className="px-7 py-3.5 rounded-xl font-semibold text-sm tracking-wide glass-card hover:border-purple-400/40 text-slate-200 transition-all duration-200 flex items-center gap-2"
            >
              <span>Schedule Consultation</span>
            </Link>
          </div>

          {/* Frosted Glass Live Micro Ticker */}
          <div className="mt-16 max-w-4xl mx-auto glass-card rounded-2xl p-5 shadow-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-white/10 text-left">
              <div className="pt-2 md:pt-0 md:px-4">
                <p className="text-[11px] font-semibold text-silver uppercase tracking-wider">
                  Live Crypto Signals
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-sm font-bold text-blue-400">BTC/USD +1.8%</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-300 border border-blue-500/30">
                    Buy Alpha
                  </span>
                </div>
              </div>
              <div className="pt-2 md:pt-0 md:px-4">
                <p className="text-[11px] font-semibold text-silver uppercase tracking-wider">
                  Earnings Desk Recall
                </p>
                <p className="text-sm font-bold text-purple-300 mt-1">99.4% Factual Accuracy</p>
              </div>
              <div className="pt-2 md:pt-0 md:px-4">
                <p className="text-[11px] font-semibold text-silver uppercase tracking-wider">
                  Underwriting Speed
                </p>
                <p className="text-sm font-bold text-indigo-300 mt-1">&lt; 800ms Sub-Second</p>
              </div>
              <div className="pt-2 md:pt-0 md:px-4">
                <p className="text-[11px] font-semibold text-silver uppercase tracking-wider">
                  Regulatory Grade
                </p>
                <p className="text-sm font-bold text-slate-200 mt-1">Basel III / IV IRB</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THREE FLAGSHIP PLATFORMS SHOWCASE (External URLs removed from cards) */}
      <section className="py-24 relative">
        <div className="section-divider mb-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 uppercase tracking-wider">
              Flagship Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-silver mt-2 tracking-tight">
              Our Core Production Platforms
            </h2>
            <p className="text-base text-slate-300 mt-4 leading-relaxed">
              JH Group builds and operates specialized architectures solving critical challenges across cryptocurrency markets, corporate earnings intelligence, and automated credit risk underwriting.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {ECOSYSTEM_PLATFORMS.map((platform) => (
              <div
                key={platform.id}
                className="glass-card glass-card-hover rounded-2xl p-7 flex flex-col justify-between shadow-xl relative overflow-hidden"
              >
                {/* Accent Top Rim */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${platform.accentColor}`}
                />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-white/[0.06] text-purple-300 border border-white/10">
                      {platform.badge}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                      Proprietary Platform
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                    {platform.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-400 mt-1 mb-4">
                    {platform.subtitle}
                  </p>

                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {platform.description}
                  </p>

                  {/* Problem & Solution Snippet */}
                  <div className="space-y-3 mb-6 p-4 rounded-xl bg-black/30 border border-white/10 text-xs">
                    <div>
                      <span className="font-bold text-blue-300">Problem: </span>
                      <span className="text-slate-300">{platform.problemTackled}</span>
                    </div>
                    <div>
                      <span className="font-bold text-purple-300">Solution: </span>
                      <span className="text-slate-200">{platform.solutionProvided}</span>
                    </div>
                  </div>

                  {/* Capabilities Checklist */}
                  <div className="space-y-2 mb-6">
                    {platform.capabilities.slice(0, 3).map((cap, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="grid grid-cols-3 gap-2 mb-5 text-center">
                    {platform.stats.map((s, idx) => (
                      <div key={idx} className="p-2 rounded-xl bg-black/25 border border-white/5">
                        <p className="text-xs font-bold text-white">{s.value}</p>
                        <p className="text-[10px] text-slate-400 uppercase mt-0.5">{s.label}</p>
                      </div>
                    ))}
                  </div>

                  <Link
                    to="/works"
                    className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-white glass-card hover:bg-purple-600/40 transition-all duration-200 flex items-center justify-center gap-2 border border-white/10"
                  >
                    <span>View Technical Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/works"
              className="inline-flex items-center gap-2 text-sm font-semibold text-purple-300 hover:text-purple-200 group"
            >
              <span>Explore deep architecture & case studies across all three platforms</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* HOW WE DEAL WITH CLIENTS & HOW WE TACKLE PROBLEMS */}
      <section className="py-24 relative overflow-hidden">
        <div className="section-divider mb-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column: How We Deal With Clients */}
            <div>
              <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 uppercase tracking-wider">
                Our Operating Philosophy
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-silver mt-2 tracking-tight">
                How We Deal With Clients & Projects
              </h2>
              <p className="text-base text-slate-300 mt-4 leading-relaxed">
                At JH Group, we do not operate as an ordinary software agency. We partner as a specialized quantitative laboratory and engineering team, upholding strict standards of algorithmic honesty and security.
              </p>

              <div className="mt-8 space-y-4">
                {HOW_WE_DEAL_WITH_CLIENTS.map((pillar, idx) => (
                  <div key={idx} className="glass-card glass-card-hover flex items-start gap-4 p-4 rounded-2xl">
                    <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center shrink-0 text-purple-300">
                      {idx === 0 && <ShieldCheck className="w-5 h-5" />}
                      {idx === 1 && <Cpu className="w-5 h-5" />}
                      {idx === 2 && <Lock className="w-5 h-5" />}
                      {idx === 3 && <Zap className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{pillar.title}</h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">{pillar.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: How We Tackle Problems & Solve Them */}
            <div className="glass-card p-8 sm:p-10 rounded-3xl shadow-2xl relative border border-white/10">
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                Methodology
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">
                How We Tackle Problems & Solve Them
              </h3>
              <p className="text-xs text-slate-400 mt-2">
                Our 5-stage deterministic engineering process turns high-uncertainty financial problems into reliable automated platforms.
              </p>

              <div className="mt-8 space-y-5">
                {METHODOLOGY_STEPS.slice(0, 4).map((step) => (
                  <div key={step.step} className="flex items-start gap-4">
                    <span className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 font-mono shrink-0">
                      {step.step}
                    </span>
                    <div>
                      <h5 className="text-sm font-bold text-white">{step.title}</h5>
                      <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-300 hover:text-purple-200"
                >
                  <span>Read our complete scientific methodology</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FROSTED GLASS INTERACTIVE RISK SIMULATOR */}
      <section className="py-24 relative">
        <div className="section-divider mb-20" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 uppercase tracking-wider inline-flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5 text-purple-400" />
              Interactive Model Preview
            </span>
            <h2 className="text-3xl font-extrabold text-silver mt-2">
              Test Our Basel III/IV Risk Underwriting Engine
            </h2>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl mx-auto">
              Simulate loan eligibility and probability of default in real time. This interactive demo showcases the mathematical engine powering CreditPulse.
            </p>
          </div>

          <div className="glass-card rounded-3xl shadow-2xl p-6 sm:p-10 border border-white/15">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Inputs */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-silver uppercase tracking-wider border-b border-white/10 pb-2">
                  Borrower Parameters
                </h4>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">
                    Annual Gross Income ($): <span className="text-purple-300 font-bold">${loanInput.income.toLocaleString()}</span>
                  </label>
                  <input
                    type="range"
                    min="30000"
                    max="250000"
                    step="5000"
                    value={loanInput.income}
                    onChange={(e) => setLoanInput({ ...loanInput, income: Number(e.target.value) })}
                    className="w-full accent-purple-500 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">
                    Monthly Debt Obligations ($): <span className="text-purple-300 font-bold">${loanInput.debt.toLocaleString()}</span>
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="5000"
                    step="50"
                    value={loanInput.debt}
                    onChange={(e) => setLoanInput({ ...loanInput, debt: Number(e.target.value) })}
                    className="w-full accent-purple-500 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">
                    Credit Score (FICO/CIBIL): <span className="text-purple-300 font-bold">{loanInput.creditScore}</span>
                  </label>
                  <input
                    type="range"
                    min="550"
                    max="850"
                    step="10"
                    value={loanInput.creditScore}
                    onChange={(e) => setLoanInput({ ...loanInput, creditScore: Number(e.target.value) })}
                    className="w-full accent-purple-500 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">
                    Requested Loan Amount ($): <span className="text-purple-300 font-bold">${loanInput.requestedAmount.toLocaleString()}</span>
                  </label>
                  <input
                    type="range"
                    min="5000"
                    max="100000"
                    step="2500"
                    value={loanInput.requestedAmount}
                    onChange={(e) => setLoanInput({ ...loanInput, requestedAmount: Number(e.target.value) })}
                    className="w-full accent-purple-500 cursor-pointer"
                  />
                </div>

                <button
                  type="button"
                  onClick={runSimulation}
                  disabled={isSimulating}
                  className="w-full mt-4 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-purple-600/30 border border-white/20"
                >
                  {isSimulating ? 'Computing Regulatory Equations...' : 'Calculate Underwriting Metrics'}
                </button>
              </div>

              {/* Output Display */}
              <div className="glass-card rounded-2xl p-6 flex flex-col justify-between border border-white/10">
                <div>
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
                    <span className="text-xs font-bold text-silver uppercase tracking-wider">
                      Model Output
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-purple-300 font-mono">
                      IRB Python Model
                    </span>
                  </div>

                  {simResult ? (
                    <div className="space-y-4">
                      <div className="p-3.5 rounded-xl bg-black/40 border border-white/10">
                        <p className="text-xs text-slate-400">Decision Status</p>
                        <p className={`text-base font-extrabold mt-0.5 ${simResult.isEligible ? 'text-blue-300' : 'text-rose-400'}`}>
                          {simResult.status}
                        </p>
                        <p className="text-xs text-slate-300 mt-1 font-medium">{simResult.tier}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-xl bg-black/30 border border-white/10">
                          <p className="text-slate-400 text-[11px]">Debt-to-Income (DTI)</p>
                          <p className="text-base font-bold text-purple-300 mt-1">{simResult.dti}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-black/30 border border-white/10">
                          <p className="text-slate-400 text-[11px]">Default Probability (PD)</p>
                          <p className="text-base font-bold text-blue-300 mt-1">{simResult.pd}</p>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-black/30 border border-white/10">
                        <p className="text-slate-400 text-[11px]">Estimated Monthly Debt Service</p>
                        <p className="text-lg font-bold text-white mt-1">{simResult.monthlyEstimate}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="h-48 flex flex-col items-center justify-center text-center text-slate-400">
                      <Terminal className="w-8 h-8 mb-2 opacity-40 text-purple-300" />
                      <p className="text-xs">Adjust the sliders and click "Calculate Underwriting Metrics" to trigger the quantitative risk engine.</p>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-white/10 mt-4 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Standard: Basel III / IV IRB</span>
                  <span className="text-purple-300 font-semibold">Sub-800ms Latency</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION BANNER */}
      <section className="py-24 relative overflow-hidden">
        <div className="section-divider mb-20" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-3xl p-10 sm:p-14 text-center shadow-2xl relative border border-white/15">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/20 p-2 overflow-hidden shadow-lg shadow-purple-500/20">
              <img src="/logo.png" alt="JH Group Logo" className="w-full h-full object-contain" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to Architect High-Performance FinTech Infrastructure?
            </h2>
            <p className="text-base text-slate-300 mt-4 max-w-2xl mx-auto">
              Whether you need automated multi-agent research tools, quantitative digital asset telemetry, or bank-grade risk modeling, our team delivers production-ready systems.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="px-8 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-lg shadow-purple-600/30 transition-all duration-200 border border-white/20"
              >
                Initiate Project Consultation
              </Link>
              <Link
                to="/works"
                className="px-7 py-3.5 rounded-xl font-semibold text-sm glass-card hover:bg-white/[0.08] text-slate-200 border border-white/10 transition-colors"
              >
                Inspect Technical Case Studies
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
