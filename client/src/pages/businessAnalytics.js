import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FitCheckTopBar from "../components/FitCheckTopBar";
import NavigationBar from "../components/businessNavBar";
import "./businessAnalytics.css";
import { useAuthUser } from 'react-auth-kit';
import { useNavigate  } from "react-router-dom";

const BusinessAnalytics = () => {

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

  const { pid } = useParams();
  console.log("PID from URL:", pid);
  const [data, setData] = useState({
    links: [],
    itemType: [],
    clicks: [],
    picture: "",
    brandName: "", 
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/businessAnalytics/${pid}`);
        if (!response.ok) {
          throw new Error("Failed to fetch analytics data");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };
  
    fetchData();
  }, [pid]);

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this post?");
    if (!confirmed) return;
  
    try {
      const response = await fetch(`http://localhost:8080/api/businessAnalytics/${pid}`, { 
        method: "DELETE" 
      });
      if (response.ok) {
        alert("Post deleted successfully");
        navigate("/business_dashboard");
      } else {
        alert("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("An error occurred while deleting the post.");
    }
  };
  
  

  return (
    <div>
        <div className="bus-analytics-content">
          <div className="bus-dashboard-header">
            <h1>{data.brandName || "Brand Name"}</h1>
          </div>
          <div className="analytics-container">
            <img src={data?.picture || ""} alt="Selected Item" className="analytics-image" />
            <div className="analytics-details">
              <table className="analytics-table">
                  <thead>
                  <tr>
                      <th>Item Type</th>
                      <th>Links</th>
                      <th>Clicks</th>
                  </tr>
                  </thead>
                  <tbody>
                    {data.links.map((link, index) => (
                      <tr key={index}>
                        <td>{data.itemType[index] || "Unknown"}</td>
                        <td>
                          <a href={link} target="_blank" rel="noopener noreferrer">
                            {link}
                          </a>
                        </td>
                        <td>{data.clicks[index] ?? "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
              </table>
              <button className="delete-button" onClick={handleDelete}>Delete</button>
              </div>
          </div>
          <br></br>
        </div>
        

      <NavigationBar />
    </div>
  );
};

export default BusinessAnalytics;
