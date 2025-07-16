import React, { useState, useEffect } from "react";
import { exportToExcel } from "../utils/PageToExcel";
import { followUpsAPI } from "../services/api";

export default function FollowUps() {
  const [followUps, setFollowUps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  useEffect(() => {
    loadFollowUps();
  }, [selectedCity, selectedStatus]);

  const loadFollowUps = async () => {
    try {
      setLoading(true);
      const data = await followUpsAPI.getAll(selectedCity, selectedStatus);
      setFollowUps(data);
    } catch (err) {
      setError("Failed to load follow-ups");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = followUps;

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold text-indigo-700">🔁 Follow-Ups</h1>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading follow-ups...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold text-indigo-700">🔁 Follow-Ups</h1>
        <div className="flex items-center justify-center h-64">
          <div className="text-center text-red-600">
            <p>{error}</p>
            <button 
              onClick={loadFollowUps}
              className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-indigo-700">🔁 Follow-Ups</h1>
      <button
        onClick={() => exportToExcel(filtered, "Follow-Ups")}
        className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
      >
        📥
      </button>

      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        <div>
          <label className="block text-sm font-medium">City</label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option>All</option>
            <option>Ahmedabad</option>
            <option>Surat</option>
            <option>Jaipur</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Status</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option>All</option>
            <option>Completed</option>
            <option>Pending</option>
            <option>Missed</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-indigo-100 text-indigo-700">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">Venture</th>
              <th className="px-4 py-3">Last Follow-Up</th>
              <th className="px-4 py-3">Next Follow-Up</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((f) => (
              <tr key={f.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 font-medium">{f.beneficiary_name}</td>
                <td className="px-4 py-2">{f.city}</td>
                <td className="px-4 py-2">{f.venture}</td>
                <td className="px-4 py-2">{new Date(f.last_follow_up).toLocaleDateString()}</td>
                <td className="px-4 py-2">{new Date(f.next_follow_up).toLocaleDateString()}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-bold ${
                      f.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : f.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {f.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-gray-600">{f.remarks}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center text-gray-500 py-6">
                  No follow-up records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
