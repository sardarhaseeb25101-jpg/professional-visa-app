import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageHead, Icon } from './ui.jsx';
import { WA } from './content.js';

const fallbackPackages = [
  {
    _id: 'fallback-economy',
    name: 'Economy',
    description: 'A practical Umrah option for travelers who want a straightforward plan, comfortable support, and clear pricing.',
    duration: 12,
    pricePerPerson: 185000,
    groupSize: '2-4 travelers',
    inclusions: ['Visa guidance', 'Hotel coordination', 'Travel consultation', 'Ground transfer support'],
  },
  {
    _id: 'fallback-premium',
    name: 'Premium',
    description: 'A more refined experience with upgraded hotel support and a smoother, more relaxed travel rhythm.',
    duration: 14,
    pricePerPerson: 245000,
    groupSize: '2-6 travelers',
    inclusions: ['Premium hotel guidance', 'Visa support', 'Priority planning', 'Travel coordination'],
  },
];

export function UmrahPackages() {
  const [packages, setPackages] = useState(fallbackPackages);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/packages')
      .then((r) => r.ok ? r.json() : Promise.reject(new Error('Failed to fetch packages')))
      .then((data) => {
        setPackages(Array.isArray(data) && data.length ? data : fallbackPackages);
        setLoading(false);
      })
      .catch(() => {
        setPackages(fallbackPackages);
        setLoading(false);
      });
  }, []);

  const head = (
    <PageHead kicker="Umrah" title="Umrah Packages" lead="Choose the perfect Umrah package tailored to your budget and preferences.">
      <div className="hero-cta-row">
        <a className="btn btn-gold" href={WA} target="_blank" rel="noreferrer"><Icon name="wa" size={18} /> Ask about dates</a>
      </div>
    </PageHead>
  );

  if (loading) return <>{head}<section className="page"><p className="loading-note">Loading packages...</p></section></>;

  return (<>
    {head}
    <section className="page">
      <div className="umrah-grid">
        {packages.map((pkg) => (
          <PackageCard key={pkg._id} pkg={pkg} />
        ))}
      </div>
    </section>
  </>);
}

function PackageCard({ pkg }) {
  const [showForm, setShowForm] = useState(false);

  const getIcon = (name) => {
    const icons = { Economy: 'briefcase', Premium: 'spark', Family: 'users', VIP: 'star' };
    return icons[name] || 'moon';
  };

  return (
    <div className={`panel umrah-card spot ${/premium|vip/i.test(pkg.name) ? 'umrah-card--hl' : ''}`}>
      <span className="umrah-card__icon"><Icon name={getIcon(pkg.name)} size={26} /></span>
      <h2>{pkg.name} Umrah</h2>

      <p className="umrah-card__desc">
        {pkg.description || 'Experience the spiritual journey of Umrah'}
      </p>

      <div className="umrah-facts">
        <div><span>Duration</span><b>{pkg.duration} days</b></div>
        <div><span>Group size</span><b>{pkg.groupSize || '2-4 persons'}</b></div>
        <div className="umrah-facts__price"><span>Price</span><b>Rs. {pkg.pricePerPerson?.toLocaleString()}</b></div>
      </div>

      {pkg.hotel && (
        <div className="umrah-hotel">
          <h4><Icon name="pin" size={16} /> Hotel</h4>
          <p>
            <strong>{pkg.hotel.name}</strong>
            <span>{pkg.hotel.stars} stars • Rs. {pkg.hotel.price?.toLocaleString()}/night</span>
          </p>
        </div>
      )}

      {pkg.inclusions && pkg.inclusions.length > 0 && (
        <div className="umrah-incl">
          <h4>Included</h4>
          <ul>
            {pkg.inclusions.map((item) => (
              <li key={item}><Icon name="check" size={16} />{item}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="umrah-card__cta">
        <button
          className="btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Book Now'}
        </button>
      </div>

      {showForm && <BookingForm pkg={pkg} onClose={() => setShowForm(false)} />}
    </div>
  );
}

function BookingForm({ pkg, onClose }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', travelers: 1, message: '' });
  const [state, setState] = useState('idle');

  const on = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function submit() {
    if (!form.name || !form.phone) return setState('missing');
    setState('sending');
    try {
      const r = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          service: `${pkg.name} Umrah - ${form.travelers} traveler(s)`,
          quote: { package: pkg.name, duration: pkg.duration, price: pkg.pricePerPerson },
        }),
      });
      setState(r.ok ? 'sent' : 'error');
    } catch {
      setState('error');
    }
  }

  if (state === 'sent') {
    return (
      <div className="booking-ok">
        <p>Booking request sent! We will contact you on {form.phone}.</p>
      </div>
    );
  }

  return (
    <div className="booking-form">
      <h4>Complete Your Booking</h4>
      <div className="form">
        <label>
          Name
          <input value={form.name} onChange={on('name')} />
        </label>
        <label>
          Phone / WhatsApp
          <input value={form.phone} onChange={on('phone')} />
        </label>
        <label>
          Email (optional)
          <input value={form.email} onChange={on('email')} />
        </label>
        <label>
          Number of Travelers
          <input type="number" min="1" max="20" value={form.travelers} onChange={on('travelers')} />
        </label>
        <label>
          Message / Special Requests
          <textarea rows="3" value={form.message} onChange={on('message')} />
        </label>
        {state === 'missing' && <p className="err">Enter your name and phone number.</p>}
        {state === 'error' && <p className="err">Could not send. Message us on WhatsApp instead.</p>}
        <div className="row booking-actions">
          <button className="btn" onClick={submit} disabled={state === 'sending'}>
            {state === 'sending' ? 'Sending...' : 'Confirm Booking'}
          </button>
          <button className="btn ghost" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
