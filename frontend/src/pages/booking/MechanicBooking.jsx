import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MechanicBooking = () => {
    const initialVehicleData = [
        {
            _id: { $oid: "668b8d2bb5392bf7cf97042e" },
            vehicle: "Car",
            repairs: [
                { name: "Engine Repair", price: 458 },
                { name: "Brake Repair", price: 273 },
                { name: "Transmission Repair", price: 135 },
                { name: "Electrical System Repair", price: 60 },
                { name: "Air Conditioning Repair", price: 431 },
                { name: "Oil Change", price: 341 },
                { name: "Tune-Up", price: 328 },
                { name: "Wheel Alignment", price: 363 },
                { name: "Battery Replacement", price: 102 },
                { name: "Exhaust System Repair", price: 154 },
                { name: "Cooling System Repair", price: 399 }
            ]
        },
        {
            _id: { $oid: "668b8d2bb5392bf7cf97042f" },
            vehicle: "Truck",
            repairs: [
                { name: "Engine Repair", price: 458 },
                { name: "Brake Repair", price: 273 },
                { name: "Transmission Repair", price: 135 },
                { name: "Tire Repair", price: 296 },
                { name: "Suspension Repair", price: 481 },
                { name: "Electrical System Repair", price: 60 },
                { name: "Air Conditioning Repair", price: 431 },
                { name: "Oil Change", price: 341 },
                { name: "Tune-Up", price: 328 },
                { name: "Wheel Alignment", price: 363 },
                { name: "Battery Replacement", price: 102 },
                { name: "Exhaust System Repair", price: 154 },
                { name: "Cooling System Repair", price: 399 }
            ]
        },
        {
            _id: { $oid: "668b8d2bb5392bf7cf970430" },
            vehicle: "Motorcycle",
            repairs: [
                { name: "Engine Repair", price: 458 },
                { name: "Brake Repair", price: 273 },
                { name: "Chain Replacement", price: 189 },
                { name: "Tire Repair", price: 296 },
                { name: "Suspension Repair", price: 481 },
                { name: "Electrical System Repair", price: 60 },
                { name: "Air Filter Replacement", price: 86 },
                { name: "Oil Change", price: 341 },
                { name: "Tune-Up", price: 328 },
                { name: "Wheel Alignment", price: 363 },
                { name: "Battery Replacement", price: 102 },
                { name: "Exhaust System Repair", price: 154 }
            ]
        }
    ];

    const [vehicleType, setVehicleType] = useState('');
    const [repairs, setRepairs] = useState([]);
    const [availableVehicles, setAvailableVehicles] = useState(initialVehicleData);
    const [bookingData, setBookingData] = useState({
        vehicleType: '',
        repairType: '',
        customerName: '',
        appointmentDate: '',
        notes: '',
        address: '',
        price: 0
    });
    const navigate = useNavigate();

    const handleVehicleChange = (event) => {
        const selectedVehicle = event.target.value;
        setVehicleType(selectedVehicle);

        setBookingData({
            ...bookingData,
            vehicleType: selectedVehicle,
            repairType: '',
            price: 0
        });

        const selectedVehicleDetails = availableVehicles.find(vehicle => vehicle.vehicle === selectedVehicle);
        if (selectedVehicleDetails) {
            setRepairs(selectedVehicleDetails.repairs);
        } else {
            setRepairs([]);
        }
    };

    const handleRepairChange = (event) => {
        const selectedRepair = event.target.value;
        const selectedRepairObj = repairs.find(repair => repair.name === selectedRepair);

        setBookingData(prevData => ({
            ...prevData,
            repairType: selectedRepair,
            price: selectedRepairObj ? selectedRepairObj.price : 0
        }));
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setBookingData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Assuming you have stored your JWT token in localStorage or sessionStorage
        const token = localStorage.getItem('token'); // Adjust this based on your actual storage method

        // Set the headers with Authorization Bearer token
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        axios.post('/api/order/repair', bookingData, { headers })
            .then(response => {
                alert('Booking successful!');
                setBookingData({
                    vehicleType: '',
                    repairType: '',
                    customerName: '',
                    appointmentDate: '',
                    notes: '',
                    address: '',
                    price: 0
                });
                setVehicleType('');
                setRepairs([]);
                navigate('/home')
            })
            .catch(error => {
                console.error('Error submitting booking:', error);
            });
    };


    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Mechanic Booking</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium">Select Vehicle:</label>
                    <select onChange={handleVehicleChange} value={vehicleType} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                        <option value="">Select Vehicle Type</option>
                        {availableVehicles.map(vehicle => (
                            <option key={vehicle._id.$oid} value={vehicle.vehicle}>{vehicle.vehicle}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block font-medium">Select Repair:</label>
                    {repairs.length > 0 ? (
                        repairs.map(repair => (
                            <div key={repair.name} className="flex items-center">
                                <input
                                    type="radio"
                                    id={repair.name}
                                    name="repairType"
                                    value={repair.name}
                                    checked={bookingData.repairType === repair.name}
                                    onChange={handleRepairChange}
                                    className="mr-2"
                                />
                                <label htmlFor={repair.name}>{repair.name}</label>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">Please select a vehicle to see available repairs.</p>
                    )}
                </div>
                {bookingData.price > 0 && (
                    <div>
                        <p className="font-medium">Price: ${bookingData.price}</p>
                    </div>
                )}
                <div>
                    <label className="block font-medium">Customer Name:</label>
                    <input
                        type="text"
                        name="customerName"
                        value={bookingData.customerName}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                <div>
                    <label className="block font-medium">Appointment Date:</label>
                    <input
                        type="datetime-local"
                        name="appointmentDate"
                        value={bookingData.appointmentDate}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                <div>
                    <label className="block font-medium">Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={bookingData.address}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                <div>
                    <label className="block font-medium">Notes:</label>
                    <textarea
                        name="notes"
                        value={bookingData.notes}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                <button type="submit" className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Book Appointment
                </button>
            </form>
        </div>
    );
};

export default MechanicBooking;
