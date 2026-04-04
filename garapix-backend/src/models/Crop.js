// src/models/Crop.js
const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  plantType: {
    type: String,
    required: true
  },
  scientificName: String,
  variety: String,
  plantingDate: {
    type: Date,
    default: Date.now
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
    },
    address: String,
    gardenName: String
  },
  status: {
    type: String,
    enum: ['seed', 'seedling', 'vegetative', 'flowering', 'fruiting', 'harvested', 'dormant', 'diseased', 'dead'],
    default: 'seed'
  },
  healthStatus: {
    type: String,
    enum: ['excellent', 'good', 'fair', 'poor', 'critical'],
    default: 'good'
  },
  diseases: [{
    name: String,
    severity: String,
    detectedAt: Date,
    treatedAt: Date,
    status: String
  }],
  treatments: [{
    name: String,
    type: String,
    appliedAt: Date,
    nextApplication: Date,
    notes: String
  }],
  wateringSchedule: {
    frequency: String,
    lastWatered: Date,
    nextWatering: Date
  },
  fertilizationSchedule: {
    lastFertilized: Date,
    nextFertilization: Date,
    fertilizerType: String
  },
  photos: [{
    url: String,
    description: String,
    date: Date,
    type: String
  }],
  notes: [{
    content: String,
    date: Date,
    type: String
  }],
  harvests: [{
    date: Date,
    quantity: Number,
    unit: String,
    notes: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Crop', cropSchema);