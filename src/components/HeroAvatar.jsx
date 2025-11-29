import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const HeroAvatar = ({ data, isHovering, setIsHovering }) => {
  const avatarRef = useRef(null);

  const defaultData = {
    name: "Suriya Prakash",
    avatar: "",
    animatedAvatar: ""
  };

  const avatarData = data || defaultData;

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
          
          {/* Avatar container (unchanged) */}
          <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/25">

            <div className="w-56 h-56 md:w-72 md:h-72 bg-gray-800 rounded-full overflow-hidden border-4 border-gray-800 shadow-inner">

              {/* Hover = animated avatar, normal = regular avatar (structure unchanged) */}
              {isHovering && avatarData.animatedAvatar ? (
                <motion.img
                  key="animated"
                  src={avatarData.animatedAvatar}
                  alt={`${avatarData.name} animated`}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              ) : avatarData.avatar ? (
                <motion.img
                  key="normal"
                  src={avatarData.avatar}
                  alt={avatarData.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              ) : (
                // Default fallback
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-600">
                  <span className="text-gray-300 text-sm">No Avatar</span>
                </div>
              )}

            </div>
          </div>


        </div>
      </motion.div>
    </motion.div>
  );
};

export default HeroAvatar;
