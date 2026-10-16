import { useEffect, useState } from 'react';
import { Routes, Route, Link, NavLink, useParams } from 'react-router-dom';
import { services, saudiSections, guides, stats, highlights, processSteps, faq, testimonials, packagePlans, PHONE, WA, WA_CHANNEL, FACEBOOK_URL, TIKTOK_URL, EMAIL, ADDRESS, BRAND_NAME, BRAND_SHORT, aiReplyBank } from './content.js';
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

function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [countryMenuOpen, setCountryMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
    setCountryMenuOpen(false);
  };

  return (<>
    <header className="top">
      <Link to="/" className="brand-wrap" aria-label={BRAND_NAME} onClick={closeMenu}>
        <img src="/assets/logo.jpeg" alt={BRAND_NAME} className="brand-logo" />
        <span className="brand">{BRAND_NAME}</span>
      </Link>

      <button
        type="button"
        className="mobile-menu-toggle"
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={menuOpen ? 'nav-open' : ''}>
        <NavLink to="/" onClick={closeMenu}>Home</NavLink>
        <div
          className={`country-menu ${countryMenuOpen ? 'is-open' : ''}`}
          onMouseEnter={() => setCountryMenuOpen(true)}
          onMouseLeave={() => setCountryMenuOpen(false)}
          onFocus={() => setCountryMenuOpen(true)}
          onBlur={() => setCountryMenuOpen(false)}
        >
          <button
            type="button"
            className="country-menu__trigger"
            aria-expanded={countryMenuOpen}
            aria-haspopup="true"
            onClick={() => setCountryMenuOpen((value) => !value)}
          >
            Services ▾
          </button>
          <div className="country-menu__panel">
            {countryMenu.map((item) => item.disabled ? (
              <span key={item.country} className="country-menu__item country-menu__item--disabled">
                <span className="country-menu__flag">{item.flag || '🌍'}</span>
                <span>{item.country}</span>
              </span>
            ) : (
              <NavLink key={item.country} to={item.path} className="country-menu__item" onClick={closeMenu}>
                <span className="country-menu__flag">{item.flag || '🌍'}</span>
                <span>{item.country}</span>
              </NavLink>
            ))}
          </div>
        </div>
        <NavLink to="/umrah-packages" onClick={closeMenu}>Umrah packages</NavLink>
        <NavLink to="/attestation-calculator" onClick={closeMenu}>Requirements</NavLink>
        <NavLink to="/guides/mosadaqa" onClick={closeMenu}>Mosadaqa / Saudi Culture</NavLink>
        <NavLink to="/guides/qvp" onClick={closeMenu}>QVP guide</NavLink>
      </nav>
      <div className="nav-actions">
        <Link to="/attestation-calculator" className="btn header-cta" onClick={closeMenu}>Get consultation</Link>
      </div>
    </header>
    <main>{children}</main>
    <footer>
      <div className="footer-trust-block">
        <p><b>Professional Travel & Visa Services Office:</b> {ADDRESS}</p>
        <p>OEP / BEOE licence no.: [confirm] · Phone / WhatsApp: {PHONE} · Email: {EMAIL}</p>
        <p>Office hours: [confirm]</p>
      </div>
      <div className="footer-follow-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', margin: '12px 0 18px', alignItems: 'center' }}>
        <a className="btn ghost" href={WA_CHANNEL} target="_blank" rel="noreferrer">Follow our WhatsApp channel</a>
        <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" aria-label="Follow us on Facebook">Facebook</a>
        <a href={TIKTOK_URL} target="_blank" rel="noreferrer" aria-label="Follow us on TikTok">TikTok</a>
      </div>
      <p><b>{BRAND_NAME}</b></p>
      <p>{ADDRESS}</p>
      <p>{PHONE} · <a href={`mailto:${EMAIL}`}>{EMAIL}</a> · <a href={WA} target="_blank" rel="noreferrer">WhatsApp</a></p>
    </footer>
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
            {['Saudi visa', 'QVP certificate', 'Saudi Culture', 'Umrah package', 'Attestation', 'Price estimate'].map((item) => (
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
  const journey = [
    { step: '01', title: 'Visa', text: 'Employer issues', href: '/work-visa' },
    { step: '02', title: 'Wakala', text: 'In our name', href: '/saudi-arabia/wakala-services' },
    { step: '03', title: 'QVP', text: 'Skill or degree check', href: '/guides/qvp' },
    { step: '04', title: 'Wafid', text: 'Medical', href: '/gcc/wafid-gamca-medical' },
    { step: '05', title: 'Tasheer', text: 'Biometrics', href: '/guides/tasheer' },
    { step: '06', title: 'Stamp', text: 'Embassy', href: '/visa-stamping' },
    { step: '07', title: 'Protector', text: 'BEOE + OEC', href: '/saudi-arabia/visa-stamping-protector' },
    { step: '08', title: 'Fly', text: 'Iqama in KSA', href: '/work-visa' },
  ];

  const services = [
    { tag: 'WKL', title: 'Wakala (E-Wakala)', description: 'Get your employer to issue the Wakala in our name and we handle the rest.', href: '/saudi-arabia/wakala-services', highlight: true },
    { tag: 'VSA', title: 'Saudi Work Visa', description: 'Skill test or degree attestation and QVP, then stamping.', href: '/work-visa', highlight: true },
    { tag: 'FAM', title: 'Family Visa', description: 'Parents, in-laws, spouse and children, Iqama visas and extensions.', href: '/visit-visa', highlight: true },
    { tag: 'MED', title: 'Wafid Medical', description: 'Booking, slip, medical centre and result follow-up.', href: '/gcc/wafid-gamca-medical' },
    { tag: 'TSH', title: 'Tasheer & Biometrics', description: 'Appointments booked, file checked, passport collected.', href: '/guides/tasheer' },
    { tag: 'QVP', title: 'QVP & Skills', description: 'Qualification verification and NAVTTC skill tests.', href: '/guides/qvp' },
    { tag: 'ATT', title: 'Attestation', description: 'HEC, MOFA, Mosadaqa and embassy processing.', href: '/saudi-arabia-attestation' },
    { tag: 'JOB', title: 'Recruitment', description: 'Gulf, EU, Australia, Malaysia, Uzbekistan and more.', href: '/recruitment' },
    { tag: 'UMR', title: 'Umrah Packages', description: 'Economy and family packages with visa, hotel and transfers.', href: '/umrah-packages' },
    { tag: 'PRM', title: 'Premium Packages', description: 'Dedicated case officer and fast-track service.', href: '/contact' },
    { tag: 'TRN', title: 'Translation & NADRA', description: 'Arabic, English, Urdu translation and other country support.', href: '/contact' },
  ];

  const whoCards = [
    { title: 'Professionals', text: 'Engineers, doctors, nurses, accountants and managers who need degree verification and Saudi job approval.', href: '/guides/qvp' },
    { title: 'Skilled workers', text: 'Electricians, welders, cooks, drivers, plumbers and technicians preparing for Saudi employment.', href: '/work-visa' },
    { title: 'Families', text: 'Parents, spouse, children, visitors and family residence applications with document support.', href: '/visit-visa' },
    { title: 'Employers', text: 'Recruitment and bulk visa processing for Saudi and Gulf companies.', href: '/recruitment' },
  ];

  const quickQuestions = [
    'QVP certificate',
    'Saudi visa',
    'Attestation',
    'Wafid medical',
    'Family visit visa',
    'Umrah package',
  ];

  return (<>
    <div className="social-strip">
      <div className="wrap">
        <a href={WA} target="_blank" rel="noreferrer">WhatsApp: {PHONE}</a>
        <a href={FACEBOOK_URL} target="_blank" rel="noreferrer">Facebook</a>
        <a href={TIKTOK_URL} target="_blank" rel="noreferrer">TikTok</a>
        <a href={WA_CHANNEL} target="_blank" rel="noreferrer">WhatsApp channel</a>
      </div>
    </div>

    <section className="hero2">
      <div id="heroDots" aria-hidden="true" />
      <div className="wrap hero2-grid">
        <div className="hero-copy">
          <div className="pill"><span className="live" /> Trusted visa and attestation partner</div>
          <h1 className="hero-h">Saudi visas, <em>QVP</em>, attestation and Umrah — handled with care.</h1>
          <p className="lead">We guide professionals, families and employers through Saudi visa processing, document attestation, Wakala, Wafid medical, Tasheer, QVP and travel support from one office.</p>
          <div className="btns">
            <Link className="btn btn-gold btn-lg" to="/attestation-calculator">View requirements</Link>
            <a className="btn btn-line btn-lg" href={WA} target="_blank" rel="noreferrer">WhatsApp us</a>
          </div>
          <div className="proof">
            <div><b>5,000+</b><span>people served</span></div>
            <div><b>24h</b><span>response window</span></div>
            <div><b>CEO</b><span>chartered accountant</span></div>
          </div>
        </div>

        <div className="pass-wrap">
          <div className="pass">
            <div className="pass-top">
              <div>
                <div className="pass-no">Professional Travel & Visa Services</div>
              </div>
              <div className="stamp">Premium case</div>
            </div>
            <div className="pass-route">
              <b>Visa</b>
              <span>Wakala · Test · Medical · Stamp</span>
              <div className="stamp">Saudi / GCC</div>
            </div>
            <svg className="arc" viewBox="0 0 220 70" aria-hidden="true">
              <path d="M8 60 Q110 10 212 60" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 6" />
            </svg>
            <div className="pass-grid">
              <div><small>Wakala</small><b>Approved</b></div>
              <div><small>QVP</small><b>Verified</b></div>
              <div><small>Medical</small><b>Ready</b></div>
              <div><small>Protector</small><b>Booked</b></div>
            </div>
            <div className="pass-foot">
              <span className="time">Case officer: assigned</span>
              <div className="barcode" aria-hidden="true" />
            </div>
            <span className="st st1">Saudi</span>
            <span className="st st2">GCC</span>
          </div>
        </div>
      </div>

      <div className="wrap">
        <div className="askbar">
          <span className="askbar-ico">✦</span>
          <input type="text" value="" placeholder="Ask about visa, QVP, attestation, or Umrah..." readOnly />
          <a className="btn btn-gold" href={WA} target="_blank" rel="noreferrer">Ask on WhatsApp</a>
        </div>
        <div className="hero-chips doc-index">
          {quickQuestions.map((item) => (
            <span key={item} className="chip">{item}</span>
          ))}
        </div>
      </div>
    </section>

    <section className="section">
      <div className="wrap">
        <div className="journey2">
          <div className="journey-head">
            <div>
              <div className="eyebrow">How we work</div>
              <h2>A smooth path from paper to passport.</h2>
            </div>
            <Link className="btn btn-soft" to="/work-visa">See the full process</Link>
          </div>
          <div className="track">
            {journey.map((item) => (
              <Link key={item.step} to={item.href} className="stop">
                <span className="dot">{item.step}</span>
                <b>{item.title}</b>
                <small>{item.text}</small>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="section services-band">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">Popular services</div>
          <h2>Everything you need for a clean visa and attestation file.</h2>
        </div>
        <div className="grid">
          {services.map((service) => (
            <Link key={service.tag} to={service.href} className={`svc ${service.highlight ? 'hl' : ''}`}>
              <div className="tag">{service.tag}</div>
              <div className="gi">{service.tag}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <span className="go">Read more →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>

    <section className="section">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">Who we help</div>
          <h2>Support for professionals, families and employers.</h2>
        </div>
        <div className="who">
          {whoCards.map((card) => (
            <Link key={card.title} to={card.href} className="who-card">
              <div className="wi">✦</div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <span className="go">Explore →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>

    <section className="section">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">Why clients choose us</div>
          <h2>Document accuracy, support, and a structured process.</h2>
        </div>
        <div className="cols">
          <div className="card feature">
            <h3>Clear process</h3>
            <p>We explain the exact steps, documents, and timelines before a file is submitted.</p>
          </div>
          <div className="card">
            <h3>Dedicated handling</h3>
            <p>Every case is reviewed with the right checks for QVP, visas, attestation, Wafid and protector steps.</p>
          </div>
          <div className="card">
            <h3>End-to-end support</h3>
            <p>From document review to passport handling and travel planning, everything is coordinated in one place.</p>
          </div>
        </div>
      </div>
    </section>
  </>);
}

function ServicePage({ title, intro, sections = [], keyPoints = [] }) {
  return (
    <section className="page narrow service-page">
      <h1>{title}</h1>
      <p className="lead">{intro}</p>

      {keyPoints.length > 0 && (
        <div className="info-grid">
          {keyPoints.map((item) => (
            <div key={item.title} className="panel stat-box">
              <strong>{item.title}</strong>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      )}

      {sections.map((section) => (
        <div key={section.heading} className="page-section">
          <h2>{section.heading}</h2>
          {section.text && <p>{section.text}</p>}
          {section.items && <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}
          {section.note && <p><strong>Note:</strong> {section.note}</p>}
        </div>
      ))}

      <div className="row cta-row">
        <Link className="btn" to="/contact">Book an appointment</Link>
        <a className="btn ghost" href={WA} target="_blank" rel="noreferrer">WhatsApp us</a>
      </div>

      <p className="page-note">
        Requirements and processing times are estimates based on current practice and can change at any time. The final checklist is decided by the relevant authority. Contact us before submitting so we can confirm the latest requirements for your case.
      </p>
    </section>
  );
}

function Saudi() {
  return (<section className="page"><h1>Saudi visa services</h1>
    <p className="lead">Saudi visa services, QVP, Tasheer, biometric and medical appointments, and attestation in one place.</p>
    <div className="grid">{saudiSections.map(s => (<article key={s.id} id={s.id} className="panel"><h2>{s.title}</h2><p>{s.text}</p>
      {s.link && <Link to={s.link}>Read the guide</Link>}</article>))}</div>
    <InquiryForm /></section>);
}

function SaudiWorkVisaPage() {
  return (
    <ServicePage
      title="Saudi Work Visa: which type is yours?"
      intro="Saudi work visas follow one of two routes, depending on the job title on your visa: Skilled / labour visa or Professional / education-based visa."
      keyPoints={[
        { title: 'Skilled / labour visa', text: 'Typical jobs: electrician, plumber, welder, mason, driver, technician, cleaner, cook. Main check: skill test (Takamol SVP) at a NAVTTC-approved centre.' },
        { title: 'Professional / education-based visa', text: 'Typical jobs: engineer, accountant, IT specialist, manager, teacher, doctor, nurse. Main check: degree attestation + QVP.' }
      ]}
      sections={[
        {
          heading: 'Skilled / Labour Work Visa (Skill Verification)',
          items: [
            'Valid Pakistani passport (valid for at least 6 months [confirm])',
            'CNIC',
            'Visa number / authorization from your Saudi employer',
            'Recent passport-size photos with white background',
            'Takamol skill verification certificate (after passing the test)',
            'Medical report from an approved medical centre (booked through Wafid)',
            'Biometrics at a Tasheer centre',
            'Protector stamp from the Bureau of Emigration'
          ],
          note: 'For trade jobs listed by Saudi Takamol, you must pass a practical skill test before the visa. No degree or attestation is needed.'
        },
        {
          heading: 'Skill test steps',
          items: [
            'Register on the SVP portal (svp-international.pacc.sa) with your passport details.',
            'Choose your trade, city and test date.',
            'Pay the fee online: USD 85 per test (about Rs 23,500–24,500), effective 9 September 2026.',
            'Download your appointment slip.',
            'Attend the test centre with your original passport and CNIC.',
            'If you pass, your certificate is uploaded to the portal within 24 hours. If you fail, you can book again.'
          ],
          note: 'Processing time: [confirm] working days after the test certificate and medical are ready.'
        },
        {
          heading: 'Professional / Education-Based Work Visa',
          items: [
            'Passport valid for at least 6 months [confirm], with 2 blank pages',
            'CNIC',
            'Visa number / authorization from your Saudi employer',
            'Employment contract or offer letter',
            'Recent passport-size photos with white background',
            'Degree and transcript attested by HEC and MOFA, then verified through Mosadaqa and attested by the Saudi Embassy (see Degree Attestation)',
            'QVP result, where your profession requires it (see QVP)',
            'Professional council registration where required, e.g. engineers or health workers [confirm]',
            'Medical report from an approved medical centre (booked through Wafid)',
            'Biometrics at a Tasheer centre',
            'Protector stamp from the Bureau of Emigration [confirm for your visa category]'
          ],
          note: 'Important: your degree subject and experience must match the job title on your visa. Also usually asked for at visa stamping: a copy of the Saudi company’s Commercial Registration (CR); an experience letter from your Pakistani employer showing the same job title as your visa; your attested degree and certificates with attested Arabic translations; a medical fitness report. [confirm]. Processing time: [confirm] working days after attestation and QVP are complete.'
        },
        {
          heading: 'We Handle Your Visa from Start to Finish',
          items: [
            'E-Wakala in our agency\'s name. Ask your Saudi employer to issue the E-Wakala (visa authorization) in favour of Professional Travel & Visa Services. Once we receive it, we take over your visa file and handle every step on your behalf.',
            'Visa stamping: we submit your passport and documents, book your Tasheer and biometric appointments, and collect your passport with the visa stamped.',
            'Protector: we get your protector stamp from the Protector of Emigrants office (Bureau of Emigration & Overseas Employment), so you are cleared to travel for work.',
            'Premium services: priority handling, fast-track appointment booking, document pickup and passport delivery, full file check before submission, regular WhatsApp updates, and air ticket booking.'
          ],
          note: '[confirm: premium package price, or “Contact us for a quote”]. Get started: send your visa number and passport copy on WhatsApp and we will tell you which route applies and what to prepare.'
        }
      ]}
    />
  );
}

function SaudiVisitVisaPage() {
  return (
    <ServicePage
      title="Saudi Visit Visa"
      intro="We help with family visit, business visit and tourist visa applications, including document review and status tracking."
      sections={[
        {
          heading: 'Documents required',
          items: [
            'Passport valid for at least 6 months [confirm]',
            'Recent passport-size photo',
            'CNIC copy',
            'Family visit: visa reference number from your relative in Saudi Arabia, their Iqama copy, and proof of relationship (MOFA-attested marriage or birth certificate, as applicable)',
            'Business visit: invitation from the Saudi company',
            'Biometrics at a Tasheer centre, where required'
          ],
          note: 'Processing time: [confirm] working days.'
        },
        {
          heading: 'Saudi Visa Checklists by Visa Type',
          items: [
            'Family Visit Visa for Parents',
            'Family Visit Visa for Father-in-Law / Mother-in-Law',
            'Family Visit Visa for Spouse and Children',
            'Family Residence (Iqama) Visa',
            'Newborn Visa Endorsement',
            'Exit/Re-entry Visa Extension',
            'Business Visit Visa'
          ],
          note: 'Each visa below gets its own page or tab. Requirements are for the Saudi Consulate, Karachi unless stated; the Islamabad Embassy may differ slightly. [confirm current lists before publishing]'
        }
      ]}
    />
  );
}

function QvpTakamolPage() {
  return (
    <ServicePage
      title="QVP / Takamol Skill Verification Program"
      intro="The Saudi Takamol Skill Verification Program (SVP) checks whether candidates in designated occupations meet the skill level required for employment in Saudi Arabia. It is not a job placement or training program."
      sections={[
        {
          heading: 'Who may need this service?',
          items: [
            'Skilled workers travelling to Saudi Arabia for employment in occupations where skill verification is mandatory.',
            'Applicants whose work visa depends on a recognized professional or technical assessment.'
          ]
        },
        {
          heading: 'How the process works',
          items: [
            'Confirm whether the applicant’s occupation requires SVP / QVP verification.',
            'Register through the official portal using the required personal information.',
            'Select the relevant trade, city, and available assessment date.',
            'Complete payment and download the appointment slip.',
            'Attend the assigned assessment centre with the required original documents.'
          ],
          note: 'Please confirm current fees and appointment availability on the official portal before quoting a customer.'
        },
        {
          heading: 'Documents to prepare',
          items: [
            'Valid passport',
            'CNIC',
            'Any additional documents requested by the official portal or assessing authority.'
          ]
        },
        {
          heading: 'Our assistance',
          items: [
            'Explain registration requirements and eligibility.',
            'Prepare applicant details and required documents before booking.',
            'Guide applicants through appointment booking and test-day preparation.',
            'Review the next steps after registration and before the assessment.'
          ]
        }
      ]}
    />
  );
}

function NavttcAppointmentPage() {
  return (
    <ServicePage
      title="NAVTTC Appointment Assistance"
      intro="NAVTTC is Pakistan’s national vocational and technical training authority. In the Saudi employment process, NAVTTC is also involved in implementing the Takamol Skill Verification Program and related vocational assessment procedures."
      sections={[
        {
          heading: 'Who may need assistance?',
          items: [
            'Applicants who need help identifying the correct vocational assessment or registration route.',
            'Candidates who need help understanding the required documents and appointment process.'
          ]
        },
        {
          heading: 'How we can help',
          items: [
            'Explain the relevant registration process.',
            'Help applicants identify the appropriate assessment or appointment type.',
            'Review personal details and required documents.',
            'Guide applicants through appointment instructions.',
            'Explain what to prepare before attending an assessment.'
          ]
        },
        {
          heading: 'Information to prepare',
          items: [
            'CNIC',
            'Passport',
            'Qualification or trade details where applicable',
            'Any official letter, portal instruction, or appointment slip received from the authority.'
          ]
        },
        {
          heading: 'Important note',
          items: [
            'Please confirm whether the customer means a NAVTTC-related trade test, skill assessment, or Takamol appointment before quoting the service.',
            'The required information may vary by assessment type and authority instructions.'
          ]
        }
      ]}
    />
  );
}

function WafidMedicalPage() {
  return (
    <ServicePage
      title="GAMCA / Wafid Medical Appointment"
      intro="Wafid is the medical examination program used for eligible individuals travelling to participating GCC countries for work or residence. It was previously commonly known as GAMCA."
      sections={[
        {
          heading: 'Who needs this service?',
          items: [
            'Applicants whose visa process requires a Wafid medical examination for the destination country.',
            'Candidates who need help understanding the official portal instructions before attending the medical centre.'
          ]
        },
        {
          heading: 'How the process works',
          items: [
            'Provide the required applicant and passport information.',
            'Select the country of application, city, and destination country on the official booking system.',
            'Complete the required payment and generate the appointment slip.',
            'Visit the medical centre assigned by the system.',
            'Check the medical report through the official Wafid portal when available.'
          ]
        },
        {
          heading: 'Information required',
          items: [
            'Valid passport details',
            'Full name and date of birth',
            'Nationality and gender',
            'Contact information',
            'Destination country and city details as requested.'
          ]
        },
        {
          heading: 'Our assistance',
          items: [
            'Appointment registration guidance',
            'Pre-submission information review',
            'Appointment slip guidance',
            'Instructions for attending the assigned centre',
            'Guidance on checking the medical result after the report is available.'
          ],
          note: 'The medical centre is assigned by the official Wafid system; applicants should not assume they can choose any centre they prefer.'
        }
      ]}
    />
  );
}

function VisaStampingProtectorPage() {
  return (
    <ServicePage
      title="Visa Stamping & Protector Services"
      intro="Preparing to travel to Saudi Arabia for employment? Our visa stamping and protector assistance helps applicants understand their documentation and procedural steps before overseas employment."
      sections={[
        {
          heading: 'A. Visa stamping assistance',
          items: [
            'Reviewing the relevant visa and passport details.',
            'Providing a document checklist.',
            'Guidance on required attestations and supporting documents.',
            'Explaining the applicable submission process.',
            'Helping applicants understand the next steps.'
          ]
        },
        {
          heading: 'B. Protector of Emigrants assistance',
          items: [
            'Explaining the protector registration process.',
            'Helping organize employment and identity documents.',
            'Guidance on applicable registration and insurance requirements.',
            'Assistance understanding appointments, fees, and submission instructions.',
            'Guidance to ensure the required formalities are completed before departure.'
          ]
        },
        {
          heading: 'Documents to prepare',
          items: [
            'Passport and relevant visa documents',
            'CNIC',
            'Employment contract or offer documentation',
            'Medical and qualification documents where applicable',
            'Photographs and any other supporting paperwork required by the relevant authority.'
          ],
          note: 'This is a general preparation checklist, not a universal list. The applicable authority’s current requirements should be confirmed for each applicant.'
        }
      ]}
    />
  );
}

function WakalaServicesPage() {
  return (
    <ServicePage
      title="Wakala (E-Wakala) Services"
      intro="Wakala (also called E-Wakala or visa authorization) is the online authorization a Saudi employer or sponsor issues to a licensed Pakistani agency, allowing that agency to process the visa on the worker’s behalf. Without a Wakala in an agency’s name, the visa cannot be stamped through that agency."
      sections={[
        {
          heading: 'What we do',
          items: [
            'Give your Saudi employer our agency details exactly as they must appear on the Wakala',
            'Check the Wakala once issued: visa number, profession, number of visas and agency name',
            'Use the Wakala to complete medical, biometrics, visa stamping and protector for each worker',
            'Handle single visas and bulk Wakala for companies hiring several workers'
          ]
        },
        {
          heading: 'What we need',
          items: [
            'Visa number(s) and the Saudi employer’s name',
            'Copy of the issued Wakala',
            'Each worker’s passport and CNIC copies'
          ],
          note: '[confirm: agency name and licence details as they must appear on the Wakala, and whether we handle Musaned Wakala for domestic workers]'
        }
      ]}
    />
  );
}

function QVPPage() {
  return (
    <ServicePage
      title="QVP (Qualification Verification Program)"
      intro="QVP is Saudi Arabia's online check of your qualification and work history for professional work visas. It is run by the Professional Accreditation Center (PACC) of the Ministry of Human Resources at qvp.pacc.sa. Your employer's visa will show whether QVP is needed."
      sections={[
        {
          heading: 'Documents required',
          items: [
            'Passport bio page',
            'Degree and transcript (clear colour scans of both sides)',
            'Professional certificates, if any',
            'Experience letters on company letterhead with stamp, signature, job title, start and end dates, duties and HR contact',
            'Saudi job offer letter, if available',
            'Signed consent form (completed online)'
          ]
        },
        {
          heading: 'Steps',
          items: [
            'Confirm your Saudi job title matches your degree and experience.',
            'Register on qvp.pacc.sa with details exactly as in your passport.',
            'Upload clear scans and pay the verification fee.',
            'QVP contacts your university and, where needed, your employer.',
            'Reply quickly to any clarification request.',
            'Your result is shared for visa processing.'
          ],
          note: 'Fee: about USD 93 [confirm on portal]. Time: usually around 2 to 3 weeks; delays happen when a university or employer replies slowly.'
        },
        {
          heading: 'Common reasons for delay',
          items: [
            'Job title mismatch',
            'Unclear scans',
            'Names that do not match the passport',
            'Incomplete experience letters',
            'No reply from the university or employer'
          ]
        }
      ]}
    />
  );
}

function SkillTestPage() {
  return (
    <ServicePage
      title="Skilled / Labour Work Visa (Skill Verification)"
      intro="For trade jobs listed by Saudi Takamol, you must pass a practical skill test before the visa. No degree or attestation is needed. In Pakistan the test is run by Saudi Takamol with NAVTTC, at NAVTTC-approved test centres, in 108 trades."
      sections={[
        {
          heading: 'Documents required',
          items: [
            'Valid Pakistani passport (valid for at least 6 months [confirm])',
            'CNIC',
            'Visa number / authorization from your Saudi employer',
            'Recent passport-size photos with white background',
            'Takamol skill verification certificate (after passing the test)',
            'Medical report from an approved medical centre (booked through Wafid)',
            'Biometrics at a Tasheer centre',
            'Protector stamp from the Bureau of Emigration'
          ]
        },
        {
          heading: 'Skill test steps',
          items: [
            'Register on the SVP portal (svp-international.pacc.sa) with your passport details.',
            'Choose your trade, city and test date.',
            'Pay the fee online: USD 85 per test (about Rs 23,500–24,500), effective 9 September 2026.',
            'Download your appointment slip.',
            'Attend the test centre with your original passport and CNIC.',
            'If you pass, your certificate is uploaded to the portal within 24 hours. If you fail, you can book again.'
          ],
          note: 'Processing time: [confirm] working days after the test certificate and medical are ready.'
        }
      ]}
    />
  );
}

function VisaStampingPage() {
  return (
    <ServicePage
      title="Visa Stamping, Tasheer, Biometrics & Medical"
      intro="Tasheer centres collect Saudi visa applications and biometrics in Pakistan. We book your appointment and check your file before you go."
      sections={[
        {
          heading: 'Tasheer Appointment',
          items: [
            'Bring: original passport, visa documents from your sponsor, photos, CNIC copy, and medical report where required.',
            'We book the appointment and tell you exactly what to bring.'
          ]
        },
        {
          heading: 'Biometric Appointment',
          items: [
            'Fingerprints and a photo are taken at a Tasheer centre before your visa is issued.',
            'Bring: original passport, appointment confirmation, CNIC.'
          ]
        },
        {
          heading: 'Medical Appointment',
          items: [
            'Work visa applicants need a medical test at an approved centre, booked through Wafid.',
            'Bring: original passport, passport photos, CNIC, Wafid booking slip.'
          ]
        }
      ]}
    />
  );
}

function RecruitmentPage() {
  return (
    <ServicePage
      title="Recruitment of Skilled Labour and Professionals"
      intro="We supply qualified Pakistani professionals and trained, tested skilled workers to companies in all Gulf countries (Saudi Arabia, Qatar, UAE, Kuwait, Bahrain, Oman), Europe (EU), Australia, Malaysia, Uzbekistan and other countries worldwide. As a licensed Overseas Employment Promoter [confirm: OEP licence no.], we handle the full process from sourcing to deployment."
      sections={[
        {
          heading: 'Countries we recruit for',
          items: [
            'Gulf (all GCC countries): Saudi Arabia, Qatar, UAE, Kuwait, Bahrain, Oman',
            'Europe: European Union (EU) countries',
            'Australia: Australia',
            'Asia: Malaysia, Uzbekistan',
            'Other countries: any other country with a valid demand from a registered employer'
          ],
          note: 'The steps below show our Saudi process. For other countries we follow that country\'s visa, skill test and medical rules, and our team will share the exact checklist with you.'
        },
        {
          heading: 'Professionals we recruit',
          items: [
            'Engineering: civil, mechanical, electrical, chemical, petroleum and other engineers',
            'Healthcare: doctors, specialists, nurses and allied health staff',
            'Finance and accounting: Chartered Accountants (CA), accountants, finance officers and managers',
            'Health and safety: safety officers, safety supervisors and HSE managers',
            'Technical: technicians, electronic devices technicians, IT and maintenance staff',
            'Management and admin: managers, HR, sales, administration and office staff'
          ]
        },
        {
          heading: 'Why employers choose us',
          items: [
            'Workers screened and trade-tested before selection',
            'One point of contact from demand letter to arrival',
            'Regular updates on every worker\'s status',
            'Replacement of unsuitable workers within an agreed period [confirm terms]',
            'All recruitment done in line with Bureau of Emigration rules'
          ],
          note: 'Contact us for a recruitment quote: send your demand on WhatsApp or email, or book an appointment with our team in Saudi Arabia and the Gulf, and we will reply with timelines and charges.'
        }
      ]}
    />
  );
}

function ContactPage() {
  return (
    <section className="page narrow">
      <h1>Contact us</h1>
      <p className="lead">Professional Travel & Visa Services Office: [confirm full address, city] OEP / BEOE licence no.: [confirm] Phone / WhatsApp: +92 337 3398405 Email: info.professionalvisa@gmail.com Office hours: [confirm].</p>
      <div className="info-grid">
        <div className="panel stat-box">
          <strong>Book an appointment</strong>
          <p>We help with recruitment, visas, attestation and travel. Choose a meeting at your office, at ours, or online.</p>
        </div>
        <div className="panel stat-box">
          <strong>WhatsApp</strong>
          <p>Send your details on WhatsApp and we will reply quickly with the next step.</p>
        </div>
      </div>
      <div className="row cta-row">
        <Link className="btn" to="/">Back to home</Link>
        <a className="btn ghost" href={WA} target="_blank" rel="noreferrer">WhatsApp us</a>
      </div>
    </section>
  );
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
          <span className="kicker">🇸🇦 Saudi Arabia attestation</span>
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
            <li>HEC, MOFA, QVP certificate and verification, and Saudi Culture guidance</li>
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
        <span className="kicker">🇸🇦 Saudi Arabia attestation</span>
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
        <span className="kicker">{page.flag || '🌍'} Document attestation</span>
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
  const svc = opts.find((o) => o.id === sel.service) || opts[0];
  const docs = [...cfg.baseDocs, ...(cfg.extraDocs[sel.document] || []),
    ...(svc.id.includes('mosadaqa') || svc.id === 'full' ? cfg.mosadaqaDocs : [])];
  const set = (k) => (e) => setSel((s) => ({ ...s, [k]: e.target.value, ...(k === 'country' ? { service: '' } : {}) }));

  return (
    <section className="page narrow">
      <h1>Document requirements</h1>
      <div className="form">
        <label>Country<select value={sel.country} onChange={set('country')}>{cfg.countries.map((c) => <option key={c}>{c}</option>)}</select></label>
        <label>Document<select value={sel.document} onChange={set('document')}>{cfg.documents.map((c) => <option key={c}>{c}</option>)}</select></label>
        <label>Service<select value={svc.id} onChange={set('service')}>{opts.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}</select></label>
      </div>
      <div className="panel result">
        <h2>Estimated timeline</h2>
        <p>{svc.days}</p>
        {svc.price && <p><strong>Typical fee range:</strong> {svc.price}</p>}
        <h2>Required documents</h2>
        <ul>{docs.map((d) => <li key={d}>{d}</li>)}</ul>
      </div>
      <h2>Get started</h2>
      <InquiryForm quote={{ country: sel.country, document: sel.document, service: svc.label }} />
    </section>
  );
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
  if (state === 'sent') return <p className="ok">Request sent. We will contact you on {f.phone}. For faster support, send the same details on WhatsApp too.</p>;
  return (<div className="form">
    <label>Name<input value={f.name} onChange={on('name')} /></label>
    <label>Phone / WhatsApp<input value={f.phone} onChange={on('phone')} /></label>
    <label>Email (optional)<input value={f.email} onChange={on('email')} /></label>
      <label>Country<select value={f.country || 'Saudi Arabia'} onChange={on('country')}>
        <option>Saudi Arabia</option><option>UAE</option><option>Qatar</option><option>Turkey</option><option>Vietnam</option><option>Bahrain</option>
      </select></label>
      <label>Service Type<select value={f.serviceType || 'QVP certificate and verification'} onChange={on('serviceType')}>
        <option>QVP certificate and verification</option><option>Attestation</option><option>Mosadaqa / Saudi Culture</option><option>Saudi visa</option><option>Umrah package</option>
      </select></label>
      <label>Document Type<input value={f.documentType || ''} onChange={on('documentType')} placeholder="Degree, passport, marriage certificate..." /></label>
      <label>Message<textarea rows="4" value={f.message} onChange={on('message')} placeholder="Please share your case details, required document, and any deadline." /></label>
    {state === 'missing' && <p className="err">Enter your name and phone number.</p>}
    {state === 'error' && <p className="err">Could not send. Message us on WhatsApp instead.</p>}
    <p className="muted-note">This form is sent to the site backend. For immediate delivery, send the same request on WhatsApp and we will confirm receipt.</p>
    <div className="row"><button className="btn" onClick={submit} disabled={state === 'sending'}>Send request</button>
      <a className="btn ghost" href={WA}>WhatsApp us</a></div></div>);
}

export default function App() {
  const [adminPassword, setAdminPassword] = useState(localStorage.getItem('adminPassword') || '');

  useEffect(() => {
  }, []);

  function handleAdminLogin(pwd) {
    setAdminPassword(pwd);
    localStorage.setItem('adminPassword', pwd);
  }

  function handleAdminLogout() {
    setAdminPassword('');
    localStorage.removeItem('adminPassword');
  }

  return (
    <div className="app-shell luxury">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/saudi-visa-services" element={<Saudi />} />
          <Route path="/work-visa" element={<SaudiWorkVisaPage />} />
          <Route path="/visit-visa" element={<SaudiVisitVisaPage />} />
          <Route path="/saudi-arabia/qvp-takamol-svp" element={<QvpTakamolPage />} />
          <Route path="/saudi-arabia/navttc-appointment" element={<NavttcAppointmentPage />} />
          <Route path="/gcc/wafid-gamca-medical" element={<WafidMedicalPage />} />
          <Route path="/saudi-arabia/visa-stamping-protector" element={<VisaStampingProtectorPage />} />
          <Route path="/saudi-arabia/wakala-services" element={<WakalaServicesPage />} />
          <Route path="/qvp" element={<QVPPage />} />
          <Route path="/skill-test" element={<SkillTestPage />} />
          <Route path="/visa-stamping" element={<VisaStampingPage />} />
          <Route path="/recruitment" element={<RecruitmentPage />} />
          <Route path="/recruitment/audit-firms" element={<RecruitmentPage />} />
          <Route path="/recruitment/employers" element={<RecruitmentPage />} />
          <Route path="/contact" element={<ContactPage />} />
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
