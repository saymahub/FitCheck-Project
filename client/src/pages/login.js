import React, { useState, useEffect } from "react";
import "./login.css";
import whiteStarLogo from "./images/white_star_logo.png";
import whiteFitCheck from "./images/white_FitCheck.png";
import { Snackbar, Alert } from "@mui/material";

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSignIn } from 'react-auth-kit';
import sha256 from 'js-sha256'

const LoginPage = () => {
  // State for active view ('buttons', 'login', or 'create')
  const [activeView, setActiveView] = useState("buttons");

  // Handlers to update the active view
  const showLoginForm = () => setActiveView("login");
  const showCreateForm = () => setActiveView("create");

  // user login variables
  const [loginUserName, setLoginUserName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // account creation variables
  const [createUserName, setCreateUserName] = useState('');
  const [createEmail, setCreateEmail] = useState('');
  const [createPassword, setCreatePassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('user');

  const [userID, setUserID] = useState();
  const navigate = useNavigate();
  const signIn = useSignIn();

  const [userRole, setUserRole] = useState("");

   // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState(""); 

  const handleLoginUserName = (event) => {
    setLoginUserName(event.target.value);

  }

  const handleLoginPassword = (event) => {
    setLoginPassword(event.target.value);
  }

  const handleCreateUserName = (event) => {
    setCreateUserName(event.target.value);
  }

  const handleCreateEmail = (event) => {
    setCreateEmail(event.target.value);
  }

  const handleCreatePassword = (event) => {
    setCreatePassword(event.target.value);
  }

  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  }

    const handleUserTypeChange = (event) => {
    setUserType(event.target.value); 
  };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const insertUser = async () => {
      const hash = sha256(createPassword);
      const user = {
      UserName: createUserName,
      UserPassword: hash,
      UserRole: userType,
      UserEmail: createEmail
    }
    try{
      const res = await axios.post("http://localhost:8080/api/loginroutes/createUser", user);
      
        setSnackbarSeverity("success"); 
        setSnackbarMessage("Account successfully created! Redirecting to login..."); 
        setSnackbarOpen(true); 
      
        setTimeout(() => {
            navigate("/login");
            showLoginForm();
        }, 4000);
    } catch (err) {
      console.log('Could not insert user: ', err);
      setSnackbarSeverity("error");
      setSnackbarMessage("Account creation failure. Please try again!");
      setSnackbarOpen(true);
    }
  }

    const checkUserCredentials = async () => {
        const hash = sha256(loginPassword);
        const userCredentials = {
            UserName: loginUserName,
            Password: hash,
        }
        try{
            const res = await axios.post("http://localhost:8080/api/loginroutes/checkUserCredentials", userCredentials);
            if(res.data.length > 0){
                const uid = res.data[0].uid;
                setUserID(uid);
                const userRole = res.data[0].role; 
                setUserRole(userRole);
            }
            console.log(userID);
        } catch(err){
            console.log("not found", err);
        }
    }

    const redirectBasedOnRole = (role) => {
      if (role === "user") {
        navigate("/userprofile");
      } else if (role === "business") {
        navigate("/business_dashboard");
      } else if (role === "admin") {
        navigate("/admin_dashboard");
      } else {
        console.error("Unknown role: ", role);
      }
    };
    

    const authenticateUser = async () => {
        const hash = sha256(loginPassword);
        const cred = {
            UserName: loginUserName,
            Password: hash,
        }
        try{
            const res = await axios.post("http://localhost:8080/api/loginroutes/authenticateUser", cred)
            const role = userRole;

            signIn({
                token: res.data.token,
                expiresIn: 3600,
                tokenType: "Bearer",
                authState: {values: {username: cred.UserName, userID: userID, role: role}},
            })
            redirectBasedOnRole(role); 
            
        } catch (err) {
            console.log("Authentication failed", err);
            throw(err);
        }
    }

    useEffect(() => {
        const auth = async () => {
            await authenticateUser();
        }

        if(typeof userID === 'undefined') return;
        auth();
    },[userID])

  return (
    <div>
      <div className="background-container">
        <div className="blue-background"></div>
        <div className="stars-background"></div>
      </div>

                    <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
       <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
      </Alert>
    </Snackbar>

      <div className="landing-container">
        <div className="content">
          <img src={whiteStarLogo} alt="Star Icon" className="star-icon" />
          <img src={whiteFitCheck} alt="FitCheck Logo" className="logo-image" />
          <p className="slogan">Create Rate Elevate</p>

          {activeView === "buttons" && (
            <div className="button-container" id="button-container">
              <button className="login-btn" id="create-account-btn" onClick={showCreateForm}>
                Create Account
              </button>
              <button className="login-btn" id="login-btn" onClick={showLoginForm}>
                Login
              </button>
            </div>
          )}

          {/* Forms Container */}
          {activeView !== "buttons" && (
            <div id="form-container">
              <div className="form-wrapper">
                {/* Create Account Form */}
                {activeView === "create" && (
                  <form id="create-form" onSubmit={(event) => { event.preventDefault(); insertUser(); }}>
                    <h2 className="form-title">Create Account</h2>
                    <input type="text" placeholder="Enter Username" className="form-input" value={createUserName} onChange={handleCreateUserName}/><br/>
                    <input type="email" placeholder="Enter Email" className="form-input" value={createEmail} onChange={handleCreateEmail}/><br/>
                    <input type="password" placeholder="Enter Password" className="form-input" value={createPassword} onChange={handleCreatePassword}/><br/>
                    <input type="password" placeholder="Confirm Password" className="form-input" value={confirmPassword} onChange={handleConfirmPassword}/><br/>
                    <div className="form-radio-group">
                      <label> <input type="radio" name="user-type" value="user" defaultChecked onChange={handleUserTypeChange}/>{" "} User </label>
                      <label> <input type="radio" name="user-type" value="business" onChange={handleUserTypeChange}/>{" "} Business </label>
                    </div>
                    <button type="submit" className="finish-btn">Sign Up</button>
                    <p>Already have an account?{" "} <br/>
                        <span className="form-link" onClick={showLoginForm}>
                            Login here.
                        </span>
                    </p>
                  </form>
                )}

                {/* Login Form */}
                {activeView === "login" && (
                  <form id="login-form" onSubmit={(event) => { event.preventDefault(); checkUserCredentials(); }}>
                    <h2 className="form-title">Login</h2>
                    <input type="text" placeholder="Enter Username" className="form-input" value={loginUserName} onChange={handleLoginUserName}/><br/>
                    <input type="password" placeholder="Enter Password" className="form-input" value={loginPassword} onChange={handleLoginPassword}/><br/>
                    <button type="submit" className="finish-btn">Login</button>
                    <p> Don't have an account?{" "} <br/>
                        <span className="form-link" onClick={showCreateForm}>
                            Create one here.
                        </span>
                    </p>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
