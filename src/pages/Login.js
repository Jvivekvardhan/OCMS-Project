import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);

      // decode role from JWT
      const token = response.data.token;
      const payload = JSON.parse(atob(token.split(".")[1]));

      localStorage.setItem("role", payload.role);

      alert("Login successful");

      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card p-4">
            <h3 className="text-center mb-3">Login</h3>

            <input
              className="form-control mb-2"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              className="form-control mb-3"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="btn btn-success w-100" onClick={loginUser}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
