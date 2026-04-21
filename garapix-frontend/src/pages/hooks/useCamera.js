import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export const useCamera = () => {
  const takePhoto = async () => {
    try {
      const permission = await Camera.requestPermissions();
      if (permission.camera !== 'granted') {
        throw new Error('Permission caméra refusée');
      }

      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,  // Permet à l'utilisateur de recadrer
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        correctOrientation: true,  // ← Corrige l'orientation
        saveToGallery: false,
        width: 1024,  // ← Largeur maximale
        height: 1024  // ← Hauteur maximale (format carré)
      });

      return image;
    } catch (error) {
      console.error('Erreur caméra:', error);
      throw error;
    }
  };

  return { takePhoto };
};


/*import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
export const useCamera = () => {
  const takePhoto = async () => {
    try {
      const permission = await Camera.requestPermissions();
      if (permission.camera !== 'granted') {
        throw new Error('Permission caméra refusée');
      }

      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera
      });

      return image;
    } catch (error) {
      console.error('Erreur caméra:', error);
      throw error;
    }
  };

  return { takePhoto };
};*/

/*import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export const useCamera = () => {
  const takePhoto = async () => {
    try {
      const permission = await Camera.requestPermissions();
      if (permission.camera !== 'granted') {
        throw new Error('Permission caméra refusée');
      }

      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,           // Active l'édition (permet de recadrer)
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        correctOrientation: true,
        saveToGallery: false,
        width: 800,                   // Largeur maximale
        height: 800                   // Hauteur maximale (carré)
      });

      return image;
    } catch (error) {
      console.error('Erreur caméra détaillée:', error);
      throw error;
    }
  };

  return { takePhoto };
};*/