function Login() {
  return (
    <div className="landing">

      <div className="hero">

        

        <h3>
          Simplifying Campus Placements
        </h3>

        <p>
          Manage companies, applications and placement
          activities through one centralized platform.
        </p>

      </div>

      <div className="auth-card">

        <h2>Sign In</h2>

        <input
          type="email"
          placeholder="College Email"
        />

        <input
          type="password"
          placeholder="Password"
        />

        <button>Login</button>

      </div>

    </div>
    
  );
}

export default Login;