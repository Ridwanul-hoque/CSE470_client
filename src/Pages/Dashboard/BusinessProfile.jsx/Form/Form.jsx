import React, { useContext, useState } from 'react';

import axios from 'axios';
import { AuthContext } from '../../../../Providers/AuthProviders';

const Form = () => {
    const { user } = useContext(AuthContext)

    const [formData, setFormData] = useState({
        ownerName: '',
        businessName: '',
        businessType: '',
        startYear: '',
        logoUrl: '',
        description: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const submission = {
            ...formData,
            email: user.email,
            status: 'user',
        };

        try {
            const res = await axios.post('http://localhost:5000/business', submission);
            if (res.data.insertedId) {
                alert('Application submitted!');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 bg-white rounded shadow space-y-4">
            <input name="ownerName" type="text" placeholder="Owner Name" onChange={handleChange} className="input input-bordered w-full" required />
            <input name="businessName" type="text" placeholder="Business Name" onChange={handleChange} className="input input-bordered w-full" required />
            <input name="businessType" type="text" placeholder="Business Type" onChange={handleChange} className="input input-bordered w-full" required />
            <input name="startYear" type="date" placeholder="Business Start Year" onChange={handleChange} className="input input-bordered w-full" required />
            <input name="logoUrl" type="text" placeholder="Logo Image URL (imgbb)" onChange={handleChange} className="input input-bordered w-full" required />
            <textarea name="description" placeholder="Description" onChange={handleChange} className="textarea textarea-bordered w-full" required />
            <button type="submit" className="btn btn-primary w-full bg-[#0D0D2B] text-[#FE5F75]">Submit</button>
        </form>
    );
};

export default Form;
