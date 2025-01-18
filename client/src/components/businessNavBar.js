import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./businessNavBar.css"; 
import bag from "../pages/images/bag-shopping-solid.svg";
import plus from "../pages/images/plus-solid.svg";
import person from "../pages/images/user-solid.svg"

const NavigationBar = () => {
  const [selected, setSelected] = useState("shoppingBag"); // Default selected icon

  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (icon, route) => {
    setSelected(icon); 
    navigate(route);
  };

  useEffect(() => {
    if (location.pathname.includes("business_dashboard")) {
      setSelected("shoppingBag");
    } else if (location.pathname.includes("business_add_post")) {
      setSelected("plus");
    } else if (location.pathname.includes("business_profile")) {
      setSelected("profile");
    }
  }, [location.pathname]);

  return (
    <div className="navigation-bar">
      <button
        className={`nav-button ${selected === "shoppingBag" ? "selected" : ""}`}
        onClick={() => handleNavigation("shoppingBag", "../business_dashboard")}
      > <img src={bag} alt="Shopping Bag Icon" className="icon"/>
      </button>
      <button
        className={`nav-button ${selected === "plus" ? "selected" : ""}`}
        onClick={() => handleNavigation("plus", "../business_add_post")}
      > <img src={plus} alt="Add Post Icon" className="icon"/>
      </button>
      <button
        className={`nav-button ${selected === "profile" ? "selected" : ""}`}
        onClick={() => handleNavigation("profile", "../business_profile")}
      ><img src={person} className="person"/>
      </button>
    </div>
  );
};

export default NavigationBar;
