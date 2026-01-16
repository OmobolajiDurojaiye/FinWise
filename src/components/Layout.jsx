import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";
import { SunFill, MoonFill } from "react-bootstrap-icons";

const Layout = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="app-container">
      <header className="d-flex justify-content-end align-items-center p-3">
        <button
          onClick={toggleTheme}
          className="btn btn-secondary rounded-circle p-2 lh-1"
        >
          {theme === "light" ? <MoonFill size={20} /> : <SunFill size={20} />}
        </button>
      </header>

      <main className="container">
        <Outlet />
      </main>

      <BottomNav />
    </div>
  );
};

export default Layout;
