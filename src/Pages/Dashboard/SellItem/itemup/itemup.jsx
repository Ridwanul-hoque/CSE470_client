import React, { useState } from 'react';

const ItemUpload = () => {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log({ productName, price, image });
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center text-[#FE5F75]">Upload Item</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                        Product Name
                    </label>
                    <input
                        type="text"
                        id="productName"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#FE5F75] focus:border-[#FE5F75]"
                        placeholder="Enter product name"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        Price
                    </label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#FE5F75] focus:border-[#FE5F75]"
                        placeholder="Enter price"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                        Upload Image
                    </label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
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