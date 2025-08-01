"use strict";
require("dotenv").config();
const axios = require("axios");
//
module.exports = async (req, reply) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${process.env.GITHUB_USERNAME}/repos`,
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
      }
    );
    //
    
    return reply.status(200).send({
      success: true,
      message: "Github data fetched successfully",
      data: response.data,
    });
  } catch (error) {
    reply.status(500).send({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
