import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AgentDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [status, setStatus] = useState('');
    const navigate=useNavigate();

    useEffect(() => {
        // Fetch orders on component mount
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('/api/agent', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setOrders(response.data.orders);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };
        fetchOrders();
    }, []);

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post('/api/agent/logout', {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            localStorage.removeItem('token');
            navigate('/agent/login');
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const handleStatusUpdate = async (orderId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put('/api/order/fuel', { orderId, status }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Update the local orders state
            setOrders(orders.map(order => 
                order._id === orderId ? { ...order, status } : order
            ));
            setSelectedOrder(null); // Clear selected order
            setStatus(''); // Clear status
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const handleStatusChange = (orderId, newStatus) => {
        setSelectedOrder(orderId);
        setStatus(newStatus);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Agent Dashboard</h1>
            <button 
                onClick={handleLogout} 
                className="bg-red-500 text-white px-4 py-2 rounded mb-4 hover:bg-red-700"
            >
                Logout
            </button>
            <div>
                {orders.length > 0 ? (
                    orders.map(order => (
                        <div 
                            key={order._id} 
                            className="border p-4 rounded shadow mb-4"
                        >
                            <h2 className="text-xl font-semibold">Order #{order._id}</h2>
                            <p className="mt-2">Fuel Type: {order.fuelType}</p>
                            <p>Quantity: {order.quantity} liters</p>
                            <p>Address: {order.address}</p>
                            <p>Status: {order.status}</p>
                            <select 
                                className="mt-2 p-2 border rounded"
                                value={selectedOrder === order._id ? status : order.status}
                                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                            >
                                <option value="pending">Pending</option>
                                <option value="in_transit">In Transit</option>
                                <option value="delivered">Delivered</option>
                            </select>
                            <button 
                                className="bg-blue-500 text-white px-4 py-2 rounded ml-2 mt-2 hover:bg-blue-700"
                                onClick={() => handleStatusUpdate(order._id)}
                            >
                                Update Status
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No orders found.</p>
                )}
            </div>
        </div>
    );
};

export default AgentDashboard;
