const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser le JSON
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Bienvenue sur mon serveur du forum!");
  });

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
  });