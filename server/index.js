const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
const particle = require("./routes/api/particle");

// Use Routes
app.use("/api/particle", particle);

// Handle production
if (process.env.NODE_ENV === "production") {
  // static folder
  app.use(express.static(__dirname + "/public/"));

  // Handle SPA
  app.get(/.*/, (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });
}

// Server port
const port = process.env.PORT || 4040;

// Run server on specified port
app.listen(port, () => console.log(`Server running on port: ${port}`));
