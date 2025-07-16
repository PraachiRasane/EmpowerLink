import React, { useState, useEffect } from "react";
import { storiesAPI } from "../services/api";

export default function Stories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [likedStories, setLikedStories] = useState({});

  useEffect(() => {
    loadStories();
  }, [selectedCity]);

  const loadStories = async () => {
    try {
      setLoading(true);
      const data = await storiesAPI.getAll(selectedCity);
      setStories(data);
    } catch (err) {
      setError("Failed to load stories");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async (storyId) => {
    try {
      await storiesAPI.like(storyId);
      
      // Update local state
      setStories(prev => 
        prev.map(story => 
          story.id === storyId 
            ? { ...story, likes: story.likes + 1 }
            : story
        )
      );
      
      setLikedStories(prev => ({ ...prev, [storyId]: !prev[storyId] }));
    } catch (err) {
      console.error('Failed to like story:', err);
    }
  };

  const filteredStories = stories;

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold text-indigo-700">Beneficiary Stories</h1>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading stories...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold text-indigo-700">Beneficiary Stories</h1>
        <div className="flex items-center justify-center h-64">
          <div className="text-center text-red-600">
            <p>{error}</p>
            <button 
              onClick={loadStories}
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
      <h1 className="text-3xl font-bold text-indigo-700">
        Beneficiary Stories
      </h1>

      <div className="w-60">
        <label className="block text-sm font-medium">Filter by City</label>
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

      {/* Stories */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStories.map((story) => (
          <div
            key={story.id}
            className="bg-white p-5 rounded-lg shadow hover:shadow-md border border-gray-100"
          >
            <h2 className="text-lg font-bold text-indigo-800">{story.title}</h2>
            <p className="text-sm text-gray-500 mb-2">
              <strong>{story.beneficiary_name}</strong> – {story.city}
            </p>
            <p className="text-gray-700 text-sm">{story.summary}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm text-gray-500">❤️ {story.likes} likes</span>
              <button
                onClick={() => toggleLike(story.id)}
                className={`text-sm px-3 py-1 rounded ${
                  likedStories[story.id] 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {likedStories[story.id] ? 'Liked' : 'Like'}
              </button>
            </div>
          </div>
        ))}
        {filteredStories.length === 0 && (
          <div className="col-span-full text-gray-500 text-center">
            No stories found for selected city.
          </div>
        )}
      </div>
    </div>
  );
}
