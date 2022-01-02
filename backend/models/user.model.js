const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        name : { type: String, required: true },
        firstname : { type: String, required: true },
        lastname : { type: String, required: true },
        email : { type: String, required: true },
        password : { type: String, required: true },
    })
);

module.exports = User;