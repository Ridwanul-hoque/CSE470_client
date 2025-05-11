import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Providers/AuthProviders';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Report = () => {
  const { user } = useContext(AuthContext);
  const [reportType, setReportType] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [productType, setProductType] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageURL = '';

    if (imageFile) {
      const formData = new FormData();
      formData.append('image', imageFile);

      try {
        const imgRes = await fetch(image_hosting_api, {
          method: 'POST',
          body: formData,
        });
        const imgData = await imgRes.json();
        if (imgData.success) {
          imageURL = imgData.data.display_url;
        } else {
          toast.error('❌ Image upload failed.', { position: 'top-center' });
          return;
        }
      } catch {
        toast.error('❌ Error uploading image.', { position: 'top-center' });
        return;
      }
    }

    const reportData = {
      name: user.displayName,
      email: user.email,
      reportType,
      detailType: reportType === 'payment' ? paymentMethod : productType,
      description,
      image: imageURL,
      status: 'unresolved',
    };

    try {
      const res = await fetch('http://localhost:5000/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reportData),
      });

      if (res.ok) {
        toast.success('✅ Report submitted successfully!', { position: 'top-center' });
        // Reset form
        setReportType('');
        setPaymentMethod('');
        setProductType('');
        setDescription('');
        setImageFile(null);
        e.target.reset();
      } else {
        throw new Error();
      }
    } catch {
      toast.error('❌ Failed to submit report. Please try again.', { position: 'top-center' });
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Submit a Report</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700 mb-1">Name</label>
          <input type="text" value={user.displayName} disabled className="w-full border p-2 rounded bg-gray-100" />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Email</label>
          <input type="email" value={user.email} disabled className="w-full border p-2 rounded bg-gray-100" />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Report Type</label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Select Type</option>
            <option value="product">Product Related</option>
            <option value="payment">Payment Related</option>
          </select>
        </div>

        {reportType === 'payment' && (
          <div>
            <label className="block font-medium text-gray-700 mb-1">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
              className="w-full border p-2 rounded"
            >
              <option value="">Select Method</option>
              <option value="online">Online</option>
              <option value="cod">Cash on Delivery</option>
            </select>
          </div>
        )}

        {reportType === 'product' && (
          <div>
            <label className="block font-medium text-gray-700 mb-1">Product Type</label>
            <select
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              required
              className="w-full border p-2 rounded"
            >
              <option value="">Select Product Type</option>
              <option value="old">Old Items</option>
              <option value="retail">Retail Items</option>
            </select>
          </div>
        )}

        <div>
          <label className="block font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full border p-2 rounded"
            rows="4"
            placeholder="Explain the issue in detail..."
          />
        </div>
        

        <div>
          <label className="block font-medium text-gray-700 mb-1">Attach Image (Attach The Related Items Image)*</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Submit Report
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Report;
