const mongoose = require('mongoose');

const deliveryAgentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  city: {
    type: String,
    required: true
  },
  vehicle: {
    type: String,
    required: true
  },
  licensePlate: {
    type: String,
    required: true,
    unique: true
  },
  orders: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'FuelOrder'
  },
  online: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const DeliveryAgent = mongoose.model('DeliveryAgent', deliveryAgentSchema);
module.exports = DeliveryAgent;
