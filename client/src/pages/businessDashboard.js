import React, { useEffect, useState } from "react";
import { useNavigate  } from "react-router-dom";
import NavigationBar from "../components/businessNavBar"; 
import "./businessDashboard.css";
import { useAuthUser } from 'react-auth-kit';
import axios from 'axios';

const BusinessDashboard = () => {

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

  const [items, setItems] = useState([]);
  useEffect(() => {
    document.body.style.backgroundColor = '#E4E8E6';
    return () => {
      document.body.style.backgroundColor = ''; 
    };
  }, []); 

  const [brandName, setBrandName] = useState("DynamicBrandName");
  useEffect(() => {
    const fetchBrandData = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/businessDashboard", {
                params: { userID }, 
            });

            setBrandName(response.data.brandName || "DynamicBrandName");
            setItems(response.data.posts || []);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    if (userID) {
        fetchBrandData();
    }
  }, [userID]);

  

  return (
    <div className="business-dashboard">

      <div className="business-dashboard-header">
        <h1>{brandName}</h1>
      </div>
  
      <div className="bus-dashboard-content">
        <div className="bus-dashboard-scrollable">
            {items.map((item) => (
              <div key={item.pid} className="bus-dashboard-item">
                <img
                  src={item.picture}
                  alt={`Item ${item.pid}`}
                  className="bus-item-image"
                />
                <button
                  onClick={() => handleNavigation(`/analytics/${item.pid}`)}
                  className="bus-item-button"
                >
                  Links
                </button>
              </div>
            ))}
        </div>
      </div>
  
      <NavigationBar />
    </div>
  );
  
};

export default BusinessDashboard;
