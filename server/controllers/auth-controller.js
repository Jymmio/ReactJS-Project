const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
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
AuthController.post('/login', async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(401).json({message: "INVALID_DATA"});
    }
    const getUser = await UserRepos.findByEmail(email);
    if(!getUser){
        return res.status(404).json({message: "email/mot de passe incorrect !"});
    }
    const isPasswordCorrect = await verifyPassword(password, getUser.password);
    if(!isPasswordCorrect){
        return res.status(404).json({message: "email/mot de passe incorrect !"});
    }

    const token = jwt.sign(
        { id: getUser._id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" } // Expire en 1 heure
    );
    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 3600000, 
    });
    return res.status(200).json({user: getUser, token: token});

});
module.exports = {AuthController};