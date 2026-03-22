import React from "react";

import Navbar from "./pages/components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Courses from "./pages/Courses";
import MyCourses from "./pages/MyCourses";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <div>
      <Navbar />

      {!token ? (
        <div>
          <Register />
          <hr />
          <Login />
        </div>
      ) : role === "ROLE_ADMIN" ? (
        <AdminDashboard />
      ) : (
        <div>
          <Courses />
          <hr />
          <MyCourses />
        </div>
      )}
    </div>
  );
}

export default App;
