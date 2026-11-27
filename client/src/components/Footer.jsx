import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import { ECOSYSTEM_PLATFORMS } from '../data/ecosystemData';

const YEAR = new Date().getFullYear();

const FOOTER_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Our works', path: '/works' },
  { name: 'About & methodology', path: '/about' },
  { name: 'Contact', path: '/contact' }
];

export default function Footer() {
  return (
    <footer className="relative z-10 mt-24 overflow-hidden bg-ink text-paper/70">
      <div className="holo-aura pointer-events-none absolute inset-x-0 top-0 h-72 opacity-40" />
      <div className="relative mx-auto max-w-6xl px-6 pt-16">
        <div className="grid gap-12 border-b border-paper/10 pb-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="JH Group logo"
                className="h-10 w-10 rounded-md object-contain ring-1 ring-paper/20"
              />
              <div>
                <p className="font-display text-2xl leading-none text-paper">JH Group</p>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-paper/45">
                  Quantitative intelligence
                </p>
              </div>
            </div>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-paper/60">
              Quantitative engineering for financial markets: algorithmic crypto telemetry,
              multi-agent equity research, and Basel III/IV credit underwriting — built as one
              production ecosystem.
            </p>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-paper/45">
              Navigation
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {FOOTER_LINKS.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-paper/70 transition-colors hover:text-paper">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-paper/45">
              Platforms
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {ECOSYSTEM_PLATFORMS.map((platform) => (
                <li key={platform.id}>
                  <Link to="/works" className="text-paper/70 transition-colors hover:text-paper">
                    {platform.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 py-6 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© {YEAR} JH Group. All rights reserved.</p>
          <p>Corporate governance · Risk disclosures · Data sovereignty</p>
        </div>
      </div>

      {/* Animated oversized wordmark */}
      <Reveal className="border-t border-paper/10 pt-6">
        <div className="mx-auto max-w-[110rem] px-4">
          <div className="overflow-hidden">
            <span className="wordmark-track wordmark block whitespace-nowrap text-center text-[clamp(3rem,17vw,17rem)]">
              JH GROUP
            </span>
          </div>
          <p className="pb-6 pt-4 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-paper/35">
            Engineering the systems financial markets run on
          </p>
        </div>
      </Reveal>
    </footer>
  );
}
