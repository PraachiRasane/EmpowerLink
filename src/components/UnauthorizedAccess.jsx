import React from "react";
import { Link } from "react-router-dom";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const UnauthorizedAccess = ({ userRole, allowedRoles }) => {
    const getRedirectPath = () => {
        if (userRole === "beneficiary") {
            return "/chat";
        }
        return "/dashboard";
    };

    const getRedirectText = () => {
        if (userRole === "beneficiary") {
            return "Chat";
        }
        return "Dashboard";
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                    <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
                </div>
                
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Access Denied
                </h3>
                
                <p className="text-sm text-gray-500 mb-6">
                    You don't have permission to access this page. 
                    {userRole === "beneficiary" 
                        ? " As a student, you can only access the chat functionality." 
                        : " Please contact your administrator for access."
                    }
                </p>
                
                <div className="space-y-3">
                    <Link
                        to={getRedirectPath()}
                        className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Go to {getRedirectText()}
                    </Link>
                    
                    <button
                        onClick={() => window.history.back()}
                        className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UnauthorizedAccess; 