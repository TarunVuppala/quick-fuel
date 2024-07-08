const mongoose = require('mongoose');

const fuelOrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  deliveryAgent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DeliveryAgent',
    required: true
  },
  fuelType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'fueltypes',
    required: true
  },
  quantity: {
    type: Number,
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
    enum: ['pending', 'accepted', 'in_transit', 'delivered', 'cancelled'],
    default: 'pending'
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const FuelOrder = mongoose.model('FuelOrder', fuelOrderSchema);
module.exports = FuelOrder;
