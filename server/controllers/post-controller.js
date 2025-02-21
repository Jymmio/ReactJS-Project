const express = require("express");
const upload = require("../middlewares/upload");
const jwt = require("jsonwebtoken");
const {PostRepos} = require('../database/repos/post-repos');
const {CommentRepos} = require('../database/repos/comment-repos');
const PostController = express.Router();

//create
PostController.post('/', upload.single("image"), async (req, res) => {
    const {title, content } = req.body;
    const token = req.cookies.token;
    const author = (jwt.verify(token, process.env.JWT_SECRET)).id;
    const image = req.file;
    if (!title || !content || !author) {
        return res.status(401).json({ message: "INVALID_DATA" });
    }
    let imagePath = "";
    if (image) {
        imagePath = `/uploads/${image.filename}`;
    }
    const addedPost = await PostRepos.create({
        title,
        content,
        image: imagePath,
        author
    });
    
    if (!addedPost) {
        return res.status(500).json({ message: "an error occurred!" });
    }

    return res.status(200).json({ post: addedPost });
});
//findall
PostController.get('/', async (req, res) => {
    const posts = await PostRepos.findAll();
    return res.status(200).json({posts});
})

//findById
PostController.get("/:id", async (req, res) => {
    const postId = req.params.id;
    const post = await PostRepos.find(postId);

    if (!post) {
        return res.status(404).json({ message: "Post non trouvé !" });
    }

    return res.status(200).json(post);
});

PostController.delete("/:id", async (req, res) => {
    const token = req.cookies.token;
    const userId = (jwt.verify(token, process.env.JWT_SECRET)).id;
    const postId = req.params.id;
    try{
        const post = await PostRepos.find(postId);
        if (!post) {
            return res.status(404).json({ message: "post not found !" });
        }
        if (post.author._id.toString() !== userId.toString()) {
            return res.status(403).json({ message: "forbidden ! you didn't create this post, nice try :3" });
        }
        await PostRepos.delete(postId);
        return res.status(200).json({message: "post deleted successfully !"});
    }
    catch(err) {
        res.status(500).json({message: "une erreur est survenue.", error: err});
    }
});
//find post comments
PostController.get('/:id/comments', async (req, res) => {
    const postId = req.params.id;

    try {
        const comments = await CommentRepos.findByPost(postId);

        return res.status(200).json({ comments });
    } catch (error) {
        console.error("Erreur lors de la récupération des commentaires :", error);
        return res.status(500).json({ message: "Erreur serveur" });
    }
});
module.exports = { PostController };