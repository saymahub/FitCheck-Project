const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2");

const dbName = process.env.DATABASE_DB;
const dbUser = process.env.DATABASE_USER;
const dbPassword = process.env.DATABASE_PASSWORD;
const dbHost = process.env.DATABASE_HOST;

const db = mysql.createConnection({
  multipleStatements: false, //https://planetscale.com/blog/how-to-prevent-sql-injection-attacks-in-node-js
  host: dbHost,
  user: "root",
  password: dbPassword,
  database: dbName,
  dateStrings: "date", //https://stackoverflow.com/questions/11187961/date-format-in-node-js
  port: "3306",
});

db.connect((err) => {
  if (err) {
      console.log("Attempting to reconnect...");
      reconnect();
  } else {
    console.log("MySQL Connected");
  }
});
 
function reconnect() {
  setTimeout(() => {
    db.connect((err) => {
      if (err) {
        console.error("Reconnection failed, retrying...", err);
        reconnect();
      } else {
        console.log("Reconnected to MySQL.");
        return;
      }
    });
  }, 5000);
}

module.exports = db; 