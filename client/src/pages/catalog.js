import React, { useState, useEffect } from "react"; 
import "./catalog.css";
import "../components/userNavBar.css";
import NavigationBar from "../components/userNavBar";
import axios from "axios";
import redFlag from "../pages/images/flag-solid-red.svg";
import whiteFlag from "../pages/images/flag-solid-white.svg";
import { useAuthUser } from 'react-auth-kit';
import { useNavigate } from "react-router-dom";

const Catalog = () => {
  const auth = useAuthUser();
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route); 
  };

  // Redirect to landing page if user is not authenticated
  if (!auth()) {
    handleNavigation("../landing"); 
  }

  let username = 0; 
  let userID = 0;

  if (auth()) {
    username = auth().values.username; 
    userID = auth().values.userID;
  }

  const [expandedItems, setExpandedItems] = useState({});
  const [flagStates, setFlagStates] = useState({});
  const [items, setItems] = useState([]);
  const [linksCache, setLinksCache] = useState({});

  // Fetch initial data for catalog posts
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/catalogroutes/posts")
      .then((response) => {
        setItems(response.data);
        const initialFlagStates = {};
        response.data.forEach((item) => {
          initialFlagStates[item.pid] = !!item.flag; // Ensure boolean values
        });
        setFlagStates(initialFlagStates);
      })
      .catch((error) => {
        console.error("Error fetching brand posts:", error);
      });
  }, []);

  const toggleExpand = (id) => {
    if (expandedItems[id] && linksCache[id]) {
      setExpandedItems((prevState) => ({
        ...prevState,
        [id]: !prevState[id],
      }));
    } else {
      axios
        .get(`http://localhost:8080/api/catalogroutes/posts/${id}/details`)
        .then((response) => {
          setLinksCache((prevCache) => ({
            ...prevCache,
            [id]: response.data,
          }));
          setExpandedItems((prevState) => ({
            ...prevState,
            [id]: true,
          }));
        })
        .catch((error) => {
          console.error("Error fetching post details:", error);
        });
    }
  };

  const toggleFlag = (id) => {
    const newFlagState = !flagStates[id];
    axios
      .put(`http://localhost:8080/api/catalogroutes/posts/${id}/flag`, {
        flag: newFlagState,
      })
      .then(() => {
        setFlagStates((prevState) => ({
          ...prevState,
          [id]: newFlagState,
        }));
      })
      .catch((error) => {
        console.error("Error updating flag status:", error);
      });
  };

  const handleLinkClick = (postId, itemType) => {
    axios
      .post(`http://localhost:8080/api/catalogroutes/posts/${postId}/click`, { itemType })
      .then(() => {
        console.log("Click count updated successfully");
      })
      .catch((error) => {
        console.error("Error updating click count:", error);
      });
  };

  return (
    <div className="catalog">
      <div className="content-window">
        <div className="scrollable-content">
          {items.length === 0 ? (
            <p>No items to display</p>
          ) : (
            items.map((item) => (
              <div
                key={item.pid}
                className={`item-container-catalog ${
                  flagStates[item.pid] ? "reported-catalog" : ""
                }`}
              >
                {flagStates[item.pid] ? (
                  <div className="flagged-container-catalog">
                    <p className="reported-text-catalog">Post Reported</p>
                    <button
                      className="undo-button-catalog"
                      onClick={() => toggleFlag(item.pid)}
                    >
                      Undo
                    </button>
                  </div>
                ) : expandedItems[item.pid] ? (
                  <div className="links-container-catalog">
                    <h3 className="links-header-catalog">Brand Post Details</h3>
                    {(linksCache[item.pid] || []).map((link, index) => (
                      <p key={index} className="link-item-catalog">
                        <strong>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => handleLinkClick(item.pid, link.itemtype)}
                          >
                            {link.itemtype}
                          </a>
                        </strong>
                      </p>
                    ))}
                    <button
                      className="close-button-catalog"
                      onClick={() => toggleExpand(item.pid)}
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <div className="item-content-catalog">
                    <img
                      src={item.picture}
                      alt={`Brand Post ${item.pid}`}
                      className="item-img-catalog"
                    />
                    <div className="item-details-catalog">
                      <h2 className="brand-name-catalog">{item.brandname}</h2>
                      <button
                        className="shop-button-catalog"
                        onClick={() => toggleExpand(item.pid)}
                      >
                        Shop
                      </button>
                    </div>
                    <img
                      src={flagStates[item.pid] ? redFlag : whiteFlag}
                      alt="Flag"
                      className="flag-icon-catalog"
                      onClick={() => toggleFlag(item.pid)}
                    />
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      <NavigationBar className="navigation-bar" />
    </div>
  );
};

export default Catalog;
