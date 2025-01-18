import * as React from 'react';
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Box from '@mui/material/Box';
import FitCheckTopBar from "../components/FitCheckTopBar"; // Assuming you have this component
import NavigationBar from "../components/adminNavBar";
import "./adminSearchPage.css";
import adminFlag from "./images/flag.svg";

const AdminSearchPage = () => {
    const navigate = useNavigate(); // Initialize navigate function
    const [username, setUsername] = React.useState(""); // State for search query
    const [users, setUsers] = React.useState([]); // State to store search results
    const [error, setError] = React.useState(""); // State for error handling

    const handleSearch = async () => {
        if (!username) return;
        try {
            const response = await fetch(`http://localhost:8080/api/adminSearchPage/admin_search_page?username=${username}`);
            const data = await response.json();
            if (response.ok) {
                setUsers(data.data); // Set users data
                setError(""); // Clear previous error
            } else {
                setError(data.message || "No user found with that username.");  // Show the message from backend
            }
        } catch (error) {
            setError("Error searching for users: " + error.message);
        }
    };
    

    const handleDelete = async (uid) => {
        console.log('Attempting to delete user with UID:', uid); // Log UID
        try {
            const response = await fetch(`http://localhost:8080/api/adminSearch/delete/${uid}`, {
                method: "DELETE",
            });
    
            if (response.ok) {
                setUsers(users.filter(user => user.uid !== uid)); // Remove deleted user from state
                alert("User account deleted successfully.");
            } else {
                const errorData = await response.json();
                console.error('Error response from backend:', errorData); // Log the error response from the backend
                alert(`Failed to delete user account. Reason: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error deleting user account:', error);
            alert("Error deleting user account.");
        }
    };
    
    
    

    return (
        <div className="admin">
            <div className="topbar-container">
                {/* <FitCheckTopBar /> */}
                <div className="admin-search-container">
                    <input
                        type="text"
                        placeholder="Search by Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="search-bar"
                    />
                    <button onClick={handleSearch} className="search-button">Search</button>
                </div>
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="admin-content-container">
                <div className="admin-scrollable-content">
                    {users.map((user) => (
                        <div key={user.uid} className="admin-post-container">
                            <img
                                src={user.profilepicture}
                                alt="Profile"
                                className="admin-post-image"
                            />
                            <div className="user-info">
                                <h3>{user.username}</h3>
                                <p>{user.email}</p>
                            </div>
                            <Box sx={{ '& > legend': { mt: 2 } }}>
                                <button
                                    className="admin-above-rating"
                                    onClick={() => handleDelete(user.uid)} // Delete the account
                                >
                                    Delete Account
                                </button>
                            </Box>
                        </div>
                    ))}
                </div>
            </div>
            <NavigationBar />
        </div>
    );
};

export default AdminSearchPage;
