const { PostModel } = require("../models/posts");

const PostRepos = {
    create: async ({ title, content, image, author }) => {
        try {
            const date = new Date();
            const newPost = new PostModel({ title, content, image, author, date });
            const savedPost = await newPost.save();
            return savedPost;
        } catch (error) {
            console.error("Erreur lors de la création du post :", error);
            return null;
        }
    },

    findAll: async () => {
        try {
            return await PostModel.find().populate("author", "pseudo email avatar").sort({ createdAt: -1 });
        } catch (error) {
            console.error("Erreur lors de la récupération des posts :", error);
            return [];
        }
    },

    find: async (id) => {
        try {
            return await PostModel.findById(id).populate("author", "pseudo email avatar");
        } catch (error) {
            console.error("Erreur lors de la recherche du post :", error);
            return null;
        }
    },

    delete: async (id) => {
        try {
            return await PostModel.findByIdAndDelete(id);
        } catch (error) {
            console.error("Erreur lors de la suppression du post :", error);
            return null; 
        }
    }
};

module.exports = { PostRepos };
