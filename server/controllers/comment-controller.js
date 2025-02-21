const express = require("express");
const upload = require("../middlewares/upload");
const jwt = require("jsonwebtoken");
const {CommentRepos} = require('../database/repos/comment-repos');
const {PostRepos} = require('../database/repos/post-repos');

const CommentController = express.Router();

//create
CommentController.post('/', async (req, res) => {
    const { content, post } = req.body;
    const token = req.cookies.token;
    const author = (jwt.verify(token, process.env.JWT_SECRET)).id;
    if (!content || !post) {
        return res.status(401).json({ message: "INVALID_DATA" });
    }

    const postExist =  PostRepos.find(post);
    if(!postExist){
        return res.status(403).json({message: "le post que vous commentez n'existe pas."});
    }
    const addedComment = await CommentRepos.create({
        content,
        author,
        post
    });
    
    if (!addedComment) {
        return res.status(500).json({ message: "an error occurred!" });
    }

    return res.status(200).json({ comment: addedComment });
});

module.exports = { CommentController };