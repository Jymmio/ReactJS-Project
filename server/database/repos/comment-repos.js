const { CommentModel } = require("../models/comments");

const CommentRepos = {
    create: async ({ content, author, post }) => {
        try {
            const date = new Date();
            const newComment = new CommentModel({ content, author, post });
            const savedComment = await newComment.save();
            return savedComment;
        } catch (error) {
            console.error("Erreur lors de la création du comment :", error);
            return null;
        }
    },

    findAll: async () => {
        try {
            return await CommentModel.find().populate("author", "content post").sort({ createdAt: -1 });
        } catch (error) {
            console.error("Erreur lors de la récupération des comments :", error);
            return [];
        }
    },

    find: async (id) => {
        try {
            return await CommentModel.findById(id).populate("author", "content post");
        } catch (error) {
            console.error("Erreur lors de la recherche du comment :", error);
            return null;
        }
    },

    delete: async (id) => {
        try {
            return await CommentModel.findByIdAndDelete(id);
        } catch (error) {
            console.error("Erreur lors de la suppression du comment :", error);
            return null; 
        }
    }
};

module.exports = { CommentRepos };
