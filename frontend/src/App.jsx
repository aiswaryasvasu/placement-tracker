import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import StudentDashboard from "./components/StudentDashboard";

function App() {
  return (
    <BrowserRouter>

      <h1>College Placement Tracker</h1>

      <nav>
        <Link to="/">Login</Link>
        {" | "}
        <Link to="/signup">Signup</Link>
        {" | "}
        <Link to="/dashboard">Dashboard</Link>
      </nav>

      <hr />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;