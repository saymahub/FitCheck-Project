import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { useAuthUser } from 'react-auth-kit'
import axios from 'axios';

import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import NavigationBar from "../components/userNavBar"; 
import Avatar from '@mui/material/Avatar';
import "./foryou.css";
import userprofilepic from "./images/hamter.jpg";
import ratingpic1 from "./images/prettywoman1.jpg";
import ratingpic2 from "./images/prettywoman2.jpg";
import ratingpic3 from "./images/prettywoman3.jpg";
import ratingpic4 from "./images/prettywoman4.jpg";
import redflag from ".//images/flag-solid-red.svg";
import whiteflag from "./images/flag-solid-white.svg";

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
  
const ForYou = () => {

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

    if (auth()) {
      username = auth().values.username; 
      userID = auth().values.userID;
    }
    
    const [currentRatings, getCurrRating] = useState([]);
    const [postItems, setItems] = useState([]);
    const [ratings, setRatings] = useState({});
    const [flagStates, setFlagStates] = useState({});
    const [value, setValue] = useState(0);

    useEffect(() => {
      fetch(`http://localhost:8080/api/foryouloadpostsroutes`) 
        .then((response) => response.json())
        .then((data) => setItems(data)) 
        .catch((error) => console.error("Error fetching data:", error));
    }, []);


    const updateRatingInDatabase = async (postId, newRating) => {
      
      try {
        const response = await fetch(`http://localhost:8080/api/foryouloadpostsroutes/setRating`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userID, postId, newRating }),
        });

        if (response.ok) {

        } else {
          alert("Failed to add rating");
        }
      } catch (error) {
        console.error("Error adding rating:", error);
      }

    };

    {/* 
    const items = [
      { pid: 1, picture: ratingpic1, title: "my fit", rating: 0 },
      { pid: 2, picture: ratingpic2, title: "check this out", rating: 0 },
      { pid: 3, picture: ratingpic3, title: "what do you think", rating: 0 },
      { pid: 4, picture: ratingpic4, title: "my go-to", rating: 0 },
    ];
    */}
    const toggleFlag = (pid) => {
      const newFlagState = !flagStates[pid];
      axios.put(`http://localhost:8080/api/foryouloadpostsroutes/flag/${pid}`, { flag: newFlagState })
        .then(() => {
          setFlagStates((prevState) => ({
            ...prevState,
            [pid]: newFlagState,
          }));
        })
        .catch(error => {
          console.error("Error updating flag status:", error);
        });
    };

  
  const posts = postItems.map((item) => (
    <div key={item.pid} className="foryou-post-container">
      <Avatar
        alt="User Profile Picture"
        src={item.userPFP}
        sx={{ width: 50, height: 50 }}
      />
        <img src={item.picture} alt={`Postnum ${item.pid}`} className="foryou-post-image" />
        
        <img
            src={flagStates[item.pid] ? redflag : whiteflag}
            alt="Flag"
            className="foryou-flag-icon"
            onClick={() => toggleFlag(item.pid)}/>
        <h2 className="above-rating">{item.title}</h2>
        <div className = "rating-box">
        <Box sx={{ '& > legend': { mt: 2 } }}>
            
        <StyledRating
            name={`rating-${item.pid}`}
            value={ratings[item.pid] || 0}
            precision={0.5}
            size="large"
            onChange={(event, newValue) => {
                setRatings((prevRatings) => ({
                    ...prevRatings,
                    [item.pid]: newValue,
                }));
                updateRatingInDatabase(item.pid, newValue);
            }}
        />
        </Box>
        </div>
      {flagStates[item.pid] && (
        <div className="foryou-reported-container">
          <p className="foryou-reported-text">Post Reported</p>
          <button
            className="foryou-undo-button"
            onClick={() => toggleFlag(item.pid)}
          >
            Undo
          </button>
        </div>
      )}
    </div>
  ));

  return (
    <div className="foryou">
        <Button 
            variant="contained" 
            color="success"
            onClick={() => handleNavigation("../foryou-addpost")}
            sx={{ width: 200 }}>
                <AddIcon  sx={{ fontSize: "30px" }}/>
            </Button>
        <div className="foryou-content-container">
            <div className="foryou-scrollable-content">
                {posts}
            </div>
        </div>
        <NavigationBar />
    </div>
  );
};

export default ForYou;
