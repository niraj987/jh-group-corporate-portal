import { Link } from 'react-router-dom';
import {
  Code2,
  Cpu,
  ShieldCheck,
  TrendingUp,
  FileText
} from 'lucide-react';
import { ECOSYSTEM_PLATFORMS } from '../data/ecosystemData';

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/10 glass-nav text-slate-400 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info (All 3 platforms operational box removed per request) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/15 flex items-center justify-center p-1 overflow-hidden">
                <img
                  src="/logo.png"
                  alt="JH Group"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-white">
                  JH <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">GROUP</span>
                </span>
                <p className="text-xs text-slate-400">Quantitative Intelligence & FinTech</p>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Architecting institutional quantitative platforms, autonomous multi-agent equity intelligence, and regulatory-grade Basel III/IV credit underwriting software.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-silver uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-purple-300 transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/works" className="hover:text-purple-300 transition-colors">
                  Our Works & Solutions
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-purple-300 transition-colors">
                  About & Methodology
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-purple-300 transition-colors">
                  Contact & Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Core Platforms */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-silver uppercase tracking-wider">
              Core Platforms
            </h4>
            <ul className="space-y-2.5 text-sm">
              {ECOSYSTEM_PLATFORMS.map((platform) => (
                <li key={platform.id}>
                  <Link
                    to="/works"
                    className="text-slate-300 hover:text-purple-300 transition-colors"
                  >
                    {platform.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack & Standards */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-silver uppercase tracking-wider">
              Core Architecture
            </h4>
            <div className="flex flex-wrap gap-1.5 text-xs">
              <span className="px-2.5 py-1 rounded-lg glass-card text-slate-200">
                MERN Stack
              </span>
              <span className="px-2.5 py-1 rounded-lg glass-card text-slate-200">
                Python 3.14
              </span>
              <span className="px-2.5 py-1 rounded-lg glass-card text-slate-200">
                Three.js WebGL
              </span>
              <span className="px-2.5 py-1 rounded-lg glass-card text-slate-200">
                Multi-Agent LLMs
              </span>
              <span className="px-2.5 py-1 rounded-lg glass-card text-slate-200">
                Basel III/IV IRB
              </span>
              <span className="px-2.5 py-1 rounded-lg glass-card text-slate-200">
                Explainable AI
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Deterministic, bank-grade risk models paired with ultra-low latency modern web stacks.
            </p>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} JH Group. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Corporate Governance</span>
            <span>Risk Disclosures</span>
            <span>Security & Data Sovereignty</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
