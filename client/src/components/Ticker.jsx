import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const ITEMS = [
  '25+ digital assets tracked',
  '< 45ms signal latency',
  '91.8% signal precision',
  '99.4% factual recall',
  '85% research time saved',
  '< 800ms underwriting',
  '100% regulatory traceability',
  'Three production platforms'
];

export default function Ticker() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const tween = gsap.to(track, {
      xPercent: -50,
      duration: 42,
      ease: 'none',
      repeat: -1
    });

    const wrap = track.parentElement;
    const slow = () => gsap.to(tween, { timeScale: 0.2, duration: 0.5 });
    const resume = () => gsap.to(tween, { timeScale: 1, duration: 0.5 });

    wrap?.addEventListener('mouseenter', slow);
    wrap?.addEventListener('mouseleave', resume);

    return () => {
      wrap?.removeEventListener('mouseenter', slow);
      wrap?.removeEventListener('mouseleave', resume);
      tween.kill();
    };
  }, []);

  return (
    <div className="relative overflow-hidden border-y border-ink bg-ink py-3.5 text-paper">
      <div className="ticker-mask flex overflow-hidden">
        <div ref={trackRef} className="flex shrink-0 items-center will-change-transform">
          {[...ITEMS, ...ITEMS].map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="flex items-center gap-5 whitespace-nowrap pr-10 font-mono text-[10px] uppercase tracking-[0.22em] text-paper/75"
            >
              <span className="h-1 w-1 shrink-0 rounded-full bg-holo-mint" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
