const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    firstname : {
        type: String,
        required: true,
    },
    lastname : {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
    },
    phone : {
        type: Number,
        required: true,
    },
    password : {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("User", userSchema);