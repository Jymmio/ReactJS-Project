const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const database = require('./database/connect');

//routes
const { ReviewController } = require("./controllers/review-controller");
const {AuthController} = require("./controllers/auth-controller");
const {PostController} = require("./controllers/post-controller");
const { CommentController } = require('./controllers/comment-controller');
const { FavoriteController } = require('./controllers/favorite-controller');

dotenv.config();
const PORT = process.env.PORT;
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(cookieParser());
// Middleware pour parser le JSON
app.use(express.json());
database.connectToDB();

app.use("/api/review", ReviewController);
app.use("/api/auth", AuthController);
app.use("/api/posts", PostController);
app.use("/api/comments", CommentController);
app.use('/api/users', FavoriteController);
app.use("/uploads", express.static("uploads"));
app.get("/", (req, res) => {
    res.send("Bienvenue sur mon serveur du forum!");
  });

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
  });