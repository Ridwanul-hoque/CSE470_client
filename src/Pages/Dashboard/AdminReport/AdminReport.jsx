import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminReport = () => {
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    try {
      const res = await axios.get('http://localhost:5000/reports'); // Update with your actual GET route
      setReports(res.data);
    } catch (err) {
      console.error('Failed to fetch reports:', err);
    }
  };

  const handleResolve = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/report/${id}`, {
        status: 'resolved',
      });
      fetchReports(); // Refresh the report list
    } catch (err) {
      console.error('Failed to update report:', err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Report Management</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Type</th>
              <th className="border px-4 py-2">Detail</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report._id}>
                <td className="border px-4 py-2">{report.name}</td>
                <td className="border px-4 py-2">{report.email}</td>
                <td className="border px-4 py-2 capitalize">{report.reportType}</td>
                <td className="border px-4 py-2 capitalize">{report.detailType}</td>
                <td className="border px-4 py-2">{report.description}</td>
                <td className="border px-4 py-2">
                  {report.image ? (
                    <img src={report.image} alt="issue" className="w-16 h-16 object-cover" />
                  ) : (
                    'No Image'
                  )}
                </td>
                <td className="border px-4 py-2 capitalize">{report.status}</td>
                <td className="border px-4 py-2">
                  {report.status === 'unresolved' ? (
                    <button
                      onClick={() => handleResolve(report._id)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Resolve
                    </button>
                  ) : (
                    <span className="text-gray-500">Resolved</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReport;
