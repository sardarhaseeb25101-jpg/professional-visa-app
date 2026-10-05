import { useState, useEffect } from 'react';

export function AdminDashboard({ adminPassword, onLogout }) {
  const [tab, setTab] = useState('packages');
  const [packages, setPackages] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadPackages();
    loadHotels();
  }, []);

  const headers = { 'x-admin-password': adminPassword, 'Content-Type': 'application/json' };

  async function loadPackages() {
    try {
      const r = await fetch('/api/packages', { headers });
      const data = await r.json();
      setPackages(data);
    } catch (e) {
      setMessage('Error loading packages');
    }
    setLoading(false);
  }

  async function loadHotels() {
    try {
      const r = await fetch('/api/hotels', { headers });
      const data = await r.json();
      setHotels(data);
    } catch (e) {
      setMessage('Error loading hotels');
    }
  }

  async function savePackage(pkg) {
    try {
      const url = pkg._id ? `/api/packages/${pkg._id}` : '/api/packages';
      const method = pkg._id ? 'PUT' : 'POST';
      const r = await fetch(url, { method, headers, body: JSON.stringify(pkg) });
      if (r.ok) {
        setMessage('Package saved!');
        loadPackages();
      } else {
        setMessage('Error saving package');
      }
    } catch (e) {
      setMessage('Error: ' + e.message);
    }
  }

  async function deletePackage(id) {
    if (confirm('Delete this package?')) {
      try {
        await fetch(`/api/packages/${id}`, { method: 'DELETE', headers });
        setMessage('Package deleted');
        loadPackages();
      } catch (e) {
        setMessage('Error deleting');
      }
    }
  }

  async function saveHotel(hotel) {
    try {
      const url = hotel._id ? `/api/hotels/${hotel._id}` : '/api/hotels';
      const method = hotel._id ? 'PUT' : 'POST';
      const r = await fetch(url, { method, headers, body: JSON.stringify(hotel) });
      if (r.ok) {
        setMessage('Hotel saved!');
        loadHotels();
      } else {
        setMessage('Error saving hotel');
      }
    } catch (e) {
      setMessage('Error: ' + e.message);
    }
  }

  async function deleteHotel(id) {
    if (confirm('Delete this hotel?')) {
      try {
        await fetch(`/api/hotels/${id}`, { method: 'DELETE', headers });
        setMessage('Hotel deleted');
        loadHotels();
      } catch (e) {
        setMessage('Error deleting');
      }
    }
  }

  return (
    <section className="page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Admin Dashboard</h1>
        <button className="btn ghost" onClick={onLogout}>Logout</button>
      </div>

      {message && <p className="ok">{message}</p>}

      <div style={{ borderBottom: '1px solid #e1e8ed', marginBottom: '20px', display: 'flex', gap: '20px' }}>
        <button
          onClick={() => setTab('packages')}
          style={{
            padding: '12px 20px',
            background: tab === 'packages' ? '#0b5d4b' : 'transparent',
            color: tab === 'packages' ? '#fff' : '#666',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          Packages
        </button>
        <button
          onClick={() => setTab('hotels')}
          style={{
            padding: '12px 20px',
            background: tab === 'hotels' ? '#0b5d4b' : 'transparent',
            color: tab === 'hotels' ? '#fff' : '#666',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          Hotels
        </button>
      </div>

      {tab === 'packages' && (
        <div>
          <h2>Manage Umrah Packages</h2>
          <PackageForm onSave={savePackage} />
          <h3>Active Packages</h3>
          {packages.length === 0 ? (
            <p>No packages yet.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e1e8ed' }}>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Duration</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Price</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Hotel</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {packages.map((pkg) => (
                    <tr key={pkg._id} style={{ borderBottom: '1px solid #e1e8ed' }}>
                      <td style={{ padding: '12px' }}>{pkg.name}</td>
                      <td style={{ padding: '12px' }}>{pkg.duration} days</td>
                      <td style={{ padding: '12px' }}>Rs. {pkg.pricePerPerson}</td>
                      <td style={{ padding: '12px' }}>{pkg.hotel?.name || 'N/A'}</td>
                      <td style={{ padding: '12px' }}>
                        <button
                          onClick={() => deletePackage(pkg._id)}
                          style={{
                            background: '#a3262a',
                            color: '#fff',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {tab === 'hotels' && (
        <div>
          <h2>Manage Hotels</h2>
          <HotelForm onSave={saveHotel} />
          <h3>Available Hotels</h3>
          {hotels.length === 0 ? (
            <p>No hotels yet.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e1e8ed' }}>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Stars</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Location</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Price/Night</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {hotels.map((hotel) => (
                    <tr key={hotel._id} style={{ borderBottom: '1px solid #e1e8ed' }}>
                      <td style={{ padding: '12px' }}>{hotel.name}</td>
                      <td style={{ padding: '12px' }}>⭐ {hotel.stars}</td>
                      <td style={{ padding: '12px' }}>{hotel.location}</td>
                      <td style={{ padding: '12px' }}>Rs. {hotel.pricePerNight}</td>
                      <td style={{ padding: '12px' }}>
                        <button
                          onClick={() => deleteHotel(hotel._id)}
                          style={{
                            background: '#a3262a',
                            color: '#fff',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function PackageForm({ onSave }) {
  const [form, setForm] = useState({
    name: 'Economy',
    description: '',
    duration: 5,
    pricePerPerson: 0,
    groupSize: '',
    inclusions: [],
  });

  const inclusions = ['Flights', 'Visa', 'Meals', 'Guide', 'Transport', 'Hotel'];

  const toggle = (item) => {
    setForm({
      ...form,
      inclusions: form.inclusions.includes(item)
        ? form.inclusions.filter((i) => i !== item)
        : [...form.inclusions, item],
    });
  };

  return (
    <div className="panel" style={{ marginBottom: '20px' }}>
      <h3>Add/Edit Package</h3>
      <div className="form">
        <label>
          Package Type
          <select value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}>
            <option>Economy</option>
            <option>Premium</option>
            <option>Family</option>
            <option>VIP</option>
          </select>
        </label>
        <label>
          Description
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Package description"
          />
        </label>
        <label>
          Duration (days)
          <input
            type="number"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: parseInt(e.target.value) })}
          />
        </label>
        <label>
          Price per Person (Rs.)
          <input
            type="number"
            value={form.pricePerPerson}
            onChange={(e) => setForm({ ...form, pricePerPerson: parseInt(e.target.value) })}
          />
        </label>
        <label>
          Group Size (e.g., "2-4 persons")
          <input
            type="text"
            value={form.groupSize}
            onChange={(e) => setForm({ ...form, groupSize: e.target.value })}
          />
        </label>
        <label>Inclusions</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '10px' }}>
          {inclusions.map((item) => (
            <label key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                checked={form.inclusions.includes(item)}
                onChange={() => toggle(item)}
              />
              {item}
            </label>
          ))}
        </div>
        <button className="btn" onClick={() => onSave(form)}>Save Package</button>
      </div>
    </div>
  );
}

function HotelForm({ onSave }) {
  const [form, setForm] = useState({
    name: '',
    stars: 3,
    location: '',
    pricePerNight: 0,
  });

  return (
    <div className="panel" style={{ marginBottom: '20px' }}>
      <h3>Add Hotel</h3>
      <div className="form">
        <label>
          Hotel Name
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Hotel name"
          />
        </label>
        <label>
          Stars
          <select value={form.stars} onChange={(e) => setForm({ ...form, stars: parseInt(e.target.value) })}>
            <option value={1}>⭐</option>
            <option value={2}>⭐⭐</option>
            <option value={3}>⭐⭐⭐</option>
            <option value={4}>⭐⭐⭐⭐</option>
            <option value={5}>⭐⭐⭐⭐⭐</option>
          </select>
        </label>
        <label>
          Location (Mecca/Medina)
          <input
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            placeholder="City/Area"
          />
        </label>
        <label>
          Price per Night (Rs.)
          <input
            type="number"
            value={form.pricePerNight}
            onChange={(e) => setForm({ ...form, pricePerNight: parseInt(e.target.value) })}
          />
        </label>
        <button className="btn" onClick={() => onSave(form)}>Add Hotel</button>
      </div>
    </div>
  );
}
