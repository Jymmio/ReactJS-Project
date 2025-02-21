const { FavoriteModel } = require("../models/favorites");

const FavoriteRepos = {
    create: async (userId, postId) => {
        try {
            let favorite = await FavoriteModel.findOne({ user: userId });

            if (!favorite) {
                favorite = new FavoriteModel({ user: userId, post: [] });
            }

            if (!favorite.post.includes(postId)) {
                favorite.post.push(postId);
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
                favorite.post = favorite.post.filter(id => id.toString() !== postId.toString());
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
            const favorite = await FavoriteModel.findOne({ user: userId }).populate("post");

            return favorite ? favorite.post : [];
        } catch (error) {
            console.error("Erreur lors de la récupération des favoris :", error);
            return [];
        }
    }
};

module.exports = { FavoriteRepos };
