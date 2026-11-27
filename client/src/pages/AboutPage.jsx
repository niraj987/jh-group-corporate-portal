import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Cpu,
  Lock,
  Zap,
  TrendingUp,
  FileText,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import Reveal from '../components/Reveal';
import HoloDiagram from '../components/HoloDiagram';
import { METHODOLOGY_STEPS, HOW_WE_DEAL_WITH_CLIENTS } from '../data/ecosystemData';
import { IMAGES, METHOD_IMAGES } from '../data/media';

const CLIENT_ICONS = [ShieldCheck, Cpu, Lock, Zap];

export default function AboutPage() {
  return (
    <div>
      {/* HEADER */}
      <section className="pb-12 pt-32 sm:pt-40">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="max-w-4xl text-[2.6rem] leading-[1.02] text-ink sm:text-6xl">
            A quantitative engineering firm, run like a research lab
          </h1>

          <div className="mt-12 grid gap-10 border-t border-ink/15 pt-10 lg:grid-cols-12 lg:gap-16">
            <p className="text-lg leading-relaxed text-ink-soft lg:col-span-6">
              We build, deploy and operate high-performance financial systems — bridging algorithmic
              research and the production platforms institutions actually use. Three platforms are
              live today, all engineered, owned and maintained in-house.
            </p>
            <figure className="lg:col-span-6">
              <div className="overflow-hidden rounded-sm border border-ink/15 bg-paper-deep">
                <img
                  src={IMAGES.studio}
                  alt="A quantitative research desk with printed chart studies"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* STORY + COMPETENCIES */}
      <section className="border-t border-ink/15 py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">Our story</p>
            <h2 className="mt-4 text-4xl leading-[1.05] text-ink sm:text-5xl">
              From quantitative research to three production platforms
            </h2>

            <div className="mt-7 space-y-5 text-base leading-relaxed text-ink-soft">
              <p>
                JH Group started from a simple observation: financial services were trapped between two
                extremes. On one side, legacy systems that were slow, opaque and manual. On the other,
                ungrounded black-box AI that hallucinated and failed audits.
              </p>
              <p>
                We set out to build a different standard —{' '}
                <strong className="font-semibold text-ink">deterministic quantitative intelligence</strong>.
                Modern MERN front ends, specialised Python microservices and multi-agent consensus
                networks, combined so the result is fast, mathematically verifiable and defensible to a
                regulator.
              </p>
              <p>
                Today we own and maintain three live platforms:{' '}
                <strong className="font-semibold text-cobalt">JH Crypto Analytics</strong> for alpha
                telemetry, <strong className="font-semibold text-copper">Earnings Desk</strong> for
                multi-agent equity research, and{' '}
                <strong className="font-semibold text-forest">CreditPulse</strong> for Basel III/IV
                credit underwriting.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-sm border border-ink/15 bg-paper-deep/50 p-7">
              <h3 className="text-base font-semibold text-ink">Our three competencies</h3>
              <dl className="mt-5 border-t border-ink/15">
                {[
                  {
                    Icon: TrendingUp,
                    title: 'Quantitative asset intelligence',
                    body: 'Real-time order-book analysis, momentum extraction and statistical signal filtering for volatile markets.'
                  },
                  {
                    Icon: FileText,
                    title: 'Multi-agent cognitive reasoning',
                    body: 'Agent networks that read, debate and verify complex filings and earnings disclosures with citations.'
                  },
                  {
                    Icon: ShieldCheck,
                    title: 'Regulatory-grade risk underwriting',
                    body: 'Basel III/IV IRB frameworks with explainable attribution for instant, auditable credit decisions.'
                  }
                ].map((item) => (
                  <div key={item.title} className="border-b border-ink/15 py-5 last:border-b-0 last:pb-0">
                    <dt className="flex items-center gap-2.5 text-sm font-semibold text-ink">
                      <item.Icon className="h-4 w-4 text-cobalt" />
                      {item.title}
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-ink-soft">{item.body}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* COMMITMENTS */}
      <section className="border-t border-ink/15 bg-paper-deep/40 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="max-w-3xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">
                How we deal with clients
              </p>
              <h2 className="mt-4 text-4xl leading-[1.05] text-ink sm:text-5xl">
                Four commitments behind every engagement
              </h2>
              <p className="mt-6 text-base leading-relaxed text-ink-soft">
                In quantitative engineering, unsupported claims cost capital. These are the terms we
                hold ourselves to, regardless of project size.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-x-14 gap-y-10 sm:grid-cols-2">
            {HOW_WE_DEAL_WITH_CLIENTS.map((item, index) => {
              const Icon = CLIENT_ICONS[index];
              return (
                <Reveal key={item.title} delay={index * 80}>
                  <div className="border-t border-ink/20 pt-6">
                    <span className="flex h-10 w-10 items-center justify-center rounded-md border border-ink/15 bg-paper">
                      <Icon className="h-5 w-5 text-cobalt" />
                    </span>
                    <h3 className="mt-5 text-base font-semibold text-ink">{item.title}</h3>
                    <p className="mt-2 text-base leading-relaxed text-ink-soft">{item.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* METHODOLOGY */}
      <section className="border-t border-ink/15 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="max-w-3xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">Methodology</p>
              <h2 className="mt-4 text-4xl leading-[1.05] text-ink sm:text-5xl">
                How we tackle problems and solve them
              </h2>
              <p className="mt-6 text-base leading-relaxed text-ink-soft">
                Five stages, in order. Each stage ends with deliverables you can review before the next
                begins.
              </p>
            </div>
          </Reveal>

          <div className="mt-14">
            {METHODOLOGY_STEPS.map((step, index) => (
              <Reveal key={step.step}>
                <article className="grid gap-8 border-t border-ink/15 py-10 lg:grid-cols-12 lg:gap-12">
                  <figure className="lg:col-span-3">
                    <div className="overflow-hidden rounded-sm border border-ink/15 bg-paper-deep">
                      <img
                        src={METHOD_IMAGES[index].src}
                        alt={METHOD_IMAGES[index].caption}
                        className="aspect-square w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                      />
                    </div>
                  </figure>

                  <div className="lg:col-span-5">
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-xs text-cobalt">{step.step}</span>
                      <div>
                        <h3 className="text-2xl leading-tight text-ink">{step.title}</h3>
                        <p className="mt-1 text-sm text-ink-soft">{step.subtitle}</p>
                      </div>
                    </div>
                    <p className="mt-5 text-base leading-relaxed text-ink-soft">{step.description}</p>
                  </div>

                  <div className="lg:col-span-4">
                    <div className="rounded-sm border border-ink/15 bg-paper-deep/50 p-6">
                      <h4 className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
                        Key deliverables
                      </h4>
                      <ul className="mt-4 space-y-3">
                        {step.deliverables.map((deliverable) => (
                          <li key={deliverable} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-soft">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-copper" />
                            <span>{deliverable}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="relative overflow-hidden border-t border-ink/15 bg-ink py-20 text-paper sm:py-24">
        <div className="holo-aura pointer-events-none absolute inset-0 opacity-70" />
        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal>
            <HoloDiagram variant="lattice" className="h-[220px] w-full sm:h-[300px]" />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-10 flex flex-col gap-6 border-t border-paper/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="max-w-xl text-3xl leading-tight text-paper sm:text-4xl">
                Bring us the problem. We will model it.
              </h2>
              <Link
                to="/contact"
                className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-paper px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-white"
              >
                <span>Talk to our quants</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
