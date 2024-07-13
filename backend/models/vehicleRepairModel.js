const mongoose = require('mongoose');

const vehicleRepairOrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mechanic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mechanic',
    required: true
  },
  vehicleType: {
    type: String,
    required: true
  },
  repairType: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed'],
    default: 'pending'
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const VehicleRepairOrder = mongoose.model('VehicleRepairOrder', vehicleRepairOrderSchema);
module.exports = VehicleRepairOrder;
