import express from "express";
import multer from "multer";
import fs from "fs";
import axios from "axios";
import FormData from "form-data";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const API_KEY = process.env.PLANTNET_API_KEY;

// Multer pour gérer l'upload temporaire
const upload = multer({ dest: "uploads/" });

// POST /api/ai/analyze
router.post("/analyze", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      console.log("Aucune image envoyée");
      return res.status(400).json({ message: "Aucune image envoyée" });
    }

    console.log("Image reçue :", req.file.originalname, req.file.size);
    console.log("Clé API :", API_KEY ? "OK" : "MANQUANTE");

    // Préparer le fichier pour PlantNet
    const form = new FormData();
    form.append("images", fs.createReadStream(req.file.path));
    form.append("organs", "leaf"); // tu peux adapter selon la photo : leaf/flower/fruit

    // Requête vers PlantNet
    const response = await axios.post(
      `https://my-api.plantnet.org/v2/identify/all?api-key=${API_KEY}`,
      form,
      { headers: form.getHeaders() }
    );

    // Supprimer le fichier temporaire
    fs.unlinkSync(req.file.path);

    console.log("Réponse PlantNet reçue :", response.data);

    // Envoyer au frontend
    res.json({
      message: "Analyse réussie",
      data: response.data
    });

  } catch (error) {
    console.error("Erreur IA :", error.response?.data || error.message);

    // Supprimer le fichier même en cas d'erreur
    if (req.file && req.file.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      message: "Erreur lors de l'analyse IA",
      detail: error.response?.data || error.message
    });
  }
});

export default router;