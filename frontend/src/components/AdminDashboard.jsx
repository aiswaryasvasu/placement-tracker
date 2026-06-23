function AdminDashboard() {
  return (
    <div className="page">
      <h2>Admin Dashboard</h2>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Companies</h3>
          <p>15</p>
        </div>

        <div className="stat-card">
          <h3>Applications</h3>
          <p>230</p>
        </div>

        <div className="stat-card">
          <h3>Placed</h3>
          <p>75</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;