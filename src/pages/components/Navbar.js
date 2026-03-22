import React from "react";

function Navbar() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <span className="navbar-brand">OCMS</span>

        {token && (
          <div>
            {role === "ADMIN" && (
              <span style={{ color: "white", marginRight: "10px" }}>
                Admin Panel
              </span>
            )}

            {role === "STUDENT" && (
              <span style={{ color: "white", marginRight: "10px" }}>
                Student Dashboard
              </span>
            )}

            <button className="btn btn-danger" onClick={logout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
