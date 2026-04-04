const mongoose = require('mongoose');

const diagnosisSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  plantType: {
    type: String
  },
  diseases: [{
    disease: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PlantDisease'
    },
    confidence: {
      type: Number,
      min: 0,
      max: 1
    },
    severity: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical']
    }
  }],
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
  notes: {
    type: String
  },
  treatmentApplied: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'analyzed', 'treated', 'resolved', 'failed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  analyzedAt: {
    type: Date
  }
});

// Index pour les recherches géospatiales
diagnosisSchema.index({ location: '2dsphere' });

// Index pour les recherches par utilisateur et date
diagnosisSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Diagnosis', diagnosisSchema);