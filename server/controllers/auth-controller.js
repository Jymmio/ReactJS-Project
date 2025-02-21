const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const upload = require("../middlewares/upload");

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
AuthController.post('/register', upload.single("avatar"), async (req, res) => {
    const { pseudo, email, password } = req.body;
    const avatar = req.file;
    if (!email || !pseudo || !password) {
        return res.status(401).json({ message: "INVALID_DATA" });
    }

    const hashed = await hashPassword(password);
    let avatarPath = "";
    if (avatar) {
        avatarPath = `/uploads/${avatar.filename}`;
    }

    try{
        const addedUser = await UserRepos.create({
            email,
            pseudo,
            password: hashed,
            avatar: avatarPath 
        });
    
        if (!addedUser) {
            return res.status(500).json({ message: "an error occurred!" });
        }
    
        return res.status(200).json({ user: addedUser });
    }
    catch(err){
        return res.status(500).json({error: err});
    }
});
AuthController.post('/login', async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(401).json({message: "INVALID_DATA"});
    }
    try{
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
        return res.status(200).json(
            {
                message: "connected successfully !",
                user: {
                    id: getUser._id,
                    pseudo: getUser.pseudo,
                    email: getUser.email,
                    avatar: getUser.avatar
                }
            });
    }
    
    catch(err){
        return res.status(500).json({error: err});
    }

});
AuthController.post('/logout', async (req, res) => {
    try{
        res.clearCookie('token');
        return res.status(200).json({message: "utilisateur déconnecté."});
    }
    catch(err){
        return res.status(500).json({error: err});
    }
});

//une route pour récuperer l'utilisateur courant ... (à utiliser dans UserProvider)
AuthController.get("/me", async (req, res) => {
    const token = req.cookies.token;
    console.log(token);
    if (!token) {
        return res.status(401).json({ message: "Non authentifié" });
    }
    try{
        const user = await UserRepos.find((jwt.verify(token, process.env.JWT_SECRET)).id);

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        return res.status(200).json({
            user: {
                id: user._id,
                pseudo: user.pseudo,
                email: user.email,
                avatar: user.avatar
            }
        });
    }
    
    catch(err){
        return res.status(500).json({error: err});
    }
});

module.exports = {AuthController};