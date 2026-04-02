import { useState } from "react";
export default function Header({ role, setRole, dark, setDark }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="header">
      
      <div className="header-left">
        <h1>Dashboard</h1>
        <p className="sub">Welcome back 👋</p>
      </div>

      <div className="header-right">

        {/* CUSTOM DROPDOWN */}
        <div className="dropdown">
          <div 
            className="dropdown-btn" 
            onClick={() => setOpen(!open)}
          >
            {role} ▾
          </div>

          {open && (
            <div className="dropdown-menu">
              <div onClick={() => {setRole("Viewer"); setOpen(false);}}>
                Viewer
              </div>
              <div onClick={() => {setRole("Admin"); setOpen(false);}}>
                Admin
              </div>
            </div>
          )}
        </div>

        <button className="dark-btn" onClick={() => setDark(!dark)}>
          {dark ? "☀️" : "🌙"}
        </button>

        <div className="profile">R</div>

      </div>
    </div>
  );
}