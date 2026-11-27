import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { onEnterViewport } from '../lib/inView';

/*
 * Entrance motion: the CSS class guarantees the element ends fully visible,
 * GSAP supplies the eased rise.
 */
export default function Reveal({ children, delay = 0, y = 34, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    let safety = 0;

    const unsubscribe = onEnterViewport(node, () => {
      node.classList.add('is-visible');
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.fromTo(
        node,
        { y },
        {
          y: 0,
          duration: 1.05,
          delay: delay / 1000,
          ease: 'power3.out',
          clearProps: 'transform'
        }
      );

      // If frame scheduling is throttled, make sure the content still appears.
      safety = setTimeout(() => {
        if (Number.parseFloat(getComputedStyle(node).opacity) < 0.6) {
          node.style.transition = 'none';
          node.style.opacity = '1';
          node.style.transform = 'none';
        }
      }, 1300);
    });

    return () => {
      unsubscribe();
      clearTimeout(safety);
    };
  }, [delay, y]);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
