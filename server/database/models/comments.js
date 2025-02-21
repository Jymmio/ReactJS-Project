const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    content: {type: String, required: true},
    author: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true},
    post: {type: mongoose.Schema.Types.ObjectId, ref: "Posts", required: true},
    date: {type: Date, required: true}
})
const CommentModel = mongoose.model('Comments', CommentSchema);
module.exports = {CommentModel};