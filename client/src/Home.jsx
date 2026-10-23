import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { services, saudiSections, stats, highlights, processSteps, faq, testimonials, packagePlans, PHONE, WA } from './content.js';
import { countryMenu } from './countries/index.js';
import { Icon, Flag, CountUp, FlightMap, SkyPlanes, DriftingDocs, HeroStage, RotatingWord, Accordion, Marquee } from './ui.jsx';

const AUTHORITIES = ['HEC', 'IBCC', 'MOFA Pakistan', 'Mosadaqa', 'Saudi Embassy', 'Saudi Consulate Karachi', 'Wafid (GAMCA)', 'Tasheer', 'PACC · QVP', 'Takamol SVP', 'NAVTTC', 'Bureau of Emigration', 'OPF', 'NADRA', 'ICAP', 'ICMAP', 'PM&DC'];

const JOURNEY = [
  { n: '01', title: 'Visa', sub: 'Employer issues', icon: 'doc', to: '/work-visa' },
  { n: '02', title: 'Wakala', sub: 'In our name', icon: 'briefcase', to: '/saudi-arabia/wakala-services' },
  { n: '03', title: 'SVP / QVP', sub: 'Skill or degree check', icon: 'clip', to: '/saudi-arabia/qvp-takamol-svp' },
  { n: '04', title: 'Wafid', sub: 'Medical', icon: 'pulse', to: '/gcc/wafid-gamca-medical' },
  { n: '05', title: 'Tasheer', sub: 'Biometrics', icon: 'finger', to: '/visa-stamping' },
  { n: '06', title: 'Stamping', sub: 'Embassy', icon: 'stamp', to: '/saudi-arabia/visa-stamping-protector' },
  { n: '07', title: 'Protector', sub: 'BEOE + OEC', icon: 'shield', to: '/saudi-arabia/visa-stamping-protector' },
  { n: '08', title: 'Fly', sub: 'Welcome to KSA', icon: 'plane', to: '/contact' },
];

const WHO = [
  { icon: 'briefcase', title: 'Skilled workers', text: 'Electricians, plumbers, welders, drivers and technicians. Skill test, medical, stamping and protector.', to: '/work-visa' },
  { icon: 'passport', title: 'Professionals', text: 'Engineers, accountants, doctors, nurses and IT. Degree attestation, Mosadaqa and QVP.', to: '/qvp' },
  { icon: 'users', title: 'Families', text: 'Family visit and Iqama visas, Nikah Nama and birth certificate attestation, family Umrah.', to: '/visit-visa' },
  { icon: 'globe', title: 'Employers', text: 'Wakala, bulk visas and recruitment of tested workers and qualified professionals.', to: '/recruitment' },
];

const SERVICE_META = [
  { icon: 'doc', to: '/saudi-arabia/wakala-services', hl: true },
  { icon: 'briefcase', to: '/work-visa', hl: true },
  { icon: 'users', to: '/visit-visa', hl: true },
  { icon: 'finger', to: '/visa-stamping' },
  { icon: 'shield', to: '/saudi-arabia/visa-stamping-protector' },
  { icon: 'clip', to: '/saudi-arabia/qvp-takamol-svp' },
  { icon: 'stamp', to: '/saudi-arabia-attestation', hl: true },
  { icon: 'hand', to: '/recruitment' },
  { icon: 'moon', to: '/umrah-packages' },
  { icon: 'globe', to: '/contact' },
];

const SECTION_ICONS = ['briefcase', 'passport', 'clip', 'shield', 'finger', 'stamp'];

export function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [paused, setPaused] = useState(false);

  const nextTestimonial = () => setActiveTestimonial((c) => (c + 1) % testimonials.length);
  const prevTestimonial = () => setActiveTestimonial((c) => (c - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (paused) return undefined;
    const id = setInterval(() => setActiveTestimonial((c) => (c + 1) % testimonials.length), 7000);
    return () => clearInterval(id);
  }, [paused]);

  const currentTestimonial = testimonials[activeTestimonial];

  return (<>
    {/* ============================ HERO ============================ */}
    <section className="hero">
      <div className="hero__bg" aria-hidden="true">
        <span className="hero__aurora hero__aurora--1" />
        <span className="hero__aurora hero__aurora--2" />
        <FlightMap />
        <SkyPlanes count={4} />
      </div>
      <DriftingDocs className="drift--hero" />

      <div className="wrap hero__grid">
        <div className="hero__content">
          <p className="pill"><span className="live-dot" /> Saudi &amp; Gulf visa specialists · Pakistan office + team in KSA</p>
          <h1>
            Your <RotatingWord words={['visa', 'documents', 'job abroad', 'Umrah']} />,<br />
            <em>handled by experts.</em>
          </h1>
          <p className="hero__lead">
            Wakala, Saudi work and family visas, Wafid medical, Tasheer, visa stamping, protector, QVP and skill tests, attestation,
            recruitment and Umrah. One team from your first question to your flight.
          </p>
          <div className="hero__actions">
            <Link className="btn btn-gold btn-lg" to="/contact">Book an appointment <Icon name="arrow" size={18} /></Link>
            <a className="btn btn-wa btn-lg" href={WA} target="_blank" rel="noreferrer"><Icon name="wa" size={20} /> WhatsApp us</a>
          </div>

          <div className="hero__badges" aria-label="Supported destinations">
            {countryMenu.map((c) => (
              <span key={c.country} className="hero__badge"><Flag emoji={c.flag} />{c.country}</span>
            ))}
          </div>

          <div className="hero__stats">
            <div className="mini-stat"><strong><CountUp to={5000} suffix="+" /></strong><span>people served</span></div>
            <div className="mini-stat"><strong>CA</strong><span>Chartered Accountant CEO</span></div>
            <div className="mini-stat"><strong><CountUp to={6} /></strong><span>countries covered</span></div>
          </div>
        </div>

        <div className="hero__visual">
          <HeroStage />
        </div>
      </div>

      <a className="hero__scroll" href="#journey" aria-label="Scroll to the visa journey"><span /></a>
    </section>

    <Marquee items={AUTHORITIES} />

    {/* ============================ JOURNEY ============================ */}
    <section className="section" id="journey">
      <div className="wrap">
        <div className="journey">
          <SkyPlanes count={1} className="sky--soft" />
          <div className="journey__head">
            <div>
              <span className="kicker kicker--light">Saudi work visa journey</span>
              <h2>8 steps from visa to flight. We handle all of them.</h2>
            </div>
            <Link className="btn btn-glass" to="/work-visa">Work visa guide <Icon name="arrow" size={16} /></Link>
          </div>
          <div className="journey__track">
            <span className="journey__line"><span className="journey__plane"><Icon name="plane" size={26} /></span></span>
            {JOURNEY.map((s, i) => (
              <Link key={s.n} to={s.to} className="stop reveal" style={{ '--d': `${i * 90}ms` }}>
                <span className="stop__dot"><Icon name={s.icon} size={20} style={s.icon === 'plane' ? { transform: 'rotate(90deg)' } : undefined} /></span>
                <em>{s.n}</em>
                <b>{s.title}</b>
                <small>{s.sub}</small>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* ============================ WHO ============================ */}
    <section className="section section--tight">
      <div className="wrap">
        <div className="section-heading reveal">
          <span className="kicker">Who we help</span>
          <h2>Whatever your reason to travel, we know the route</h2>
        </div>
        <div className="who">
          {WHO.map((w, i) => (
            <Link key={w.title} to={w.to} className="who-card spot reveal" style={{ '--d': `${i * 80}ms` }}>
              <span className="who-card__icon"><Icon name={w.icon} size={26} /></span>
              <h3>{w.title}</h3>
              <p>{w.text}</p>
              <span className="go">Learn more <Icon name="arrow" size={16} /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* ============================ SERVICES ============================ */}
    <section className="section section--soft">
      <div className="wrap">
        <div className="section-heading reveal">
          <span className="kicker">Core services</span>
          <h2>Everything you need for visa success and international travel.</h2>
        </div>
        <div className="svc-grid">
          {services.map((s, i) => {
            const meta = SERVICE_META[i] || { icon: 'doc', to: '/contact' };
            return (
              <Link key={s.title} to={meta.to} className={`svc spot reveal ${meta.hl ? 'svc--hl' : ''}`} style={{ '--d': `${(i % 3) * 80}ms` }}>
                <span className="svc__icon"><Icon name={meta.icon} size={24} /></span>
                <h3>{s.title}</h3>
                <ul>{s.items.map((it) => <li key={it}>{it}</li>)}</ul>
                <span className="go">Explore <Icon name="arrow" size={16} /></span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>

    {/* ============================ NUMBERS ============================ */}
    <section className="numbers">
      <DriftingDocs className="drift--numbers" />
      <div className="wrap numbers__grid">
        <div className="num reveal"><strong><CountUp to={5000} suffix="+" /></strong><span>people served</span></div>
        <div className="num reveal" style={{ '--d': '80ms' }}><strong><CountUp to={6} /></strong><span>destination countries</span></div>
        <div className="num reveal" style={{ '--d': '160ms' }}><strong><CountUp to={24} suffix="h" /></strong><span>response window</span></div>
        <div className="num reveal" style={{ '--d': '240ms' }}><strong><CountUp to={100} suffix="%" /></strong><span>clarity-first guidance</span></div>
      </div>
    </section>

    {/* ============================ WHY ============================ */}
    <section className="section">
      <div className="wrap why">
        <div className="why__copy reveal">
          <span className="kicker">Why choose us</span>
          <h2>Industry experts in documents, visas and stamping.</h2>
          <div className="trust-note-box">
            <Icon name="shield" size={28} />
            <div>
              <strong>Our team knows every step of the process and handles your file from start to finish.</strong>
              <span>Our CEO is a Chartered Accountant who personally oversees professional visa files, so engineers, accountants, doctors and other professionals get advice from someone who understands degrees, qualifications and Saudi requirements first-hand.</span>
            </div>
          </div>
          <div className="row">
            <Link className="btn" to="/contact">Talk to our team <Icon name="arrow" size={16} /></Link>
            <a className="btn ghost" href={WA} target="_blank" rel="noreferrer">WhatsApp us</a>
          </div>
        </div>
        <div className="why__grid">
          {highlights.map((item, i) => (
            <div key={item.title} className="why-item spot reveal" style={{ '--d': `${i * 70}ms` }}>
              <span className="why-item__num">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ============================ HOW WE WORK ============================ */}
    <section className="section section--dark how">
      <SkyPlanes count={2} className="sky--soft" />
      <div className="wrap">
        <div className="section-heading section-heading--light reveal">
          <span className="kicker kicker--light">How we work</span>
          <h2>A professional process designed to reduce stress and delays.</h2>
        </div>
        <ol className="how__steps">
          {processSteps.map((step, i) => (
            <li key={step.step} className="how-card reveal" style={{ '--d': `${i * 110}ms` }}>
              <span className="how-card__n">{step.step}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="how__plane" aria-hidden="true"><span><Icon name="plane" size={24} /></span></div>
      </div>
    </section>

    {/* ============================ COUNTRIES ============================ */}
    <section className="section">
      <div className="wrap">
        <div className="section-heading reveal">
          <span className="kicker">Country coverage</span>
          <h2>Focused expertise across the destinations clients trust most.</h2>
        </div>
        <div className="country-grid">
          {countryMenu.map((country, i) => (
            <Link key={country.country} to={country.path} className="country-card spot reveal" style={{ '--d': `${(i % 3) * 80}ms` }}>
              <Flag emoji={country.flag} className="country-card__flag" />
              <div>
                <strong>{country.country}</strong>
                <small>Visa &amp; attestation support</small>
              </div>
              <Icon name="arrow" size={20} className="country-card__go" />
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* ============================ SAUDI COVERAGE ============================ */}
    <section className="section section--soft">
      <div className="wrap">
        <div className="section-heading reveal">
          <span className="kicker">Popular services</span>
          <h2>A focused line-up of Saudi visa and documentation services.</h2>
        </div>
        <div className="coverage-grid">
          {saudiSections.slice(0, 6).map((s, i) => (
            <article key={s.id} className="coverage-card spot reveal" style={{ '--d': `${(i % 3) * 80}ms` }}>
              <span className="coverage-card__icon"><Icon name={SECTION_ICONS[i % SECTION_ICONS.length]} size={22} /></span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              {s.link && <Link className="go" to={s.link}>Read guide <Icon name="arrow" size={16} /></Link>}
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* ============================ PLANS ============================ */}
    <section className="section">
      <div className="wrap">
        <div className="section-heading reveal">
          <span className="kicker">Service plans</span>
          <h2>Flexible support for every stage of your journey.</h2>
        </div>
        <div className="plans">
          {packagePlans.map((plan, i) => (
            <div key={plan.name} className={`plan reveal ${plan.highlight ? 'plan--highlight' : ''}`} style={{ '--d': `${i * 100}ms` }}>
              {plan.highlight && <span className="plan__ribbon"><Icon name="star" size={14} /> Most chosen</span>}
              <span className="package-badge">{plan.name}</span>
              <h3>{plan.price}</h3>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}><Icon name="check" size={18} />{feature}</li>
                ))}
              </ul>
              <Link className={`btn ${plan.highlight ? 'btn-gold' : ''}`} to="/attestation-calculator">Explore plan <Icon name="arrow" size={16} /></Link>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ============================ TESTIMONIALS ============================ */}
    <section className="section section--soft testimonial-section">
      <div className="wrap">
        <div className="section-heading reveal">
          <span className="kicker">Client feedback</span>
          <h2>People trust us when the process matters most.</h2>
        </div>
        <div className="testimonial-carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <button type="button" className="slider-arrow" onClick={prevTestimonial} aria-label="Previous testimonial">‹</button>
          <div className="testimonial-card" key={activeTestimonial}>
            <Icon name="quote" size={40} className="testimonial-card__quote" />
            <div className="stars" aria-label="5 out of 5 stars">{[0, 1, 2, 3, 4].map((n) => <Icon key={n} name="star" size={18} />)}</div>
            <p>“{currentTestimonial.quote}”</p>
            <div className="testimonial-meta">
              <span className="testimonial-meta__avatar">{currentTestimonial.name.charAt(0)}</span>
              <div>
                <strong>{currentTestimonial.name}</strong>
                <span>{currentTestimonial.role}</span>
              </div>
            </div>
          </div>
          <button type="button" className="slider-arrow" onClick={nextTestimonial} aria-label="Next testimonial">›</button>
        </div>
        <div className="dots" role="tablist" aria-label="Choose testimonial">
          {testimonials.map((t, i) => (
            <button key={t.name} type="button" role="tab" aria-selected={i === activeTestimonial} aria-label={`Testimonial ${i + 1}`} className={i === activeTestimonial ? 'is-active' : ''} onClick={() => setActiveTestimonial(i)} />
          ))}
        </div>
      </div>
    </section>

    {/* ============================ FAQ ============================ */}
    <section className="section">
      <div className="wrap faq-layout">
        <div className="faq-intro reveal">
          <span className="kicker">FAQs</span>
          <h2>Common questions from clients before they apply.</h2>
          <p>Can't find your answer? Message us on WhatsApp and a visa specialist will reply within 24 hours.</p>
          <a className="btn btn-wa" href={WA} target="_blank" rel="noreferrer"><Icon name="wa" size={20} /> Ask on WhatsApp</a>
        </div>
        <div className="reveal" style={{ '--d': '100ms' }}>
          <Accordion items={faq} />
        </div>
      </div>
    </section>

    {/* ============================ CONTACT ============================ */}
    <section className="section section--tight">
      <div className="wrap">
        <div className="contact-showcase">
          <div className="contact-showcase__content">
            <span className="kicker kicker--light">Book a consultation</span>
            <h2>Start your next visa or travel plan with a trusted expert.</h2>
            <p>
              Whether you need a fast Saudi visa review, document attestation help, or a premium Umrah package,
              our consultants are ready to guide your next step.
            </p>
            <div className="contact-highlights">
              {['Saudi Visa', 'QVP', 'MOFA', 'Umrah'].map((t) => <span key={t}><Icon name="check" size={16} />{t}</span>)}
            </div>
            <div className="contact-lines">
              <a href={`tel:${PHONE.replace(/\s+/g, '')}`}><Icon name="phone" size={18} />{PHONE}</a>
              <a href={WA} target="_blank" rel="noreferrer"><Icon name="wa" size={18} />WhatsApp</a>
            </div>
          </div>
          <div className="contact-form-card" data-tilt="3">
            <h3>Request a callback</h3>
            <div className="mini-form">
              <input type="text" placeholder="Your full name" aria-label="Your full name" />
              <input type="tel" placeholder="Phone / WhatsApp" aria-label="Phone or WhatsApp" />
              <input type="email" placeholder="Email address" aria-label="Email address" />
              <textarea rows="3" placeholder="Tell us what you need help with" aria-label="How can we help" />
              <div className="row contact-row">
                <button className="btn btn-gold" type="button">Send request <Icon name="arrow" size={16} /></button>
                <a className="btn ghost" href={WA}>WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ============================ CTA BAND ============================ */}
    <section className="cta-wrap">
      <div className="wrap">
        <div className="cta-band">
          <SkyPlanes count={2} className="sky--soft" />
          <DriftingDocs className="drift--cta" />
          <div className="cta-band__copy">
            <span className="kicker kicker--light">Ready when you are</span>
            <h2>Let’s plan the right next step for your visa, attestation, or Umrah journey.</h2>
          </div>
          <div className="cta-band__actions">
            <a className="btn btn-gold btn-lg" href={WA}>WhatsApp now <Icon name="arrow" size={18} /></a>
            <a className="btn btn-glass btn-lg" href={`tel:${PHONE.replace(/\s+/g, '')}`}><Icon name="phone" size={18} /> Call {PHONE}</a>
          </div>
        </div>
      </div>
    </section>
  </>);
}
