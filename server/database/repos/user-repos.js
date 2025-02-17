const { UserModel } = require("../models/users");

const UserRepos = {
    create: async ({email, pseudo, password, avatar}) => {
        const date = new Date();
        const newUser = new UserModel({email, pseudo, password, avatar});
        try{
            const savedUser = await newUser.save();
            return savedUser;
        } catch(error) {
            console.log(error);
            return null;
        }
    },
    findall: async () => {
        return await UserModel.find()
    },
    findByEmail: async (email) => {
        console.log("looking for email...");
        return await UserModel.findOne({email: email});
    }

}

module.exports = { UserRepos };