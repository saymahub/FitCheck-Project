const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

const db = require("../db"); // Centralized DB connection

router.get("/", (req, res) => {
  const userID = req.query.userID;

  if (!userID) {
      return res.status(400).json({ error: "userID is required" });
  }

  const sql = `
    SELECT u.brandname, bp.pid, bp.picture, bp.flag 
    FROM users u
    LEFT JOIN brandpost bp ON u.uid = bp.uid
    WHERE u.uid = ?
    `;

  db.query(sql, [userID], (err, results) => {
      if (err) {
          console.error("Error fetching data:", err);
          return res.status(500).send("Server error");
      }

      if (results.length === 0) {
          return res.status(404).json({ error: "No data found for this userID" });
      }

      const brandName = results[0].brandname;

      const posts = results.map(row => ({
          pid: row.pid,
          picture: row.picture,
          flag: row.flag,
      }));

      res.json({ brandName, posts });
  });
});


module.exports = router;
