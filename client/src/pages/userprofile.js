import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from 'react-auth-kit'
import axios from 'axios';

import "./userprofile.css";
import "../components/userNavBar.css"; 
import NavigationBar from "../components/userNavBar"; 
import SignoutButton from "../components/signoutButton"; 
import Avatar from '@mui/material/Avatar';

import IconButton from '@mui/material/IconButton';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Divider from '@mui/material/Divider';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import { useMediaQuery } from "@mui/material";

// Import the ItemModal component
import WardrobeItemModal from "../components/WardrobeItemModal";

const UserProfile = () => {

  const auth = useAuthUser();
  const username = auth().values.username; 
  const userID = auth().values.userID;
  const [userProfilePhoto, setUserProfilePhoto] = useState("");

  const [itemData, setItemData] = useState([]);

  const [wardrobeFilter, setWardrobeFilter] = useState("All");
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const isSmallScreen = useMediaQuery("(max-width: 760px");

  const handleFilterChange = (event) => {
    setWardrobeFilter(event.target.value);
  };

  const handleImageClick = (item) => {
    console.log(item); 
    setModalData(item);
    setOpenModal(true);
  };

    const handleClose = () => {
    setOpenModal(false);
    setModalData(null);
  };

    const navigate = useNavigate();

    const handleNavigation = (route) => {
        navigate(route); 
    };
    

    const getUserItems = async () => {
      const user = {
      UserID: userID
    }

    try{
      const res = await axios.post("http://localhost:8080/api/profile/getItems", user);
      setItemData(res.data);

    } catch (err) {
      console.log(err);
    }
  }

    const fetchUserProfilePic = async () => {

    try{
      const res = await axios.get("http://localhost:8080/api/profile/getUserProfilePicture", {
      params: { UserID: userID }, 
    });
    setUserProfilePhoto(res.data.profilepicture);

    } catch (err) {
      console.log(err);
    }
  }

      useEffect(() => {
        getUserItems();
        fetchUserProfilePic();
    },[])

  return (
    <div className="userprofile-container">
      <div className="userprofile-header-container">
      <div className="userprofile-header">
      
      <Avatar
        alt="User Profile Picture"
        src={userProfilePhoto}
        sx={{ width: 100, height: 100 }}
      />
          <div className="userprofile-info">
              <h2 className="userprofile-username">{username}</h2>
              <p className="userprofile-item-count">{itemData.length} Items</p>
              <Divider />
          </div>
          <SignoutButton/>
      </div> 
      </div>

<div className="userprofile-wardrobe-title-button">
    <h2 className="userprofile-wardrobe-title">Wardrobe</h2>
    <span>
        <IconButton
            onClick={() => handleNavigation("../userprofile-additem")}
            sx={{
                width: 40, 
                height: 40,
                backgroundColor: '#8a9bb3', 
                color: 'white', 
                borderRadius: '8px', 
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', 
                '&:hover': {
                    backgroundColor: '#7d8fa5', 
                },
                '&:active': {
                    backgroundColor: '#6e8097', 
                    boxShadow: 'none', 
                },
            }}
        >
            <AddRoundedIcon sx={{ fontSize: 38 }} /> 
        </IconButton>
    </span>
</div>

<div className="up-wardrobe-container">
  <FormControl sx={{ m: 1, minWidth: 120 }}>
    <Select
      value={wardrobeFilter || "All"} 
      onChange={handleFilterChange}
      displayEmpty
      inputProps={{ 'aria-label': 'Wardrobe Filter' }}
      className="userprofile-wardrobe-select"
    >
      <MenuItem value="All">All</MenuItem>
      {itemData &&
        [...new Set(itemData.map(item => item.itemtype))].map((type, index) => (
          <MenuItem key={index} value={type}>
            {type}
          </MenuItem>
        ))}
    </Select>
  </FormControl>

  <ImageList
    cols={isSmallScreen ? 1 : 2}
    gap={20}
    sx={{ padding: '20px' }}
  >
    {itemData
      .filter(item => wardrobeFilter === "All" || item.itemtype === wardrobeFilter)
      .map((item) => (
        <ImageListItem key={item.wid} className="userprofile-image-list-item">
          <img
            className="userprofile-image-list-item-img"
            srcSet={`${item.picture}?w=300&h=300&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.picture}?w=300&h=300&fit=crop&auto=format`}
            alt={item.name}
            loading="lazy"
            onClick={() => handleImageClick(item)}
          />
        </ImageListItem>
      ))}
  </ImageList>
</div>

      <WardrobeItemModal open={openModal} onClose={handleClose} data={modalData} />

      <NavigationBar/>
  </div> 
      
  );
};


export default UserProfile;
