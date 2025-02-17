const express = require("express");
const { ReviewRepos } = require("../database/repos/review-repos");

const ReviewController = express.Router();

// /api/review  -  POST
ReviewController.post('/', async (req, res) => {
    //récuperer le corps de la requête
    const {email, message, note} = req.body;
    if(!email || !note || !message){
        return res.status(401).json({message: "INVALID_DATA"});
    }

    const savedReview = await ReviewRepos.create({email, note, message});
    if(!savedReview) {
        res.status(500).json({message: "an error occured"});
    }
    return res.status(200).json({review: savedReview});
})
ReviewController.get('/', async (req, res) => {
    const reviews = await ReviewRepos.findall();
    return res.status(200).json({reviews});
})
module.exports = {ReviewController};