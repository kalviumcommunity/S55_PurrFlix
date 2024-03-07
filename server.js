const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const PORT = 3000;
let status = "disconnected";
dotenv.config();

const startConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        status = "connected"; 
        console.log("Connected to MongoDB");
    } catch (err) {
    console.error("Error connecting to MongoDB");
    status = "error";
    } 
};

const stopConnect = async () => {
    await mongoose.disconnect();
    status = "disconnected"; 
    console.log("Disconnected from MongoDB");
};

app.get('/', (req, res) => {
    res.send(status);
});

app.listen(PORT, async () => {
    await startConnect(); 
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;