import React, { useEffect, useState } from "react";
import { useNavigate  } from "react-router-dom";
import NavigationBar from "../components/businessNavBar";
import "./businessAddPost.css";
import upload from "./images/upload_icon.png"
import edit from "./images/edit-logo.png";
import axios from 'axios';
import { useAuthUser } from 'react-auth-kit'


const BusinessAddPost = () => {
  const [rows, setRows] = useState([{ itemType: '', url: '' }]);
  const[loading, setLoading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null); 
  const [posting, setPosting] = useState(false);
  const [itemData, setItems] = useState([]);

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


  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const addRow = () => {
    setRows([...rows, { itemType: '', url: '' }]);
  };


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
      console.log(uploadImgURL.url);
      setUploadedImageUrl(uploadImgURL.url); 
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!uploadedImageUrl) {
      alert("Please upload an image before submitting!");
      return;
    }
    if (rows.some((row) => !row.itemType || !row.url)) {
      alert("Please fill out all item types and URLs before submitting.");
      return;
    }
    
    console.log({
      UserID: userID,
      imageUrl: uploadedImageUrl,
      rows: rows,
    });

    setPosting(true);
    try {
      const res = await axios.post(
        "http://localhost:8080/api/businessAddPost", 
        {
          UserID: userID,
          imageUrl: uploadedImageUrl,
          rows: rows, 
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      setUploadedImageUrl(null);
      setRows([{ itemType: "", url: "" }]);
      alert("Post created successfully!")
    } catch (error) {
      console.error("Error creating post:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setPosting(false);
    }
  };


  return (
    <div>
      <div className="bus-dashboard-header">
        <h1>{brandName}</h1>
      </div>
        <div className="bus-post-container">
        <div className="bus-pic-placeholder">
          {uploadedImageUrl ? (
            <>
              <img src={uploadedImageUrl} alt="Uploaded" className="uploaded-image" />
              <label className="bus-edit-btn">
                <img src={edit} alt="Edit" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ display: "none" }} 
                />
              </label>
            </>
          ) : (
            <>
              <button className="bus-upload-btn">
                <label htmlFor="file-upload">
                  <img src={upload} alt="Upload Icon" />
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileUpload}
                />
              </button>
              {loading && <p>Uploading...</p>}
            </>
          )}
        </div>

          
          <div className="text-stuff">
            <div className="links-header">Links</div> <br/>

            <table>
              <thead>
                <tr>
                  <th>Item Type</th>
                  <th>URL</th>
                </tr>
              </thead>

              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <select
                        className="bus-option-box"
                        value={row.itemType}
                        onChange={(e) => handleInputChange(index, 'itemType', e.target.value)}
                      >
                        <option value="">Select Item Type</option>
                        <option value="Top">Top</option>
                        <option value="Bottom">Bottom</option>
                        <option value="Dress">Dress</option>
                        <option value="Jacket">Jacket</option>
                        <option value="Earrings">Earrings</option>
                        <option value="Necklace">Necklace</option>
                      </select>
                    </td>
                    <td>
                      <input
                        className="bus-url-box"
                        type="text"
                        value={row.url}
                        onChange={(e) => handleInputChange(index, 'url', e.target.value)}
                        placeholder="Enter URL"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="bus-add-btn" onClick={addRow}> ➕ Add Row</button>
            <button className="bus-post-button" onClick={handleSubmit} disabled={posting}> {posting ? "Posting..." : "Post"}</button>
          </div>
          
        </div>
     
      <NavigationBar />
    </div>
  );
};

export default BusinessAddPost;
