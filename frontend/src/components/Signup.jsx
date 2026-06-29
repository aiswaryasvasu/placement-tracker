import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- Add this

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // <-- Initialize navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!name || !email || !password) {
      setMessage('⚠️ Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role: 'student' }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('🚀 Account created successfully! Redirecting...');
        if (data.token) localStorage.setItem('token', data.token);
        
        setName(''); setEmail(''); setPassword('');
        setTimeout(() => { navigate('/student'); }, 1500);
      } else {
        setMessage(`❌ Error: ${data.message || 'Signup failed'}`);
      }
    } catch (error) {
      setMessage('❌ Cannot connect to backend server.');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <p>Register for placement opportunities</p>

        {message && <p className="auth-message" style={{ margin: '10px 0', fontWeight: 'bold' }}>{message}</p>}

        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="College Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="submit">Sign Up</button>

        {/* Made this clickable! */}
        <p className="auth-link" style={{ cursor: 'pointer', color: '#3b82f6', marginTop: '15px' }} onClick={() => navigate('/')}>
          Already have an account? Login
        </p>
      </form>
    </div>
  );
}

export default Signup;