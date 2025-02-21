const express = require("express");
const jwt = require("jsonwebtoken");
const { FavoriteRepos } = require("../database/repos/favorite-repos");

const FavoriteController = express.Router();

FavoriteController.post("/:id/favorites", async (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Non authentifié" });

    try {
        const userId = jwt.verify(token, process.env.JWT_SECRET).id;
        const postId = req.params.id;
        console.log("userId extrait du token :", userId);
        console.log("postId reçu :", postId);
        const favorite = await FavoriteRepos.create(userId, postId);
        return res.status(200).json({ message: "Ajouté aux favoris", favorite });
    } 
    catch(err){
        return res.status(500).json({error: err});
    }

});

FavoriteController.delete("/:id/favorites", async (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Non authentifié" });

    try {
        const userId = (jwt.verify(token, process.env.JWT_SECRET)).id;
        const postId = req.params.id;

        const favorite = await FavoriteRepos.delete(userId, postId);
        return res.status(200).json({ message: "Supprimé des favoris", favorite });
    } 
    catch(err){
        return res.status(500).json({error: err});
    }

});

FavoriteController.get("/:id/favorites", async (req, res) => {
    try {
        const userId = req.params.id;
        const favorites = await FavoriteRepos.findByUser(userId);
        return res.status(200).json({ favorites });
    } 
    catch(err){
        return res.status(500).json({error: err});
    }

});

module.exports = { FavoriteController };
