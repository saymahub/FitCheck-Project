import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthUser } from 'react-auth-kit'
import axios from 'axios';

import { styled } from '@mui/material/styles';
import {
    createTheme,
    ThemeProvider,
    alpha,
    getContrastRatio,
  } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import NavigationBar from "../components/userNavBar"; 
import "./foryou-addpost.css";

const lightpurpletheme = '#796c92';

const theme = createTheme({
  palette: {
    lightpurple: {
      main: lightpurpletheme,
      },
  },
});

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#fac240',
    },
    '& .MuiRating-iconHover': {
      color: '#faaf00',
    },
    '& .MuiRating-icon': {
        fontSize: '30px', 
    },
});

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const ForYouCreatePost = () => {

    const auth = useAuthUser();
    const username = auth().values.username; 
    const userID = auth().values.userID;
    console.log("User Info:", { username, userID });

    const [uploadedImage, setUploadedImage] = useState(null);
    const[loading, setLoading] = useState(false);
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null); 

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

    const navigate = useNavigate();

    const handleNavigation = (route) => {
        navigate(route); 
    };

    const addNewPost = async (picture, title) => {
        if (!uploadedImageUrl) {
            alert("Please upload an image before submitting! This may also be a network issue!");
            return;
        }

        try {
          const response = await fetch(`http://localhost:8080/api/foryou-addpostroutes/addPost`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userID, picture:uploadedImageUrl, title }), 
          });
          if (response.ok) {
            setUploadedImageUrl(null);

            handleNavigation("../foryou");
  
          } else {
            alert("Failed to add posts");
          }
        } catch (error) {
          console.error("Error adding posts:", error);
        }
  
      };

  return (
    <div className="createpost">
        <div className="createpost-container">
            <div className = "upload-post-details">
                <div className="createpost-header">Post Details</div>
                <div className="createpost-content">
                    <div className="createpost-left-section">
                        <ThemeProvider theme={theme}>
                            <div className="createpost-upload-photo-container">
                            {uploadedImage ? (
                                <div className="createpost-upload-icon">
                                    <img
                                        src={uploadedImage}
                                        alt="Uploaded Preview"
                                        className="createpost-uploaded-image"
                                    />
                                </div>
                            ) : (
                                <div className="createpost-upload-icon">Preview</div>
                            )}
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                color="lightpurple"
                                startIcon={<CloudUploadIcon sx={{ fontSize: "20px" }}/>}
                                >
                                Upload files
                                <VisuallyHiddenInput
                                    type="file"
                                    onChange={handleFileUpload}
                                    single
                                />
                            </Button>
                            </div>
                            </ThemeProvider>
                    </div>
                    <div className="createpost-right-section">
                        <div className="createpost-form-group">
                        <label htmlFor="title">Provide a Title (Max 44 characters):</label>
                        <input type="text" id="title" className="createpost-form-input" placeholder="Enter Your Post Title" maxLength="44" />
                        </div>
                    
                    </div>
                </div>
            </div>

            <div className = "buttons-container">  
                <Button 
                variant="contained" 
                color="error"
                onClick={() => handleNavigation("../foryou")}
                sx={{ width: 150 }}>
                    Cancel
                </Button>  

                <Button 
                variant="contained" 
                color="success"
                onClick={() => {
                    const title = document.getElementById("title").value; 
                    addNewPost(uploadedImage, title); 
                  }} 
                sx={{ width: 150 }}>
                    Post
                </Button>
            </div>  
        </div>
        <NavigationBar />
    </div>
  );
};

export default ForYouCreatePost;
