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
        setSelected(null);
    };

    const handleReject = async (id) => {
        await axios.delete(`http://localhost:5000/business/${id}`);
        setRequests(prev => prev.filter(req => req._id !== id));
        setSelected(null);
    };

    return (
        <div className="min-h-screen bg-[#0D0D2B] text-white p-6 font-sans">
            <h2 className="text-3xl font-bold mb-6 text-[#FE5F75] text-center tracking-wider">Business Approval Requests</h2>

            <div className="overflow-x-auto rounded-xl shadow-md">
                <table className="min-w-full border-separate border-spacing-y-3">
                    <thead>
                        <tr className="bg-[#FE5F75] bg-opacity-80 text-white rounded-md">
                            <th className="p-3 rounded-l-xl">Owner</th>
                            <th className="p-3">Business</th>
                            <th className="p-3">Status</th>
                            <th className="p-3 rounded-r-xl">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map(req => (
                            <tr
                                key={req._id}
                                className="bg-white/5 backdrop-blur-md text-white text-sm shadow-sm rounded-lg transition hover:scale-[1.01]"
                            >
                                <td className="p-3">{req.ownerName}</td>
                                <td className="p-3">{req.businessName}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                        req.status === 'business' ? 'bg-green-500' : 'bg-yellow-500'
                                    }`}>
                                        {req.status}
                                    </span>
                                </td>
                                <td className="p-3">
                                    <button
                                        onClick={() => setSelected(req)}
                                        className={`px-3 py-1 text-white rounded-md transition duration-300 ${
                                            req.status === 'business'
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-gradient-to-r from-[#FE5F75] to-pink-500 hover:scale-105'
                                        }`}
                                    >
                                        Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {selected && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center px-4">
                    <div className="bg-[#0D0D2B] border border-[#FE5F75] text-white rounded-2xl shadow-xl p-6 w-full max-w-lg space-y-4 transition-all duration-300">
                        <h2 className="text-2xl font-bold text-[#FE5F75] text-center mb-2">Business Details</h2>
                        <div className="space-y-2 text-sm">
                            <p><strong>👤 Owner:</strong> {selected.ownerName}</p>
                            <p><strong>🏢 Business:</strong> {selected.businessName}</p>
                            <p><strong>📂 Type:</strong> {selected.businessType}</p>
                            <p><strong>📅 Start Year:</strong> {selected.startYear}</p>
                            <p><strong>🖼️ Logo:</strong> <a href={selected.logoUrl} className="text-blue-400 underline" target="_blank" rel="noreferrer">View Logo</a></p>
                            <p><strong>📝 Description:</strong> {selected.description}</p>
                            <p><strong>📧 Email:</strong> {selected.email}</p>
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                onClick={() => setSelected(null)}
                                className="border border-white hover:bg-white hover:text-[#0D0D2B] px-4 py-1 rounded-full transition"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => handleApprove(selected._id)}
                                disabled={selected.status === 'business'}
                                className={`px-4 py-1 rounded-full font-semibold transition ${
                                    selected.status === 'business'
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-[#FE5F75] to-pink-500 hover:scale-105'
                                }`}
                            >
                                Accept
                            </button>
                            <button
                                onClick={() => handleReject(selected._id)}
                                className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-full font-semibold transition"
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
