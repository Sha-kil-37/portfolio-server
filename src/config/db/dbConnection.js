'use strict'
const mongoose = require("mongoose");
require("dotenv").config();
// 
async function dbConnection() {
  //
  return await mongoose.connect(process.env.DB_URI);
  //
}

//
module.exports = dbConnection;
