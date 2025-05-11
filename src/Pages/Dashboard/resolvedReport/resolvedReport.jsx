import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Providers/AuthProviders';
import axios from 'axios';

const ResolvedReport = () => {
  const { user } = useContext(AuthContext);
  const [userReports, setUserReports] = useState([]);

  useEffect(() => {
    const fetchUserReports = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/reports?email=${user.email}`);
        setUserReports(res.data);
      } catch (err) {
        console.error('Failed to fetch reports:', err);
      }
    };

    if (user?.email) {
      fetchUserReports();
    }
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">My Reports</h2>

      {userReports.length === 0 ? (
        <p className="text-center text-gray-500">No reports found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userReports.map((report) => (
            <div
              key={report._id}
              className="bg-white shadow-md rounded-2xl border p-4 flex flex-col space-y-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold capitalize">{report.reportType} Report</h3>
                  <p className="text-sm text-gray-500 capitalize">{report.detailType}</p>
                </div>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    report.status === 'unresolved'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {report.status === 'unresolved' ? 'Pending Review' : 'Resolved'}
                </span>
              </div>

              <p className="text-sm text-gray-700">{report.description}</p>

              {report.image && (
                <img
                  src={report.image}
                  alt="Reported issue"
                  className="w-full h-40 object-cover rounded-lg"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResolvedReport;
