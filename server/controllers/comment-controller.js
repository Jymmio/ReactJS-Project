const express = require("express");
const upload = require("../middlewares/upload");
const jwt = require("jsonwebtoken");
const {CommentRepos} = require('../database/repos/comment-repos');

const CommentController = express.Router();

//create
CommentController.post('/', async (req, res) => {
    const { content, post } = req.body;
    const token = req.cookies.token;
    const author = (jwt.verify(token, process.env.JWT_SECRET)).id;
    if (!content || !post) {
        return res.status(401).json({ message: "INVALID_DATA" });
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
//finByPost...
CommentController.get('/posts/:id/comments', async (req, res) => {
    const postId = req.params.id;

    try {
        const comments = await CommentRepos.findByPost(postId);

        return res.status(200).json({ comments });
    } catch (error) {
        console.error("Erreur lors de la récupération des commentaires :", error);
        return res.status(500).json({ message: "Erreur serveur" });
    }
});

module.exports = { CommentController };