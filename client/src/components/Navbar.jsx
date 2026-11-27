import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, ArrowUpRight, TrendingUp, FileText, ShieldCheck } from 'lucide-react';
import { ECOSYSTEM_PLATFORMS } from '../data/ecosystemData';

const PLATFORM_ICONS = {
  'jh-crypto-analytics': { Icon: TrendingUp, tone: 'text-cobalt' },
  'earnings-desk': { Icon: FileText, tone: 'text-copper' },
  'creditpulse-underwriter': { Icon: ShieldCheck, tone: 'text-forest' }
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [platformsDropdown, setPlatformsDropdown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setPlatformsDropdown(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Our works', path: '/works' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'border-b border-ink/15 bg-paper/85 py-3 backdrop-blur-md'
          : 'border-b border-transparent py-5'
      }`}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center justify-between gap-6">
          {/* Brand */}
          <Link to="/" onClick={closeMenus} className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="JH Group logo"
              className="h-10 w-10 rounded-md object-contain ring-1 ring-ink/10"
            />
            <span className="flex flex-col leading-none">
              <span className="font-display text-2xl tracking-tight text-ink">JH Group</span>
              <span className="mt-1 hidden font-mono text-[9px] uppercase tracking-[0.2em] text-ink-soft sm:block">
                Quantitative intelligence
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-sm font-medium transition-colors ${
                    isActive ? 'text-ink' : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-2 left-0 h-px w-full bg-cobalt" />
                  )}
                </Link>
              );
            })}

            <div className="relative">
              <button
                type="button"
                onClick={() => setPlatformsDropdown(!platformsDropdown)}
                className="flex items-center gap-1.5 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
              >
                <span>Platforms</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    platformsDropdown ? 'rotate-180 text-cobalt' : ''
                  }`}
                />
              </button>

              {platformsDropdown && (
                <div
                  onMouseLeave={() => setPlatformsDropdown(false)}
                  className="absolute right-0 z-50 mt-4 w-80 rounded-xl border border-ink/10 bg-paper p-2 shadow-xl shadow-ink/10"
                >
                  {ECOSYSTEM_PLATFORMS.map((platform) => {
                    const { Icon, tone } = PLATFORM_ICONS[platform.id];
                    return (
                      <Link
                        key={platform.id}
                        to="/works"
                        onClick={closeMenus}
                        className="flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-ink/[0.04]"
                      >
                        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-ink/10 bg-paper-deep/60">
                          <Icon className={`h-4 w-4 ${tone}`} />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold text-ink">{platform.title}</span>
                          <span className="mt-0.5 block truncate text-xs text-ink-soft">
                            {platform.category}
                          </span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          <div className="hidden lg:block">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-cobalt"
            >
              <span>Initiate project</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-full border border-ink/15 p-2 text-ink transition-colors hover:bg-ink/5 lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-ink/10 bg-paper px-6 pb-8 pt-4 lg:hidden">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={closeMenus}
                  className={`block rounded-lg px-3 py-3 text-base transition-colors ${
                    isActive ? 'bg-ink/[0.05] font-semibold text-ink' : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            {ECOSYSTEM_PLATFORMS.map((platform) => (
              <Link
                key={platform.id}
                to="/works"
                onClick={closeMenus}
                className="block rounded-lg px-3 py-2.5 text-sm text-ink-soft hover:text-ink"
              >
                {platform.title}
              </Link>
            ))}
          </div>

          <Link
            to="/contact"
            onClick={closeMenus}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-ink py-3 text-sm font-medium text-paper"
          >
            <span>Initiate project</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </header>
  );
}
