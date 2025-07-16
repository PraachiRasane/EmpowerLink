import React, { useState, useEffect } from "react";
import { exportToExcel } from "../utils/PageToExcel";
import { venturesAPI } from "../services/api";

export default function Ventures() {
  const [ventures, setVentures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  useEffect(() => {
    loadVentures();
  }, [selectedCity, selectedStatus]);

  const loadVentures = async () => {
    try {
      setLoading(true);
      const data = await venturesAPI.getAll(selectedCity, selectedStatus);
      setVentures(data);
    } catch (err) {
      setError("Failed to load ventures");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredVentures = ventures;

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold text-indigo-700">🧳 Ventures</h1>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading ventures...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold text-indigo-700">🧳 Ventures</h1>
        <div className="flex items-center justify-center h-64">
          <div className="text-center text-red-600">
            <p>{error}</p>
            <button 
              onClick={loadVentures}
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
      <h1 className="text-3xl font-bold text-indigo-700">🧳 Ventures</h1>
      <button
        onClick={() => exportToExcel(filteredVentures, "filteredVentures")}
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
            <option>Active</option>
            <option>Paused</option>
            <option>Closed</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-indigo-100 text-indigo-700">
            <tr>
              <th className="px-4 py-3">Venture Name</th>
              <th className="px-4 py-3">Beneficiary</th>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Income (₹)</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredVentures.map((venture) => (
              <tr key={venture.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 font-medium">{venture.name}</td>
                <td className="px-4 py-2">{venture.beneficiary_name}</td>
                <td className="px-4 py-2">{venture.city}</td>
                <td className="px-4 py-2">{venture.venture_type}</td>
                <td className="px-4 py-2">₹{venture.income}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-bold ${
                      venture.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : venture.status === "Paused"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {venture.status}
                  </span>
                </td>
              </tr>
            ))}

            {filteredVentures.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No ventures found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
