const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    password: String
});

const userInfo = mongoose.model("userinfo-collections", userSchema); 

module.exports = { userInfo };