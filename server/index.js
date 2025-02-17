const express = require('express');
const app = express();
const dotenv = require('dotenv');
const database = require('./database/connect');
dotenv.config();
const PORT = process.env.PORT;

// Middleware pour parser le JSON
app.use(express.json());
database.connectToDB();
app.get("/", (req, res) => {
    res.send("Bienvenue sur mon serveur du forum!");
  });

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
  });