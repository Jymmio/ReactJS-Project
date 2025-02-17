const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const database = require('./database/connect');

//routes
const { ReviewController } = require("./controllers/review-controller");
const {AuthController} = require("./controllers/auth-controller");

dotenv.config();
const PORT = process.env.PORT;
app.use(cors());
// Middleware pour parser le JSON
app.use(express.json());
database.connectToDB();

app.use("/api/review", ReviewController);
app.use("/api/auth", AuthController);
app.get("/", (req, res) => {
    res.send("Bienvenue sur mon serveur du forum!");
  });

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
  });