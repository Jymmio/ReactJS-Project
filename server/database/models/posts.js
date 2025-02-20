/*
## 3. Gestion des posts
1. **Créer le modèle Post** avec Mongoose (titre, contenu, image, auteur, date de création)
2. **Mettre en place les routes backend**
   - `POST /api/posts` : Créer un post (avec image via Multer)
   - `GET /api/posts` : Récupérer tous les posts
   - `GET /api/posts/:id` : Récupérer un post par son ID
   - `DELETE /api/posts/:id` : Supprimer un post (seulement si l'utilisateur est l'auteur)
3. **Mettre en place l'affichage des posts sur le frontend**
   - Page d'accueil listant les posts avec pagination
   - Page détaillée d'un post
   */

const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    image: {type: Date, required: true},
    author: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true},
    date: {type: Date, required: true}
})
const PostModel = mongoose.model('Posts', PostSchema);
module.exports = {PostModel};