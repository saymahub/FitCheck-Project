const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const db = require("../db"); // Centralized DB connection

router.get('/posts', (req, res) => {
  const sql = `
    SELECT 
      bp.pid, 
      bp.uid, 
      bp.picture, 
      bp.flag, 
      u.brandname, 
      u.website
    FROM 
      brandpost bp
    JOIN 
      users u 
    ON 
      bp.uid = u.uid
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching brand posts with brandname and website:", err);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
});


router.get('/posts/:id/details', (req, res) => {
  const postId = req.params.id;
  const sql = `
    SELECT bpd.itemtype, bpd.url, bpd.clicks
    FROM brandpostdetails bpd
    WHERE bpd.pid = ?
  `;
  db.query(sql, [postId], (err, results) => {
    if (err) {
      console.error("Error fetching post details:", err);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
});


router.put('/posts/:id/flag', (req, res) => {
  const postId = req.params.id;
  const { flag } = req.body;
  const sql = "UPDATE brandpost SET flag = ? WHERE pid = ?";
  db.query(sql, [flag, postId], (err, results) => {
    if (err) {
      console.error("Error updating flag status:", err);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: `Post flag updated successfully to ${flag}` });
  });
});

router.post('/posts/:id/click', (req, res) => {
  const postId = req.params.id;
  const { itemType } = req.body; 
  const sql = `
    UPDATE brandpostdetails 
    SET clicks = clicks + 1 
    WHERE pid = ? AND itemtype = ?
  `;
  db.query(sql, [postId, itemType], (err, results) => {
    if (err) {
      console.error("Error updating click count:", err);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: "Click count updated successfully" });
  });
});

module.exports = router;
