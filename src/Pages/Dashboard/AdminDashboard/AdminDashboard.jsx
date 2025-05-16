import React, { useEffect, useState } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const AdminDashboard = () => {
    const [counts, setCounts] = useState({
        users: 0,
        business: 0,
        inventory: 0,
        reviews: 0,
        old: 0,
        promote: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const urls = {
                    users: 'http://localhost:5000/users',
                    business: 'http://localhost:5000/business',
                    inventory: 'http://localhost:5000/inventory',
                    reviews: 'http://localhost:5000/reviews',
                    old: 'http://localhost:5000/old',
                    promote: 'http://localhost:5000/promote'
                };

                const responses = await Promise.all(
                    Object.entries(urls).map(async ([key, url]) => {
                        const res = await fetch(url);
                        const data = await res.json();
                        return [key, data.length];
                    })
                );

                const updatedCounts = Object.fromEntries(responses);
                setCounts(updatedCounts);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };

        fetchData();
    }, []);

    const cards = [
        { label: 'Users', value: counts.users },
        { label: 'Businesses', value: counts.business },
        { label: 'Inventory Items', value: counts.inventory },
        { label: 'Reviews', value: counts.reviews },
        { label: 'Second-hand Items', value: counts.old },
        { label: 'Promoted Items', value: counts.promote },
    ];

    const chartData = [
        { name: 'Inventory', count: counts.inventory },
        { name: 'Old Items', count: counts.old },
        { name: 'Promoted', count: counts.promote },
    ];

    return (
        <div className="min-h-screen bg-[#0D0D2B] text-white p-6 font-sans">
            <h2 className="text-4xl font-bold mb-10 text-center text-[#FE5F75] tracking-wide">Admin Dashboard</h2>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                {cards.map((card, idx) => (
                    <div
                        key={idx}
                        className="bg-gradient-to-br from-[#FE5F75] to-pink-500 text-white rounded-2xl shadow-lg p-6 hover:scale-105 transform transition duration-300"
                    >
                        <h3 className="text-lg font-medium opacity-90">{card.label}</h3>
                        <p className="text-4xl font-extrabold mt-2">{card.value}</p>
                    </div>
                ))}
            </div>

            {/* Chart */}
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-semibold mb-4 text-center text-[#FE5F75]">Item Comparison</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff30" />
                        <XAxis dataKey="name" stroke="#ffffff" />
                        <YAxis stroke="#ffffff" />
                        <Tooltip contentStyle={{ backgroundColor: '#1c1c3b', color: '#fff', borderRadius: '10px' }} />
                        <Legend />
                        <Bar dataKey="count" fill="#FE5F75" radius={[10, 10, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AdminDashboard;
