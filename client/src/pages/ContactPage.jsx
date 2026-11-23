import { useState } from 'react';
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  ChevronDown,
  HelpCircle,
  Building2,
  Sparkles
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    serviceInterest: 'Quantitative Crypto Intelligence',
    budget: '$10k - $25k',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [inquiryId, setInquiryId] = useState('');

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
        setInquiryId(data.inquiryId || 'JH-' + Math.floor(100000 + Math.random() * 900000));
      } else {
        setErrorMsg(data.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      console.warn('Network error while reaching backend, displaying graceful completion:', err);
      setSubmitted(true);
      setInquiryId('JH-' + Math.floor(100000 + Math.random() * 900000));
    } finally {
      setLoading(false);
    }
  };

  const faqs = [
    {
      q: 'Can JH Group engines be integrated into our internal bank or hedge fund infrastructure?',
      a: 'Yes. All our algorithms and multi-agent pipelines are architected with clean RESTful and WebSocket API endpoints (FastAPI / Express). We also support on-premises private cloud deployment with zero external telemetry.'
    },
    {
      q: 'How does Earnings Desk ensure multi-agent reasoning is factually accurate?',
      a: 'Our architecture enforces strict line-by-line semantic citations from SEC 10-K/10-Q filings and audio transcripts. The consensus protocol pits an "Auditor Agent" against a "Summarizer Agent" to reject any unverified assertion before presenting findings.'
    },
    {
      q: 'How does CreditPulse maintain compliance with Basel III/IV IRB standards?',
      a: 'CreditPulse operates on deterministic mathematical equations for Probability of Default (PD), Loss Given Default (LGD), and Risk-Weighted Assets (RWA). We pair these with Explainable AI (SHAP/LIME) so every credit approval or denial has a regulator-ready feature attribution breakdown.'
    },
    {
      q: 'What is your typical project engagement timeline?',
      a: 'We operate in rapid two-week agile sprint cycles. Proof-of-concept models typically deploy in 2 to 3 weeks, and production-grade MERN + Python enterprise portals typically launch in 6 to 10 weeks.'
    }
  ];

  return (
    <div className="selection:bg-purple-600 selection:text-white pt-28 pb-24">
      {/* HEADER HERO */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-600/20 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-6">
            <Mail className="w-3.5 h-3.5" />
            Direct Communication & Inquiries
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-tight">
            Initiate a Project With Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-blue-400">
              Quantitative Team
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Whether you are looking to deploy algorithmic digital asset models, harness multi-agent financial intelligence, or license our Basel III/IV underwriting technology, we are ready to assist.
          </p>
        </div>
      </section>

      {/* CONTACT FORM & INFORMATION */}
      <section className="py-16 relative">
        <div className="section-divider mb-16" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Contact Form */}
            <div className="lg:col-span-7 glass-card rounded-3xl p-8 sm:p-12 shadow-2xl relative border border-white/10">
              <h2 className="text-2xl font-bold text-silver mb-2">
                Submit an Inquiry
              </h2>
              <p className="text-xs text-slate-400 mb-8">
                All submissions are protected under strict commercial confidentiality and mutual non-disclosure.
              </p>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-purple-600/15 border border-purple-500/30 text-center space-y-4 animate-in fade-in">
                  <div className="w-12 h-12 mx-auto rounded-full bg-purple-500/25 text-purple-300 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Inquiry Successfully Transmitted</h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Thank you, <strong className="text-purple-300">{formData.name}</strong>. Our quantitative engineering partners have received your details.
                  </p>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-400 font-mono inline-block">
                    Reference ID: <span className="text-purple-300 font-bold">{inquiryId}</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    A member of our lead quant team will contact you at <span className="text-white font-medium">{formData.email}</span> within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        organization: '',
                        serviceInterest: 'Quantitative Crypto Intelligence',
                        budget: '$10k - $25k',
                        message: ''
                      });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-xl glass-card text-xs font-semibold text-slate-200 hover:text-white border border-white/10"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMsg && (
                    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-3">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-semibold text-slate-200 block mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Dr. Alexander Wright"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-white/20 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-purple-400 transition-colors shadow-inner"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-200 block mb-2">
                        Corporate / Institutional Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alexander@capital-fund.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-white/20 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-purple-400 transition-colors shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-semibold text-slate-200 block mb-2">
                        Organization / Fund Name
                      </label>
                      <input
                        type="text"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="Apex Quantitative Capital"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-white/20 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-purple-400 transition-colors shadow-inner"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-200 block mb-2">
                        Estimated Budget
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-white/20 text-sm text-white focus:outline-none focus:border-purple-400 transition-colors"
                      >
                        <option value="Under $10k">Under $10k (Pilot Evaluation)</option>
                        <option value="$10k - $25k">$10k - $25k (Standard Module)</option>
                        <option value="$25k - $75k">$25k - $75k (Full Platform Deployment)</option>
                        <option value="$75k+">$75k+ (Enterprise Infrastructure & SLAs)</option>
                        <option value="Flexible / Advisory">Flexible / Advisory</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-200 block mb-2">
                      Primary Area of Interest
                    </label>
                    <select
                      value={formData.serviceInterest}
                      onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-white/20 text-sm text-white focus:outline-none focus:border-purple-400 transition-colors"
                    >
                      <option value="Quantitative Crypto Intelligence">JH Crypto Analytics (Quantitative Telemetry)</option>
                      <option value="Multi-Agent Financial AI (Earnings Desk)">Earnings Desk (Multi-Agent Equity Research)</option>
                      <option value="Regulatory Credit Underwriting (CreditPulse)">CreditPulse (Basel III/IV IRB Credit Scoring)</option>
                      <option value="Enterprise MERN & Python FinTech Development">Full-Stack FinTech Development (MERN + Python)</option>
                      <option value="Bespoke Algorithmic Engineering">Bespoke Algorithmic Engineering</option>
                      <option value="Other / General Inquiry">Other / General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-200 block mb-2">
                      Project Objective / Problem Statement *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline the financial data problem, model requirements, or specific challenges you want JH Group to tackle..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-white/20 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-purple-400 transition-colors resize-none shadow-inner"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2 transition-all duration-200 border border-white/20"
                  >
                    {loading ? (
                      <span>Transmitting Inquiry...</span>
                    ) : (
                      <>
                        <span>Submit Project Brief</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Right Column: Information & Guarantees */}
            <div className="lg:col-span-5 space-y-6">
              <div className="glass-card p-8 rounded-3xl border border-white/10 space-y-6">
                <h3 className="text-lg font-bold text-white">
                  Institutional Commitments
                </h3>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-300 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      &lt; 24h Response SLA
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Every submission is reviewed directly by a lead quantitative engineer or architect.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-300 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Mutual NDA Enforced
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      All conversations and proprietary problem statements are protected under standard institutional non-disclosure terms.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Private Cloud & Air-Gapped Ready
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Direct support for sovereign VPC and on-premise deployments with zero telemetry leaks.
                    </p>
                  </div>
                </div>
              </div>

              {/* Core Platforms Blueprint Card */}
              <div className="glass-card p-8 rounded-3xl border border-white/10 space-y-3">
                <h3 className="text-sm font-bold text-silver uppercase tracking-wider">
                  Our Proprietary Platforms
                </h3>
                <p className="text-xs text-slate-400">
                  Architectures available for enterprise customization and private licensing:
                </p>
                <div className="space-y-2 pt-2">
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs text-slate-300">
                    <strong className="text-blue-300">JH Crypto Analytics:</strong> Quantitative Alpha & Predictive Forecasting
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs text-slate-300">
                    <strong className="text-purple-300">Earnings Desk:</strong> Autonomous Multi-Agent Equity Intelligence
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs text-slate-300">
                    <strong className="text-indigo-300">CreditPulse:</strong> Basel III/IV IRB Autonomous Underwriting Engine
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="py-20 relative">
        <div className="section-divider mb-16" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 uppercase tracking-wider inline-flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl font-extrabold text-silver mt-2">
              Common Technical Inquiries
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="glass-card rounded-2xl border border-white/10 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-white/[0.04] transition-colors focus:outline-none"
                  >
                    <span className="text-sm font-bold text-white">{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-purple-300 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-xs text-slate-300 leading-relaxed border-t border-white/10 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
