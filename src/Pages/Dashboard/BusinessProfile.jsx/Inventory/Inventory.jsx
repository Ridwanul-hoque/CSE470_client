import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../../Providers/AuthProviders';
import Swal from 'sweetalert2';

const Inventory = () => {
    const { user } = useContext(AuthContext);
    const [business, setBusiness] = useState(null);
    const [formData, setFormData] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [inventory, setInventory] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [editProductData, setEditProductData] = useState({});
    const [promotedIds, setPromotedIds] = useState([]);
    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    useEffect(() => {
        axios.get('http://localhost:5000/business').then(res => {
            const biz = res.data.find(b => b.email === user?.email);
            setBusiness(biz);
            setFormData(biz);
        });
    }, [user]);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/inventory?email=${user?.email}`)
            .then(res => setInventory(res.data));
    }, [user, refresh]);

    useEffect(() => {
        axios.get(`http://localhost:5000/promote?email=${user?.email}`)
            .then(res => {
                const ids = res.data.map(item => item.originalProductId);
                setPromotedIds(ids);
            });
    }, [user, refresh]);

    const handleProfileChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleProfileUpdate = async e => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/business/${user.email}`, formData);
            setBusiness(formData);
            setEditMode(false);
            Swal.fire('Success', 'Business profile updated', 'success');
        } catch (error) {
            Swal.fire('Error', 'Failed to update profile', 'error');
        }
    };

    const handleAddProduct = async e => {
        e.preventDefault();
        const form = e.target;
        const imageFile = form.image.files[0];

        const imageData = new FormData();
        imageData.append('image', imageFile);

        try {
            const imgbbRes = await axios.post(image_hosting_api, imageData);
            const imageUrl = imgbbRes.data.data.display_url;

            const newProduct = {
                email: user.email,
                productName: form.productName.value,
                productType: form.productType.value,
                description: form.description.value,
                image: imageUrl,
                price: parseFloat(form.price.value),
                quantity: parseInt(form.quantity.value),
                tag: 'business'
            };

            await axios.post('http://localhost:5000/inventory', newProduct);
            form.reset();
            setRefresh(!refresh);
            Swal.fire('Added!', 'Product has been added.', 'success');
        } catch (err) {
            Swal.fire('Error', 'Error adding product', 'error');
        }
    };

    const handleEditChange = e => {
        const { name, value } = e.target;
        setEditProductData(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdateProduct = async e => {
        e.preventDefault();
        try {
            editProductData.quantity = parseInt(editProductData.quantity);
            editProductData.price = parseFloat(editProductData.price);

            await axios.put(`http://localhost:5000/inventory/${editingItem._id}`, editProductData);
            setEditingItem(null);
            setRefresh(!refresh);
            Swal.fire('Updated!', 'Product has been updated.', 'success');
        } catch (err) {
            Swal.fire('Error', 'Failed to update product', 'error');
        }
    };

    const handleDelete = async id => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this product!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#FE5F75',
            cancelButtonColor: '#0D0D2B',
            confirmButtonText: 'Yes, delete it!'
        });

        if (confirm.isConfirmed) {
            await axios.delete(`http://localhost:5000/inventory/${id}`);
            setRefresh(!refresh);
            Swal.fire('Deleted!', 'Product has been removed.', 'success');
        }
    };

    const handlePromoteToggle = async item => {
        try {
            if (promotedIds.includes(item._id)) {
                await axios.delete(`http://localhost:5000/promote/${item._id}`);
                Swal.fire('Unpromoted', 'Product has been unpromoted.', 'info');
            } else {
                await axios.post('http://localhost:5000/promote', item);
                Swal.fire('Promoted!', 'Product has been promoted.', 'success');
            }
            setRefresh(!refresh);
        } catch (err) {
            Swal.fire('Error', 'Promote toggle failed', 'error');
        }
    };

    return (
        <div className="p-6 text-white min-h-screen space-y-8 bg-gradient-to-br from-[#0D0D2B] to-[#FE5F75] ">
            {business && (
                <div className="mb-8 border p-6 rounded-2xl shadow-xl bg-[#1A1A3C] backdrop-blur-md bg-opacity-70 max-w-7xl mx-auto">
                    <div className="flex items-center gap-6">
                        <img src={business.logoUrl} alt="Logo" className="w-20 h-20 rounded-full border-4 border-[#FE5F75] shadow" />
                        <div>
                            <h2 className="text-2xl font-bold text-[#FE5F75]">{business.businessName}</h2>
                            <p>Owner: {business.ownerName}</p>
                            <p>Type: {business.businessType}</p>
                            <p>Started: {new Date(business.startYear).toDateString()}</p>
                            <p>Email: {business.email}</p>
                            <p>{business.description}</p>
                            <button
                                onClick={() => setEditMode(true)}
                                className="mt-2 px-4 py-1 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded shadow hover:brightness-110"
                            >
                                Update Profile
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {editMode && (
                <form onSubmit={handleProfileUpdate} className="mb-6 border p-6 rounded-2xl shadow-xl space-y-4 bg-[#1A1A3C] bg-opacity-80 backdrop-blur-md">
                    <h3 className="text-lg font-semibold text-[#FE5F75]">Edit Business Profile</h3>
                    <input name="businessName" value={formData.businessName || ''} onChange={handleProfileChange} className="w-full p-2 border rounded-lg bg-[#0D0D2B] text-white" placeholder="Business Name" required />
                    <input name="ownerName" value={formData.ownerName || ''} onChange={handleProfileChange} className="w-full p-2 border rounded-lg bg-[#0D0D2B] text-white" placeholder="Owner Name" required />
                    <input name="businessType" value={formData.businessType || ''} onChange={handleProfileChange} className="w-full p-2 border rounded-lg bg-[#0D0D2B] text-white" placeholder="Business Type" required />
                    <input type="date" name="startYear" value={formData.startYear?.substring(0, 10) || ''} onChange={handleProfileChange} className="w-full p-2 border rounded-lg bg-[#0D0D2B] text-white" required />
                    <input name="logoUrl" value={formData.logoUrl || ''} onChange={handleProfileChange} className="w-full p-2 border rounded-lg bg-[#0D0D2B] text-white" placeholder="Logo URL" required />
                    <textarea name="description" value={formData.description || ''} onChange={handleProfileChange} className="w-full p-2 border rounded-lg bg-[#0D0D2B] text-white" placeholder="Description" required />
                    <div className="flex gap-4">
                        <button type="submit" className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-2 rounded-lg">Save Changes</button>
                        <button type="button" onClick={() => setEditMode(false)} className="bg-gray-600 text-white px-4 py-2 rounded-lg">Cancel</button>
                    </div>
                </form>
            )}

            <form onSubmit={handleAddProduct} className="space-y-4 border p-6 rounded-2xl shadow-xl mb-6 bg-[#1A1A3C] bg-opacity-80 backdrop-blur-md">
                <h3 className="text-lg font-semibold text-[#FE5F75]">Add Inventory Item</h3>
                <input name="productName" placeholder="Product Name" required className="w-full p-2 border rounded-lg bg-[#0D0D2B] text-white" />
                <input name="productType" placeholder="Product Type" required className="w-full p-2 border rounded-lg bg-[#0D0D2B] text-white" />
                <textarea name="description" placeholder="Description" required className="w-full p-2 border rounded-lg bg-[#0D0D2B] text-white"></textarea>
                <input type="file" name="image" accept="image/*" required className="w-full p-2 border rounded-lg bg-[#0D0D2B] text-white" />
                <input type="number" name="price" placeholder="Price" required className="w-full p-2 border rounded-lg bg-[#0D0D2B] text-white" />
                <input type="number" name="quantity" placeholder="Quantity" required className="w-full p-2 border rounded-lg bg-[#0D0D2B] text-white" />
                <button type="submit" className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-2 rounded-lg">Add Product</button>
            </form>

            {editingItem && (
                <form onSubmit={handleUpdateProduct} className="space-y-4 border p-6 rounded-2xl shadow-xl mb-6 bg-[#1A1A3C] bg-opacity-80 backdrop-blur-md">
                    <h3 className="text-lg font-semibold text-[#FE5F75]">Update Product</h3>
                    <input name="productName" value={editProductData.productName || ''} onChange={handleEditChange} className="w-full p-2 border rounded-lg bg-[#0D0D2B] text-white" />
                    <input name="productType" value={editProductData.productType || ''} onChange={handleEditChange} className="w-full p-2 border rounded-lg bg-[#0D0D2B] text-white" />
                    <textarea name="description" value={editProductData.description || ''} onChange={handleEditChange} className="w-full p-2 border rounded-lg bg-[#0D0D2B] text-white" />
                    <input name="image" value={editProductData.image || ''} onChange={handleEditChange} className="w-full p-2 border rounded-lg bg-[#0D0D2B] text-white" />
                    <input type="number" name="price" value={editProductData.price || ''} onChange={handleEditChange} className="w-full p-2 border rounded-lg bg-[#0D0D2B] text-white" />
                    <input type="number" name="quantity" value={editProductData.quantity || ''} onChange={handleEditChange} className="w-full p-2 border rounded-lg bg-[#0D0D2B] text-white" />
                    <div className="flex gap-4">
                        <button type="submit" className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-2 rounded-lg">Save Update</button>
                        <button type="button" onClick={() => setEditingItem(null)} className="bg-gray-600 text-white px-4 py-2 rounded-lg">Cancel</button>
                    </div>
                </form>
            )}

            <h3 className="text-lg font-semibold mb-2 text-[#FE5F75]">Your Inventory</h3>
            <div className="overflow-x-auto rounded-2xl shadow-xl">
                <table className="w-full border-collapse border text-white bg-[#0D0D2B]">
                    <thead className="bg-[#1A1A3C] text-[#FE5F75]">
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
                            <tr key={item._id} className="hover:bg-[#1A1A3C] transition-all">
                                <td className="border p-2"><img src={item.image} className="w-16 h-16 rounded-lg" alt="" /></td>
                                <td className="border p-2">{item.productName}</td>
                                <td className="border p-2">{item.productType}</td>
                                <td className="border p-2">{item.description}</td>
                                <td className="border p-2">${item.price}</td>
                                <td className="border p-2">{item.quantity}</td>
                                <td className="border p-2 space-y-1 flex flex-col items-start">
                                    <button onClick={() => { setEditingItem(item); setEditProductData(item); }} className="text-blue-400 hover:underline">Update</button>
                                    <button onClick={() => handleDelete(item._id)} className="text-red-400 hover:underline">Delete</button>
                                    <button
                                        onClick={() => handlePromoteToggle(item)}
                                        className={`px-3 py-1 rounded text-sm font-medium transition-all ${promotedIds.includes(item._id)
                                            ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white'
                                            : 'bg-gray-600 text-white hover:bg-gray-500'}`}
                                    >
                                        {promotedIds.includes(item._id) ? 'Unpromote' : 'Promote'}
                                    </button>
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
