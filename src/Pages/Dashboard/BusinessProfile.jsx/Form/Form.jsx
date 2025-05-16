import React, { useContext, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../../Providers/AuthProviders';

const Form = () => {
    const { user } = useContext(AuthContext);
    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

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

    const handleImageUpload = async (e) => {
        const imageFile = e.target.files[0];
        const formDataImg = new FormData();
        formDataImg.append('image', imageFile);

        try {
            const res = await axios.post(image_hosting_api, formDataImg);
            const imageUrl = res.data.data.url;
            setFormData(prev => ({ ...prev, logoUrl: imageUrl }));
        } catch (error) {
            console.error('Image upload failed:', error);
        }
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
                Swal.fire({
                    title: 'Success!',
                    text: 'Application submitted successfully!',
                    icon: 'success',
                    confirmButtonColor: '#0D0D2B',
                    confirmButtonText: 'OK',
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-8 rounded-3xl shadow-2xl bg-gradient-to-br from-white via-slate-100 to-white space-y-6">
            <h2 className="text-3xl font-bold text-center text-[#0D0D2B] mb-4">Register Your Business</h2>

            <input
                name="ownerName"
                type="text"
                placeholder="Owner Name"
                onChange={handleChange}
                className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FE5F75]"
                required
            />

            <input
                name="businessName"
                type="text"
                placeholder="Business Name"
                onChange={handleChange}
                className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FE5F75]"
                required
            />

            <input
                name="businessType"
                type="text"
                placeholder="Business Type"
                onChange={handleChange}
                className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FE5F75]"
                required
            />

            <input
                name="startYear"
                type="date"
                placeholder="Business Start Year"
                onChange={handleChange}
                className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FE5F75]"
                required
            />

            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="file-input file-input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FE5F75]"
                required
            />

            <input
                name="logoUrl"
                type="text"
                value={formData.logoUrl}
                onChange={handleChange}
                className="hidden"
                required
            />

            <textarea
                name="description"
                placeholder="Business Description"
                onChange={handleChange}
                className="textarea textarea-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FE5F75]"
                required
            />

            <button
                type="submit"
                className="btn w-full bg-gradient-to-r from-[#FE5F75] to-[#FC9842] text-white font-semibold rounded-xl hover:opacity-90 transition"
            >
                Submit Application
            </button>
        </form>
    );
};

export default Form;
