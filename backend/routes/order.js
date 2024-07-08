const express=require('express')
const FuelOrder=require('../models/fuelOrderModel')
const RepairOrder=require('../models/vehicleRepairModel')

const app=express();

app.post('/fuel',async(req,res)=>{
    const { fuelType, quantity,address,price}=req.body;

    if(!fuelType || !quantity || !address || !price){
        res.status(400).json({msg:"Missing fields",success:false})
        return;
    }
    const newFuelOrder=new FuelOrder({
        fuelType,
        quantity,
        address,
        price
    })
    try {
        await newFuelOrder.save();
        res.status(200).json({msg:"Order created",success:true})
    } catch (err) {
        res.status(500).json({msg:err.message,success:false})
    }
})

app.post('/repair',async(req,res)=>{
    const {vehicleType,quantity,address,price}=req.body;
    if(!vehicleType || !quantity || !address || !price){
        res.status(400).json({msg:"Missing fields",success:false})
        return;
    }
    const newRepairOrder=new RepairOrder({
        vehicleType,
        quantity,
        address,
        price
    })
    try {
        await newRepairOrder.save();
        res.status(200).json({msg:"Order created",success:true})
    } catch (err) {
        res.status(500).json({msg:err.message,success:false})
    }
})