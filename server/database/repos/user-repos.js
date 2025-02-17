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
    update: async ({email , pseudo, password, avatar}) => {
        return await UserModel.find();
    }

}

module.exports = { UserRepos };