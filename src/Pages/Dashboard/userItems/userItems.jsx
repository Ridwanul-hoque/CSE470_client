import React, { useContext, useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../Providers/AuthProviders';
import { Dialog, Transition } from '@headlessui/react';

const UserItems = () => {
    const { user } = useContext(AuthContext);
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const fetchUserItems = async () => {
        try {
            const response = await axios.get('http://localhost:5000/old');
            const filtered = response.data.filter(item => item.useremail === user?.email);
            setItems(filtered);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    useEffect(() => {
        if (user?.email) {
            fetchUserItems();
        }
    }, [user]);

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this item?')) {
            try {
                await axios.delete(`http://localhost:5000/old/${id}`);
                fetchUserItems();
            } catch (error) {
                console.error('Error deleting item:', error);
            }
        }
    };

    const handleUpdateClick = (item) => {
        setSelectedItem({ ...item });
        setShowModal(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedItem((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        const { _id, ...updatePayload } = selectedItem;

        try {
            await axios.put(`http://localhost:5000/old/${_id}`, updatePayload);
            setShowModal(false);
            fetchUserItems();
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    return (
        <div className="p-6 bg-[#0D0D2B] min-h-screen text-white">
            <h2 className="text-3xl font-bold mb-6 text-center text-[#FE5F75]">My Used Items</h2>
            <div className="overflow-x-auto rounded-lg shadow-xl border border-[#FE5F75]">
                <table className="min-w-full table-auto bg-[#1C1C3A] text-sm rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-[#FE5F75] text-white uppercase tracking-wide text-xs">
                            <th className="p-3">Image</th>
                            <th className="p-3">Product</th>
                            <th className="p-3">Price</th>
                            <th className="p-3">Phone</th>
                            <th className="p-3">Address</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item._id} className="hover:bg-[#2E2E52] transition duration-200">
                                <td className="p-3 text-center">
                                    <img src={item.image} alt={item.productName} className="w-14 h-14 object-cover rounded-md border-2 border-[#FE5F75]" />
                                </td>
                                <td className="p-3">{item.productName}</td>
                                <td className="p-3">{item.price} BDT</td>
                                <td className="p-3">{item.phone}</td>
                                <td className="p-3">{item.address}</td>
                                <td className="p-3 space-x-2">
                                    <button
                                        onClick={() => handleUpdateClick(item)}
                                        className="px-3 py-1 bg-[#FE5F75] text-white rounded hover:scale-105 transition-transform"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="px-3 py-1 bg-red-600 text-white rounded hover:scale-105 transition-transform"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {items.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center p-5 text-gray-300">
                                    No items found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Update Modal */}
            <Transition appear show={showModal} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setShowModal(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-60" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-6 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-xl bg-[#1C1C3A] p-6 text-left shadow-xl transition-all text-white border border-[#FE5F75]">
                                    <Dialog.Title className="text-2xl font-semibold mb-4 text-[#FE5F75]">
                                        Update Item
                                    </Dialog.Title>
                                    <form onSubmit={handleUpdateSubmit} className="space-y-4">
                                        <input type="text" name="productName" value={selectedItem?.productName || ''} onChange={handleChange} placeholder="Product Name" className="w-full bg-[#0D0D2B] border border-[#FE5F75] text-white p-2 rounded" required />
                                        <input type="number" name="price" value={selectedItem?.price || ''} onChange={handleChange} placeholder="Price" className="w-full bg-[#0D0D2B] border border-[#FE5F75] text-white p-2 rounded" required />
                                        <textarea name="description" value={selectedItem?.description || ''} onChange={handleChange} placeholder="Description" className="w-full bg-[#0D0D2B] border border-[#FE5F75] text-white p-2 rounded" required />
                                        <input type="text" name="phone" value={selectedItem?.phone || ''} onChange={handleChange} placeholder="Phone" className="w-full bg-[#0D0D2B] border border-[#FE5F75] text-white p-2 rounded" required />
                                        <input type="text" name="address" value={selectedItem?.address || ''} onChange={handleChange} placeholder="Address" className="w-full bg-[#0D0D2B] border border-[#FE5F75] text-white p-2 rounded" required />
                                        <input type="text" name="image" value={selectedItem?.image || ''} onChange={handleChange} placeholder="Image URL" className="w-full bg-[#0D0D2B] border border-[#FE5F75] text-white p-2 rounded" required />
                                        <div className="mt-6 flex justify-end space-x-3">
                                            <button
                                                type="button"
                                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                                onClick={() => setShowModal(false)}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="px-4 py-2 bg-[#FE5F75] text-white rounded hover:scale-105 transition-transform"
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default UserItems;
