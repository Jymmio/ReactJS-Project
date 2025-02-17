const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    email: {type: String, required: true},
    message: {type: String, required: true},
    date: {type: Date, required: true},
    note: {type: Number, required: true}
})
const ReviewModel = mongoose.model('Reviews', ReviewSchema);
module.exports = {ReviewModel};