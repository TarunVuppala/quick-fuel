const mongoose = require('mongoose');

const mechanicSchema = new mongoose.Schema({
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
  specialty: {
    type: String,
    required: true
  },
  orders: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'VehicleRepairOrder'
  },
  online: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Mechanic = mongoose.model('Mechanic', mechanicSchema);
module.exports = Mechanic;
