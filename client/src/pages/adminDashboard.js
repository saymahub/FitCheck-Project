import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/adminNavBar";
import FitCheckTopBar from "../components/FitCheckTopBar";
import SignoutButton from "../components/signoutButton"; 
import "./adminDashboard.css";

const AdminDashboard = () => {
  const [flaggedPosts, setFlaggedPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = "#E4E8E6";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/adminDashboard")
      .then((response) => response.json())
      .then((data) => setFlaggedPosts(data))
      .catch((error) => console.error("Error fetching flagged posts:", error));
  }, []);

  const handleNavigation = (id, source) => {
    navigate(`/admin_feed/${source}_${id}`); // Pass both id and source in the URL
  };

  return (
    <div>
      <SignoutButton/>
      <div>
        <h1 style={{ textAlign: "center", marginTop: "10px" }}>
          {flaggedPosts.length} Flagged Posts
        </h1>
        <div className="admin-dash-container">
          <div className="admin-dash">
          {flaggedPosts.length === 0 ? (
            <div className="no-flagged-posts">
              <p>No flagged posts</p>
            </div>
          ) : (
            flaggedPosts.map((post) => (
              <div key={`${post.source}_${post.pid}`} className="admin-dash-item">
                <img
                  src={post.picture}
                  alt={`Flagged Post ${post.pid}`}
                  className="admin-dash-image"
                />
                <button
                  onClick={() => handleNavigation(post.pid, post.source)} // Pass both id and source
                  className="admin-dash-button"
                >
                  View
                </button>
                <div className="admin-dash-flagged-posts">
                  <span className="admin-dash-flagged-text">
                    Type: {post.source === "userpost" ? "User" : "Business"}
                  </span>
                </div>
              </div>
            ))
          )}

          </div>
        </div>
      </div>
      <NavigationBar />
    </div>
  );
};

export default AdminDashboard;
