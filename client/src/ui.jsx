import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

/* ------------------------------------------------------------------ */
/* Icons (inline SVG, stroke based so they inherit colour)             */
/* ------------------------------------------------------------------ */
const PLANE_PATH = 'M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z';

const ICONS = {
  arrow: 'M5 12h14M13 6l6 6-6 6',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  doc: 'M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z M14 3v5h5 M9 13h6 M9 17h6',
  passport: 'M6 3h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z M12 7.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6z M9 17h6',
  finger: 'M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4 M14 13.12c0 2.38 0 6.38-1 8.88 M17.29 21.02c.12-.6.43-2.3.5-3.02 M2 12a10 10 0 0 1 18-6 M21.8 16c.2-2 .131-5.354 0-6 M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2 M8.65 22c.21-.66.45-1.32.57-2 M9 6.8a6 6 0 0 1 9 5.2v2',
  shield: 'M12 3l8 3v6c0 4.5-3.2 8.2-8 9-4.8-.8-8-4.5-8-9V6z M9 12l2 2 4-4',
  globe: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M3 12h18 M12 3a14 14 0 0 1 0 18 M12 3a14 14 0 0 0 0 18',
  briefcase: 'M4 8h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z M9 8V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2 M3 13h18',
  users: 'M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20 M10 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z M20 20v-1.5a3.5 3.5 0 0 0-2.5-3.35 M15.5 5.2a3.5 3.5 0 0 1 0 6.6',
  moon: 'M21 12.8A8.5 8.5 0 1 1 11.2 3a6.5 6.5 0 0 0 9.8 9.8z',
  stamp: 'M5 21h14 M6 17h12v-2.5a2.5 2.5 0 0 0-2.5-2.5H14V8.5a2 2 0 1 0-4 0V12H8.5A2.5 2.5 0 0 0 6 14.5z',
  pulse: 'M3 12h4l2-5 4 10 2-5h6',
  clip: 'M9 4h6v3H9z M7 5H6a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-1 M9 14l2 2 4-4',
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',
  mail: 'M3 6h18v12H3z M3 7l9 7 9-7',
  pin: 'M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  clock: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M12 7v5l3 2',
  chev: 'M6 9l6 6 6-6',
  wa: 'M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z M9 8.5c.2 3 2.5 5.3 5.5 5.5l1.2-1.4-2-1-.8.8c-.9-.4-1.9-1.3-2.3-2.3l.8-.8-1-2z',
  fb: 'M14 8h2V4.5h-2.5A3.5 3.5 0 0 0 10 8v2H8v3.5h2V21h3.5v-7.5H16l.5-3.5h-3V8.5a.5.5 0 0 1 .5-.5z',
  tt: 'M14 4v10.5a3.5 3.5 0 1 1-3.5-3.5 M14 4c.3 2.5 2 4.2 4.5 4.5',
  spark: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z M18.5 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z',
  star: 'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z',
  quote: 'M7 7h4v4H8c0 2 .8 3 3 3v3c-4 0-6-2-6-6V7z M15 7h4v4h-3c0 2 .8 3 3 3v3c-4 0-6-2-6-6V7z',
  hand: 'M7 12V7a1.5 1.5 0 0 1 3 0v4 M10 11V5.5a1.5 1.5 0 0 1 3 0V11 M13 11V6.5a1.5 1.5 0 0 1 3 0V12 M16 12V9.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-1a6 6 0 0 1-5-2.7L4 14a1.5 1.5 0 0 1 2.5-1.6L7 13',
};

export function Icon({ name, size = 22, className = '', style }) {
  if (name === 'plane') {
    return (
      <svg className={`ico ${className}`} style={style} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d={PLANE_PATH} />
      </svg>
    );
  }
  const filled = name === 'star';
  return (
    <svg
      className={`ico ${className}`}
      style={style}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={ICONS[name] || ICONS.doc} />
    </svg>
  );
}

/* Flags: emoji flags do not render on Windows, so use a flag image with emoji fallback */
const flagCode = (emoji = '') => {
  const pts = [...emoji].map((c) => c.codePointAt(0) - 0x1f1e6 + 97);
  if (pts.length !== 2 || pts.some((p) => p < 97 || p > 122)) return '';
  return String.fromCharCode(...pts);
};

export function Flag({ emoji, className = '' }) {
  const [failed, setFailed] = useState(false);
  const code = flagCode(emoji);
  if (!code || failed) return <span className={`flag-emoji ${className}`}>{emoji || '🌍'}</span>;
  return (
    <img
      className={`flag-img ${className}`}
      src={`https://flagcdn.com/w80/${code}.png`}
      srcSet={`https://flagcdn.com/w160/${code}.png 2x`}
      alt=""
      loading="lazy"
      width="32"
      height="24"
      onError={() => setFailed(true)}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Site-wide effects: reveal on scroll, spotlight cards, tilt, progress */
/* ------------------------------------------------------------------ */
const REVEAL_SELECTOR = [
  '.page .panel',
  '.page .page-section',
  '.page .info-grid > *',
  '.page .service-grid > *',
  '.page .grid > *',
  '.page .form',
  '.page .timeline-item',
  '.page .document-filter-wrap',
  '.page .trust-pills',
  '.page .cta-row',
  '.page .ok',
  '.reveal-auto',
].join(',');

export function SiteEffects() {
  const location = useLocation();
  const ioRef = useRef(null);

  // scroll to top on navigation
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('js-anim');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      root.classList.add('reduce-motion');
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    ioRef.current = io;

    const tag = (scope) => {
      const nodes = scope.querySelectorAll ? scope.querySelectorAll(REVEAL_SELECTOR) : [];
      nodes.forEach((el) => {
        if (el.dataset.revealed) return;
        el.dataset.revealed = '1';
        el.classList.add('reveal');
        const siblings = el.parentElement ? [...el.parentElement.children] : [];
        const idx = Math.max(0, siblings.indexOf(el));
        el.style.setProperty('--d', `${Math.min(idx, 6) * 70}ms`);
        io.observe(el);
      });
      scope.querySelectorAll &&
        scope.querySelectorAll('.reveal:not([data-revealed])').forEach((el) => {
          el.dataset.revealed = '1';
          io.observe(el);
        });
    };

    tag(document);
    const mo = new MutationObserver(() => tag(document));
    mo.observe(document.body, { childList: true, subtree: true });

    // header state + scroll progress
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        root.classList.toggle('is-scrolled', y > 24);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        root.style.setProperty('--scroll', max > 0 ? String(Math.min(1, y / max)) : '0');
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    // spotlight + tilt (event delegation, fine pointers only)
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const onMove = (e) => {
      const spot = e.target.closest && e.target.closest('.spot');
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty('--mx', `${e.clientX - r.left}px`);
        spot.style.setProperty('--my', `${e.clientY - r.top}px`);
      }
      const tilt = e.target.closest && e.target.closest('[data-tilt]');
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        const max = Number(tilt.dataset.tilt) || 8;
        tilt.style.setProperty('--rx', `${(-py * max).toFixed(2)}deg`);
        tilt.style.setProperty('--ry', `${(px * max).toFixed(2)}deg`);
      }
    };
    const onLeave = (e) => {
      const tilt = e.target.closest && e.target.closest('[data-tilt]');
      if (tilt && !tilt.contains(e.relatedTarget)) {
        tilt.style.setProperty('--rx', '0deg');
        tilt.style.setProperty('--ry', '0deg');
      }
    };
    if (fine) {
      document.addEventListener('pointermove', onMove, { passive: true });
      document.addEventListener('pointerout', onLeave, { passive: true });
    }

    return () => {
      io.disconnect();
      mo.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerout', onLeave);
    };
  }, []);

  // re-tag when the route changes (nodes mount before the observer callback is queued)
  useLayoutEffect(() => {
    const io = ioRef.current;
    if (!io) return;
    document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => {
      if (el.dataset.revealed) return;
      el.dataset.revealed = '1';
      el.classList.add('reveal');
      const siblings = el.parentElement ? [...el.parentElement.children] : [];
      el.style.setProperty('--d', `${Math.min(Math.max(0, siblings.indexOf(el)), 6) * 70}ms`);
      io.observe(el);
    });
  }, [location.pathname]);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <span className="scroll-progress__bar" />
      <span className="scroll-progress__plane"><Icon name="plane" size={16} /></span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Counter that counts up when scrolled into view                       */
/* ------------------------------------------------------------------ */
export function CountUp({ to, suffix = '', prefix = '', duration = 1600, className = '' }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVal(to);
      return undefined;
    }
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 4);
        setVal(Math.round(to * eased));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  return <span ref={ref} className={className}>{prefix}{val.toLocaleString()}{suffix}</span>;
}

/* ------------------------------------------------------------------ */
/* Flight map canvas: dotted grid + glowing arcs with planes on them   */
/* ------------------------------------------------------------------ */
const CITIES = {
  LHE: [74.35, 31.52],
  ISB: [73.05, 33.68],
  KHI: [67.0, 24.86],
  MUX: [71.47, 30.2],
  RUH: [46.7, 24.7],
  JED: [39.2, 21.5],
  DMM: [50.1, 26.4],
  MED: [39.6, 24.5],
  DXB: [55.3, 25.2],
  DOH: [51.5, 25.3],
  BAH: [50.6, 26.2],
  IST: [28.98, 41.0],
  HAN: [105.8, 21.0],
};
const ROUTES = [
  ['LHE', 'RUH'], ['ISB', 'JED'], ['KHI', 'DXB'], ['LHE', 'DOH'], ['ISB', 'MED'],
  ['KHI', 'DMM'], ['LHE', 'IST'], ['ISB', 'BAH'], ['KHI', 'JED'], ['LHE', 'HAN'], ['MUX', 'RUH'],
];
const LABELS = ['LHE', 'ISB', 'KHI', 'RUH', 'JED', 'DXB', 'DOH', 'IST', 'HAN'];

export function FlightMap({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const plane = new Path2D(PLANE_PATH);
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let visible = true;
    let nodes = {};
    let flights = [];

    const project = ([lon, lat]) => ({
      x: ((lon - 22) / 92) * w,
      y: ((47 - lat) / 40) * h,
    });

    const build = () => {
      nodes = {};
      Object.entries(CITIES).forEach(([k, v]) => { nodes[k] = project(v); });
      flights = ROUTES.map(([a, b], i) => {
        const p0 = nodes[a];
        const p1 = nodes[b];
        const mx = (p0.x + p1.x) / 2;
        const my = (p0.y + p1.y) / 2;
        const dist = Math.hypot(p1.x - p0.x, p1.y - p0.y);
        return {
          p0, p1,
          c: { x: mx, y: my - Math.max(40, dist * 0.32) },
          t: reduce ? 0.55 : (i * 0.173) % 1,
          speed: 0.0011 + (i % 4) * 0.00022,
        };
      });
    };

    const resize = () => {
      const r = canvas.parentElement.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
      draw(0);
    };

    const bez = (f, t) => {
      const u = 1 - t;
      return {
        x: u * u * f.p0.x + 2 * u * t * f.c.x + t * t * f.p1.x,
        y: u * u * f.p0.y + 2 * u * t * f.c.y + t * t * f.p1.y,
      };
    };

    const draw = (time) => {
      ctx.clearRect(0, 0, w, h);

      // dotted grid
      const gap = 22;
      ctx.fillStyle = 'rgba(190,230,210,0.13)';
      for (let x = gap / 2; x < w; x += gap) {
        for (let y = gap / 2; y < h; y += gap) {
          ctx.fillRect(x, y, 1.4, 1.4);
        }
      }

      // route lines
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 6]);
      flights.forEach((f) => {
        ctx.strokeStyle = 'rgba(240,196,106,0.16)';
        ctx.beginPath();
        ctx.moveTo(f.p0.x, f.p0.y);
        ctx.quadraticCurveTo(f.c.x, f.c.y, f.p1.x, f.p1.y);
        ctx.stroke();
      });
      ctx.setLineDash([]);

      // glowing trails + planes
      flights.forEach((f) => {
        const steps = 26;
        for (let i = 0; i < steps; i++) {
          const a = Math.max(0, f.t - 0.22 + (i / steps) * 0.22);
          const b = Math.max(0, f.t - 0.22 + ((i + 1) / steps) * 0.22);
          const pa = bez(f, a);
          const pb = bez(f, b);
          ctx.strokeStyle = `rgba(240,196,106,${(i / steps) * 0.75})`;
          ctx.lineWidth = 1 + (i / steps) * 1.6;
          ctx.beginPath();
          ctx.moveTo(pa.x, pa.y);
          ctx.lineTo(pb.x, pb.y);
          ctx.stroke();
        }
        const head = bez(f, f.t);
        const ahead = bez(f, Math.min(1, f.t + 0.01));
        const ang = Math.atan2(ahead.y - head.y, ahead.x - head.x) + Math.PI / 2;
        const fade = f.t < 0.06 ? f.t / 0.06 : f.t > 0.94 ? (1 - f.t) / 0.06 : 1;
        ctx.save();
        ctx.translate(head.x, head.y);
        ctx.rotate(ang);
        ctx.globalAlpha = Math.max(0, fade);
        ctx.shadowColor = 'rgba(240,196,106,0.9)';
        ctx.shadowBlur = 12;
        ctx.fillStyle = '#F6D58B';
        ctx.scale(0.7, 0.7);
        ctx.translate(-12, -12);
        ctx.fill(plane);
        ctx.restore();
      });

      // city nodes
      ctx.font = '500 10px "IBM Plex Mono", ui-monospace, monospace';
      Object.entries(nodes).forEach(([k, p]) => {
        const pulse = reduce ? 0.5 : (Math.sin(time / 600 + p.x) + 1) / 2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.6, 0, Math.PI * 2);
        ctx.fillStyle = '#F0C46A';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4 + pulse * 7, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(240,196,106,${0.35 - pulse * 0.3})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        if (LABELS.includes(k)) {
          ctx.fillStyle = 'rgba(230,245,236,0.55)';
          ctx.fillText(k, p.x + 9, p.y + 3);
        }
      });
    };

    let last = 0;
    const loop = (time) => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      const dt = Math.min(48, time - last || 16);
      last = time;
      flights.forEach((f) => {
        f.t += f.speed * dt * 0.9;
        if (f.t > 1.02) f.t = -0.05;
      });
      draw(time);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(canvas);
    if (!reduce) raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={`flight-map ${className}`} aria-hidden="true" />;
}

/* ------------------------------------------------------------------ */
/* Flying planes crossing the sky (pure CSS animation)                  */
/* ------------------------------------------------------------------ */
const SKY_PLANES = [
  { top: '12%', dur: 46, delay: -8, scale: 1.15, op: 0.95, dir: 1 },
  { top: '34%', dur: 62, delay: -30, scale: 0.7, op: 0.55, dir: -1 },
  { top: '58%', dur: 54, delay: -18, scale: 0.9, op: 0.75, dir: 1 },
  { top: '78%', dur: 70, delay: -44, scale: 0.55, op: 0.45, dir: -1 },
  { top: '22%', dur: 80, delay: -60, scale: 0.45, op: 0.35, dir: 1 },
];

export function SkyPlanes({ count = 5, className = '' }) {
  return (
    <div className={`sky ${className}`} aria-hidden="true">
      <span className="cloud cloud-1" />
      <span className="cloud cloud-2" />
      <span className="cloud cloud-3" />
      {SKY_PLANES.slice(0, count).map((p, i) => (
        <span
          key={i}
          className={`fly ${p.dir === 1 ? 'fly--ltr' : 'fly--rtl'}`}
          style={{ '--top': p.top, '--dur': `${p.dur}s`, '--delay': `${p.delay}s`, '--scale': p.scale, '--op': p.op }}
        >
          <span className="fly__bob">
            <span className="fly__trail" />
            <Icon name="plane" size={34} className="fly__plane" />
          </span>
        </span>
      ))}
    </div>
  );
}

/* Small visa / passport / ticket glyphs that drift across a section */
export function DriftingDocs({ className = '' }) {
  const items = [
    { k: 'visa', left: '6%', dur: 26, delay: -4, size: 1 },
    { k: 'passport', left: '22%', dur: 32, delay: -16, size: 0.85 },
    { k: 'ticket', left: '48%', dur: 28, delay: -9, size: 0.9 },
    { k: 'visa', left: '66%', dur: 36, delay: -22, size: 0.75 },
    { k: 'passport', left: '84%', dur: 30, delay: -12, size: 1 },
  ];
  return (
    <div className={`drift ${className}`} aria-hidden="true">
      {items.map((it, i) => (
        <span key={i} className="drift__item" style={{ '--left': it.left, '--dur': `${it.dur}s`, '--delay': `${it.delay}s`, '--s': it.size }}>
          {it.k === 'visa' && <MiniVisa />}
          {it.k === 'passport' && <MiniPassport />}
          {it.k === 'ticket' && <MiniTicket />}
        </span>
      ))}
    </div>
  );
}

export function MiniVisa() {
  return (
    <span className="mini-visa">
      <b>VISA</b>
      <i /><i /><i />
      <em>APPROVED</em>
    </span>
  );
}
export function MiniPassport() {
  return (
    <span className="mini-passport">
      <Icon name="globe" size={20} />
      <small>PASSPORT</small>
    </span>
  );
}
export function MiniTicket() {
  return (
    <span className="mini-ticket">
      <Icon name="plane" size={14} style={{ transform: 'rotate(90deg)' }} />
      <b>LHE</b><span>→</span><b>RUH</b>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Hero visual stage: boarding pass, visa, passport, orbiting plane     */
/* ------------------------------------------------------------------ */
export function HeroStage() {
  const stageRef = useRef(null);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return undefined;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const hero = el.closest('.hero');
    if (!hero) return undefined;
    const onMove = (e) => {
      const r = hero.getBoundingClientRect();
      el.style.setProperty('--px', (((e.clientX - r.left) / r.width) - 0.5).toFixed(3));
      el.style.setProperty('--py', (((e.clientY - r.top) / r.height) - 0.5).toFixed(3));
    };
    hero.addEventListener('pointermove', onMove, { passive: true });
    return () => hero.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <div className="stage" ref={stageRef} aria-label="Illustration of a visa journey from Pakistan to Saudi Arabia">
      <div className="stage__glow" />
      <div className="orbit orbit--1"><span className="orbit__plane"><Icon name="plane" size={26} /></span></div>
      <div className="orbit orbit--2"><span className="orbit__plane orbit__plane--small"><Icon name="plane" size={18} /></span></div>

      <div className="fv fv-passport" style={{ '--depth': 38 }}>
        <div className="fv-passport__emblem"><Icon name="globe" size={30} /></div>
        <strong>PASSPORT</strong>
        <small>Travel document</small>
        <span className="fv-passport__line" />
      </div>

      <div className="fv fv-visa" style={{ '--depth': 54 }}>
        <div className="fv-head"><span>VISA</span><em>KSA · WORK</em></div>
        <div className="fv-body">
          <div className="fv-photo"><Icon name="users" size={26} /></div>
          <div className="fv-lines"><i /><i /><i /><i /></div>
        </div>
        <div className="fv-mrz">V&lt;SPECIMEN&lt;&lt;SAMPLE&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</div>
        <span className="fv-stamp">APPROVED</span>
      </div>

      <div className="pass" data-tilt="7">
        <div className="pass__top">
          <span className="pass__tag">Boarding pass · Work visa</span>
          <span className="pass__no">PTVS-KSA</span>
        </div>
        <div className="pass__route">
          <div><small>From</small><b>LHE</b><span>Lahore · Islamabad · Karachi</span></div>
          <div className="pass__arcwrap" aria-hidden="true">
            <svg className="pass__arc" viewBox="0 0 200 70" preserveAspectRatio="none">
              <path d="M4 64 Q100 -14 196 64" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5 6" vectorEffect="non-scaling-stroke" />
            </svg>
            <span className="pass__plane"><Icon name="plane" size={22} /></span>
          </div>
          <div className="pass__to"><small>To</small><b>RUH</b><span>Riyadh · Jeddah · Dammam</span></div>
        </div>
        <div className="pass__grid">
          <div><small>Visa</small><b><Icon name="check" size={14} /> Stamped</b></div>
          <div><small>Medical</small><b><Icon name="check" size={14} /> Wafid fit</b></div>
          <div><small>Protector</small><b><Icon name="check" size={14} /> OEC ready</b></div>
          <div><small>Skill / QVP</small><b><Icon name="check" size={14} /> Verified</b></div>
        </div>
        <div className="pass__foot">
          <span className="barcode" aria-hidden="true" />
          <Link className="btn btn-soft btn-sm" to="/work-visa">See the 8 steps <Icon name="arrow" size={16} /></Link>
        </div>
        <span className="pass__stamp pass__stamp--1">APPROVED</span>
        <span className="pass__stamp pass__stamp--2">MOFA ✓</span>
      </div>

      <div className="fv fv-seal" style={{ '--depth': 70 }}>
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <defs><path id="sealPath" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" /></defs>
          <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 4" />
          <text fontSize="10.5" fontWeight="700" letterSpacing="3" fill="currentColor"><textPath href="#sealPath">ATTESTED · VERIFIED · STAMPED ·</textPath></text>
        </svg>
        <span><Icon name="stamp" size={30} /></span>
      </div>

      <div className="fv fv-chip chip-1" style={{ '--depth': 90 }}><Icon name="shield" size={18} /> QVP verified</div>
      <div className="fv fv-chip chip-2" style={{ '--depth': 30 }}><Icon name="clock" size={18} /> 24h case review</div>
      <div className="fv fv-ticket" style={{ '--depth': 46 }}><MiniTicket /></div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Typewriter-style rotating word                                        */
/* ------------------------------------------------------------------ */
export function RotatingWord({ words }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => setI((n) => (n + 1) % words.length), 2600);
    return () => clearInterval(id);
  }, [words.length]);
  return (
    <span className="rotator" aria-live="polite">
      <span key={words[i]} className="rotator__word">{words[i]}</span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Inner-page banner                                                     */
/* ------------------------------------------------------------------ */
export function PageHead({ title, lead, kicker, crumb, children, aside }) {
  return (
    <div className="page-head">
      <SkyPlanes count={2} className="sky--soft" />
      <div className="page-head__inner">
        <div className="page-head__copy">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>{crumb || title}</span>
          </nav>
          {kicker && <span className="kicker kicker--light">{kicker}</span>}
          <h1>{title}</h1>
          {lead && <p className="lead">{lead}</p>}
          {children}
        </div>
        {aside && <div className="page-head__aside">{aside}</div>}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ accordion                                                         */
/* ------------------------------------------------------------------ */
export function Accordion({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="accordion">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className={`acc ${isOpen ? 'is-open' : ''}`}>
            <button type="button" className="acc__q" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)}>
              <span>{item.q}</span>
              <Icon name="chev" size={20} className="acc__chev" />
            </button>
            <div className="acc__a" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
              <div><p>{item.a}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function Marquee({ items }) {
  const loop = [...items, ...items];
  return (
    <div className="marquee" aria-label="Authorities and portals we work with">
      <div className="marquee__track">
        {loop.map((t, i) => (
          <span key={`${t}-${i}`} className="marquee__item"><Icon name="stamp" size={16} />{t}</span>
        ))}
      </div>
    </div>
  );
}
