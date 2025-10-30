import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useHeroData } from '../hooks/usePortfolioData';

const Hero = () => {
  const { data: heroData, loading, error } = useHeroData();
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Default data in case Firebase is not connected
  const defaultHeroData = {
    name: 'Suriya Prakash',
    description: 'Passionate about creating innovative solutions and bringing ideas to life through code. Currently based in Tamil Nadu, India.',
    location: 'Tamil Nadu, India',
    roles: ['Engineering Student', 'Full Stack Developer', 'Problem Solver', 'Tech Enthusiast'],
    avatar: ''
  };

  const data = heroData || defaultHeroData;
  const roles = data.roles || defaultHeroData.roles;

  // Typewriter effect
  useEffect(() => {
    if (roles.length === 0) return;

    const current = roles[currentRole];
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < current.length) {
          setDisplayText(current.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(current.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRole, roles]);

  if (loading) {
    return (
      <section id="hero" className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </section>
    );
  }

  if (error) {
    console.error('Error loading hero data:', error);
    // Continue with default data, don't break the UI
  }

  return (
    <section id="hero" className="min-h-screen flex items-center pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 text-center lg:text-left"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Hi, I'm{' '}
              <span className="text-blue-600 dark:text-blue-400">
                {data.name}
              </span>
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4 h-8"
            >
              I am a{' '}
              <span className="text-blue-600 dark:text-blue-400 font-semibold">
                {displayText}
                <span className="animate-pulse">|</span>
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl"
            >
              {data.description}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-gray-500 dark:text-gray-400 mb-8 flex items-center justify-center lg:justify-start"
            >
              📍 {data.location}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg">
                View My Work
              </button>
              <button className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-600 dark:hover:border-blue-400 px-8 py-3 rounded-lg font-semibold transition-colors">
                Download CV
              </button>
            </motion.div>
          </motion.div>

          {/* Avatar Image */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:w-1/2 flex justify-center"
          >
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                <div className="w-60 h-60 md:w-72 md:h-72 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden border-4 border-white dark:border-gray-800">
                  {data.avatar ? (
                    <img 
                      src={data.avatar} 
                      alt={data.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className={`w-full h-full flex items-center justify-center text-gray-400 ${data.avatar ? 'hidden' : 'flex'}`}>
                    <span className="text-sm">Your Photo</span>
                  </div>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;