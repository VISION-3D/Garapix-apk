const mongoose = require('mongoose');

const plantDiseaseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  scientificName: {
    type: String
  },
  type: {
    type: String,
    enum: ['fungal', 'bacterial', 'viral', 'pest', 'nutrient', 'environmental'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  symptoms: [{
    type: String
  }],
  affectedPlants: [{
    type: String
  }],
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  treatments: [{
    name: String,
    description: String,
    type: {
      type: String,
      enum: ['chemical', 'organic', 'cultural', 'biological']
    },
    effectiveness: {
      type: String,
      enum: ['low', 'medium', 'high']
    }
  }],
  preventionTips: [{
    type: String
  }],
  images: [{
    url: String,
    description: String,
    isPrimary: Boolean
  }],
  seasonality: [{
    type: String,
    enum: ['spring', 'summer', 'autumn', 'winter']
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('PlantDisease', plantDiseaseSchema);