const mongoose = require("mongoose");

const Post = mongoose.model(
    "Post",
    new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        nameposter : { type: String, required: true },
        idposter : { type: String, required: true },
        idpost : { type: String, required: true },
        content : { type: String, required: true },
        date : { type: String, required: true },
        comments : { type: [], required: false },
        likes : { type: [], required: false },
        loves : { type: [], required: false },
    })
);

module.exports = Post;