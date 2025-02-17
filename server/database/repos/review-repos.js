const { ReviewModel } = require("../models/reviews");

const ReviewRepos = {
    create: async ({email, message, note}) => {
        const date = new Date();
        const newReview = new ReviewModel({email, message, note, date});
        try{
            const savedReview = await newReview.save();
            return savedReview;
        } catch(error) {
            console.log(error);
            return null;
        }
    },
    findall: async () => {
        return await ReviewModel.find()
    }
}

module.exports = { ReviewRepos };