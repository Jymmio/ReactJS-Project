const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    image: {type: String, required: false},
    author: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true},
    date: {type: Date, required: true}
})
const PostModel = mongoose.model('Posts', PostSchema);
module.exports = {PostModel};