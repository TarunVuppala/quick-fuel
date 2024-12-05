import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Booking = () => {
  const fuelTypes = [
    { name: 'Petrol', price: 110, availability: true },
    { name: 'Diesel', price: 100, availability: true },
    { name: 'CNG', price: 70, availability: true },
    { name: 'LPG', price: 90, availability: true },
  ];

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fuelType: '',
    quantity: '',
    address: '',
    price: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Update price based on selected fuel type and quantity
    if (name === 'fuelType' || name === 'quantity') {
      const selectedFuel = fuelTypes.find(fuel => fuel.name === (name === 'fuelType' ? value : formData.fuelType));
      const quantity = name === 'quantity' ? value : formData.quantity;
      if (selectedFuel && quantity) {
        setFormData(prevState => ({
          ...prevState,
          price: selectedFuel.price * quantity,
        }));
      }
    }
  };

  const handleOrder = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/order/fuel`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });
      if (response.data.success) {
        alert('Order created successfully!');
        navigate('/tracking');
      } else {
        alert('Failed to create order.');
      }
    } catch (error) {
      console.log(error);
      alert('An error occurred while placing the order.');
    }
  };

  return (
    <div className='h-screen flex flex-col lg:flex-row justify-center items-center p-[1rem]'>
      <img src="/images/booking.png" alt="tanker" />
      <div className='flex flex-col justify-center items-center gap-[1rem]'>
        <h1 className='font-black text-3xl uppercase'>Booking Details</h1>
        <div className='flex flex-row gap-[1rem]'>
          <select
            name="fuelType"
            className='border p-[1rem] rounded-[1rem] w-full'
            value={formData.fuelType}
            onChange={handleChange}
          >
            <option value="">Select Fuel Type</option>
            {fuelTypes.map((fuel) => (
              <option key={fuel.name} value={fuel.name}>
                {fuel.name}
              </option>
            ))}
          </select>
        </div>
        <input
          type="number"
          name="quantity"
          placeholder='Quantity'
          className='border p-[1rem] rounded-[1rem] w-full'
          value={formData.quantity}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder='Address'
          className='border p-[1rem] rounded-[1rem] w-full'
          value={formData.address}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder='Price'
          className='border p-[1rem] rounded-[1rem] w-full'
          value={formData.price}
          onChange={handleChange}
          disabled
        />
        <button
          className='border p-[1rem] rounded-[1rem] w-fit font-black uppercase border-[#ff0000] text-[#ff0000]'
          onClick={handleOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Booking;
