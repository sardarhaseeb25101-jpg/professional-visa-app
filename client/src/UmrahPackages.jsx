import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function UmrahPackages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/packages')
      .then((r) => r.json())
      .then((data) => {
        setPackages(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <section className="page"><p>Loading packages...</p></section>;

  if (packages.length === 0) {
    return (
      <section className="page narrow">
        <h1>Umrah Packages</h1>
        <p>Packages coming soon. Contact us for details.</p>
        <Link to="/" className="btn">Back to Home</Link>
      </section>
    );
  }

  return (
    <section className="page">
      <h1>Umrah Packages 2024-2025</h1>
      <p className="lead">Choose the perfect Umrah package tailored to your budget and preferences.</p>

      <div className="grid" style={{ marginTop: '40px' }}>
        {packages.map((pkg) => (
          <PackageCard key={pkg._id} pkg={pkg} />
        ))}
      </div>
    </section>
  );
}

function PackageCard({ pkg }) {
  const [showForm, setShowForm] = useState(false);

  const getIcon = (name) => {
    const icons = { Economy: '💼', Premium: '✨', Family: '👨‍👩‍👧‍👦', VIP: '👑' };
    return icons[name] || '🕋';
  };

  return (
    <div className="panel" style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
      <div style={{ fontSize: '3rem', marginBottom: '12px', textAlign: 'center' }}>
        {getIcon(pkg.name)}
      </div>
      <h2 style={{ marginTop: 0 }}>{pkg.name} Umrah</h2>

      <p style={{ fontSize: '0.9rem', color: '#6b7a7e', marginBottom: '16px' }}>
        {pkg.description || 'Experience the spiritual journey of Umrah'}
      </p>

      <div style={{ marginBottom: '16px', padding: '12px', background: '#f5f7fa', borderRadius: '6px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontWeight: 600 }}>Duration:</span>
          <span>{pkg.duration} days</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontWeight: 600 }}>Group Size:</span>
          <span>{pkg.groupSize || '2-4 persons'}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: 600 }}>Price:</span>
          <span style={{ fontSize: '1.2rem', color: '#0b5d4b', fontWeight: 700 }}>
            Rs. {pkg.pricePerPerson?.toLocaleString()}
          </span>
        </div>
      </div>

      {pkg.hotel && (
        <div style={{ marginBottom: '16px', padding: '12px', background: '#f5f7fa', borderRadius: '6px' }}>
          <h4 style={{ margin: '0 0 8px 0' }}>🏨 Hotel</h4>
          <p style={{ margin: 0, fontSize: '0.95rem' }}>
            <strong>{pkg.hotel.name}</strong>
            <br />
            <span style={{ fontSize: '0.85rem', color: '#6b7a7e' }}>
              ⭐ {pkg.hotel.stars} stars • Rs. {pkg.hotel.price?.toLocaleString()}/night
            </span>
          </p>
        </div>
      )}

      {pkg.inclusions && pkg.inclusions.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <h4 style={{ margin: '0 0 8px 0' }}>✓ Included</h4>
          <ul style={{ margin: 0, padding: '0 0 0 1.2em', fontSize: '0.9rem' }}>
            {pkg.inclusions.map((item) => (
              <li key={item} style={{ marginBottom: '4px' }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button
          className="btn"
          onClick={() => setShowForm(!showForm)}
          style={{ width: '100%' }}
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
      <div style={{ marginTop: '16px', padding: '16px', background: '#f0fdf4', borderRadius: '6px', borderLeft: '4px solid #0b5d4b' }}>
        <p style={{ margin: 0, color: '#0b5d4b', fontWeight: 600 }}>
          Booking request sent! We will contact you on {form.phone}.
        </p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: '16px', padding: '16px', background: '#f5f7fa', borderRadius: '6px' }}>
      <h4 style={{ marginTop: 0 }}>Complete Your Booking</h4>
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
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn" onClick={submit} disabled={state === 'sending'}>
            {state === 'sending' ? 'Sending...' : 'Confirm Booking'}
          </button>
          <button className="btn ghost" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
