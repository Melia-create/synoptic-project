const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "Please enter a username"]
    }, 
    email: {
        type: String,
        required: [true, "Please enter your email address"]
    },
    password: {
        type: String,
        required: [true, "Please add a password"]
    }
});

module.exports = mongoose.model("User", userSchema);