import { useState } from 'react';

export function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleLogin() {
    if (!password) {
      setError('Enter password');
      return;
    }
    onLogin(password);
    setPassword('');
    setError('');
  }

  return (
    <section className="page narrow">
      <h1>Admin Dashboard</h1>
      <p className="lead">Enter your admin password to manage packages and hotels.</p>
      <div className="form">
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
          />
        </label>
        {error && <p className="err">{error}</p>}
        <button className="btn" onClick={handleLogin}>Login</button>
      </div>
    </section>
  );
}
