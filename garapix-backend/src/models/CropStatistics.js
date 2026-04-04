// src/models/CropStatistics.js
const mongoose = require('mongoose');

const cropStatisticsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  totals: {
    crops: {
      type: Number,
      default: 0
    },
    diagnostics: {
      type: Number,
      default: 0
    },
    treatments: {
      type: Number,
      default: 0
    },
    harvests: {
      type: Number,
      default: 0
    },
    photos: {
      type: Number,
      default: 0
    },
    notes: {
      type: Number,
      default: 0
    }
  },
  byPlantType: [{
    plantType: String,
    count: Number,
    firstDate: Date,
    lastDate: Date
  }],
  byDisease: [{
    disease: String,
    count: Number,
    severity: {
      low: Number,
      medium: Number,
      high: Number,
      critical: Number
    }
  }],
  byMonth: [{
    year: Number,
    month: Number,
    diagnostics: Number,
    treatments: Number,
    harvests: Number
  }],
  successRate: {
    type: Number,
    default: 0
  },
  recentActivity: [{
    date: Date,
    count: Number
  }],
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CropStatistics', cropStatisticsSchema);