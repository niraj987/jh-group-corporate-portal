import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import Reveal from '../components/Reveal';
import HoloDiagram from '../components/HoloDiagram';
import { ECOSYSTEM_PLATFORMS } from '../data/ecosystemData';

const FILTERS = [
  { id: 'all', label: 'All platforms' },
  ...ECOSYSTEM_PLATFORMS.map((platform) => ({ id: platform.id, label: platform.title }))
];

const ACCENTS = ['text-cobalt', 'text-copper', 'text-forest'];

const PLATFORM_HOLO = {
  'jh-crypto-analytics': 'orderbook',
  'earnings-desk': 'network',
  'creditpulse-underwriter': 'lattice'
};

export default function WorksPage() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredPlatforms =
    activeTab === 'all'
      ? ECOSYSTEM_PLATFORMS
      : ECOSYSTEM_PLATFORMS.filter((p) => p.id === activeTab);

  return (
    <div>
      {/* HEADER */}
      <section className="pb-10 pt-32 sm:pt-40">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-soft">Our works</p>
          <h1 className="mt-5 max-w-4xl text-[2.6rem] leading-[1.02] text-ink sm:text-6xl">
            What each platform does, and exactly how it was built
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Three production systems, documented end to end: the problem each one replaces, the model
            behind it, the stack it runs on, and the measured result.
          </p>
        </div>

        <Reveal className="mt-12">
          <div className="mx-auto max-w-7xl px-4">
            <HoloDiagram variant="signal" className="h-[200px] w-full sm:h-[300px]" />
          </div>
        </Reveal>
      </section>

      {/* FILTERS */}
      <div className="sticky top-[72px] z-30 mt-10 border-y border-ink/15 bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-x-8 gap-y-1 px-6 py-3">
          {FILTERS.map((filter) => {
            const isActive = activeTab === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveTab(filter.id)}
                className={`border-b-2 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'border-cobalt text-ink'
                    : 'border-transparent text-ink-soft hover:text-ink'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* CASE STUDIES */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="space-y-20">
            {filteredPlatforms.map((platform) => {
              const index = ECOSYSTEM_PLATFORMS.findIndex((p) => p.id === platform.id);
              return (
                <Reveal key={platform.id}>
                  <article>
                    <div className="flex flex-wrap items-baseline gap-4 border-b border-ink/15 pb-5">
                      <span className="font-mono text-xs text-ink-soft">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${ACCENTS[index]}`}>
                        {platform.category}
                      </span>
                    </div>

                    <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-16">
                      <div className="lg:col-span-7">
                        <h2 className="text-3xl leading-tight text-ink sm:text-4xl">{platform.title}</h2>
                        <p className="mt-2 text-base font-medium text-ink-soft">{platform.tagline}</p>

                        <p className="mt-6 text-base leading-relaxed text-ink-soft">
                          {platform.description}
                        </p>

                        <div className="mt-9 grid gap-8 sm:grid-cols-2">
                          <div>
                            <h3 className="text-sm font-semibold text-ink">Problem tackled</h3>
                            <p className="mt-3 text-base leading-relaxed text-ink-soft">
                              {platform.problemTackled}
                            </p>
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-ink">How we solved it</h3>
                            <p className="mt-3 text-base leading-relaxed text-ink">
                              {platform.solutionProvided}
                            </p>
                          </div>
                        </div>

                        <div className="mt-9">
                          <h3 className="text-sm font-semibold text-ink">Architectural highlights</h3>
                          <ul className="mt-4 space-y-3">
                            {platform.capabilities.map((cap) => (
                              <li key={cap} className="flex items-start gap-3 text-base leading-relaxed text-ink-soft">
                                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-cobalt" />
                                <span>{cap}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
                          <Link
                            to="/contact"
                            className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-cobalt"
                          >
                            <span>Inquire about a deployment</span>
                            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                          </Link>
                          <span className="text-sm text-ink-soft">Institutional grade · air-gapped ready</span>
                        </div>
                      </div>

                      <div className="lg:col-span-5">
                        <HoloDiagram
                          variant={PLATFORM_HOLO[platform.id]}
                          className="aspect-[4/3] w-full"
                        />

                        <div className="mt-8 rounded-sm border border-ink/15 bg-paper-deep/50 p-6">
                          <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
                            Measured performance
                          </h3>
                          <dl className="mt-4 border-t border-ink/15">
                            {platform.stats.map((stat) => (
                              <div
                                key={stat.label}
                                className="flex items-baseline justify-between gap-4 border-b border-ink/15 py-3.5 last:border-b-0"
                              >
                                <dt className="text-sm text-ink-soft">{stat.label}</dt>
                                <dd className="text-lg font-semibold text-ink">{stat.value}</dd>
                              </div>
                            ))}
                          </dl>

                          <h3 className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
                            Technology
                          </h3>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {platform.techStack.map((tech) => (
                              <span
                                key={tech}
                                className="rounded-sm border border-ink/20 px-2.5 py-1 font-mono text-[11px] text-ink-soft"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          <p className="mt-6 border-t border-ink/15 pt-5 text-sm leading-relaxed text-ink-soft">
                            Hosted on high-availability edge infrastructure with automatic TLS, scoped
                            CORS and a proxied Python microservice.
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-ink py-24 text-paper sm:py-28">
        <div className="holo-aura pointer-events-none absolute inset-0 opacity-80" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-paper/45">
              Custom engineering
            </p>
            <h2 className="mt-5 text-4xl leading-[1.05] text-paper sm:text-5xl">
              Need a platform built to this standard?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-paper/65">
              We adapt the same engines, agent frameworks and MERN scaffolding into bespoke systems for
              funds, lenders and fintech operators.
            </p>
            <div className="mt-9">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-white"
              >
                <span>Discuss your platform</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
