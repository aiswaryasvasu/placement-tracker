import ApplicationPipeline from "./ApplicationPipeline";

function StudentDashboard() {
  return (
    <div className="page">
      <h2>Student Dashboard</h2>

      <div className="card">
        <h3>Student Profile</h3>

        <p>Name: Ria</p>
        <p>Branch: CSE</p>
        <p>CGPA: 8.2</p>
      </div>

      <ApplicationPipeline />
    </div>
  );
}

export default StudentDashboard;