const fs = require('fs');
const path = require('path');

// Service Cloudinary simulé pour le développement
class CloudinaryService {
  async uploadImage(filePath) {
    try {
      // Simulation d'upload vers Cloudinary
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const publicId = `garapix_${Date.now()}`;
      const secureUrl = `https://via.placeholder.com/800x600?text=Plante+Analysee+${Date.now()}`;
      
      // Supprimer le fichier temporaire
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      return {
        public_id: publicId,
        secure_url: secureUrl,
        url: secureUrl
      };
    } catch (error) {
      console.error('Erreur Cloudinary simulée:', error);
      throw new Error('Échec de l\'upload de l\'image');
    }
  }

  async deleteImage(publicId) {
    try {
      // Simulation de suppression
      await new Promise(resolve => setTimeout(resolve, 500));
      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression Cloudinary:', error);
      return false;
    }
  }
}

module.exports = new CloudinaryService();