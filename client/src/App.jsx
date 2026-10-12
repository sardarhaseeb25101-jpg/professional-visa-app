import { useEffect, useState } from 'react';
import { Routes, Route, Link, NavLink, useParams } from 'react-router-dom';
import { services, saudiSections, guides, stats, highlights, processSteps, faq, testimonials, packagePlans, PHONE, WA, EMAIL, ADDRESS, BRAND_NAME, BRAND_SHORT, aiReplyBank } from './content.js';
import {
  countryMenu,
  saudiAttestationServices,
  saudiAttestationPages,
  uaeAttestationPage,
  qatarAttestationPage,
  turkeyAttestationPage,
  vietnamAttestationPage,
  bahrainAttestationPage
} from './countries/index.js';
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
      <nav>
        <NavLink to="/">Home</NavLink>
        <div className="country-menu">
          <button type="button" className="country-menu__trigger">Services ▾</button>
          <div className="country-menu__panel">
            {countryMenu.map((item) => item.disabled ? (
              <span key={item.country} className="country-menu__item country-menu__item--disabled">
                <span className="country-menu__flag">{item.flag || '🌍'}</span>
                <span>{item.country}</span>
              </span>
            ) : (
              <NavLink key={item.country} to={item.path} className="country-menu__item">
                <span className="country-menu__flag">{item.flag || '🌍'}</span>
                <span>{item.country}</span>
              </NavLink>
            ))}
          </div>
        </div>
        <NavLink to="/umrah-packages">Umrah packages</NavLink>
        <NavLink to="/attestation-calculator">Attestation calculator</NavLink>
        <NavLink to="/guides/mosadaqa">Mosadaqa guide</NavLink>
        <NavLink to="/guides/qvp">QVP guide</NavLink>
      </nav>
      <div className="nav-actions">
        <button type="button" className="theme-toggle" onClick={onToggleTheme}>
          {theme === 'luxury' ? 'Dark mode' : 'Luxury mode'}
        </button>
        <Link to="/attestation-calculator" className="btn header-cta">Get consultation</Link>
      </div>
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
          <h1>Your journey starts with the right guidance.</h1>
          <p>
            Navigate Saudi visa applications, QVP processing, document attestation, degree verification, and Umrah travel with professional guidance, clear requirements, and service tailored to your journey.
          </p>
          <div className="row">
            <Link className="btn" to="/attestation-calculator">Explore our services</Link>
            <a className="btn ghost" href={WA}>Chat on WhatsApp</a>
          </div>

          <div className="hero__badges" aria-label="Supported destinations">
            {['Saudi Arabia', 'UAE', 'Qatar', 'Turkey', 'Vietnam', 'Bahrain'].map((place) => (
              <span key={place} className="hero__badge">{place}</span>
            ))}
          </div>

          <div className="hero__proof" aria-label="Service highlights">
            <span>HEC support</span>
            <span>MOFA guidance</span>
            <span>Saudi embassy paperwork</span>
            <span>Umrah planning</span>
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
        <div className="trust-note-box">
          <strong>Trusted for complex case preparation.</strong>
          <span>Every application is reviewed with a practical, transparent process that keeps the paperwork and timeline under control.</span>
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

      <section className="section section--soft parallax-panel">
        <div className="results-showcase">
          <div className="results-showcase__copy">
            <span className="kicker">Why families and professionals choose us</span>
            <h2>Support that keeps your application organized, transparent, and moving.</h2>
            <p>From first document review to embassy filing, we help you understand every stage, reduce unnecessary delays, and prepare a cleaner application from the start.</p>
          </div>
          <div className="results-grid">
            <div className="result-card">
              <strong>1:1</strong>
              <span>case review</span>
            </div>
            <div className="result-card">
              <strong>24h</strong>
              <span>response window</span>
            </div>
            <div className="result-card">
              <strong>100%</strong>
              <span>clarity-first guidance</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section country-spotlight parallax-panel">
        <div className="section-heading">
          <span className="kicker">Country coverage</span>
          <h2>Focused expertise across the destinations clients trust most.</h2>
        </div>
        <div className="country-grid">
          {countryMenu.map((country) => (
            <Link key={country.country} to={country.path} className="country-card parallax-layer" data-depth="0.08">
              <span className="country-card__flag">{country.flag}</span>
              <div>
                <strong>{country.country}</strong>
                <small>Visa & attestation support</small>
              </div>
            </Link>
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

      <section className="cta-band parallax-panel">
        <div>
          <span className="kicker">Ready when you are</span>
          <h2>Let’s plan the right next step for your visa, attestation, or Umrah journey.</h2>
        </div>
        <div className="row cta-band__actions">
          <a className="btn" href={WA}>WhatsApp now</a>
          <a className="btn ghost" href={`tel:${PHONE.replace(/\s+/g, '')}`}>Call {PHONE}</a>
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

function SaudiArabiaAttestationHome() {
  const trustPoints = [
    'Clear guidance for HEC, MOFA, and Saudi embassy requirements',
    'Support for academic, personal, professional, and commercial documents',
    'Prepared checklists and processing expectations before submission',
  ];

  const documentCategories = [
    'Degree & transcript',
    'Diploma & education',
    'Marriage & family',
    'Birth & B-form',
    'School records',
    'Professional certificates',
    'Police & legal docs',
    'Commercial papers',
  ];

  return (
    <section className="page attestation-landing">
      <div className="service-hero premium-hero">
        <div className="premium-hero__content">
          <span className="kicker">Saudi Arabia attestation</span>
          <h1>Saudi Arabia Attestation & Document Legalization</h1>
          <p className="lead">Reliable assistance for degree verification, marriage records, birth certificates, police reports, business documents, and other paperwork required for Saudi Arabia.</p>
          <div className="hero-cta-row">
            <a className="btn ghost" href={WA} target="_blank" rel="noreferrer">WhatsApp us</a>
          </div>
          <div className="trust-pills">
            {trustPoints.map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>

        <div className="premium-hero__card panel">
          <div className="mini-kicker">Service snapshot</div>
          <h3>Document review support for Saudi Arabia</h3>
          <ul>
            <li>Saudi embassy and consulate requirements</li>
            <li>HEC, MOFA, and Saudi Cultural Mission guidance</li>
            <li>Professional visa and family documentation support</li>
          </ul>
          <div className="stat-row">
            <div>
              <strong>15-20d</strong>
              <span>typical degree pipeline</span>
            </div>
            <div>
              <strong>3-7d</strong>
              <span>shorter family checks</span>
            </div>
          </div>
        </div>
      </div>

      <div className="document-filter-wrap">
        <div className="document-filter-header">
          <span className="mini-kicker">Popular document types</span>
        </div>
        <div className="document-pills">
          {documentCategories.map((item) => <span key={item}>{item}</span>)}
        </div>
      </div>

      <div className="info-grid">
        <div className="panel stat-box">
          <strong>Our services at a glance</strong>
          <ul>
            <li>Saudi Embassy and Consulate Attestation</li>
            <li>Saudi Cultural Mission Degree Attestation</li>
            <li>HEC Degree Attestation Assistance</li>
            <li>Diploma and Educational Certificate Attestation</li>
            <li>Marriage and Birth Certificate Attestation</li>
            <li>Professional Certificate Attestation</li>
            <li>Police Character Certificate Attestation</li>
            <li>Commercial Document Legalization</li>
          </ul>
        </div>
        <div className="panel stat-box">
          <strong>Why choose us</strong>
          <ul>
            <li>Clear documentation guidance</li>
            <li>Assistance across academic, personal, professional, and commercial documents</li>
            <li>Structured application preparation</li>
            <li>Support for Saudi Arabia requirements and submission checklists</li>
          </ul>
        </div>
      </div>

      <div className="page-section">
        <h2>About Professional Travel & Visa Services</h2>
        <p>Professional Travel & Visa Services provides guidance and assistance for document attestation and legalization procedures for Saudi Arabia. We understand that preparing official documents for international use can involve several stages, different authorities, and specific paperwork. Our aim is to make the process easier to understand by helping clients identify the relevant requirements and organize their documentation.</p>
      </div>

      <div className="page-section process-band" id="attestation-services">
        <div className="section-heading compact-header">
          <span className="kicker">How it works</span>
          <h2>A clear path from document review to final submission.</h2>
        </div>
        <div className="process-timeline">
          <div className="timeline-item">
            <span>01</span>
            <h3>Document review</h3>
            <p>We assess the document type, visa purpose, and authority involved.</p>
          </div>
          <div className="timeline-item">
            <span>02</span>
            <h3>Checklist preparation</h3>
            <p>We clarify which supporting papers, translations, and copies are required.</p>
          </div>
          <div className="timeline-item">
            <span>03</span>
            <h3>Submission support</h3>
            <p>We help you organize the file so it is ready for embassy or authority review.</p>
          </div>
        </div>
      </div>

      <div className="page-section">
        <h2>Our attestation services</h2>
        <div className="service-grid">
          {saudiAttestationServices.map((service) => (
            <article key={service.slug} className="panel service-page-card">
              <div className="service-card__badge">Saudi</div>
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
              <Link to={`/saudi-arabia-attestation/${service.slug}`}>View requirements</Link>
            </article>
          ))}
        </div>
      </div>

      <InquiryForm quote={{ country: 'Saudi Arabia', service: 'Saudi Arabia document attestation' }} />
    </section>
  );
}

function SaudiAttestationDetail() {
  const { slug } = useParams();
  const page = saudiAttestationPages[slug];

  if (!page) {
    return <section className="page"><h1>Service not found</h1><p className="lead">This attestation page does not exist yet.</p></section>;
  }

  return (
    <section className="page narrow">
      <div className="service-hero">
        <span className="kicker">Saudi Arabia attestation</span>
        <h1>{page.title}</h1>
        <p className="lead">{page.intro}</p>
      </div>

      <div className="info-grid">
        <div className="panel stat-box">
          <strong>Estimated processing time</strong>
          <p>{page.process}</p>
        </div>
        <div className="panel stat-box">
          <strong>Typical authority route</strong>
          <p>HEC, MOFA, Saudi Cultural Mission, Saudi Embassy / Consulate, or relevant provincial authority depending on the document.</p>
        </div>
      </div>

      <div className="page-section">
        <h2>Required documents</h2>
        <ul>{page.checklist.map((item) => <li key={item}>{item}</li>)}</ul>
      </div>

      <div className="page-section">
        <h2>Important requirements</h2>
        <ul>{page.important.map((item) => <li key={item}>{item}</li>)}</ul>
      </div>

      <div className="page-section">
        <h2>Processing note</h2>
        <p>{page.note}</p>
      </div>

      <InquiryForm quote={{ country: 'Saudi Arabia', document: page.title, service: page.title }} />
    </section>
  );
}

function CountryContentPage({ page }) {
  if (!page) {
    return <section className="page"><h1>Country service not found</h1></section>;
  }

  return (
    <section className="page narrow">
      <div className="service-hero">
        <span className="kicker">Document attestation</span>
        <h1>{page.title}</h1>
        <p className="lead">{page.intro}</p>
      </div>

      {page.sections.map((section) => (
        <div key={section.id || section.heading} className="page-section">
          <h2>{section.heading}</h2>
          {section.text && <p>{section.text}</p>}
          <ul>
            {section.required.map((item) => <li key={item}>{item}</li>)}
          </ul>
          {section.note && <p><strong>Note:</strong> {section.note}</p>}
        </div>
      ))}

      <InquiryForm quote={{ country: page.title, document: page.title, service: page.title }} />
    </section>
  );
}

function Guide() {
  const g = guides[useParams().slug];
  if (!g) return <section className="page"><h1>Guide not found</h1></section>;
  return (<section className="page narrow"><h1>{g.title}</h1><p className="lead">{g.intro}</p>
    {g.blocks.map(([h, items]) => (<div key={h}><h2>{h}</h2>
      {h === 'Steps' ? <ol>{items.map(i => <li key={i}>{i}</li>)}</ol> : <ul>{items.map(i => <li key={i}>{i}</li>)}</ul>}</div>))}
    <InquiryForm /></section>);
}

const fallbackCalculator = {
  countries: ['Saudi Arabia', 'UAE', 'Qatar', 'Kuwait', 'Bahrain', 'Oman', 'Europe / Other'],
  documents: ['Degree Certificate', 'Diploma', 'Transcript', 'Experience Certificate', 'Marriage Certificate', 'Birth Certificate', 'Commercial Document'],
  services: {
    'Saudi Arabia': [
      { id: 'mofa', label: 'MOFA only', days: 'Usually 7-15 working days, depending on the document and authority route.' },
      { id: 'mofa-mosadaqa', label: 'MOFA + Mosadaqa', days: 'Typically 15-20 working days for degree-related cases.' },
      { id: 'full', label: 'MOFA + Mosadaqa + Embassy', days: 'Often 15-25 working days, plus embassy processing time.' },
      { id: 'embassy', label: 'Saudi Embassy / Consulate only', days: 'Timing depends on authority queue and document type.' },
    ],
    default: [
      { id: 'mofa', label: 'MOFA attestation', days: 'The timeline depends on the country and document type.' },
      { id: 'embassy', label: 'MOFA + Embassy attestation', days: 'Requires the full authority and document checklist before final submission.' },
    ],
  },
  baseDocs: ['Original document', 'Clear passport copy (bio page)', 'CNIC copy'],
  extraDocs: {
    'Degree Certificate': ['Matching transcript', 'HEC attestation (before MOFA)'],
    Diploma: ['Matching transcript', 'HEC attestation (before MOFA)'],
    Transcript: ['Matching degree', 'HEC attestation (before MOFA)'],
    'Experience Certificate': ['Company letterhead, stamp and signature', 'Job title, From-To dates, HR contact details'],
    'Marriage Certificate': ['NADRA / Nikah Nama as applicable'],
    'Birth Certificate': ['NADRA birth certificate'],
    'Commercial Document': ['Chamber / company registration papers'],
  },
  mosadaqaDocs: ['Degree and transcript scans', 'HEC and MOFA stamp pictures', 'Name must match passport'],
};

function Calculator() {
  const [cfg, setCfg] = useState(null);
  const [sel, setSel] = useState({ country: 'Saudi Arabia', document: 'Degree Certificate', service: '' });
  useEffect(() => {
    fetch('/api/attestation')
      .then((r) => r.ok ? r.json() : Promise.reject(new Error('Fetch failed')))
      .then(setCfg)
      .catch(() => setCfg(fallbackCalculator));
  }, []);

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
          <Route path="/saudi-arabia-attestation" element={<SaudiArabiaAttestationHome />} />
          <Route path="/saudi-arabia-attestation/:slug" element={<SaudiAttestationDetail />} />
          <Route path="/country/uae" element={<CountryContentPage page={uaeAttestationPage} />} />
          <Route path="/country/qatar" element={<CountryContentPage page={qatarAttestationPage} />} />
          <Route path="/country/turkey" element={<CountryContentPage page={turkeyAttestationPage} />} />
          <Route path="/country/vietnam" element={<CountryContentPage page={vietnamAttestationPage} />} />
          <Route path="/country/bahrain" element={<CountryContentPage page={bahrainAttestationPage} />} />
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
