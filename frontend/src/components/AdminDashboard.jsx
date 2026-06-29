import React, { useState } from "react";

function AdminDashboard() {
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const sendNotification = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/send-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, message }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("✅ Notification sent!");
        setMessage("");
        setUserId("");
      } else {
        setStatus(data.message || "Failed to send");
      }
    } catch (err) {
      setStatus("❌ Server error");
    }
  };

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h2>Admin Dashboard</h2>

      {/* Dropdown */}
      <select
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        style={{
          display: "block",
          marginBottom: "10px",
          padding: "8px",
          width: "300px",
        }}
      >
        <option value="">Select Student</option>
        <option value="6a42c95eccff5377af40510e">
          Harik (Student)
        </option>
      </select>

      {/* Message */}
      <input
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{
          display: "block",
          marginBottom: "10px",
          padding: "8px",
          width: "300px",
        }}
      />

      {/* Button */}
      <button
        onClick={sendNotification}
        style={{
          padding: "10px 15px",
          background: "#2563eb",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Send Notification
      </button>

      {/* Status */}
      <p style={{ marginTop: "10px" }}>{status}</p>

      {/* Stats */}
      <div style={{ marginTop: "30px" }}>
        <h3>Companies: 15</h3>
        <h3>Applications: 230</h3>
        <h3>Placed: 75</h3>
      </div>
    </div>
  );
}

export default AdminDashboard;