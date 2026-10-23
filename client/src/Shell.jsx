import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { WA, WA_CHANNEL, FACEBOOK_URL, TIKTOK_URL, EMAIL, ADDRESS, PHONE, BRAND_NAME, aiReplyBank } from './content.js';
import { countryMenu } from './countries/index.js';
import { Icon, Flag, SiteEffects } from './ui.jsx';

const SAUDI_LINKS = [
  { label: 'Saudi work visa', to: '/work-visa', icon: 'briefcase' },
  { label: 'Family & visit visa', to: '/visit-visa', icon: 'users' },
  { label: 'QVP verification', to: '/qvp', icon: 'clip' },
  { label: 'Takamol skill test', to: '/skill-test', icon: 'shield' },
  { label: 'Wafid / GAMCA medical', to: '/gcc/wafid-gamca-medical', icon: 'pulse' },
  { label: 'Tasheer & visa stamping', to: '/visa-stamping', icon: 'finger' },
  { label: 'Wakala (E-Wakala)', to: '/saudi-arabia/wakala-services', icon: 'doc' },
  { label: 'Recruitment', to: '/recruitment', icon: 'hand' },
];

export function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => {
    setMenuOpen(false);
    setServicesOpen(false);
  };

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', menuOpen);
    return () => document.body.classList.remove('no-scroll');
  }, [menuOpen]);

  return (<>
    <SiteEffects />

    <div className="topbar">
      <div className="wrap topbar__inner">
        <div className="topbar__links">
          <a href={FACEBOOK_URL} target="_blank" rel="noreferrer"><Icon name="fb" size={16} />Facebook</a>
          <a href={TIKTOK_URL} target="_blank" rel="noreferrer"><Icon name="tt" size={16} />TikTok</a>
          <a href={WA_CHANNEL} target="_blank" rel="noreferrer"><Icon name="wa" size={16} />WhatsApp Channel</a>
        </div>
        <a className="topbar__phone" href={`tel:${PHONE.replace(/\s+/g, '')}`}><Icon name="phone" size={15} />{PHONE}</a>
      </div>
    </div>

    <header className="top">
      <div className="wrap top__inner">
        <Link to="/" className="brand-wrap" aria-label={BRAND_NAME} onClick={closeMenu}>
          <span className="brand-logo-wrap"><img src="/assets/logo.jpeg" alt="" className="brand-logo" /></span>
          <span className="brand-text">
            <span className="brand">{BRAND_NAME}</span>
            <small>Visas · Attestation · Recruitment · Umrah</small>
          </span>
        </Link>

        <button
          type="button"
          className={`mobile-menu-toggle ${menuOpen ? 'is-open' : ''}`}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span /><span /><span />
        </button>

        <nav className={menuOpen ? 'nav-open' : ''} aria-label="Main">
          <NavLink to="/" end onClick={closeMenu}>Home</NavLink>

          <div
            className={`country-menu ${servicesOpen ? 'is-open' : ''}`}
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
            onFocus={() => setServicesOpen(true)}
            onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setServicesOpen(false); }}
          >
            <button
              type="button"
              className="country-menu__trigger"
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              onClick={() => setServicesOpen((value) => !value)}
            >
              Services <Icon name="chev" size={16} className="country-menu__chev" />
            </button>
            <div className="country-menu__panel">
              <div className="mega">
                <div className="mega__col">
                  <span className="mega__title">Saudi visa &amp; recruitment</span>
                  {SAUDI_LINKS.map((item) => (
                    <NavLink key={item.to} to={item.to} className="mega__link" onClick={closeMenu}>
                      <span className="mega__ico"><Icon name={item.icon} size={18} /></span>
                      <span>{item.label}</span>
                    </NavLink>
                  ))}
                </div>
                <div className="mega__col">
                  <span className="mega__title">Attestation by country</span>
                  {countryMenu.map((item) => item.disabled ? (
                    <span key={item.country} className="country-menu__item country-menu__item--disabled">
                      <span className="country-menu__flag"><Flag emoji={item.flag} /></span>
                      <span>{item.country}</span>
                    </span>
                  ) : (
                    <NavLink key={item.country} to={item.path} className="country-menu__item" onClick={closeMenu}>
                      <span className="country-menu__flag"><Flag emoji={item.flag} /></span>
                      <span>{item.country}</span>
                      <Icon name="arrow" size={16} className="country-menu__go" />
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <NavLink to="/umrah-packages" onClick={closeMenu}>Umrah packages</NavLink>
          <NavLink to="/attestation-calculator" onClick={closeMenu}>Requirements</NavLink>
          <NavLink to="/guides/mosadaqa" onClick={closeMenu}>Mosadaqa / Saudi Culture</NavLink>
          <NavLink to="/guides/qvp" onClick={closeMenu}>QVP guide</NavLink>
          <Link to="/attestation-calculator" className="btn header-cta nav-cta" onClick={closeMenu}>Get consultation <Icon name="arrow" size={16} /></Link>
        </nav>

        <div className="nav-actions">
          <Link to="/attestation-calculator" className="btn header-cta" onClick={closeMenu}>Get consultation <Icon name="arrow" size={16} /></Link>
        </div>
      </div>
    </header>

    <main key={location.pathname} className="route-fade">{children}</main>

    <Footer />

    <a className="wa-float" href={WA} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
      <span className="wa-float__pulse" />
      <Icon name="wa" size={26} />
      <span className="wa-float__label">WhatsApp</span>
    </a>
    <AIChatWidget />
  </>);
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__skyline" aria-hidden="true">
        <span className="site-footer__plane"><Icon name="plane" size={22} /></span>
      </div>
      <div className="wrap footer-grid">
        <div className="footer-col footer-col--brand">
          <Link to="/" className="brand-wrap brand-wrap--footer">
            <span className="brand-logo-wrap"><img src="/assets/logo.jpeg" alt="" className="brand-logo" /></span>
            <span className="brand-text"><span className="brand">{BRAND_NAME}</span></span>
          </Link>
          <p>Saudi &amp; Gulf visa specialists. Wakala, work and family visas, attestation, recruitment and Umrah, from one trusted team.</p>
          <div className="footer-social">
            <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" aria-label="Follow us on Facebook"><Icon name="fb" size={20} /></a>
            <a href={TIKTOK_URL} target="_blank" rel="noreferrer" aria-label="Follow us on TikTok"><Icon name="tt" size={20} /></a>
            <a href={WA_CHANNEL} target="_blank" rel="noreferrer" aria-label="Follow our WhatsApp channel"><Icon name="wa" size={20} /></a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Saudi visa</h4>
          {SAUDI_LINKS.slice(0, 6).map((l) => <Link key={l.to} to={l.to}>{l.label}</Link>)}
        </div>

        <div className="footer-col">
          <h4>Attestation</h4>
          {countryMenu.map((c) => <Link key={c.country} to={c.path}>{c.country}</Link>)}
          <Link to="/attestation-calculator">Requirements</Link>
        </div>

        <div className="footer-col footer-trust-block">
          <h4>Visit &amp; contact</h4>
          <p><Icon name="pin" size={16} /><span><b>Professional Travel &amp; Visa Services Office:</b> {ADDRESS}</span></p>
          <p><Icon name="phone" size={16} /><span>Phone / WhatsApp: {PHONE}</span></p>
          <p><Icon name="mail" size={16} /><span><a href={`mailto:${EMAIL}`}>{EMAIL}</a></span></p>
          <p><Icon name="shield" size={16} /><span>OEP / BEOE licence no.: [confirm]</span></p>
          <p><Icon name="clock" size={16} /><span>Office hours: [confirm]</span></p>
          <div className="footer-follow-row">
            <a className="btn btn-gold btn-sm" href={WA_CHANNEL} target="_blank" rel="noreferrer">Follow our WhatsApp channel</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="wrap footer-bottom__inner">
          <span>© {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.</span>
          <span>{PHONE} · <a href={`mailto:${EMAIL}`}>{EMAIL}</a> · <a href={WA} target="_blank" rel="noreferrer">WhatsApp</a></span>
        </div>
      </div>
    </footer>
  );
}

export function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Assalamu Alaikum! I can help with Saudi visa guidance, document attestation, and Umrah support. Ask me anything.' },
  ]);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, open]);

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
          <Icon name="spark" size={20} /> AI Help
        </button>
      )}

      {open && (
        <div className="ai-chat-panel" role="dialog" aria-label="AI assistance chat">
          <div className="ai-chat-header">
            <span className="ai-avatar"><Icon name="spark" size={20} /></span>
            <div>
              <strong>AI Concierge</strong>
              <span><i className="live-dot" /> Instant guidance</span>
            </div>
            <button type="button" className="ai-close" onClick={() => setOpen(false)} aria-label="Close AI assistant">×</button>
          </div>

          <div className="ai-chat-body" ref={bodyRef}>
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
            <button type="button" className="btn" onClick={handleSend} aria-label="Send message"><Icon name="arrow" size={18} /></button>
          </div>
        </div>
      )}
    </div>
  );
}
