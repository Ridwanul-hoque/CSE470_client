import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Approval = () => {
    const [requests, setRequests] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/business')
            .then(res => setRequests(res.data))
            .catch(console.error);
    }, []);

    const handleApprove = async (id) => {
        await axios.patch(`http://localhost:5000/business/approve/${id}`);
        setRequests(prev => prev.map(req => req._id === id ? { ...req, status: 'business' } : req));
        setSelected(null); // close modal after action
    };

    const handleReject = async (id) => {
        await axios.delete(`http://localhost:5000/business/${id}`);
        setRequests(prev => prev.filter(req => req._id !== id));
        setSelected(null); // close modal after action
    };

    return (
        <div className="overflow-x-auto p-4">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>Owner</th>
                        <th>Business</th>
                        <th>Status</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map(req => (
                        <tr key={req._id}>
                            <td>{req.ownerName}</td>
                            <td>{req.businessName}</td>
                            <td>{req.status}</td>
                            <td>
                                <button 
                                    onClick={() => setSelected(req)} 
                                    className={`btn btn-info btn-sm ${req.status === 'business' ? 'btn-disabled' : ''}`}
                                >
                                    Details
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selected && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-3">
                        <h2 className="text-xl font-bold mb-2">Business Details</h2>
                        <p><strong>Owner:</strong> {selected.ownerName}</p>
                        <p><strong>Business:</strong> {selected.businessName}</p>
                        <p><strong>Type:</strong> {selected.businessType}</p>
                        <p><strong>Start Year:</strong> {selected.startYear}</p>
                        <p><strong>Logo:</strong> <a href={selected.logoUrl} className="text-blue-500" target="_blank" rel="noreferrer">View Logo</a></p>
                        <p><strong>Description:</strong> {selected.description}</p>
                        <p><strong>Email:</strong> {selected.email}</p>
                        <div className="flex justify-end gap-2 mt-4">
                            <button onClick={() => setSelected(null)} className="btn btn-outline btn-sm">Close</button>
                            <button 
                                onClick={() => handleApprove(selected._id)} 
                                className="btn btn-success btn-sm"
                                disabled={selected.status === 'business'}
                            >
                                Accept
                            </button>
                            <button 
                                onClick={() => handleReject(selected._id)} 
                                className="btn btn-error btn-sm"
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Approval;
