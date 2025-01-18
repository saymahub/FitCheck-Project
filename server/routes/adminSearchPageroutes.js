const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const cors = require("cors");
const db = require("../db"); // Centralized DB connection

// Enable CORS if frontend and backend are on different ports
router.use(cors());

router.get("/admin_search_page", async (req, res) => {
    const { username } = req.query; // Use query parameter

    if (!username) {
        return res.status(400).json({ status: "error", message: "Username query parameter is required." });
    }

    const sql = `
        SELECT uid, username, email, profilepicture
        FROM users
        WHERE username LIKE ?;
    `;

    try {
        const [result] = await db.promise().query(sql, [`%${username}%`]);

        if (result.length === 0) {
            return res.status(404).json({ status: "error", message: "No users found with that username." });
        }

        res.json({ status: "success", data: result });
    } catch (err) {
        console.error("Error searching for user:", err); // Log the full error
        res.status(500).json({
            status: "error", 
            message: `Server error while searching for user. Error: ${err.message}` 
        });
    }
});

router.delete("/delete/:uid", async (req, res) => {
    const { uid } = req.params;

    console.log("Attempting to delete user with UID:", uid);  // Log UID

    // SQL queries for deleting related data
    const deleteRatingsQuery = `DELETE FROM userrating WHERE uid = ?`;
    const deleteUserPostsQuery = `DELETE FROM userpost WHERE uid = ?`;
    const deleteBrandPostsQuery = `DELETE FROM brandpost WHERE uid = ?`;
    const deleteUserQuery = `DELETE FROM users WHERE uid = ?`;

    try {
        // Log SQL queries being executed
        console.log("Executing query to delete ratings for UID:", uid);
        await db.promise().query(deleteRatingsQuery, [uid]);

        console.log("Executing query to delete posts for UID:", uid);
        await db.promise().query(deleteUserPostsQuery, [uid]);
        await db.promise().query(deleteBrandPostsQuery, [uid]);

        console.log("Executing query to delete the user for UID:", uid);
        const [result] = await db.promise().query(deleteUserQuery, [uid]);

        if (result.affectedRows === 0) {
            console.log("No user found with UID:", uid);  // Log if no user found
            return res.status(404).json({ status: "error", message: "User not found." });
        }

        console.log("User deleted successfully with UID:", uid);  // Log successful deletion
        res.json({ status: "success", message: "User account deleted successfully." });
    } catch (err) {
        console.error("Error deleting user with UID:", uid, "Error:", err); // Log full error with UID
        res.status(500).json({
            status: "error",
            message: `Server error while deleting user with UID ${uid}. Error: ${err.message}`
        });
    }
});


module.exports = router;
