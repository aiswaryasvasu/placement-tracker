function ApplicationPipeline() {
  return (
    <div className="card">
      <h2>Application Status</h2>

      <div className="pipeline">

        <div className="step completed">
          <div className="circle">✓</div>
          <p>Applied</p>
        </div>

        <div className="line completed-line"></div>

        <div className="step completed">
          <div className="circle">✓</div>
          <p>Aptitude</p>
        </div>

        <div className="line completed-line"></div>

        <div className="step active">
          <div className="circle">3</div>
          <p>Interview</p>
        </div>

        <div className="line"></div>

        <div className="step">
          <div className="circle">4</div>
          <p>Selected</p>
        </div>

      </div>
    </div>
  );
}

export default ApplicationPipeline;