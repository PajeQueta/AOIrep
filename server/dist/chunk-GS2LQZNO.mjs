// src/config/bd.ts
import mysql from "mysql2";
import { config } from "dotenv";
config();
var db = mysql.createConnection({
  host: process.env.DB_HOST || "10.12.100.14",
  user: process.env.DB_USER || "sysweb",
  password: process.env.DB_PASSWORD || "ZqkNUCy9DnPjGuSG",
  database: process.env.DATABASE || "defects_aoi"
});
var dbPPA = mysql.createConnection({
  host: process.env.DB_HOST || "10.12.100.14",
  user: process.env.DB_USER || "sysweb",
  password: process.env.DB_PASSWORD || "ZqkNUCy9DnPjGuSG",
  database: "ppa"
});

export {
  db,
  dbPPA
};
