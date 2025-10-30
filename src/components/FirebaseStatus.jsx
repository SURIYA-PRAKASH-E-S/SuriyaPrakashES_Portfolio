// components/FirebaseStatus.jsx
import React from 'react';
import { useFirebase } from '../contexts/FirebaseContext';

const FirebaseStatus = () => {
  const { error, dbConnected, retryConnection, loading } = useFirebase();

  if (loading) {
    return (
      <div className="fixed top-4 right-4 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-2 rounded z-50">
        🔄 Connecting to database...
      </div>
    );
  }

  if (error && !dbConnected) {
    return (
      <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded z-50 max-w-md">
        <div className="flex items-center justify-between">
          <div>
            <strong>Database Error:</strong>
            <div className="text-sm mt-1">{error}</div>
          </div>
          <button
            onClick={retryConnection}
            className="ml-4 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (dbConnected) {
    return (
      <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded z-50">
        ✅ Connected to database
      </div>
    );
  }

  return null;
};

export default FirebaseStatus;