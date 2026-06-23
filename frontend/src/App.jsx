import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import StudentDashboard from "./components/StudentDashboard";
import AdminDashboard from "./components/AdminDashboard";
import RecruiterDashboard from "./components/RecruiterDashboard";
import CompanyList from "./components/CompanyList";

function App() {
  return (
    <BrowserRouter>
      <div style={{background:"#1e3a8a"}}>
        <h1 className="header">College Placement Tracker</h1>
      </div>

      <nav>
        <Link to="/">Login</Link> |{" "}
        <Link to="/signup">Signup</Link> |{" "}
        <Link to="/student">Student</Link> |{" "}
        <Link to="/admin">Admin</Link> |{" "}
        <Link to="/recruiter">Recruiter</Link> |{" "}
        <Link to="/companies">Companies</Link>
      </nav>

      <hr />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/recruiter" element={<RecruiterDashboard />} />
        <Route path="/companies" element={<CompanyList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;