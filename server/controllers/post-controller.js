/*
3. **Mettre en place l'affichage des posts sur le frontend**
   - Page d'accueil listant les posts avec pagination
   - Page détaillée d'un post
   */

const express = require("express");
const upload = require("../middlewares/upload");

const {PostRepos} = require('../database/repos/post-repos');

const PostController = express.Router();

//create
PostController.post('/', upload.single("image"), async (req, res) => {
    const {title, content, author } = req.body;
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
    const postId = req.params.id;
    try{
        await PostRepos.delete(postId);
        return res.status(20).json({message: "post deleted successfully !"});
    }
    catch(err) {
        res.status(500).json({message: "une erreur est survenue.", error: err});
    }
});

module.exports = { PostController };