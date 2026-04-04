// src/models/CropHistory.js
const mongoose = require('mongoose');

const cropHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cropId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Crop'
  },
  plantType: {
    type: String,
    required: true
  },
  action: {
    type: String,
    enum: [
      'diagnostic',
      'treatment',
      'watering',
      'fertilization',
      'pruning',
      'harvest',
      'observation',
      'photo',
      'note',
      'location_change'
    ],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  details: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      default: [0, 0]
    }
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical']
  },
  weather: {
    temperature: Number,
    humidity: Number,
    precipitation: Number,
    condition: String
  },
  images: [{
    url: String,
    description: String,
    timestamp: Date
  }],
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'cancelled'],
    default: 'completed'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index pour les requêtes fréquentes
cropHistorySchema.index({ user: 1, createdAt: -1 });
cropHistorySchema.index({ user: 1, plantType: 1 });
cropHistorySchema.index({ user: 1, action: 1 });

// Middleware pour mettre à jour la date de modification
cropHistorySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('CropHistory', cropHistorySchema);