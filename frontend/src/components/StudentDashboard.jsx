import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
function StudentDashboard() {
  const navigate = useNavigate();

  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [error, setError] = useState("");
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchPersonalDashboard = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("⚠️ Authentication missing. Please login first.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/auth/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setStudentData(data);
        } else {
          setError(data.message || "Failed to load profile.");
        }
      } catch (err) {
        console.error("Dashboard Error:", err);
        setError("❌ Cannot connect to backend server.");
      } finally {
        setLoading(false);
      }
    };

    fetchPersonalDashboard();
  }, []);
useEffect(() => {
  if (!studentData?._id) return;

  const socket = io("http://localhost:5000");

  socket.on("connect", () => {
    console.log("Socket connected:", socket.id);

    socket.emit("join_user_channel", studentData._id);
    console.log("Joined room:", studentData._id);
  });

  socket.on("notification", (data) => {
    console.log("Notification received:", data);
    setNotifications((prev) => [data, ...prev]);
  });

  return () => socket.disconnect();
}, [studentData?._id]);
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleAICheck = async () => {
  setAiLoading(true);
  setAiResult(null);

  try {
    const response = await fetch("http://localhost:5000/api/ai/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cgpa: Number(studentData?.cgpa) || 8.2,
        backlogs: studentData?.backlogs || 0,
        skills: studentData?.skills || ["React", "Node.js"],
        companyRequiredCgpa: 7.5,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setAiResult(data.data);
    } else {
      alert(data.message || "AI check failed.");
    }
  } catch (err) {
    console.error("AI Error:", err);
    alert("Failed to connect to the AI server.");
  } finally {
    setAiLoading(false);
  }
};

  if (loading) {
    return (
      <div
        style={{
          padding: "20px",
          color: "white",
          textAlign: "center",
          fontSize: "20px",
        }}
      >
        ⏳ Loading your personal dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          padding: "20px",
          color: "#f87171",
          textAlign: "center",
          fontSize: "18px",
        }}
      >
        {error}
      </div>
    );
  }

  return (
    <div
      className="dashboard-container"
      style={{
        padding: "30px",
        background: "#0f172a",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>🎓 Student Dashboard</h1>

      <button
        onClick={handleLogout}
        style={{
          padding: "10px 18px",
          background: "#ef4444",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "25px",
        }}
      >
        Logout
      </button>

      {/* Student Profile */}
      <div
        style={{
          background: "#1e293b",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <h3>👤 Student Profile</h3>

        <p>
          <strong>Name:</strong> {studentData?.name || "Not Available"}
        </p>

        <p>
          <strong>Email:</strong> {studentData?.email || "Not Available"}
        </p>

        <p>
          <strong>Role:</strong> {studentData?.role || "Student"}
        </p>

        <p>
          <strong>Branch:</strong> {studentData?.branch || "Not Available"}
        </p>

        <p>
          <strong>CGPA:</strong> {studentData?.cgpa || "Not Available"}
        </p>
      </div>

      {/* Application Status */}
      <div
        style={{
          background: "#1e293b",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <h3>📄 Application Status</h3>

        <p>✅ Applied</p>
        <p>✅ Aptitude Test Cleared</p>
        <p>⏳ Waiting for Interview</p>
      </div>

      {/* AI Eligibility Checker */}
      <div
        style={{
          background: "#1e293b",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <h3>🤖 AI Eligibility Checker</h3>

        <p>
          Check whether your profile matches company eligibility criteria using
          AI.
        </p>

        <button
  onClick={handleAICheck}
  disabled={aiLoading}
  style={{
    padding: "10px 18px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: aiLoading ? "not-allowed" : "pointer",
    opacity: aiLoading ? 0.7 : 1,
  }}
>
  {aiLoading ? "Checking..." : "Check AI Eligibility"}
</button>
{aiResult && (
  <div
    style={{
      marginTop: "20px",
      background: "#334155",
      padding: "15px",
      borderRadius: "8px",
    }}
  >
    <h4>🤖 AI Eligibility Result</h4>

    <p>
      <strong>Status:</strong> {aiResult.status}
    </p>

    <p>
      <strong>Summary:</strong> {aiResult.summary}
    </p>

    <strong>Recommendations:</strong>

    <ul>
      {aiResult.recommendations.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
)}
      </div>

      <div
  style={{
    background: "#1e293b",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
  }}
>
  <h3>🔔 Notifications</h3>

  {notifications.length === 0 ? (
    <p>No new notifications.</p>
  ) : (
    <ul>
      {notifications.map((n, index) => (
        <li key={index} style={{ marginBottom: "8px" }}>
          {n.message}
        </li>
      ))}
    </ul>
  )}
</div>

      {/* Available Companies */}
      <div
        style={{
          background: "#1e293b",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h3>🏢 Available Companies</h3>

        <p>
          <strong>TCS</strong> — Package: 7 LPA | Minimum CGPA: 6.5
        </p>

        <p>
          <strong>Infosys</strong> — Package: 8 LPA | Minimum CGPA: 7.0
        </p>

        <p>
          <strong>Wipro</strong> — Package: 6 LPA | Minimum CGPA: 6.0
        </p>
      </div>
    </div>
  );
}

export default StudentDashboard;