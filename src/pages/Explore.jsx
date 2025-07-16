import React, { useEffect, useState } from "react";
import "./Explore.css";
import { communitiesAPI } from "../services/api";

export default function Explore() {
    const [availableCommunities, setAvailableCommunities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [notification, setNotification] = useState("");

    useEffect(() => {
        loadCommunities();
    }, []);

    useEffect(() => {
        if (notification) {
            const timeout = setTimeout(() => setNotification(""), 3000);
            return () => clearTimeout(timeout);
        }
    }, [notification]);

    const loadCommunities = async () => {
        try {
            setLoading(true);
            const communities = await communitiesAPI.getAll();
            setAvailableCommunities(communities);
        } catch (err) {
            setError("Failed to load communities");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const joinCommunity = async (communityId) => {
        try {
            await communitiesAPI.join(communityId);
            
            // Update local state
            setAvailableCommunities(prev => 
                prev.map(comm => 
                    comm.id === communityId 
                        ? { ...comm, is_joined: true, member_count: comm.member_count + 1 }
                        : comm
                )
            );
            
            const community = availableCommunities.find(c => c.id === communityId);
            setNotification(`Successfully joined ${community.name}!`);
        } catch (err) {
            setNotification("Failed to join community");
            console.error(err);
        }
    };

    const leaveCommunity = async (communityId) => {
        try {
            await communitiesAPI.leave(communityId);
            
            // Update local state
            setAvailableCommunities(prev => 
                prev.map(comm => 
                    comm.id === communityId 
                        ? { ...comm, is_joined: false, member_count: Math.max(0, comm.member_count - 1) }
                        : comm
                )
            );
            
            const community = availableCommunities.find(c => c.id === communityId);
            setNotification(`Successfully left ${community.name}`);
        } catch (err) {
            setNotification("Failed to leave community");
            console.error(err);
        }
    };

    if (loading) {
        return (
            <div className="explore-container">
                <div className="main-container">
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                            <p className="mt-2 text-gray-600">Loading communities...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="explore-container">
                <div className="main-container">
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center text-red-600">
                            <p>{error}</p>
                            <button 
                                onClick={loadCommunities}
                                className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                            >
                                Retry
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="explore-container">
            {/* Page Content */}
            <div className="main-container">
                <div className="communities-grid">
                    {availableCommunities.map((community) => {
                        const isJoined = community.is_joined;
                        return (
                            <div className="community-card" key={community.id}>
                                <div className="community-header">
                                    <div className="community-icon">{community.icon}</div>
                                    <div className="community-info">
                                        <h3>{community.name}</h3>
                                        <div className="member-count">
                                            {community.member_count.toLocaleString()} members
                                        </div>
                                    </div>
                                </div>
                                <div className="community-description">{community.description}</div>
                                <div className="community-tags">
                                    {community.tags.map((tag) => (
                                        <span key={tag} className="tag">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <button
                                    className={`join-btn ${isJoined ? "joined" : ""}`}
                                    onClick={() => isJoined ? leaveCommunity(community.id) : joinCommunity(community.id)}
                                >
                                    {isJoined ? "✓ Joined" : "Join Community"}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Notification */}
            {notification && (
                <div className="notification">
                    {notification}
                </div>
            )}
        </div>
    );
}