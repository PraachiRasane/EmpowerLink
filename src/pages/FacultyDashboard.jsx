import React, { useState, useEffect } from "react";
import { exportToExcel } from "../utils/PageToExcel";
import { dashboardAPI } from "../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      setLoading(true);
      const data = await dashboardAPI.getStats();
      setStats(data);
    } catch (err) {
      setError("Failed to load dashboard data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-gradient-to-br from-indigo-50 to-white min-h-screen space-y-8">
        <h1 className="text-4xl font-bold text-indigo-800">Faculty Dashboard</h1>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gradient-to-br from-indigo-50 to-white min-h-screen space-y-8">
        <h1 className="text-4xl font-bold text-indigo-800">Faculty Dashboard</h1>
        <div className="flex items-center justify-center h-64">
          <div className="text-center text-red-600">
            <p>{error}</p>
            <button 
              onClick={loadDashboardStats}
              className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="p-6 bg-gradient-to-br from-indigo-50 to-white min-h-screen space-y-8">
        <h1 className="text-4xl font-bold text-indigo-800">Faculty Dashboard</h1>
        <div className="text-center text-gray-500">
          No dashboard data available.
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-50 to-white min-h-screen space-y-8">
      <h1 className="text-4xl font-bold text-indigo-800">Faculty Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Card title="Total Students" value={stats.total_students} />
        <Card title="Active Ventures" value={stats.total_active} />
        <Card title="Pending Follow-Ups" value={stats.total_follow_ups} />
      </div>

      {/* City-wise Table */}
      <div className="bg-white shadow-xl rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          City Overview
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border border-gray-200">
            <thead className="bg-indigo-100 text-indigo-700 uppercase tracking-wider">
              <tr>
                <th className="px-4 py-2">City</th>
                <th className="px-4 py-2">Students Trained</th>
                <th className="px-4 py-2">Active Ventures</th>
                <th className="px-4 py-2">Follow-Ups Pending</th>
              </tr>
            </thead>
            <tbody>
              {stats.city_data.map((city, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">{city.name}</td>
                  <td className="px-4 py-2">{city.students}</td>
                  <td className="px-4 py-2">{city.active}</td>
                  <td className="px-4 py-2 text-red-600 font-semibold">
                    {city.followUps}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <button
        onClick={() => exportToExcel(stats.city_data, "Faculty Dashboard")}
        className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
      >
        📥
      </button>
    </div>
  );
};

// Reusable Card Component
const Card = ({ title, value }) => (
  <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
    <h3 className="text-md text-gray-600">{title}</h3>
    <p className="text-3xl font-extrabold text-indigo-700 mt-2">{value}</p>
  </div>
);

export default Dashboard;
