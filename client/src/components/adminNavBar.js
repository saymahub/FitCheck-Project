import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./adminNavBar.css";
import Grid from "../pages/images/Grid.svg";
import search from "../pages/images/search.svg";

const NavigationBar = () => {
  const [selected, setSelected] = useState("Grid"); // Default selected icon
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (icon, route) => {
    setSelected(icon);
    navigate(route);
  };

  useEffect(() => {
    if (location.pathname.includes("admin_search_page")) {
      setSelected("search");
    } else if (location.pathname.includes("admin_dashboard")) {
      setSelected("Grid");
    }
  }, [location.pathname]);

  return (
    <div className="nav-bar">
      <button
        className={`nav-button ${selected === "Grid" ? "selected" : ""}`}
        onClick={() => handleNavigation("Grid", "../admin_dashboard")}
      >
        <img src={Grid} className="nav-icon" alt="Dashboard Icon" />
      </button>
      <button
        className={`nav-button ${selected === "search" ? "selected" : ""}`}
        onClick={() => handleNavigation("search", "../admin_search_page")}
      >
        <img src={search} className="nav-icon" alt="Search Icon" />
      </button>
    </div>
  );
};

export default NavigationBar;
