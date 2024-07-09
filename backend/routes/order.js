const express = require('express')
const FuelOrder = require('../models/fuelOrderModel')
const RepairOrder = require('../models/vehicleRepairModel')
const DeliveryAgent = require('../models/deliveryAgentModel')
const Mechanic = require('../models/mechanic')

const {getUser}=require('../services/user')

const app = express();

app.post('/fuel', async (req, res) => {
    const token=req.cookies.token||req.headers.authorization.split(" ")[1];
    if (!token) {
        res.status(401).json({ msg: "Unauthorized", success: false })
        return;
    }
    const payload = getUser(token);
    if (payload===null) {
        res.status(401).json({ msg: "Unauthorized", success: false })
        return;
    }

    const { fuelType, quantity, address, price } = req.body;

    if (!fuelType || !quantity || !address || !price) {
        res.status(400).json({ msg: "Missing fields", success: false })
        return;
    }
    const agents=await DeliveryAgent.find({online:true})
    const random=Math.floor(Math.random()*agents.length)
    const deliveryAgent=agents[random]

    const newFuelOrder = new FuelOrder({
        user: payload.user,
        deliveryAgent: deliveryAgent._id,
        fuelType,
        quantity,
        address,
        price
    })
    try {
        await newFuelOrder.save();
        deliveryAgent.orders.push(newFuelOrder._id)
        deliveryAgent.save()
        res.status(200).json({newFuelOrder, msg: "Order created", success: true })
    } catch (err) {
        res.status(500).json({ msg: err.message, success: false })
    }
})

app.post('/repair', async (req, res) => {
    const token=req.cookies.token||req.headers.authorization.split(" ")[1];
    if (!token) {
        res.status(401).json({ msg: "Unauthorized", success: false })
        return;
    }
    const payload = getUser(token);
    if (payload===null) {
        res.status(401).json({ msg: "Unauthorized", success: false })
        return;
    }
    
    const { vehicleType, quantity, address, price } = req.body;
    
    if (!vehicleType || !quantity || !address || !price) {
        res.status(400).json({ msg: "Missing fields", success: false })
        return;
    }

    const mechanics=await Mechanic.find({online:true})
    const random=Math.floor(Math.random()*mechanics.length)
    const mechanic=mechanics[random]

    const newRepairOrder = new RepairOrder({
        user: payload.user,
        mechanic: mechanic._id,
        vehicleType,
        repairType,
        address,
        price
    })
    try {
        await newRepairOrder.save();
        mechanic.orders.push(newRepairOrder._id)
        mechanic.save()
        res.status(200).json({newRepairOrder, msg: "Order created", success: true })
    } catch (err) {
        res.status(500).json({ msg: err.message, success: false })
    }
})

module.exports = app