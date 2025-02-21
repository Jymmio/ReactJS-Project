const { CommentModel } = require("../models/comments");

const CommentRepos = {
    create: async ({ content, author, post }) => {
        try {
            const date = new Date();
            const newComment = new CommentModel({ content, author, post, date });
            const savedComment = await newComment.save();
            return savedComment;
        } catch (error) {
            console.error("Erreur lors de la création du comment :", error);
            return null;
        }
    },

    findByPost: async (postId) => {
        try {
            return await CommentModel.find({ post: postId })
                .populate("author", "pseudo avatar") 
                .sort({ createdAt: -1 }); 
        } catch (error) {
            console.error("Erreur lors de la récupération des commentaires :", error);
            return [];
        }
    }
};

module.exports = { CommentRepos };
