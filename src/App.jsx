// import Navbar from "./components/Navbar";
import { Routes, Route, Router, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Dashboard from "./pages/FacultyDashboard";
import FacultyVentures from "./pages/FacultyVentures";
import Sidebar from "./components/FacultySideBar";
import UnauthorizedAccess from "./components/UnauthorizedAccess";
import Stories from "./pages/Stories";
import Chat from "./pages/Chat";
import Beneficiaries from "./pages/Beneficiaries";
import FollowUps from "./pages/FollowUps";
import Explore from "./pages/Explore";
import FacultyChart from "./pages/FacultyChart";
import FacultyHome from "./pages/HomePage";
import StudentHome from "./pages/StudentHome";
import Login from "./pages/Login";
import { authAPI } from "./services/api";

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles, currentUser }) => {
    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }
    
    if (!allowedRoles.includes(currentUser.role)) {
        return <UnauthorizedAccess userRole={currentUser.role} allowedRoles={allowedRoles} />;
    }
    
    return children;
};

// Home Route Component - shows appropriate home page based on role
const HomeRoute = ({ currentUser }) => {
    if (currentUser?.role === "beneficiary") {
        return <StudentHome currentUser={currentUser} />;
    }
    return <FacultyHome currentUser={currentUser} />;
};

function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setIsAuthenticated(false);
            setLoading(false);
            return;
        }

        try {
            const user = await authAPI.getMe();
            setCurrentUser(user);
            setIsAuthenticated(true);
        } catch (err) {
            // Token is invalid, clear it
            authAPI.logout();
            setIsAuthenticated(false);
            setCurrentUser(null);
        } finally {
            setLoading(false);
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleLogout = () => {
        authAPI.logout();
        setIsAuthenticated(false);
        setCurrentUser(null);
    };

    const handleLogin = (user) => {
        setCurrentUser(user);
        setIsAuthenticated(true);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <Routes>
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        );
    }

    return (
        <>
            <div className="flex">
                {/* <Navbar /> */}
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} onLogout={handleLogout} currentUser={currentUser} />

                {/* Main content area shifts based on sidebar */}
                <div
                    className={`transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-20"
                        } w-full`}
                >
                    <Routes>
                        {/* Routes accessible by both faculty and beneficiaries */}
                        <Route 
                            path="/chat" 
                            element={
                                <ProtectedRoute allowedRoles={["faculty", "beneficiary"]} currentUser={currentUser}>
                                    <Chat currentUser={currentUser} />
                                </ProtectedRoute>
                            } 
                        />
                        
                        {/* Home route - shows appropriate page based on role */}
                        <Route 
                            path="/" 
                            element={
                                <ProtectedRoute allowedRoles={["faculty", "beneficiary"]} currentUser={currentUser}>
                                    <HomeRoute currentUser={currentUser} />
                                </ProtectedRoute>
                            } 
                        />
                        
                        {/* Faculty-only routes */}
                        <Route 
                            path="/dashboard" 
                            element={
                                <ProtectedRoute allowedRoles={["faculty"]} currentUser={currentUser}>
                                    <Dashboard />
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            path="/ventures" 
                            element={
                                <ProtectedRoute allowedRoles={["faculty"]} currentUser={currentUser}>
                                    <FacultyVentures />
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            path="/stories" 
                            element={
                                <ProtectedRoute allowedRoles={["faculty"]} currentUser={currentUser}>
                                    <Stories />
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            path="/beneficiaries" 
                            element={
                                <ProtectedRoute allowedRoles={["faculty"]} currentUser={currentUser}>
                                    <Beneficiaries />
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            path="/follow-ups" 
                            element={
                                <ProtectedRoute allowedRoles={["faculty"]} currentUser={currentUser}>
                                    <FollowUps />
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            path="/explore" 
                            element={
                                <ProtectedRoute allowedRoles={["faculty"]} currentUser={currentUser}>
                                    <Explore />
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            path="/visualize" 
                            element={
                                <ProtectedRoute allowedRoles={["faculty"]} currentUser={currentUser}>
                                    <FacultyChart />
                                </ProtectedRoute>
                            } 
                        />
                        
                        {/* Default redirect for students */}
                        <Route 
                            path="*" 
                            element={
                                currentUser?.role === "beneficiary" ? 
                                <Navigate to="/chat" replace /> : 
                                <Navigate to="/dashboard" replace />
                            } 
                        />
                    </Routes>
                </div>
            </div>
        </>
    );
}
export default App;
