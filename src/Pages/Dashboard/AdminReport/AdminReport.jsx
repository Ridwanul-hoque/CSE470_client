import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminReport = () => {
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    try {
      const res = await axios.get('http://localhost:5000/reports');
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
      fetchReports();
    } catch (err) {
      console.error('Failed to update report:', err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="min-h-screen bg-[#0D0D2B] text-white p-6 font-sans">
      <h2 className="text-3xl font-bold text-center mb-6 text-[#FE5F75] tracking-wider">
        🛠️ Report Management
      </h2>

      <div className="overflow-x-auto rounded-xl shadow-lg bg-white/5 backdrop-blur-sm p-4 border border-[#FE5F75]/50">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-[#FE5F75] to-pink-500 text-white">
              <th className="p-3 text-left rounded-tl-xl">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Detail</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left rounded-tr-xl">Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr
                key={report._id}
                className={`transition hover:bg-white/10 ${
                  index % 2 === 0 ? 'bg-white/5' : 'bg-white/10'
                }`}
              >
                <td className="p-3">{report.name}</td>
                <td className="p-3">{report.email}</td>
                <td className="p-3 capitalize">{report.reportType}</td>
                <td className="p-3 capitalize">{report.detailType}</td>
                <td className="p-3">{report.description}</td>
                <td className="p-3">
                  {report.image ? (
                    <img
                      src={report.image}
                      alt="issue"
                      className="w-16 h-16 object-cover rounded border border-[#FE5F75]/70"
                    />
                  ) : (
                    <span className="italic text-gray-400">No Image</span>
                  )}
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      report.status === 'unresolved'
                        ? 'bg-yellow-500 text-black'
                        : 'bg-green-500 text-black'
                    }`}
                  >
                    {report.status}
                  </span>
                </td>
                <td className="p-3">
                  {report.status === 'unresolved' ? (
                    <button
                      onClick={() => handleResolve(report._id)}
                      className="bg-gradient-to-r from-[#FE5F75] to-pink-500 hover:scale-105 transition text-white px-4 py-1 rounded-full shadow"
                    >
                      Resolve
                    </button>
                  ) : (
                    <span className="text-gray-400 italic">Resolved</span>
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
