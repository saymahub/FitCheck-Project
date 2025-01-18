import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FitCheckTopBar from "../components/FitCheckTopBar";
import NavigationBar from "../components/adminNavBar";
import "./adminFeed.css";
import flagIcon from "./images/flag.svg";

const AdminFeed = () => {
  const navigate = useNavigate();
  const { pid } = useParams(); // Get the flagged post id from the URL
  const [source, id] = pid.split("_"); // Split source and id from the composite pid
  const [data, setData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = "#E4E8E6";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/adminFeed/${source}/${id}`);
        const result = await response.json();
        console.log(result); // Log to see the response
        setData(result);
      } catch (error) {
        console.error("Error fetching flagged post:", error);
      }
    };
    
    if (id && source) {
      fetchData(); // Fetch data when the component mounts or id changes
    }
    

    if (pid) {
      fetchData(); // Fetch data when the component mounts or id changes
    }
  }, [pid]);

  const handleIgnore = async () => {
    try {
      await fetch(`http://localhost:8080/api/adminFeed/ignore/${source}/${id}`, {
        method: "POST",
      });
      navigate("/admin_dashboard"); // Go back to the admin dashboard
    } catch (error) {
      console.error("Error ignoring the post:", error);
    }
  };
  
  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:8080/api/adminFeed/delete/${source}/${id}`, {
        method: "DELETE",
      });
      navigate("/admin_dashboard"); // Navigate to the admin dashboard after deletion
    } catch (error) {
      console.error("Error deleting the post:", error);
    }
  };
  

  const handleUndo = () => {
    setShowPopup(false); // Close the popup
  };

  if (!data) return <div>Loading...</div>; // Show loading state if no data

  // Conditionally render the title based on the post type
  const pageTitle = data.source === 'userpost' ? data.purpose : ""; // Display title for userpost, nothing for brandpost

  return (
    <div>
      <FitCheckTopBar />
      <h1 className="page-title">{pageTitle}</h1> {/* Display title for userpost, nothing for brandpost */}
      <div className="admin-feed-container">
        <div className="admin-flag-icon">
          <img src={flagIcon} alt="Flag Icon" />
        </div>
        <img src={data.picture} alt="Selected Item" className="admin-feed-image" />
        <div className="admin-feed-details">
          <table className="admin-feed-table">
            <tbody>
              {data.itemType && data.itemType.map((itemType, index) => (
                <tr key={index}>
                  <td>{itemType || "Unknown"}</td>
                  <td>{data.clicks && data.clicks[index] ? data.clicks[index] : "Unknown"}</td>
                  <td>{data.links && data.links[index] ? data.links[index] : "Unknown"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="action-buttons">
            <button className="admin-ignore-button" onClick={handleIgnore}>
              Ignore
            </button>
            <button className="admin-delete-button" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="admin-popup">
          <p>Post deleted</p>
          <button onClick={handleUndo}>Undo</button>
          <button onClick={handleUndo}>View Next Flagged Post</button>
        </div>
      )}
      <NavigationBar />
    </div>
  );
};

export default AdminFeed;
