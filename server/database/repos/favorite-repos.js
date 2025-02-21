const { FavoriteModel } = require("../models/favorites");

const FavoriteRepos = {
    create: async (userId, postId) => {
        try {
            let favorite = await FavoriteModel.findOne({ user: userId });

            if (!favorite) {
                favorite = new FavoriteModel({ user: userId, posts: [] });
            }

            if (!favorite.posts.includes(postId)) {
                favorite.posts.push(postId);
                await favorite.save();
            }

            return favorite;
        } catch (error) {
            console.error("Erreur lors de l'ajout aux favoris :", error);
            return null;
        }
    },

    delete: async (userId, postId) => {
        try {
            const favorite = await FavoriteModel.findOne({ user: userId });

            if (favorite) {
                favorite.posts = favorite.posts.filter(id => id.toString() !== postId.toString());
                await favorite.save();
            }

            return favorite;
        } catch (error) {
            console.error("Erreur lors de la suppression du favori :", error);
            return null;
        }
    },

    findByUser: async (userId) => {
        try {
            const favorite = await FavoriteModel.findOne({ user: userId }).populate("posts");

            return favorite ? favorite.posts : [];
        } catch (error) {
            console.error("Erreur lors de la récupération des favoris :", error);
            return [];
        }
    }
};

module.exports = { FavoriteRepos };
