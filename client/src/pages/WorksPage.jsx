import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  FileText,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  Terminal,
  Activity,
  BarChart3,
  Code2,
  Workflow,
  Cpu
} from 'lucide-react';
import { ECOSYSTEM_PLATFORMS } from '../data/ecosystemData';

export default function WorksPage() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredPlatforms =
    activeTab === 'all'
      ? ECOSYSTEM_PLATFORMS
      : ECOSYSTEM_PLATFORMS.filter((p) => p.id === activeTab);

  return (
    <div className="selection:bg-purple-600 selection:text-white pt-28 pb-24">
      {/* HEADER HERO */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-600/20 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Our Works & Production Case Studies
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-tight">
            Flagship Platforms That Define Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-blue-400">
              Technical Excellence
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Discover the three production platforms architected and operated by JH Group. Each platform solves a high-impact financial problem through algorithmic precision, modern MERN architecture, and specialized Python engines.
          </p>

          {/* Frosted Glass Filter Tabs */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 border ${
                activeTab === 'all'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-600/30 border-white/20'
                  : 'glass-card text-slate-300 hover:text-white border-white/10'
              }`}
            >
              All Flagship Platforms (3)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('jh-crypto-analytics')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-2 border ${
                activeTab === 'jh-crypto-analytics'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/30 border-white/20'
                  : 'glass-card text-slate-300 hover:text-white border-white/10'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 text-blue-300" />
              <span>JH Crypto Analytics</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('earnings-desk')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-2 border ${
                activeTab === 'earnings-desk'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30 border-white/20'
                  : 'glass-card text-slate-300 hover:text-white border-white/10'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-purple-300" />
              <span>Earnings Desk</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('creditpulse-underwriter')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-2 border ${
                activeTab === 'creditpulse-underwriter'
                  ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-600/30 border-white/20'
                  : 'glass-card text-slate-300 hover:text-white border-white/10'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-300" />
              <span>CreditPulse Underwriter</span>
            </button>
          </div>
        </div>
      </section>

      {/* PLATFORMS DEEP DIVE SECTION (External links removed from boxes per request) */}
      <section className="py-12">
        <div className="section-divider mb-16" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {filteredPlatforms.map((platform, index) => (
            <div
              key={platform.id}
              className="glass-card rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden border border-white/10"
            >
              {/* Background ambient lighting */}
              <div
                className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-25"
                style={{
                  backgroundColor:
                    platform.id === 'jh-crypto-analytics'
                      ? '#3b82f6'
                      : platform.id === 'earnings-desk'
                      ? '#a855f7'
                      : '#6366f1'
                }}
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                {/* Left Column: Description & Problem/Solution */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3.5 py-1 rounded-lg bg-white/[0.08] text-purple-300 text-xs font-bold uppercase tracking-wider border border-white/10">
                      {platform.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                      Active Production Architecture
                    </span>
                  </div>

                  <div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-silver tracking-tight">
                      {platform.title}
                    </h2>
                    <p className="text-sm font-semibold text-purple-300 mt-1">
                      {platform.tagline}
                    </p>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {platform.description}
                  </p>

                  {/* Problem & Solution Breakdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-2xl bg-black/40 border border-blue-500/20">
                      <span className="text-xs font-bold text-blue-300 uppercase tracking-wider block mb-1.5">
                        Problem Tackled
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {platform.problemTackled}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-black/40 border border-purple-500/20">
                      <span className="text-xs font-bold text-purple-300 uppercase tracking-wider block mb-1.5">
                        How We Solved It
                      </span>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        {platform.solutionProvided}
                      </p>
                    </div>
                  </div>

                  {/* Key Technical Features */}
                  <div>
                    <h4 className="text-xs font-bold text-silver uppercase tracking-wider mb-3">
                      Architectural Highlights
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {platform.capabilities.map((cap, cIdx) => (
                        <div key={cIdx} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Internal Inquiry Action */}
                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <Link
                      to="/contact"
                      className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-lg shadow-purple-600/30 flex items-center gap-2 transition-all duration-200 border border-white/20"
                    >
                      <span>Inquire About Custom Deployment</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <span className="text-xs text-slate-400 font-mono">
                      Institutional Grade • Air-Gapped Ready
                    </span>
                  </div>
                </div>

                {/* Right Column: Performance Telemetry & Stack */}
                <div className="lg:col-span-5 glass-card rounded-2xl p-6 flex flex-col justify-between space-y-6 border border-white/10">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <span className="text-xs font-bold text-silver uppercase tracking-wider">
                        Performance Telemetry
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-purple-300">
                        Verified Benchmark
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3 my-6">
                      {platform.stats.map((st, sIdx) => (
                        <div key={sIdx} className="p-3 rounded-xl bg-black/40 border border-white/5 text-center">
                          <p className="text-lg font-black text-white">{st.value}</p>
                          <p className="text-[10px] text-slate-400 uppercase mt-0.5">{st.label}</p>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3">
                      <p className="text-xs font-bold text-silver uppercase tracking-wider">
                        Technology Stack
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {platform.techStack.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 rounded-lg bg-black/30 border border-white/10 text-xs text-purple-300 font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-black/30 border border-white/10 text-xs text-slate-400">
                    <p className="font-semibold text-slate-200 mb-1">Production Infrastructure</p>
                    <p>Hosted on high-availability edge networks with automatic SSL verification, CORS protection, and microservice proxying.</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CUSTOM PLATFORM CALL TO ACTION */}
      <section className="py-20">
        <div className="section-divider mb-16" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-card rounded-3xl p-10 sm:p-14 border border-white/15">
            <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 uppercase tracking-wider">
              Custom Engineering
            </span>
            <h2 className="text-3xl font-extrabold text-silver mt-2">
              Need a Proprietary Platform Built to This Standard?
            </h2>
            <p className="text-sm text-slate-300 mt-4 max-w-2xl mx-auto leading-relaxed">
              We adapt our tested algorithmic engines, multi-agent frameworks, and MERN stack scaffolding to create bespoke platforms for hedge funds, lenders, and fintech enterprises.
            </p>

            <div className="mt-8">
              <Link
                to="/contact"
                className="px-8 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-xl shadow-purple-600/30 inline-flex items-center gap-2 border border-white/20"
              >
                <span>Discuss Your Platform Vision</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
