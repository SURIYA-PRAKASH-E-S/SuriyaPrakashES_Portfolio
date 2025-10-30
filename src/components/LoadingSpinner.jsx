import React from 'react';
import { useFirebase } from '../contexts/FirebaseContext';

const LoadingSpinner = () => {
  const { loading } = useFirebase();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 bg-opacity-80 dark:bg-opacity-80 z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400 font-medium">
          Loading Portfolio...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;