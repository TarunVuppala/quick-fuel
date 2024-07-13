import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MechanicDashboard = () => {
    const [requests, setRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [status, setStatus] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch mechanic requests on component mount
        const fetchRequests = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('/api/mechanic', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const requests = response.data.orders;
                setRequests(requests);
            } catch (error) {
                console.error("Error fetching requests:", error);
            }
        };
        fetchRequests();
    }, []);

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post('/api/mechanic/logout', {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            localStorage.removeItem('token');
            navigate('/mechanic/login');
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const handleStatusUpdate = async (requestId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put('/api/request/mechanic', { requestId, status }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Update the local requests state
            const updatedRequests = requests.map(request =>
                request._id === requestId ? { ...request, status } : request
            );
            setRequests(updatedRequests);
            setSelectedRequest(null); // Clear selected request
            setStatus(''); // Clear status
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const handleStatusChange = (requestId, newStatus) => {
        setSelectedRequest(requestId);
        setStatus(newStatus);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Mechanic Dashboard</h1>
            <button 
                onClick={handleLogout} 
                className="bg-red-500 text-white px-4 py-2 rounded mb-4 hover:bg-red-700"
            >
                Logout
            </button>
            <div>
                {requests.length > 0 ? (
                    requests.map(request => (
                        <div 
                            key={request._id} 
                            className="border p-4 rounded shadow mb-4"
                        >
                            <h2 className="text-xl font-semibold">Request #{request._id}</h2>
                            <p className="mt-2">Vehicle Type: {request.vehicleType}</p>
                            <p>Issue: {request.repairType}</p>
                            <p>Address: {request.address}</p>
                            <p>Status: {request.status}</p>
                            <select 
                                className="mt-2 p-2 border rounded"
                                value={selectedRequest === request._id ? status : request.status}
                                onChange={(e) => handleStatusChange(request._id, e.target.value)}
                            >
                                <option value="pending">Pending</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                            <button 
                                className="bg-blue-500 text-white px-4 py-2 rounded ml-2 mt-2 hover:bg-blue-700"
                                onClick={() => handleStatusUpdate(request._id)}
                            >
                                Update Status
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No requests found.</p>
                )}
            </div>
        </div>
    );
};

export default MechanicDashboard;
