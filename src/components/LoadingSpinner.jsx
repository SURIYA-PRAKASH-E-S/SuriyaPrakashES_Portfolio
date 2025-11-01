import React from 'react';
import { useFirebase } from '../contexts/FirebaseContext';

const LoadingSpinner = () => {
  const { loading } = useFirebase();

  if (!loading) return null;

  return (
 <div className="fixed inset-0 bg-white dark:bg-gray-900 bg-opacity-80 dark:bg-opacity-80 z-50 flex items-center justify-center">
  <div className="text-center">
    <div className="loader mx-auto mb-4"></div>
    <p className="text-xl text-center text-gray-700  dark:text-gray-400 font-medium">
      Loading Please Wait 👩‍💻 ...
    </p>
  </div>
</div>

  );
};

export default LoadingSpinner;