import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../../Providers/AuthProviders';

const Inventory = () => {
    const { user } = useContext(AuthContext);
    const [business, setBusiness] = useState(null);
    const [formData, setFormData] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [inventory, setInventory] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [editProductData, setEditProductData] = useState({});

    // Fetch business profile
    useEffect(() => {
        axios.get('http://localhost:5000/business').then(res => {
            const biz = res.data.find(b => b.email === user?.email);
            setBusiness(biz);
            setFormData(biz);
        });
    }, [user]);

    // Fetch inventory
    useEffect(() => {
        axios
            .get(`http://localhost:5000/inventory?email=${user?.email}`)
            .then(res => setInventory(res.data));
    }, [user, refresh]);

    // Handle business profile form changes
    const handleProfileChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Update business profile
    const handleProfileUpdate = async e => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/business/${user.email}`, formData);
            setBusiness(formData);
            setEditMode(false);
        } catch (error) {
            console.error('Failed to update profile:', error);
        }
    };

    // Add new inventory item
    const handleAddProduct = async e => {
        e.preventDefault();
        const form = e.target;
        const newProduct = {
            email: user.email,
            productName: form.productName.value,
            productType: form.productType.value,
            description: form.description.value,
            image: form.image.value,
            price: parseFloat(form.price.value),
            quantity: parseInt(form.quantity.value),
            tag: 'business'
        };

        try {
            await axios.post('http://localhost:5000/inventory', newProduct);
            form.reset();
            setRefresh(!refresh);
        } catch (err) {
            console.error(err);
        }
    };

    // Edit form field handler
    const handleEditChange = e => {
        const { name, value } = e.target;
        setEditProductData(prev => ({ ...prev, [name]: value }));
    };

    // Update existing inventory item
    const handleUpdateProduct = async e => {
        e.preventDefault();
        try {
            editProductData.quantity = parseInt(editProductData.quantity);
            editProductData.price = parseFloat(editProductData.price);

            await axios.put(`http://localhost:5000/inventory/${editingItem._id}`, editProductData);
            setEditingItem(null);
            setRefresh(!refresh);
        } catch (err) {
            console.error('Failed to update product:', err);
        }
    };

    // Delete inventory item
    const handleDelete = async id => {
        await axios.delete(`http://localhost:5000/inventory/${id}`);
        setRefresh(!refresh);
    };

    return (
        <div className="p-6">
            {/* Business Profile Display */}
            {business && (
                <div className="mb-8 border p-4 rounded-lg shadow">
                    <div className="flex items-center gap-4">
                        <img src={business.logoUrl} alt="Logo" className="w-20 h-20 rounded-full" />
                        <div>
                            <h2 className="text-xl font-bold">{business.businessName}</h2>
                            <p>Owner: {business.ownerName}</p>
                            <p>Type: {business.businessType}</p>
                            <p>Started: {new Date(business.startYear).toDateString()}</p>
                            <p>Email: {business.email}</p>
                            <p>{business.description}</p>
                            <button
                                onClick={() => setEditMode(true)}
                                className="mt-2 px-4 py-1 bg-blue-500 text-white rounded"
                            >
                                Update Profile
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Update Profile Form */}
            {editMode && (
                <form onSubmit={handleProfileUpdate} className="mb-6 border p-4 rounded-lg shadow space-y-4">
                    <h3 className="text-lg font-semibold">Edit Business Profile</h3>
                    <input
                        name="businessName"
                        value={formData.businessName || ''}
                        onChange={handleProfileChange}
                        className="w-full p-2 border rounded"
                        placeholder="Business Name"
                        required
                    />
                    <input
                        name="ownerName"
                        value={formData.ownerName || ''}
                        onChange={handleProfileChange}
                        className="w-full p-2 border rounded"
                        placeholder="Owner Name"
                        required
                    />
                    <input
                        name="businessType"
                        value={formData.businessType || ''}
                        onChange={handleProfileChange}
                        className="w-full p-2 border rounded"
                        placeholder="Business Type"
                        required
                    />
                    <input
                        type="date"
                        name="startYear"
                        value={formData.startYear?.substring(0, 10) || ''}
                        onChange={handleProfileChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        name="logoUrl"
                        value={formData.logoUrl || ''}
                        onChange={handleProfileChange}
                        className="w-full p-2 border rounded"
                        placeholder="Logo URL"
                        required
                    />
                    <textarea
                        name="description"
                        value={formData.description || ''}
                        onChange={handleProfileChange}
                        className="w-full p-2 border rounded"
                        placeholder="Description"
                        required
                    />
                    <div className="flex gap-4">
                        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                            Save Changes
                        </button>
                        <button
                            type="button"
                            onClick={() => setEditMode(false)}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            {/* Add Inventory Form */}
            <form onSubmit={handleAddProduct} className="space-y-4 border p-4 rounded shadow mb-6">
                <h3 className="text-lg font-semibold">Add Inventory Item</h3>
                <input name="productName" placeholder="Product Name" required className="w-full p-2 border rounded" />
                <input name="productType" placeholder="Product Type" required className="w-full p-2 border rounded" />
                <textarea name="description" placeholder="Description" required className="w-full p-2 border rounded"></textarea>
                <input name="image" placeholder="Image URL" required className="w-full p-2 border rounded" />
                <input type="number" name="price" placeholder="Price" required className="w-full p-2 border rounded" />
                <input type="number" name="quantity" placeholder="Quantity" required className="w-full p-2 border rounded" />
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Add Product</button>
            </form>

            {/* Update Inventory Form */}
            {editingItem && (
                <form onSubmit={handleUpdateProduct} className="space-y-4 border p-4 rounded shadow mb-6">
                    <h3 className="text-lg font-semibold">Update Product</h3>
                    <input name="productName" value={editProductData.productName || ''} onChange={handleEditChange} className="w-full p-2 border rounded" />
                    <input name="productType" value={editProductData.productType || ''} onChange={handleEditChange} className="w-full p-2 border rounded" />
                    <textarea name="description" value={editProductData.description || ''} onChange={handleEditChange} className="w-full p-2 border rounded" />
                    <input name="image" value={editProductData.image || ''} onChange={handleEditChange} className="w-full p-2 border rounded" />
                    <input type="number" name="price" value={editProductData.price || ''} onChange={handleEditChange} className="w-full p-2 border rounded" />
                    <input type="number" name="quantity" value={editProductData.quantity || ''} onChange={handleEditChange} className="w-full p-2 border rounded" />
                    <div className="flex gap-4">
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save Update</button>
                        <button type="button" onClick={() => setEditingItem(null)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                    </div>
                </form>
            )}

            {/* Inventory Table */}
            <h3 className="text-lg font-semibold mb-2">Your Inventory</h3>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border p-2">Image</th>
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Type</th>
                            <th className="border p-2">Description</th>
                            <th className="border p-2">Price</th>
                            <th className="border p-2">Quantity</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventory.map(item => (
                            <tr key={item._id}>
                                <td className="border p-2"><img src={item.image} className="w-16 h-16" alt="" /></td>
                                <td className="border p-2">{item.productName}</td>
                                <td className="border p-2">{item.productType}</td>
                                <td className="border p-2">{item.description}</td>
                                <td className="border p-2">${item.price}</td>
                                <td className="border p-2">{item.quantity}</td>
                                <td className="border p-2">
                                    <button
                                        onClick={() => {
                                            setEditingItem(item);
                                            setEditProductData(item);
                                        }}
                                        className="text-blue-500 mr-2"
                                    >
                                        Update
                                    </button>
                                    <button onClick={() => handleDelete(item._id)} className="text-red-500">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Inventory;
