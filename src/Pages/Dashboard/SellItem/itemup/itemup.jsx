import React, { useState } from 'react';
import axios from 'axios';

const ItemUpload = () => {
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
            // Step 1: Upload image to ImgBB
            const imgResponse = await axios.post(image_hosting_api, formData);
            const imageUrl = imgResponse.data.data.url;

            // Step 2: Send product info to backend
            const itemData = {
                productName,
                description,
                address,
                phone,
                price: parseFloat(price),
                image: imageUrl,
                tag: 'used' 
            };

            const res = await axios.post('http://localhost:5000/old', itemData);
            if (res.data.insertedId) {
                alert('Item uploaded successfully!');
                // Clear form
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
        <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center text-[#FE5F75]">Upload Item</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Product Name</label>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#FE5F75] focus:border-[#FE5F75]"
                        placeholder="Enter product name"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#FE5F75] focus:border-[#FE5F75]"
                        placeholder="Enter description"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#FE5F75] focus:border-[#FE5F75]"
                        placeholder="Enter Your Address"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#FE5F75] focus:border-[#FE5F75]"
                        placeholder="Enter Your Phone Number "
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#FE5F75] focus:border-[#FE5F75]"
                        placeholder="Enter price"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                    <input
                        type="file"
                        onChange={(e) => setImageFile(e.target.files[0])}
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#FE5F75] file:text-white hover:file:bg-[#e04c5f]"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-[#FE5F75] text-white py-2 px-4 rounded-md hover:bg-[#e04c5f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FE5F75]"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ItemUpload;
