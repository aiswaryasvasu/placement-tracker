function Signup() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p>Register for placement opportunities</p>

        <input
          type="text"
          placeholder="Full Name"
        />

        <input
          type="email"
          placeholder="College Email"
        />

        <input
          type="password"
          placeholder="Password"
        />

        <button>Sign Up</button>

        <p className="auth-link">
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}

export default Signup;