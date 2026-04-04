import axios from 'axios';

export const analyzeWithPlantId = async (imageUrl) => {
  const response = await axios.post(
    'https://api.plant.id/v2/health_assessment',
    {
      images: [imageUrl],
      modifiers: ['crops_fast'],
      disease_details: ['description', 'treatment']
    },
    {
      headers: {
        'Api-Key': process.env.PLANT_ID_API_KEY
      }
    }
  );

  return response.data;
};
