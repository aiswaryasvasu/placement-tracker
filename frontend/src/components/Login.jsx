import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Processing...');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('✅ Success! Redirecting...');
        localStorage.setItem('token', data.token); // Store token
        window.location.href = '/student';       // Redirect to your dashboard
      } else {
        setMessage(`❌ ${data.message || 'Login failed'}`);
      }
    } catch (error) {
      setMessage('❌ Server unreachable');
    }
  };

  return (
    <div className="landing">
      <div className="hero">
        <h3>Simplifying Campus Placements</h3>
        <p>Manage companies, applications and placement activities through one centralized platform.</p>
      </div>

      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        
        {message && <p style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{message}</p>}

        <input
          type="email"
          placeholder= "Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;