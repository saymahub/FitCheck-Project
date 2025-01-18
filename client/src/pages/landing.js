import React from "react";
import { useNavigate } from "react-router-dom";
import "./login.css"; 
import whiteStarLogo from './images/white_star_logo.png';
import whiteFitCheck from './images/white_FitCheck.png';

const LandingPage = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      <div className="background-container">
        <div className="purple-background"></div>
        <div className="stars-background"></div>
      </div>

      <div className="landing-container">
        <div className="content">
          <img src={whiteStarLogo} alt="Star Icon" className="star-icon"/>
          <img src={whiteFitCheck} alt="FitCheck Logo" className="logo-image"/>
          <p className="slogan">Create Rate Elevate</p>
          <button className="get-started-btn" onClick={goToLogin}>Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
