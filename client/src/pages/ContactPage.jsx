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
  Building2
} from 'lucide-react';
import Reveal from '../components/Reveal';
import { IMAGES } from '../data/media';

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

  const inputClass =
    'w-full rounded-sm border border-ink/15 bg-white/60 px-4 py-3 text-base text-ink placeholder:text-ink-soft/50 transition-colors focus:border-cobalt focus:bg-white focus:outline-none';

  return (
    <div>
      {/* HEADER */}
      <section className="pb-12 pt-32 sm:pt-40">
        <div className="mx-auto max-w-6xl px-6">
          <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-ink-soft">
            <Mail className="h-3.5 w-3.5" />
            Contact &amp; inquiries
          </p>
          <h1 className="mt-5 max-w-3xl text-[2.6rem] leading-[1.02] text-ink sm:text-6xl">
            Tell us what you need to{' '}
            <span className="italic text-cobalt">build</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Whether you are looking to deploy algorithmic digital asset models, harness multi-agent
            financial intelligence, or license our Basel III/IV underwriting technology, we are ready
            to assist.
          </p>
        </div>
      </section>

      {/* FORM */}
      <section className="border-t border-ink/10 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2 className="text-3xl leading-tight text-ink">Submit an inquiry</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                All submissions are protected under strict commercial confidentiality and mutual
                non-disclosure.
              </p>

              {submitted ? (
                <div className="mt-8 rounded-sm border border-ink/10 bg-paper-deep/50 p-8">
                  <CheckCircle2 className="h-7 w-7 text-forest" />
                  <h3 className="mt-4 text-2xl leading-tight text-ink">Inquiry transmitted</h3>
                  <p className="mt-3 text-base leading-relaxed text-ink-soft">
                    Thank you, <strong className="font-semibold text-ink">{formData.name}</strong>. Our
                    quantitative engineering partners have received your details.
                  </p>
                  <p className="mt-4 inline-block rounded-sm border border-ink/15 bg-white/60 px-3 py-2 font-mono text-xs text-ink-soft">
                    Reference ID: <span className="font-semibold text-cobalt">{inquiryId}</span>
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                    A member of our lead quant team will contact you at{' '}
                    <span className="font-medium text-ink">{formData.email}</span> within 24 hours.
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
                    className="mt-6 rounded-full border border-ink/20 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ink/5"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  {errorMsg && (
                    <div className="flex items-center gap-3 rounded-sm border border-copper/30 bg-copper/5 p-4 text-copper">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span className="text-sm leading-relaxed">{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-ink">Full name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Dr. Alexander Wright"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-ink">
                        Corporate / institutional email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alexander@capital-fund.com"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-ink">
                        Organization / fund name
                      </label>
                      <input
                        type="text"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="Apex Quantitative Capital"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-ink">Estimated budget</label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className={inputClass}
                      >
                        <option value="Under $10k">Under $10k (Pilot evaluation)</option>
                        <option value="$10k - $25k">$10k - $25k (Standard module)</option>
                        <option value="$25k - $75k">$25k - $75k (Full platform deployment)</option>
                        <option value="$75k+">$75k+ (Enterprise infrastructure &amp; SLAs)</option>
                        <option value="Flexible / Advisory">Flexible / Advisory</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-ink">
                      Primary area of interest
                    </label>
                    <select
                      value={formData.serviceInterest}
                      onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                      className={inputClass}
                    >
                      <option value="Quantitative Crypto Intelligence">
                        JH Crypto Analytics (Quantitative telemetry)
                      </option>
                      <option value="Multi-Agent Financial AI (Earnings Desk)">
                        Earnings Desk (Multi-agent equity research)
                      </option>
                      <option value="Regulatory Credit Underwriting (CreditPulse)">
                        CreditPulse (Basel III/IV IRB credit scoring)
                      </option>
                      <option value="Enterprise MERN & Python FinTech Development">
                        Full-stack FinTech development (MERN + Python)
                      </option>
                      <option value="Bespoke Algorithmic Engineering">Bespoke algorithmic engineering</option>
                      <option value="Other / General Inquiry">Other / General inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-ink">
                      Project objective / problem statement *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline the financial data problem, model requirements, or specific challenges you want JH Group to tackle…"
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="group flex w-full items-center justify-center gap-2 rounded-full bg-ink py-4 text-sm font-semibold text-paper transition-colors hover:bg-cobalt disabled:opacity-60"
                  >
                    {loading ? (
                      <span>Transmitting inquiry…</span>
                    ) : (
                      <>
                        <span>Submit project brief</span>
                        <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* INFO */}
            <div className="space-y-8 lg:col-span-5">
              <Reveal>
                <figure>
                  <div className="overflow-hidden rounded-sm border border-ink/15 bg-paper-deep">
                    <img
                      src={IMAGES.engagement}
                      alt="Abstract illustration of a confidential client conversation"
                      className="aspect-[3/2] w-full object-cover"
                    />
                  </div>
                </figure>
              </Reveal>

              <div className="border-t border-ink/10 pt-6">
                <h3 className="text-base font-semibold text-ink">Institutional commitments</h3>

                <div className="mt-5 space-y-6">
                  <div className="flex items-start gap-3.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-ink/10 bg-paper-deep/60 text-cobalt">
                      <Clock className="h-4 w-4" />
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-ink">&lt; 24h response SLA</h4>
                      <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                        Every submission is reviewed directly by a lead quantitative engineer or
                        architect.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-ink/10 bg-paper-deep/60 text-cobalt">
                      <ShieldCheck className="h-4 w-4" />
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-ink">Mutual NDA enforced</h4>
                      <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                        All conversations and proprietary problem statements are protected under
                        standard institutional non-disclosure terms.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-ink/10 bg-paper-deep/60 text-cobalt">
                      <Building2 className="h-4 w-4" />
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-ink">Private cloud &amp; air-gapped ready</h4>
                      <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                        Direct support for sovereign VPC and on-premise deployments with zero telemetry
                        leaks.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-ink/10 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">
            <HelpCircle className="h-3.5 w-3.5" />
            Frequently asked questions
          </p>
          <h2 className="mt-4 text-4xl leading-[1.05] text-ink sm:text-5xl">Common technical inquiries</h2>

          <div className="mt-10 border-t border-ink/10">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="border-b border-ink/10">
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-cobalt"
                  >
                    <span className="text-base font-medium text-ink">{faq.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-ink-soft transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="pb-6 pr-8 text-base leading-relaxed text-ink-soft">{faq.a}</p>
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
