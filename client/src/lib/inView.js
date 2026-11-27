/*
 * A tiny shared viewport watcher.
 * One passive scroll/resize listener serves every subscriber, and the initial
 * pass settles anything already on screen. No IntersectionObserver dependency.
 */
const watchers = new Set();
let listening = false;
let ticking = false;

function measure() {
  ticking = false;
  const viewport = window.innerHeight || 0;

  watchers.forEach((watcher) => {
    const rect = watcher.node.getBoundingClientRect();
    if (rect.top < viewport * 0.94 && rect.bottom > -40) {
      watchers.delete(watcher);
      watcher.callback();
    }
  });

  if (watchers.size === 0) stop();
}

function schedule() {
  if (ticking) return;
  ticking = true;
  setTimeout(measure, 24);
}

function start() {
  if (listening) return;
  listening = true;
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
}

function stop() {
  if (!listening) return;
  listening = false;
  window.removeEventListener('scroll', schedule);
  window.removeEventListener('resize', schedule);
}

export function onEnterViewport(node, callback) {
  const watcher = { node, callback };
  watchers.add(watcher);
  start();
  measure();

  return () => {
    watchers.delete(watcher);
    if (watchers.size === 0) stop();
  };
}
