const express = require("express");
const bcrypt = require('bcrypt');
const {UserRepos} = require('../database/repos/user-repos');
const AuthController = express.Router();
async function hashPassword(password) {
    const salt = await bcrypt.genSalt(12); 
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}
async function verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}
AuthController.post('/register', async (req, res) => {
    const {pseudo, email, password, avatar} = req.body;
    if(!email || !pseudo || !password || !avatar){
        return res.status(401).json({message: "INVALID_DATA"});
    }
    const hashed = await hashPassword(password);
    const addedUser = await UserRepos.create({email, pseudo, password: hashed, avatar})
    if(!addedUser)
        return res.status(500).json({message: "an error occured!"});
    return res.status(200).json({user: addedUser});
})

module.exports = {AuthController};