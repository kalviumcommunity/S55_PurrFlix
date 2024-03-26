const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routes = require('./routes'); 
const app = express();
const cors = require('cors');
const PORT = 3000;
let status = "disconnected";

app.use(cors());

dotenv.config();

const startConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    status = "connected"; 
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB:");
    status = "error";
  }
};

const stopConnect = async () => {
  await mongoose.disconnect();
  status = "disconnected"; 
  console.log("Disconnected from MongoDB");
};

app.use(routes);

app.get('/', (req, res) => {
  res.send(status);
});

startConnect(); 
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;