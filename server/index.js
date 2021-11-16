const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
const particle = require("./routes/api/particle");

// Use Routes
app.use("/api/particle", particle);

// Server port
const port = process.env.PORT || 4040;

// Run server on specified port
app.listen(port, () => console.log(`Server running on port: ${port}`));
