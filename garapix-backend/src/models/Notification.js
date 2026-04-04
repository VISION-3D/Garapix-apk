// src/models/Notification.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: [
      'diagnostic', 
      'reminder', 
      'alert', 
      'tip', 
      'update', 
      'system', 
      'info', 
      'warning', 
      'error'
    ],
    default: 'info'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  read: {
    type: Boolean,
    default: false
  },
  action: {
    type: String,
    default: ''
  },
  actionData: {
    type: mongoose.Schema.Types.Mixed
  },
  expiresAt: {
    type: Date
  },
  readAt: {
    type: Date
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

// Index pour les recherches fréquentes
notificationSchema.index({ user: 1, read: 1, createdAt: -1 });
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Middleware pour mettre à jour la date de modification
notificationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;