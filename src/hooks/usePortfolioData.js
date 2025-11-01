import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase/config';

export const usePortfolioData = (path) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const dataRef = ref(database, `portfolio/${path}`);
    
    const unsubscribe = onValue(dataRef, 
      (snapshot) => {
        setData(snapshot.val());
        setLoading(false);
      },
      (err) => {
        console.error(`Error fetching ${path}:`, err);
        setError(err.message);
        setLoading(false);
      }
    );

    // Cleanup function
    return () => unsubscribe();
  }, [path]);

  return { data, loading, error };
};

export const useHeroData = () => usePortfolioData('hero');
export const useAboutData = () => usePortfolioData('about');
export const useProjectsData = () => usePortfolioData('projects');
export const useSkillsData = () => usePortfolioData('skills');
export const useActivitiesData = () => usePortfolioData('activities');
export const useSocialData = () => usePortfolioData('social');
export const useContactData = () => usePortfolioData('contact'); // Add this line