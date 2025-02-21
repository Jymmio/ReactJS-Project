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

const upload = multer({ 
    storage, 
    fileFilter, 
    limits: { fileSize: 10 * 1024 * 1024 } //j'ai mis  genre une limite à 10Mo...
});

module.exports = upload;
