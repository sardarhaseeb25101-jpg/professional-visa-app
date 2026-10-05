import { useEffect, useState } from 'react';
import { Routes, Route, Link, NavLink, useParams } from 'react-router-dom';
import { services, saudiSections, guides, stats, highlights, processSteps, faq, testimonials, packagePlans, PHONE, WA, EMAIL, ADDRESS, BRAND_NAME, BRAND_SHORT, aiReplyBank } from './content.js';
import { AdminLogin } from './AdminLogin.jsx';
import { AdminDashboard } from './AdminDashboard.jsx';
import { UmrahPackages } from './UmrahPackages.jsx';

function BackgroundParticles() {
  return (
    <div className="particle-layer" aria-hidden="true">
      {Array.from({ length: 24 }).map((_, index) => (
        <span key={index} className="particle" style={{ '--i': index }} />
      ))}
    </div>
  );
}

function Layout({ children, theme, onToggleTheme }) {
  return (<>
    <header className="top">
      <Link to="/" className="brand-wrap" aria-label={BRAND_NAME}>
        <span className="brand-mark">{BRAND_SHORT}</span>
        <span className="brand">{BRAND_NAME}</span>
      </Link>
      <nav><NavLink to="/saudi-visa-services">Saudi services</NavLink>
        <NavLink to="/umrah-packages">Umrah packages</NavLink>
        <NavLink to="/attestation-calculator">Attestation calculator</NavLink>
        <NavLink to="/guides/mosadaqa">Mosadaqa guide</NavLink>
        <NavLink to="/guides/qvp">QVP guide</NavLink>
        <NavLink to="/admin">Admin</NavLink></nav>
      <button type="button" className="theme-toggle" onClick={onToggleTheme}>
        {theme === 'luxury' ? 'Dark mode' : 'Luxury mode'}
      </button>
    </header>
    <main>{children}</main>
    <footer><p><b>{BRAND_NAME}</b></p><p>{ADDRESS}</p>
      <p>{PHONE} · <a href={`mailto:${EMAIL}`}>{EMAIL}</a> · <a href={WA} target="_blank" rel="noreferrer">WhatsApp</a></p></footer>
    <a className="wa-float" href={WA} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">WhatsApp</a>
    <AIChatWidget />
  </>);
}

function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Assalamu Alaikum! I can help with Saudi visa guidance, document attestation, and Umrah support. Ask me anything.' },
  ]);

  const getReply = (query) => {
    const normalized = query.toLowerCase();
    const match = aiReplyBank.find((entry) => entry.keywords.some((keyword) => normalized.includes(keyword)));
    return match ? match.response : 'I can help with visa guidance, attestation support, and Umrah planning. Please tell me your case type and I will guide you to the right next step.';
  };

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage = { from: 'user', text: trimmed };
    const botReply = { from: 'bot', text: getReply(trimmed) };
    setMessages((prev) => [...prev, userMessage, botReply]);
    setInput('');
  };

  return (
    <div className="ai-chat-widget">
      {!open && (
        <button type="button" className="ai-chat-toggle" onClick={() => setOpen(true)}>
          AI Help
        </button>
      )}

      {open && (
        <div className="ai-chat-panel" role="dialog" aria-label="AI assistance chat">
          <div className="ai-chat-header">
            <div>
              <strong>AI Concierge</strong>
              <span>Instant guidance</span>
            </div>
            <button type="button" className="ai-close" onClick={() => setOpen(false)} aria-label="Close AI assistant">×</button>
          </div>

          <div className="ai-chat-body">
            {messages.map((msg, index) => (
              <div key={`${msg.from}-${index}`} className={`ai-message ${msg.from === 'user' ? 'user' : 'bot'}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="ai-quick-answers">
            {['Saudi visa', 'Umrah package', 'Attestation', 'Price estimate'].map((item) => (
              <button key={item} type="button" className="ai-pill" onClick={() => setInput(item)}>{item}</button>
            ))}
          </div>

          <div className="ai-input-row">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about visa or attestation..." onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }} />
            <button type="button" className="btn" onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

function Home() {
  const trustItems = [
    { title: 'Verified process flow', text: 'Every case follows a structured review before submission.' },
    { title: 'Dedicated guidance', text: 'Clear support for complex documents and embassy requirements.' },
    { title: 'Travel-ready planning', text: 'Visa, attestation, and Umrah assistance under one roof.' },
  ];
  const [activePlan, setActivePlan] = useState(1);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const nextPlan = () => setActivePlan((current) => (current + 1) % packagePlans.length);
  const prevPlan = () => setActivePlan((current) => (current - 1 + packagePlans.length) % packagePlans.length);
  const nextTestimonial = () => setActiveTestimonial((current) => (current + 1) % testimonials.length);
  const prevTestimonial = () => setActiveTestimonial((current) => (current - 1 + testimonials.length) % testimonials.length);

  const currentPlan = packagePlans[activePlan];
  const currentTestimonial = testimonials[activeTestimonial];

  return (<>
    <div className="page-shell">
      <BackgroundParticles />
      <section className="hero parallax-panel">
        <div className="hero__content parallax-layer" data-depth="0.18">
          <div className="eyebrow">Trusted visa, attestation & travel specialists</div>
          <h1>Professional support from paperwork to passport to pilgrimage.</h1>
          <p>
            We help individuals, families, and professionals navigate Saudi visa applications,
            QVP processing, document attestation, and Umrah travel with clarity, speed, and expert follow-through.
          </p>
          <div className="row">
            <Link className="btn" to="/attestation-calculator">Check what you need</Link>
            <a className="btn ghost" href={WA}>Chat on WhatsApp</a>
          </div>

          <div className="hero__stats">
            {stats.map((item) => (
              <div key={item.label} className="mini-stat parallax-layer" data-depth="0.24">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero__visual glass-card parallax-layer" data-depth="0.32" aria-label="Service overview card">
          <div className="floating-card primary">
            <span className="card-label">Premium service</span>
            <strong>Saudi work & visit visas</strong>
            <small>Document review + submission support</small>
          </div>
          <div className="floating-card secondary">
            <span className="card-label">Fast response</span>
            <strong>24h case review</strong>
            <small>WhatsApp guidance available</small>
          </div>
          <div className="visual-grid">
            <div><span>QVP</span></div>
            <div><span>MOFA</span></div>
            <div><span>Umrah</span></div>
            <div><span>Embassy</span></div>
          </div>
        </div>
      </section>

      <section className="section parallax-panel">
        <div className="section-heading">
          <span className="kicker">Why clients choose us</span>
          <h2>Clear guidance, dependable execution, and honest support.</h2>
        </div>
        <div className="grid highlight-grid">
          {highlights.map((item) => (
            <div key={item.title} className="panel feature-card parallax-layer" data-depth="0.12">
              <span className="feature-icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section section--dark parallax-panel">
        <div className="section-heading light">
          <span className="kicker">How we work</span>
          <h2>A professional process designed to reduce stress and delays.</h2>
        </div>
        <div className="process-grid">
          {processSteps.map((step) => (
            <article key={step.step} className="process-card parallax-layer" data-depth="0.14">
              <span className="process-step">{step.step}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section parallax-panel">
        <div className="section-heading">
          <span className="kicker">Core services</span>
          <h2>Everything you need for visa success and international travel.</h2>
        </div>
        <div className="grid">{services.map(s => (
          <div key={s.title} className="panel service-card parallax-layer" data-depth="0.1">
            <h3>{s.title}</h3>
            <ul>{s.items.map(i => <li key={i}>{i}</li>)}</ul>
          </div>
        ))}</div>
      </section>

      <section className="section section--soft parallax-panel">
        <div className="section-heading">
          <span className="kicker">Popular destinations</span>
          <h2>A focused line-up of Saudi visa and documentation services.</h2>
        </div>
        <div className="grid service-coverage">
          {saudiSections.slice(0, 6).map((s) => (
            <article key={s.id} className="panel coverage-card parallax-layer" data-depth="0.12">
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              {s.link && <Link to={s.link}>Read guide</Link>}
            </article>
          ))}
        </div>
      </section>

      <section className="section faq-section parallax-panel">
        <div className="section-heading">
          <span className="kicker">FAQs</span>
          <h2>Common questions from clients before they apply.</h2>
        </div>
        <div className="faq-list">
          {faq.map((item) => (
            <div key={item.q} className="faq-item parallax-layer" data-depth="0.1">
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="premium-strip parallax-panel">
        <div className="premium-strip__header">
          <span className="kicker">The professional promise</span>
          <h2>Travel support shaped around precision, trust, and speed.</h2>
        </div>
        <div className="trust-grid">
          {trustItems.map((item) => (
            <div key={item.title} className="trust-card parallax-layer" data-depth="0.12">
              <div className="trust-icon">✓</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section package-slider-section parallax-panel">
        <div className="section-heading">
          <span className="kicker">Service plans</span>
          <h2>Flexible support for every stage of your journey.</h2>
        </div>
        <div className="package-slider">
          <button type="button" className="slider-arrow" onClick={prevPlan} aria-label="Previous plan">‹</button>
          <div className={`package-card ${currentPlan.highlight ? 'package-card--highlight' : ''}`}>
            <span className="package-badge">{currentPlan.name}</span>
            <h3>{currentPlan.price}</h3>
            <ul>
              {currentPlan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <Link className="btn" to="/attestation-calculator">Explore plan</Link>
          </div>
          <button type="button" className="slider-arrow" onClick={nextPlan} aria-label="Next plan">›</button>
        </div>
      </section>

      <section className="section testimonial-section parallax-panel">
        <div className="section-heading">
          <span className="kicker">Client feedback</span>
          <h2>People trust us when the process matters most.</h2>
        </div>
        <div className="testimonial-carousel">
          <button type="button" className="slider-arrow" onClick={prevTestimonial} aria-label="Previous testimonial">‹</button>
          <div className="testimonial-card">
            <div className="stars">★★★★★</div>
            <p>“{currentTestimonial.quote}”</p>
            <div className="testimonial-meta">
              <strong>{currentTestimonial.name}</strong>
              <span>{currentTestimonial.role}</span>
            </div>
          </div>
          <button type="button" className="slider-arrow" onClick={nextTestimonial} aria-label="Next testimonial">›</button>
        </div>
      </section>

      <section className="contact-showcase parallax-panel">
        <div className="contact-showcase__content">
          <span className="kicker">Book a consultation</span>
          <h2>Start your next visa or travel plan with a trusted expert.</h2>
          <p>
            Whether you need a fast Saudi visa review, document attestation help, or a premium Umrah package,
            our consultants are ready to guide your next step.
          </p>
          <div className="contact-highlights">
            <span>Saudi Visa</span>
            <span>QVP</span>
            <span>MOFA</span>
            <span>Umrah</span>
          </div>
        </div>
        <div className="contact-form-card parallax-layer" data-depth="0.2">
          <h3>Request a callback</h3>
          <div className="mini-form">
            <input type="text" placeholder="Your full name" />
            <input type="tel" placeholder="Phone / WhatsApp" />
            <input type="email" placeholder="Email address" />
            <textarea rows="3" placeholder="Tell us what you need help with" />
            <div className="row contact-row">
              <button className="btn" type="button">Send request</button>
              <a className="btn ghost" href={WA}>WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  </>);
}

function Saudi() {
  return (<section className="page"><h1>Saudi visa services</h1>
    <p className="lead">Saudi visa services, QVP, Tasheer, biometric and medical appointments, and attestation in one place.</p>
    <div className="grid">{saudiSections.map(s => (<article key={s.id} id={s.id} className="panel"><h2>{s.title}</h2><p>{s.text}</p>
      {s.link && <Link to={s.link}>Read the guide</Link>}</article>))}</div>
    <InquiryForm /></section>);
}

function Guide() {
  const g = guides[useParams().slug];
  if (!g) return <section className="page"><h1>Guide not found</h1></section>;
  return (<section className="page narrow"><h1>{g.title}</h1><p className="lead">{g.intro}</p>
    {g.blocks.map(([h, items]) => (<div key={h}><h2>{h}</h2>
      {h === 'Steps' ? <ol>{items.map(i => <li key={i}>{i}</li>)}</ol> : <ul>{items.map(i => <li key={i}>{i}</li>)}</ul>}</div>))}
    <InquiryForm /></section>);
}

function Calculator() {
  const [cfg, setCfg] = useState(null);
  const [sel, setSel] = useState({ country: 'Saudi Arabia', document: 'Degree Certificate', service: '' });
  useEffect(() => { fetch('/api/attestation').then(r => r.json()).then(setCfg).catch(() => setCfg(false)); }, []);
  if (cfg === false) return <section className="page"><p>Could not load the calculator. Is the server running?</p></section>;
  if (!cfg) return <section className="page"><p>Loading...</p></section>;
  const opts = cfg.services[sel.country] || cfg.services.default;
  const svc = opts.find(o => o.id === sel.service) || opts[0];
  const docs = [...cfg.baseDocs, ...(cfg.extraDocs[sel.document] || []),
    ...(svc.id.includes('mosadaqa') || svc.id === 'full' ? cfg.mosadaqaDocs : [])];
  const set = k => e => setSel(s => ({ ...s, [k]: e.target.value, ...(k === 'country' ? { service: '' } : {}) }));
  return (<section className="page narrow"><h1>Document attestation calculator</h1>
    <div className="form">
      <label>Country<select value={sel.country} onChange={set('country')}>{cfg.countries.map(c => <option key={c}>{c}</option>)}</select></label>
      <label>Document<select value={sel.document} onChange={set('document')}>{cfg.documents.map(c => <option key={c}>{c}</option>)}</select></label>
      <label>Service<select value={svc.id} onChange={set('service')}>{opts.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}</select></label></div>
    <div className="panel result"><h2>Required documents</h2><ul>{docs.map(d => <li key={d}>{d}</li>)}</ul>
      <h2>Estimated timeline</h2><p>{svc.days}</p></div>
    <h2>Get started</h2>
    <InquiryForm quote={{ country: sel.country, document: sel.document, service: svc.label }} /></section>);
}

function InquiryForm({ quote }) {
  const [f, setF] = useState({ name: '', phone: '', email: '', message: '' });
  const [state, setState] = useState('idle');
  const on = k => e => setF({ ...f, [k]: e.target.value });
  async function submit() {
    if (!f.name || !f.phone) return setState('missing');
    setState('sending');
    try {
      const r = await fetch('/api/inquiries', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...f, quote, service: quote?.service }) });
      setState(r.ok ? 'sent' : 'error');
    } catch { setState('error'); }
  }
  if (state === 'sent') return <p className="ok">Request sent. We will contact you on {f.phone}.</p>;
  return (<div className="form">
    <label>Name<input value={f.name} onChange={on('name')} /></label>
    <label>Phone / WhatsApp<input value={f.phone} onChange={on('phone')} /></label>
    <label>Email (optional)<input value={f.email} onChange={on('email')} /></label>
    <label>Message<textarea rows="3" value={f.message} onChange={on('message')} /></label>
    {state === 'missing' && <p className="err">Enter your name and phone number.</p>}
    {state === 'error' && <p className="err">Could not send. Message us on WhatsApp instead.</p>}
    <div className="row"><button className="btn" onClick={submit} disabled={state === 'sending'}>Send request</button>
      <a className="btn ghost" href={WA}>WhatsApp us</a></div></div>);
}

export default function App() {
  const [adminPassword, setAdminPassword] = useState(localStorage.getItem('adminPassword') || '');
  const [theme, setTheme] = useState('luxury');

  useEffect(() => {
    const handlePointer = (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 18;
      const y = (event.clientY / window.innerHeight - 0.5) * 18;
      document.documentElement.style.setProperty('--pointer-x', `${x}px`);
      document.documentElement.style.setProperty('--pointer-y', `${y}px`);
    };

    const handleScroll = () => {
      const offset = window.scrollY * 0.14;
      document.documentElement.style.setProperty('--scroll-depth', `${offset}px`);
    };

    window.addEventListener('pointermove', handlePointer);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function handleToggleTheme() {
    setTheme((currentTheme) => (currentTheme === 'luxury' ? 'dark' : 'luxury'));
  }

  function handleAdminLogin(pwd) {
    setAdminPassword(pwd);
    localStorage.setItem('adminPassword', pwd);
  }

  function handleAdminLogout() {
    setAdminPassword('');
    localStorage.removeItem('adminPassword');
  }

  return (
    <div className={`app-shell ${theme}`}>
      <Layout theme={theme} onToggleTheme={handleToggleTheme}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/saudi-visa-services" element={<Saudi />} />
          <Route path="/umrah-packages" element={<UmrahPackages />} />
          <Route path="/attestation-calculator" element={<Calculator />} />
          <Route path="/guides/:slug" element={<Guide />} />
          <Route
            path="/admin"
            element={
              adminPassword ? (
                <AdminDashboard adminPassword={adminPassword} onLogout={handleAdminLogout} />
              ) : (
                <AdminLogin onLogin={handleAdminLogin} />
              )
            }
          />
          <Route path="*" element={<section className="page"><h1>Page not found</h1></section>} />
        </Routes>
      </Layout>
    </div>
  );
}
