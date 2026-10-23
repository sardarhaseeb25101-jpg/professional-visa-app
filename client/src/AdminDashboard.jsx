import { useState, useEffect } from 'react';
import { PageHead } from './ui.jsx';

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

  return (<>
    <PageHead kicker="Admin" title="Admin Dashboard" lead="Manage Umrah packages and hotels.">
      <div className="hero-cta-row">
        <button className="btn btn-glass" onClick={onLogout}>Logout</button>
      </div>
    </PageHead>
    <section className="page admin">
      {message && <p className="ok">{message}</p>}

      <div className="admin-tabs" role="tablist">
        <button
          role="tab"
          aria-selected={tab === 'packages'}
          className={tab === 'packages' ? 'is-active' : ''}
          onClick={() => setTab('packages')}
        >
          Packages
        </button>
        <button
          role="tab"
          aria-selected={tab === 'hotels'}
          className={tab === 'hotels' ? 'is-active' : ''}
          onClick={() => setTab('hotels')}
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
            <div className="table-scroll">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Duration</th>
                    <th>Price</th>
                    <th>Hotel</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {packages.map((pkg) => (
                    <tr key={pkg._id}>
                      <td>{pkg.name}</td>
                      <td>{pkg.duration} days</td>
                      <td>Rs. {pkg.pricePerPerson}</td>
                      <td>{pkg.hotel?.name || 'N/A'}</td>
                      <td>
                        <button className="btn btn-danger btn-sm" onClick={() => deletePackage(pkg._id)}>
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
            <div className="table-scroll">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Stars</th>
                    <th>Location</th>
                    <th>Price/Night</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {hotels.map((hotel) => (
                    <tr key={hotel._id}>
                      <td>{hotel.name}</td>
                      <td>⭐ {hotel.stars}</td>
                      <td>{hotel.location}</td>
                      <td>Rs. {hotel.pricePerNight}</td>
                      <td>
                        <button className="btn btn-danger btn-sm" onClick={() => deleteHotel(hotel._id)}>
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
  </>);
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
    <div className="panel admin-form">
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
        <div className="check-grid">
          {inclusions.map((item) => (
            <label key={item} className="check">
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
    <div className="panel admin-form">
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
