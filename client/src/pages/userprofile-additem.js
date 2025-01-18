import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import { useAuthUser } from 'react-auth-kit'
import axios from 'axios';

import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import {Button} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Snackbar, Alert } from "@mui/material";
import NavigationBar from "../components/userNavBar";
import "./userprofile-additem.css";

const lightpurpletheme = '#796c92';

const theme = createTheme({
  palette: {
    lightpurple: {
      main: lightpurpletheme,
      },
  },
});

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
});

const UserProfileAddItem = () => {

    const auth = useAuthUser();
    const userID = auth().values.userID;
    const navigate = useNavigate();

    const [itemName, setItemName] = useState("");
    const [itemType, setItemType] = useState("Top");
    const [otherDetails, setOtherDetails] = useState("");

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState("success"); 
    const [snackbarMessage, setSnackbarMessage] = useState(""); 

    const [uploadedImage, setUploadedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null); 

    const handleNavigation = (route) => {
        navigate(route); 
    };

    const handleItemNameChange = (event) => {
    setItemName(event.target.value);
  }

    const handleOtherDetailsChange = (event) => {
    setOtherDetails(event.target.value);
  }

    const handleItemTypeChange = (event) => {
    setItemType(event.target.value);
  }

      const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setUploadedImage(reader.result); 
            };
            reader.readAsDataURL(file); 
        }
    
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
          console.log(uploadImgURL.url);
          setUploadedImageUrl(uploadImgURL.url); 
        } catch (error) {
          console.error("Image upload failed:", error);
        } finally {
          setLoading(false);
        }
      };

    const addWardrobeItem = async () => {
      const user = {
      UserID: userID,
      ItemType: itemType,
      ItemName: itemName,
      Picture: uploadedImageUrl,
      OtherDetails: otherDetails
    }

    if (!uploadedImageUrl) {
        setSnackbarSeverity("error"); 
        setSnackbarMessage("Please upload an image before submitting!"); 
        setSnackbarOpen(true); 
        return;
    }

    try{
    const res = await axios.post("http://localhost:8080/api/profile/addUserWardrobeItem", user);
    
        setSnackbarSeverity("success"); 
        setSnackbarMessage("Item successfully added to your wardrobe!"); 
        setSnackbarOpen(true); 

        setUploadedImageUrl(null);
        setItemName("");
        setItemType("Top");
        setOtherDetails("");

        setTimeout(() => {
            handleNavigation("../userprofile");
        }, 4000);

    } catch (err) {
      console.log("Error adding wardrobe item: ", err);

        setSnackbarSeverity("error");
        setSnackbarMessage("Failed to add item. Please try again!");
        setSnackbarOpen(true);
    }
  }

  const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };


    return (
        <div className="up-additem">
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
            <div className="up-additem-container">
                <div className="up-upload-post-details">
                    <div className="up-additem-header">Add Clothing Item to Wardrobe</div>
                    <div className="up-additem-content">
                        <div className="up-additem-left-section">
                            <ThemeProvider theme={theme}>
                            <div className="up-additem-upload-photo-container">
                                {uploadedImage ? (
                                    <img
                                        src={uploadedImage}
                                        alt="Uploaded Preview"
                                        className="up-additem-uploaded-image"
                                    />
                                ) : (
                                    <div className="up-additem-upload-icon">Upload Photo</div>
                                )}
                                <Button
                                    component="label"
                                    variant="contained"
                                    color="lightpurple"
                                    startIcon={<CloudUploadIcon />}
                                >
                                    Upload Photo
                                    <VisuallyHiddenInput
                                        type="file"
                                        onChange={handleFileUpload}
                                    />
                                </Button>
                            </div>
                            </ThemeProvider>
                        </div>
                        <div className="up-additem-right-section">
                            <div className="up-additem-form-group">
                                <label htmlFor="name">Name (Max 44 characters):</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="up-additem-form-input"
                                    placeholder="Enter Name"
                                    maxLength="44"
                                    value = {itemName}
                                    onChange={handleItemNameChange}
                                />
                            </div>
                            <div className="up-additem-form-group">
                                <label htmlFor="item-type">Item Type:</label>
                                <select id="item-type" className="up-additem-form-input" value={itemType} onChange={handleItemTypeChange}>
                                    <option value="Top">Top</option>
                                    <option value="Bottom">Bottom</option>
                                    <option value="Dress">Dress</option>
                                    <option value="Shoes">Shoes</option>
                                    <option value="Accessory">Accessory</option>
                                </select>
                            </div>
                            <div className="up-additem-form-group">
                                <label htmlFor="other-details">Other Details (Max 44 characters):</label>
                                <input
                                    type="text"
                                    id="other-details"
                                    className="up-additem-form-input"
                                    placeholder="Enter Additional Details"
                                    maxLength="44"
                                    value = {otherDetails}
                                    onChange={handleOtherDetailsChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="up-buttons-container">
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleNavigation("../userprofile")}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        color="success"
                        onClick={addWardrobeItem}
                    >
                        Done
                    </Button>
                </div>
            </div>
            <NavigationBar />
        </div>
    );
};

export default UserProfileAddItem;

