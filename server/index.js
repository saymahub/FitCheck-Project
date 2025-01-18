const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2");
const db = require("./db"); // Centralized DB connection

// Import your backend routing below
const businessDashboard = require("./routes/businessDashboardroutes")
const loginroutes = require("./routes/loginroutes")
const businessAnalytics = require("./routes/businessAnalyticsroutes")
const businessAddPost = require("./routes/businessAddPostroutes")
const businessProfile = require("./routes/businessProfileroutes")
const businessProfileUpdate = require("./routes/businessProfileUpdatesroutes")
const profile = require("./routes/profile")
const foryou = require("./routes/foryouloadpostsroutes")
const catalog = require("./routes/catalogroutes")
const foryouaddpost = require("./routes/foryou-addpostroutes")
const adminDashboard = require("./routes/adminDashboardroutes")
const adminFeed = require("./routes/adminFeedroutes")
const adminSearchPage = require("./routes/adminSearchPageroutes")

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from our server!");
});

// Add your backend routing below
app.use("/api/loginroutes", loginroutes);
app.use("/api/businessDashboard", businessDashboard);
app.use("/api/businessAnalytics", businessAnalytics);
app.use("/api/businessAddPost", businessAddPost);
app.use("/api/businessProfile", businessProfile);
app.use("/api/businessProfileUpdate", businessProfileUpdate)
app.use("/api/profile", profile);
app.use("/api/foryouloadpostsroutes", foryou);
app.use("/api/catalogroutes", catalog);
app.use("/api/foryou-addpostroutes", foryouaddpost);
app.use("/api/adminDashboard", adminDashboard);
app.use("/api/adminFeed", adminFeed);
app.use("/api/adminSearchPage", adminSearchPage);

app.listen(8080, () => {
  console.log("server listening on port 8080");
});