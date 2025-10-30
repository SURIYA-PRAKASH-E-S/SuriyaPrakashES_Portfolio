import React, { createContext, useContext, useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase/config';

const FirebaseContext = createContext();

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};

export const FirebaseProvider = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState({
    hero: null,
    about: null,
    projects: [],
    skills: {},
    activities: {},
    social: {}
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all portfolio data
  useEffect(() => {
    const dataRef = ref(database, 'portfolio/');
    
    const unsubscribe = onValue(dataRef, 
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setPortfolioData({
            hero: data.hero || null,
            about: data.about || null,
            projects: data.projects || [],
            skills: data.skills || {},
            activities: data.activities || {},
            social: data.social || {}
          });
        }
        setLoading(false);
      },
      (error) => {
        console.error('Firebase error:', error);
        setError(error.message);
        setLoading(false);
      }
    );

    // Cleanup function
    return () => unsubscribe();
  }, []);

  const value = {
    portfolioData,
    loading,
    error
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};