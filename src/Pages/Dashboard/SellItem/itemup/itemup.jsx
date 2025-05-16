import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../../Providers/AuthProviders';

const ItemUpload = () => {
    const { user } = useContext(AuthContext);
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [price, setPrice] = useState('');
    const [imageFile, setImageFile] = useState(null);

    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!imageFile) return alert("Please select an image.");

        const formData = new FormData();
        formData.append('image', imageFile);

        try {
            const imgResponse = await axios.post(image_hosting_api, formData);
            const imageUrl = imgResponse.data.data.url;

            const itemData = {
                productName,
                description,
                address,
                phone,
                useremail: user.email,
                price: parseFloat(price),
                image: imageUrl,
                tag: 'used'
            };

            const res = await axios.post('http://localhost:5000/old', itemData);
            if (res.data.insertedId) {
                alert('Item uploaded successfully!');
                setProductName('');
                setDescription('');
                setAddress('');
                setPhone('');
                setPrice('');
                setImageFile(null);
            }
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Failed to upload item.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#fbeaec] to-[#fff2f3] flex items-center justify-center px-4">
            <div className="w-full max-w-xl bg-white shadow-2xl rounded-3xl p-8">
                <h2 className="text-3xl font-extrabold text-center text-[#FE5F75] mb-6">Upload Used Item</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Product Name</label>
                        <input
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FE5F75]"
                            placeholder="Enter product name"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Description</label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FE5F75]"
                            placeholder="Enter description"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Address</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FE5F75]"
                            placeholder="Enter your address"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Phone</label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FE5F75]"
                            placeholder="Enter your phone number"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Price</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FE5F75]"
                            placeholder="Enter price"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Upload Image</label>
                        <input
                            type="file"
                            onChange={(e) => setImageFile(e.target.files[0])}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#FE5F75] file:text-white hover:file:bg-[#e04c5f]"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-[#FE5F75] text-white text-lg font-semibold rounded-xl shadow-md hover:bg-[#e04c5f] transition duration-300"
                    >
                        Submit Item
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ItemUpload;
