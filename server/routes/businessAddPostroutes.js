const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

const db = require("../db"); // Centralized DB connection

// Create a new post
router.post("/", (req, res) => {
  const { UserID, imageUrl, rows } = req.body;

  if (!UserID || !imageUrl || !rows || !rows.length) {
    return res.status(400).json({ message: "Missing required fields." });
  }
  console.log("Request body:", req.body);

    // Insert into `brandposts`
    db.query(
      "INSERT INTO brandpost (uid, picture, flag) VALUES (?, ?, ?)",
      [UserID, imageUrl, 0],
      (postError, postResult) => {
        if (postError) {
          console.error("Error inserting into brandposts:", postError);
          return db.rollback(() => {
            res.status(500).json({ message: "Failed to create post." });
          });
        }

        const postId = postResult.insertId; // new id

        // Insert rows into `brandpostdetails` sequentially
        let rowIndex = 0;

        const insertRow = () => {
          if (rowIndex >= rows.length) {
            db.commit((commitError) => {
              if (commitError) {
                console.error("Error committing transaction:", commitError);
                return db.rollback(() => {
                  res.status(500).json({ message: "Failed to commit transaction." });
                });
              }

              res.status(201).json({
                message: "Post created successfully.",
                postId,
              });
            });
            return;
          }

          const { itemType, url } = rows[rowIndex];
          db.query(
            "INSERT INTO brandpostdetails (pid, itemtype, URL, clicks) VALUES (?, ?, ?, ?)",
            [postId, itemType, url, 0],
            (detailError) => {
              if (detailError) {
                console.error("Error inserting into brandpostdetails:", detailError);
                return db.rollback(() => {
                  res.status(500).json({ message: "Failed to create post details." });
                });
              }

              rowIndex++;
              insertRow(); // Process the next row
            }
          );
        };
        insertRow();
      }
    );
  });

module.exports = router;
