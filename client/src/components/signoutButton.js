import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthUser, useSignOut  } from 'react-auth-kit'
import Button from '@mui/material/Button';
import "./signoutButton.css"; 

const SignOut = () => {

  const auth = useAuthUser();
  const navigate = useNavigate();
  const handleNavigation = (route) => {
    navigate(route); 
  };

  if (!auth()) {
    handleNavigation("../landing"); 
  }

  let username = 0; 
  let userID = 0;
  const signOut = useSignOut(); 

  if (auth()) {
    username = auth().values.username; 
    userID = auth().values.userID;
  }

  const handleLogout = () => {
    signOut();
    handleNavigation("../landing");
  };

  return (
    <Button
      className="button-logout"
      variant="outlined"
      color="error"
      onClick={() => handleLogout()}
      sx={{
        position: "fixed",
        padding: "5px 15px",
      }}
    >
      Sign Out
    </Button>
  );
};

export default SignOut;
