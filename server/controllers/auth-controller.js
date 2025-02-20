const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: "uploads/", 
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Format de fichier non supporté"), false);
    }
};
const upload = multer({ storage, fileFilter, limits: { fileSize: 2 * 1024 * 1024 } });

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

});
AuthController.post('/logout', async (req, res) => {
    res.clearCookie('token');
    return res.status(200).json({message: "utilisateur déconnecté."});
})
module.exports = {AuthController};