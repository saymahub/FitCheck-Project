const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

const db = require("../db"); // Centralized DB connection

// Route to fetch details of a specific post
router.get("/:pid", async (req, res) => {
  const { pid } = req.params;

  if (!pid) {
    return res.status(400).json({ error: "Post ID (pid) is required" });
  }

  const getDetailsQuery = `
    SELECT u.brandname, bpd.itemtype, bpd.URL, bpd.clicks, bp.picture 
    FROM brandpostdetails bpd
    JOIN brandpost bp ON bpd.pid = bp.pid
    JOIN users u ON bp.uid = u.uid
    WHERE bpd.pid = ?
  `;

  try {
    const [details] = await db.promise().query(getDetailsQuery, [pid]);

    if (details.length === 0) {
      return res.status(404).send("No details found for the given post ID");
    }

    const response = {
      brandName: details[0].brandname,
      links: details.map((detail) => detail.URL),
      itemType: details.map((detail) => detail.itemtype),
      clicks: details.map((detail) => detail.clicks),
      picture: details[0].picture,
    };

    res.json(response);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send("Server error");
  }

});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;

  console.log("Received DELETE request for PID:", pid);

  if (!pid) {
    return res.status(400).json({ error: "Post ID (pid) is required" });
  }

  const deleteDetailsQuery = `DELETE FROM brandpostdetails WHERE pid = ?`;
  const deletePostQuery = `DELETE FROM brandpost WHERE pid = ?`;

  try {
    await db.promise().beginTransaction();

    await db.promise().query(deleteDetailsQuery, [pid]);
    await db.promise().query(deletePostQuery, [pid]);

    await db.promise().commit();

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Error deleting post:", err);

    await db.promise().rollback(); // rollback incase it didnt delete properly
    res.status(500).json({ error: "Failed to delete post" });
  }
});

module.exports = router;
