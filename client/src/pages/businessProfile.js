import React, { useEffect , useState} from "react";
import FitCheckTopBar from "../components/FitCheckTopBar";
import NavigationBar from "../components/businessNavBar";
import SignoutButton from "../components/signoutButton"; 
import "./businessProfile.css";
import default_ppf from "./images/default_ppf.png";
import edit from "./images/edit-logo.png";
import axios from "axios";
import { useAuthUser } from 'react-auth-kit';
import { useNavigate  } from "react-router-dom";


const BusinessProfile = () => {

  const auth = useAuthUser();
  const navigate = useNavigate();
  const handleNavigation = (route) => {
    navigate(route); 
  };
  
  const [userID, setUserID] = useState(null);
  
  useEffect(() => {
    if (!auth()) {
      handleNavigation("../landing");
    } else {
      setUserID(auth().values.userID);
    }
  }, [auth]);

  useEffect(() => {
    document.body.style.backgroundColor = "#E4E8E6";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const [initialState, setInitialState] = useState({ brandName: '', website: '', email: '', profilePicture: ''});
  const [brandName, setBrandName] = useState("DynamicBrandName");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBrandProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/businessProfile", { params: { userID } });
        const data = response.data[0];
        const currentState = {
          brandName: data.brandname || "DynamicBrandName",
          website: data.website || "N/A",
          email: data.email || "N/A",
          profilePicture: data.profilepicture || default_ppf
        };
        setInitialState(currentState); // Backup initial state
        setProfilePicture(currentState.profilePicture)
        setBrandName(currentState.brandName);
        setWebsite(currentState.website);
        setEmail(currentState.email);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (userID) fetchBrandProfile();
  }, [userID]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    const imgUp = new FormData();
    imgUp.append("file", file);
    imgUp.append("upload_preset", "seng513_project");
    imgUp.append("cloud_name", "dxqfbccjh");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dxqfbccjh/image/upload", {
        method: "POST",
        body: imgUp,
      });
      const uploadImgURL = await res.json();
      const newImageUrl = uploadImgURL.url;
      setUploadedImage(newImageUrl);
      setProfilePicture(newImageUrl);

    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelChanges = () => {
    setProfilePicture(initialState.profilePicture)
    setUploadedImage(null); 
    setBrandName(initialState.brandName);
    setWebsite(initialState.website);
    setEmail(initialState.email);
  };

  const handleConfirmChanges = async () => {
    try {
      await axios.post("http://localhost:8080/api/businessProfileUpdate", {
        userID,
        profilePicture: uploadedImage || profilePicture,
        brandName,
        website,
        email,
      });
      setInitialState({
        brandName,
        website,
        email,
        profilePicture: uploadedImage || profilePicture,
      });
      setUploadedImage(null); // Clear the temporary image URL
      alert("Changes saved successfully!");
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("Failed to save changes. Please try again.");
    }
  };

  const handlePasswordChange = () => {
    alert("A password reset email has been sent to your registered email address.");
  };


  return (
    <div>
        <div className="bus-dashboard-header">
          <h1>{brandName}</h1>
        </div>
        <SignoutButton/>
        <div className="bus-profile-container">
          <div className="bus-ppf-placeholder">
            <img src={profilePicture || uploadedImage} alt="Brand Logo" className="bus-brand-logo" />
    
            <label className="bus-edit-btn">
              <img src={edit} alt="Edit" />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: "none" }} 
              />
            </label>
          </div>

          <div className="info-container">
            <label>
              Brand Name:
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder={brandName || "Enter brand name here..."}
              />
         
            </label>

            <label>
              Website:
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder={website || "Paste URL here..."}  
              />
            </label>

            <label>
              Email:
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={email || "Enter email here..."}
              />
            </label>

            <div className="bus-profile-btns">
              <button className="bus-change-password" onClick={handlePasswordChange}>Change Password</button>
              <button className="bus-cancel-changes" onClick={handleCancelChanges}>Cancel Changes</button>
              <button className="bus-confirm-changes" onClick={handleConfirmChanges}>Confirm Changes</button>
            </div>
          </div>
        </div>
      <NavigationBar />
    </div>
  );
};

export default BusinessProfile;
