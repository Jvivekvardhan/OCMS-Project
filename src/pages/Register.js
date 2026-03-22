import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const registerUser = async () => {
    try {
      await axios.post("http://localhost:8080/users", {
        name,
        username,
        email,
        password,
        role,
      });

      alert("Registration successful!");
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card p-4">
            <h3 className="text-center mb-3">Register</h3>

            <input
              className="form-control mb-2"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="form-control mb-2"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              className="form-control mb-2"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="form-control mb-2"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <select
              className="form-control mb-3"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select Role</option>
              <option value="STUDENT">Student</option>
              <option value="ADMIN">Admin</option>
            </select>

            <button className="btn btn-primary w-100" onClick={registerUser}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
