const mongoose = require("mongoose");

const FavoriteSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true},
    post: [{type: mongoose.Schema.Types.ObjectId, required: true}]
})
const FavoriteModel = mongoose.model('Favorites', FavoriteSchema);
module.exports = {FavoriteModel};