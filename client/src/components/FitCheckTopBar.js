import React, { useState } from "react";
import "./FitCheckTopBar.css"; 
import FitCheck from "../pages/images/white_FitCheck.png"

const FitCheckTopBar = () => {
  
    return (
      <div className="top-bar">
        <img src={FitCheck} alt="FitCheck Logo" className="logo"/>
      </div>
    );
};
  
export default FitCheckTopBar;