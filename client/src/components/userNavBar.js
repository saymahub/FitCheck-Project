import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./userNavBar.css"; 
import shoppingbag from "../pages/images/bag-shopping-solid.svg";
import shirt from "../pages/images/shirt-solid.svg";
import star from "../pages/images/star-solid.svg";

const NavigationBar = () => {
  const [selected, setSelected] = useState("star");

  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (icon, route) => {
    setSelected(icon); 
    navigate(route);
  };

  useEffect(() => {
    if (location.pathname.includes("catalog")) {
      setSelected("shoppingBag");
    } else if (location.pathname.includes("foryou")) {
      setSelected("star");
    } else if (location.pathname.includes("userprofile")) {
      setSelected("shirt");
    }
  }, [location.pathname]);


  return (
    <div className="dock">
      <button
        className={`dock-btn ${selected === "shoppingbag" ? "selected" : ""}`}
        onClick={() => handleNavigation("shoppingbag", "../catalog")}
      > <img src={shoppingbag} alt="Shopping Bag Icon" className="dock-icon"/>
      </button>
      <button
        className={`dock-btn ${selected === "star" ? "selected" : ""}`}
        onClick={() => handleNavigation("star", "../foryou")}
      > <img src={star} alt="Shirt Icon" className="dock-icon"/>
      </button>
      <button
        className={`dock-btn ${selected === "profile" ? "selected" : ""}`}
        onClick={() => handleNavigation("profile", "../userprofile")}
      ><img src={shirt} alt="Star Icon" className="dock-icon"/>
      </button>
    </div>
  );
};

export default NavigationBar;
