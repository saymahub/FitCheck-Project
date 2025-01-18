// Your routes here
const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

const db = require("../db"); // Centralized DB connection

router.get("/:source/:pid", async (req, res) => {
  const { source, pid } = req.params;

  let sql = "";
  if (source === "userpost") {
    sql = `
      SELECT 'userpost' AS source, CONCAT('userpost_', pid) AS pid, uid, picture, title AS purpose
      FROM userpost
      WHERE flag = 1 AND pid = ?;
    `;
  } else if (source === "brandpost") {
    sql = `
      SELECT 'brandpost' AS source, CONCAT('brandpost_', pid) AS pid, uid, picture, NULL AS purpose
      FROM brandpost
      WHERE flag = 1 AND pid = ?;
    `;
  } else {
    return res.status(400).send("Invalid post source");
  }

  try {
    const [result] = await db.promise().query(sql, [pid]);

    if (result.length === 0) {
      return res.status(404).send("Flagged post not found");
    }

    res.json(result[0]); // Send the first matched record as JSON
  } catch (err) {
    console.error("Error fetching flagged post by source and id:", err);
    res.status(500).send("Server error");
  }
});

router.post("/ignore/:source/:pid", async (req, res) => {
  const { source, pid } = req.params;

  if (!["userpost", "brandpost"].includes(source)) {
    return res.status(400).send("Invalid post source");
  }

  try {
    const updateFlagQuery = `UPDATE ${source} SET flag = 0 WHERE pid = ?`;
    await db.promise().query(updateFlagQuery, [pid]);
    res.json({ message: "Post flagged as ignored successfully" });
  } catch (err) {
    console.error("Error ignoring post:", err);
    res.status(500).send("Server error");
  }
});

router.delete("/delete/:source/:pid", async (req, res) => {
  const { source, pid } = req.params;

  if (!["userpost", "brandpost"].includes(source)) {
    return res.status(400).send("Invalid post source");
  }

  try {
    // First, delete dependent rows in userrating
    const deleteRatingsQuery = `DELETE FROM userrating WHERE pid = ?`;
    await db.promise().query(deleteRatingsQuery, [pid]);

    // Then, delete the post
    const deleteQuery = `DELETE FROM ${source} WHERE pid = ?`;
    await db.promise().query(deleteQuery, [pid]);

    res.json({ message: "Post and associated ratings deleted successfully" });
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).send("Server error");
  }
});


module.exports = router;
