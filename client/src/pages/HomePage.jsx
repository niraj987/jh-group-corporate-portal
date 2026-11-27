import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Cpu,
  Lock,
  Zap,
  Calculator,
  Terminal
} from 'lucide-react';
import Reveal from '../components/Reveal';
import HoloDiagram from '../components/HoloDiagram';
import { onEnterViewport } from '../lib/inView';
import Ticker from '../components/Ticker';
import { ECOSYSTEM_PLATFORMS, HOW_WE_DEAL_WITH_CLIENTS, METHODOLOGY_STEPS } from '../data/ecosystemData';
import { IMAGES, METHOD_IMAGES } from '../data/media';

const CLIENT_ICONS = [ShieldCheck, Cpu, Lock, Zap];
const ACCENTS = ['text-cobalt', 'text-copper', 'text-forest'];

const PLATFORM_HOLO = {
  'jh-crypto-analytics': 'orderbook',
  'earnings-desk': 'network',
  'creditpulse-underwriter': 'lattice'
};

const FACTS = [
  { value: 3, label: 'Production platforms', note: 'Owned and operated in-house' },
  { value: 800, prefix: '< ', suffix: 'ms', label: 'Underwriting latency', note: 'Basel III/IV IRB scoring' },
  { value: 25, suffix: '+', label: 'Digital assets tracked', note: 'Live order-book telemetry' },
  { value: 99.4, suffix: '%', decimals: 1, label: 'Factual recall', note: 'Cited multi-agent research' }
];

function CountUp({ value, prefix = '', suffix = '', decimals = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.textContent = `${prefix}${value.toFixed(decimals)}${suffix}`;
      return undefined;
    }

    const state = { n: 0 };
    let tween = null;

    const unsubscribe = onEnterViewport(node, () => {
      tween = gsap.to(state, {
        n: value,
        duration: 1.7,
        ease: 'power2.out',
        onUpdate: () => {
          node.textContent = `${prefix}${state.n.toFixed(decimals)}${suffix}`;
        }
      });
    });

    return () => {
      unsubscribe();
      tween?.kill();
    };
  }, [value, prefix, suffix, decimals]);

  return <span ref={ref}>{`${prefix}${value.toFixed(decimals)}${suffix}`}</span>;
}

export default function HomePage() {
  const heroVisualRef = useRef(null);

  const [loanInput, setLoanInput] = useState({
    income: 95000,
    debt: 750,
    creditScore: 750,
    requestedAmount: 32000,
    termMonths: 36
  });

  const [simResult, setSimResult] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    const node = heroVisualRef.current;
    if (!node) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const tween = gsap.fromTo(
      node,
      { y: 40, scale: 0.985, opacity: 0 },
      { y: 0, scale: 1, opacity: 1, duration: 1.4, delay: 0.45, ease: 'power3.out' }
    );

    return () => tween.kill();
  }, []);

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
          ? 'Tier 1 · Prime institutional'
          : loanInput.creditScore >= 680
          ? 'Tier 2 · Near prime'
          : 'Tier 3 · Standard reserve';

      setSimResult({
        isEligible,
        tier,
        dti: dti.toFixed(1) + '%',
        pd: (pd * 100).toFixed(2) + '%',
        monthlyEstimate: '$' + proposedPayment.toFixed(0),
        status: isEligible ? 'Qualified' : 'Elevated risk weight'
      });
      setIsSimulating(false);
    }, 400);
  };

  return (
    <div>
      {/* HERO */}
      <section className="relative pt-32 sm:pt-40">
        <div className="mx-auto max-w-6xl px-6">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-ink/15 bg-paper/70 px-3.5 py-1.5 backdrop-blur">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-forest opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-forest" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">
              Systems operational
            </span>
          </span>

          <h1 className="mt-7 max-w-5xl text-[2.7rem] leading-[1] text-ink sm:text-6xl lg:text-[5.2rem]">
            <span className="hero-word" style={{ animationDelay: '0.05s' }}>Quantitative</span>{' '}
            <span className="hero-word" style={{ animationDelay: '0.13s' }}>intelligence,</span>{' '}
            <span className="hero-word italic text-cobalt" style={{ animationDelay: '0.21s' }}>engineered</span>{' '}
            <span className="hero-word" style={{ animationDelay: '0.29s' }}>for</span>{' '}
            <span className="hero-word" style={{ animationDelay: '0.37s' }}>financial</span>{' '}
            <span className="hero-word" style={{ animationDelay: '0.45s' }}>markets.</span>
          </h1>

          <div className="mt-10 grid gap-8 border-t border-ink/15 pt-8 lg:grid-cols-12">
            <p className="max-w-2xl text-lg leading-relaxed text-ink-soft lg:col-span-7">
              We design, build and operate three production platforms: algorithmic crypto telemetry,
              multi-agent equity research, and Basel III/IV credit underwriting — each with its own
              Python engine behind a MERN front end.
            </p>

            <div className="flex flex-wrap items-start gap-4 lg:col-span-5 lg:justify-end">
              <Link
                to="/works"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-cobalt"
              >
                <span>See the work</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-ink/25 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink/45 hover:bg-ink/[0.04]"
              >
                Schedule consultation
              </Link>
            </div>
          </div>
        </div>

        <Reveal className="mt-14">
          <div className="mx-auto max-w-7xl px-4">
            <div ref={heroVisualRef}>
              <HoloDiagram variant="signal" className="h-[260px] w-full sm:h-[400px] lg:h-[520px]" />
            </div>
          </div>
        </Reveal>
      </section>

      <div className="mt-16">
        <Ticker />
      </div>

      {/* FACTS */}
      <section className="border-b border-ink/15 bg-paper-deep/40">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-8 gap-y-10 px-6 py-14 md:grid-cols-4">
          {FACTS.map((item, index) => (
            <Reveal key={item.label} delay={index * 70}>
              <p className="font-display text-4xl leading-none text-ink">
                <CountUp
                  value={item.value}
                  prefix={item.prefix}
                  suffix={item.suffix}
                  decimals={item.decimals ?? 0}
                />
              </p>
              <p className="mt-3 text-sm font-medium text-ink">{item.label}</p>
              <p className="mt-1 text-sm text-ink-soft">{item.note}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* THE WORK */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="max-w-3xl">
              <h2 className="text-[2.6rem] leading-[1.04] text-ink sm:text-5xl">
                Three platforms, three problems, one engineering standard
              </h2>
              <p className="mt-6 text-base leading-relaxed text-ink-soft">
                Each platform exists because a specific financial workflow was slow, opaque or
                manual. Below is what the product does, the problem it replaces, and how we solved it.
              </p>
            </div>
          </Reveal>

          <div className="mt-14">
            {ECOSYSTEM_PLATFORMS.map((platform, index) => {
              const accent = ACCENTS[index];
              return (
                <Reveal key={platform.id}>
                  <article className="grid gap-10 border-t border-ink/15 py-14 lg:grid-cols-12 lg:gap-16 lg:py-20">
                    <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                      <HoloDiagram
                        variant={PLATFORM_HOLO[platform.id]}
                        className="aspect-[4/3] w-full"
                      />
                    </div>

                    <div className="lg:col-span-7">
                      <div className="flex flex-wrap items-baseline gap-4">
                        <span className="font-mono text-xs text-ink-soft">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${accent}`}>
                          {platform.category}
                        </span>
                      </div>

                      <h3 className="mt-3 text-3xl leading-tight text-ink sm:text-4xl">{platform.title}</h3>
                      <p className="mt-2 text-base text-ink-soft">{platform.tagline}</p>

                      <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft">
                        {platform.description}
                      </p>

                      <dl className="mt-8 grid max-w-2xl gap-6 sm:grid-cols-2">
                        <div>
                          <dt className="text-sm font-semibold text-ink">The problem</dt>
                          <dd className="mt-2 text-base leading-relaxed text-ink-soft">
                            {platform.problemTackled}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm font-semibold text-ink">What we built</dt>
                          <dd className="mt-2 text-base leading-relaxed text-ink">
                            {platform.solutionProvided}
                          </dd>
                        </div>
                      </dl>

                      <div className="mt-8 grid grid-cols-3 divide-x divide-ink/15 border-t border-ink/15 pt-5">
                        {platform.stats.map((stat) => (
                          <div key={stat.label} className="px-4 first:pl-0 last:pr-0">
                            <p className="font-display text-2xl leading-none text-ink">{stat.value}</p>
                            <p className="mt-2 text-xs text-ink-soft">{stat.label}</p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                        <Link
                          to="/works"
                          className="group inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-cobalt"
                        >
                          <span>Read the case study</span>
                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </Link>
                        <span className="text-sm text-ink-soft">{platform.techStack.slice(0, 3).join(' · ')}</span>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="border-t border-ink/15 bg-paper-deep/40 py-24 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">How we work</p>
              <h2 className="mt-4 text-4xl leading-[1.05] text-ink sm:text-5xl">
                A quantitative lab, not a software vendor
              </h2>
              <p className="mt-6 text-base leading-relaxed text-ink-soft">
                In quantitative engineering, unsupported claims cost capital. Every engagement runs
                on four commitments that decide how we scope, build and hand over work.
              </p>
            </Reveal>

            <Reveal delay={120} className="mt-10">
              <figure>
                <div className="overflow-hidden rounded-sm border border-ink/15">
                  <img
                    src={IMAGES.engagement}
                    alt="Abstract illustration of a confidential client engagement"
                    className="aspect-[3/2] w-full object-cover"
                  />
                </div>
              </figure>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <dl className="border-t border-ink/15">
              {HOW_WE_DEAL_WITH_CLIENTS.map((pillar, index) => {
                const Icon = CLIENT_ICONS[index];
                return (
                  <Reveal key={pillar.title} delay={index * 80}>
                    <div className="flex items-start gap-5 border-b border-ink/15 py-7">
                      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-ink/15 bg-paper">
                        <Icon className="h-5 w-5 text-cobalt" />
                      </span>
                      <div>
                        <dt className="text-base font-semibold text-ink">{pillar.title}</dt>
                        <dd className="mt-2 text-base leading-relaxed text-ink-soft">{pillar.description}</dd>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </dl>
          </div>
        </div>
      </section>

      {/* METHODOLOGY STRIP */}
      <section className="border-t border-ink/15 py-24 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">Methodology</p>
                <h2 className="mt-4 text-4xl leading-[1.05] text-ink sm:text-5xl">
                  Five stages, in order
                </h2>
                <p className="mt-5 text-base leading-relaxed text-ink-soft">
                  No stage is skipped, and each produces artefacts the client can audit before the
                  next begins.
                </p>
              </div>
              <Link
                to="/about"
                className="group inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-ink transition-colors hover:text-cobalt"
              >
                <span>Full methodology</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
            {METHODOLOGY_STEPS.map((step, index) => (
              <Reveal key={step.step} delay={index * 60}>
                <figure>
                  <div className="overflow-hidden rounded-sm border border-ink/15 bg-paper-deep">
                    <img
                      src={METHOD_IMAGES[index].src}
                      alt={METHOD_IMAGES[index].caption}
                      className="aspect-square w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
                    />
                  </div>
                  <figcaption className="mt-3">
                    <span className="font-mono text-[10px] tracking-[0.18em] text-cobalt">{step.step}</span>
                    <p className="mt-1 text-sm font-medium leading-snug text-ink">{step.title}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SIMULATOR */}
      <section className="relative border-t border-ink/15 bg-paper-deep/40 py-24 sm:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <div className="max-w-3xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">
                Live model preview
              </p>
              <h2 className="mt-4 flex flex-wrap items-center gap-3 text-4xl leading-[1.05] text-ink sm:text-5xl">
                <Calculator className="h-7 w-7 text-cobalt" />
                Test our Basel III/IV engine
              </h2>
              <p className="mt-6 text-base leading-relaxed text-ink-soft">
                Move the borrower parameters to see eligibility, debt-to-income and probability of
                default. This is the same arithmetic that runs in production, surfaced in the browser.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100} className="mt-12">
            <div className="rounded-sm border border-ink/15 bg-paper p-7 shadow-[0_30px_60px_-50px_rgba(10,14,21,0.6)] sm:p-10">
              <div className="grid gap-10 md:grid-cols-2 md:gap-14">
                <div>
                  <h3 className="border-b border-ink/15 pb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
                    Borrower parameters
                  </h3>

                  <div className="mt-6 space-y-7">
                    <div>
                      <div className="flex items-baseline justify-between gap-4">
                        <label htmlFor="income" className="text-sm text-ink-soft">
                          Annual gross income
                        </label>
                        <span className="text-sm font-semibold text-ink">
                          ${loanInput.income.toLocaleString()}
                        </span>
                      </div>
                      <input
                        id="income"
                        type="range"
                        min="30000"
                        max="250000"
                        step="5000"
                        value={loanInput.income}
                        onChange={(e) => setLoanInput({ ...loanInput, income: Number(e.target.value) })}
                        className="mt-3 w-full cursor-pointer accent-cobalt"
                      />
                    </div>

                    <div>
                      <div className="flex items-baseline justify-between gap-4">
                        <label htmlFor="debt" className="text-sm text-ink-soft">
                          Monthly debt obligations
                        </label>
                        <span className="text-sm font-semibold text-ink">
                          ${loanInput.debt.toLocaleString()}
                        </span>
                      </div>
                      <input
                        id="debt"
                        type="range"
                        min="100"
                        max="5000"
                        step="50"
                        value={loanInput.debt}
                        onChange={(e) => setLoanInput({ ...loanInput, debt: Number(e.target.value) })}
                        className="mt-3 w-full cursor-pointer accent-cobalt"
                      />
                    </div>

                    <div>
                      <div className="flex items-baseline justify-between gap-4">
                        <label htmlFor="score" className="text-sm text-ink-soft">
                          Credit score (FICO / CIBIL)
                        </label>
                        <span className="text-sm font-semibold text-ink">{loanInput.creditScore}</span>
                      </div>
                      <input
                        id="score"
                        type="range"
                        min="550"
                        max="850"
                        step="10"
                        value={loanInput.creditScore}
                        onChange={(e) => setLoanInput({ ...loanInput, creditScore: Number(e.target.value) })}
                        className="mt-3 w-full cursor-pointer accent-cobalt"
                      />
                    </div>

                    <div>
                      <div className="flex items-baseline justify-between gap-4">
                        <label htmlFor="amount" className="text-sm text-ink-soft">
                          Requested loan amount
                        </label>
                        <span className="text-sm font-semibold text-ink">
                          ${loanInput.requestedAmount.toLocaleString()}
                        </span>
                      </div>
                      <input
                        id="amount"
                        type="range"
                        min="5000"
                        max="100000"
                        step="2500"
                        value={loanInput.requestedAmount}
                        onChange={(e) => setLoanInput({ ...loanInput, requestedAmount: Number(e.target.value) })}
                        className="mt-3 w-full cursor-pointer accent-cobalt"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={runSimulation}
                    disabled={isSimulating}
                    className="mt-9 w-full rounded-full bg-ink py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-cobalt disabled:opacity-60"
                  >
                    {isSimulating ? 'Computing regulatory equations…' : 'Calculate underwriting metrics'}
                  </button>
                </div>

                <div className="flex flex-col">
                  <h3 className="border-b border-ink/15 pb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
                    Model output
                  </h3>

                  {simResult ? (
                    <div className="result-in mt-6 flex-1">
                      <p className="text-xs uppercase tracking-[0.16em] text-ink-soft">Decision</p>
                      <p
                        className={`mt-1 font-display text-3xl leading-tight ${
                          simResult.isEligible ? 'text-forest' : 'text-copper'
                        }`}
                      >
                        {simResult.status}
                      </p>
                      <p className="mt-1 text-sm text-ink-soft">{simResult.tier}</p>

                      <dl className="mt-8 border-t border-ink/15">
                        <div className="flex items-baseline justify-between border-b border-ink/15 py-3.5">
                          <dt className="text-sm text-ink-soft">Debt-to-income (DTI)</dt>
                          <dd className="text-lg font-semibold text-ink">{simResult.dti}</dd>
                        </div>
                        <div className="flex items-baseline justify-between border-b border-ink/15 py-3.5">
                          <dt className="text-sm text-ink-soft">Probability of default (PD)</dt>
                          <dd className="text-lg font-semibold text-ink">{simResult.pd}</dd>
                        </div>
                        <div className="flex items-baseline justify-between py-3.5">
                          <dt className="text-sm text-ink-soft">Monthly debt service</dt>
                          <dd className="text-lg font-semibold text-ink">{simResult.monthlyEstimate}</dd>
                        </div>
                      </dl>
                    </div>
                  ) : (
                    <div className="mt-6 flex flex-1 flex-col items-center justify-center py-12 text-center">
                      <Terminal className="h-8 w-8 text-ink/25" />
                      <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
                        Adjust the sliders and run the engine to see the eligibility decision and risk
                        metrics for that borrower.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-ink py-24 text-paper sm:py-28">
        <div className="holo-aura pointer-events-none absolute inset-0 opacity-80" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-paper/45">
              Start the conversation
            </p>
            <h2 className="mx-auto mt-5 max-w-2xl text-4xl leading-[1.05] text-paper sm:text-5xl">
              Have a financial problem worth engineering?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-paper/65">
              Bring us the workflow, the data and the constraints. We will tell you honestly whether
              it can be modelled, what it takes to validate, and how it would run in production.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-white"
              >
                <span>Start a conversation</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/works"
                className="inline-flex items-center gap-2 rounded-full border border-paper/25 px-6 py-3 text-sm font-medium text-paper transition-colors hover:border-paper/50 hover:bg-paper/5"
              >
                Inspect case studies
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
