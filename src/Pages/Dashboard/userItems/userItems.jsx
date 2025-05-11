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
                fetchUserItems(); // Refresh
            } catch (error) {
                console.error('Error deleting item:', error);
            }
        }
    };

    const handleUpdateClick = (item) => {
        setSelectedItem({ ...item }); // clone item to edit
        setShowModal(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedItem((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        const { _id, ...updatePayload } = selectedItem; // Remove _id

        try {
            await axios.put(`http://localhost:5000/old/${_id}`, updatePayload);
            setShowModal(false);
            fetchUserItems();
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };


    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">My Used Items</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-2 border">Image</th>
                            <th className="p-2 border">Product Name</th>
                            <th className="p-2 border">Price</th>
                            <th className="p-2 border">Phone</th>
                            <th className="p-2 border">Address</th>
                            <th className="p-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item._id}>
                                <td className="p-2 border">
                                    <img src={item.image} alt={item.productName} className="w-16 h-16 object-cover" />
                                </td>
                                <td className="p-2 border">{item.productName}</td>
                                <td className="p-2 border">{item.price} BDT</td>
                                <td className="p-2 border">{item.phone}</td>
                                <td className="p-2 border">{item.address}</td>
                                <td className="p-2 border">
                                    <button
                                        onClick={() => handleUpdateClick(item)}
                                        className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {items.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center p-4">
                                    No items found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Update Modal */}
            <Transition appear show={showModal} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setShowModal(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900 mb-4"
                                    >
                                        Update Item
                                    </Dialog.Title>
                                    <form onSubmit={handleUpdateSubmit} className="space-y-3">
                                        <input type="text" name="productName" value={selectedItem?.productName || ''} onChange={handleChange} placeholder="Product Name" className="w-full border p-2" required />
                                        <input type="number" name="price" value={selectedItem?.price || ''} onChange={handleChange} placeholder="Price" className="w-full border p-2" required />
                                        <textarea name="description" value={selectedItem?.description || ''} onChange={handleChange} placeholder="Description" className="w-full border p-2" required />
                                        <input type="text" name="phone" value={selectedItem?.phone || ''} onChange={handleChange} placeholder="Phone" className="w-full border p-2" required />
                                        <input type="text" name="address" value={selectedItem?.address || ''} onChange={handleChange} placeholder="Address" className="w-full border p-2" required />
                                        <input type="text" name="image" value={selectedItem?.image || ''} onChange={handleChange} placeholder="Image URL" className="w-full border p-2" required />
                                        <div className="mt-4 flex justify-end space-x-2">
                                            <button
                                                type="button"
                                                className="bg-gray-300 px-4 py-2 rounded"
                                                onClick={() => setShowModal(false)}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="bg-blue-600 text-white px-4 py-2 rounded"
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
