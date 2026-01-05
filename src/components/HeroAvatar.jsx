import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import LazyImage from './LazyImage';

const HeroAvatar = ({ data, isHovering, setIsHovering }) => {
  const avatarRef = useRef(null);

  const defaultData = {
    name: "Suriya Prakash",
    avatar: "",
    animatedAvatar: ""
  };

  const avatarData = data || defaultData;
  const ringClasses = `flex h-56 w-56 items-center justify-center rounded-full border-4 bg-gray-900/90 overflow-hidden transition-all duration-500 md:h-72 md:w-72 ${
    isHovering
      ? 'border-green-400 shadow-[0_0_35px_rgba(34,197,94,0.45)]'
      : 'border-gray-800 shadow-inner'
  }`;

  return (
    <motion.div
      ref={avatarRef}
      initial={{ opacity: 0, y: 20 }}    // Lazy-load fade
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="lg:w-1/2 flex justify-center mt-8 lg:mt-0"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Wrapper with minimal smooth float animation */}
      <motion.div
        className="relative group cursor-pointer"
        animate={{
          y: [0, -8, 0],                // Minimal up-down motion
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="relative">
          
          {/* Avatar container */}
          <motion.div
            className="flex h-64 w-64 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 shadow-2xl shadow-purple-500/25 transition-transform duration-500 md:h-80 md:w-80"
            animate={isHovering ? { scale: 1.04, rotate: -2, y: -6 } : { scale: 1, rotate: 0, y: 0 }}
            transition={{ type: 'spring', stiffness: 160, damping: 18 }}
          >
            <motion.div
              className={ringClasses}
              animate={isHovering ? { y: -4, rotate: -1 } : { y: 0, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              {/* Hover = animated avatar, normal = regular avatar (structure unchanged) */}
              {isHovering && avatarData.animatedAvatar ? (
                <LazyImage
                  src={avatarData.animatedAvatar}
                  alt={`${avatarData.name} animated`}
                  className="h-full w-full object-cover"
                />
              ) : avatarData.avatar ? (
                <LazyImage
                  src={avatarData.avatar}
                  alt={avatarData.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                // Default fallback
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-700 to-gray-600">
                  <span className="text-sm text-gray-300">No Avatar</span>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HeroAvatar;
