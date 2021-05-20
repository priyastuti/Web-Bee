const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    fullName: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }

})

//collection created (down)

const Register = new mongoose.model("Register", Schema)
module.exports = Register;