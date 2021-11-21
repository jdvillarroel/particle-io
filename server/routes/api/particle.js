const express = require("express");
const router = express.Router();
const mongodb = require("mongodb");
require("dotenv").config();

// MongoDB url string
const mongoDBURL = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PWD}@${process.env.MONGODB_CLUSTER}/${process.env.DB}?${process.env.OPTIONS}`;

//Connects to mongoDB
const client = async () => {
  try {
    const mongoClient = await mongodb.MongoClient.connect(mongoDBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return mongoClient;
  } catch (error) {
    console.log(error);
  }
};

// GET /api/particles
router.get("/", async (req, res) => {
  // Get the particles collection
  // const particles = await loadParticles();
  const particles = client.db("home").collection("jOffice");

  // Fetch the last 8 hours of data
  const data = await particles
    .find({})
    .sort({ publishedAt: -1 })
    .limit(48)
    .toArray();

  // Return the data as json
  res.send(data);
});

// POST /api/particles
router.post("/", async (req, res) => {
  // const particles = await loadParticles();
  const particles = client.db("home").collection("jOffice");

  // Create a particle with the data sent from client
  let newData = {
    event: req.body.event,
    data: parseFloat(req.body.data),
    publishedAt: Date.parse(req.body.published_at),
    particleCoreID: req.body.coreid,
    apiKey: req.body.api_key,
  };

  // Insert the new particle into the collection
  const data = await particles.insertOne(newData);

  // Send response to the client
  res.status(201).send();
});

// Load the particles collection
// const loadParticles = async () => {
//   const client = await mongodb.MongoClient.connect(mongoDBURL, {
//     useNewUrlParser: true,
//   });

//   return client.db("home").collection("jOffice");
// };

module.exports = router;
