import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ChevronDown,
  Menu,
  X,
  TrendingUp,
  FileText,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { ECOSYSTEM_PLATFORMS } from '../data/ecosystemData';

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
    { name: 'Our Works', path: '/works' },
    { name: 'About & Methodology', path: '/about' },
    { name: 'Contact Us', path: '/contact' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-nav py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Title (FinTech Lab box removed per request) */}
          <Link
            to="/"
            onClick={closeMenus}
            className="flex items-center gap-3.5 group focus:outline-none"
          >
            <div className="relative">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-blue-500/20 border border-white/15 flex items-center justify-center p-1 overflow-hidden shadow-lg shadow-purple-500/10 group-hover:border-purple-400 transition-colors">
                <img
                  src="/logo.png"
                  alt="JH Group Logo"
                  className="w-full h-full object-contain filter drop-shadow"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-purple-300 transition-colors">
                  JH <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-blue-400">GROUP</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium tracking-wide">
                Quantitative Intelligence & Multi-Agent Systems
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-all duration-200 relative py-1 ${
                    isActive
                      ? 'text-purple-300 font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full" />
                  )}
                </Link>
              );
            })}

            {/* Works Quick Dropdown Menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setPlatformsDropdown(!platformsDropdown)}
                className="flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white py-1 focus:outline-none"
              >
                <span>Core Platforms</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    platformsDropdown ? 'rotate-180 text-purple-400' : ''
                  }`}
                />
              </button>

              {platformsDropdown && (
                <div
                  onMouseLeave={() => setPlatformsDropdown(false)}
                  className="absolute right-0 mt-3 w-80 rounded-2xl glass-card p-3 z-50 animate-in fade-in slide-in-from-top-2 border border-white/10"
                >
                  <div className="px-3 py-2 border-b border-white/10 mb-2">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Flagship Platforms
                    </p>
                  </div>
                  <div className="space-y-1">
                    {ECOSYSTEM_PLATFORMS.map((platform) => (
                      <Link
                        key={platform.id}
                        to="/works"
                        onClick={closeMenus}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/[0.06] transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-slate-800/80 flex items-center justify-center shrink-0 border border-white/10 text-purple-300 group-hover:scale-110 transition-transform">
                          {platform.id === 'jh-crypto-analytics' ? (
                            <TrendingUp className="w-4 h-4 text-blue-400" />
                          ) : platform.id === 'earnings-desk' ? (
                            <FileText className="w-4 h-4 text-purple-400" />
                          ) : (
                            <ShieldCheck className="w-4 h-4 text-indigo-400" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-white group-hover:text-purple-300 truncate">
                            {platform.title}
                          </p>
                          <p className="text-[11px] text-slate-400 truncate mt-0.5">
                            {platform.tagline}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Action CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/contact"
              className="px-5 py-2.5 rounded-xl text-xs font-bold tracking-wide uppercase bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-lg shadow-purple-600/30 hover:shadow-purple-600/45 transition-all duration-200 transform hover:-translate-y-0.5 flex items-center gap-2 border border-white/15"
            >
              <span>Initiate Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl glass-card text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-nav px-4 pt-4 pb-8 space-y-4 animate-in fade-in slide-in-from-top-4">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={closeMenus}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                      : 'text-slate-300 hover:bg-white/[0.05]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-2">
            <Link
              to="/contact"
              onClick={closeMenus}
              className="w-full py-3 rounded-xl text-center text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg flex items-center justify-center gap-2"
            >
              <span>Consult with our Quants</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
