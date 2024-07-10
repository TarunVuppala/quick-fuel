const mongoose = require('mongoose');

const userModel = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid 10-digit phone number!`
        }
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    city: {
        type: String,
        required: true
    },
    fuelOrders:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'FuelOrder'
    },
    vehicleRepairOrders:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'VehicleRepairOrder'
    }
},{
    timestamps: true
});

const User = mongoose.model('User', userModel);

module.exports = User;