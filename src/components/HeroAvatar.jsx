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
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="lg:w-1/2 flex justify-center mt-8 lg:mt-0"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <motion.div
        className="relative group cursor-pointer"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="relative">
          {/* Main Avatar Container */}
          <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/25 group-hover:shadow-2xl group-hover:shadow-purple-500/50 transition-all duration-300">
            
            {/* Animated rings when hovering */}
            {isHovering && (
              <>
                <motion.div 
                  className="absolute inset-0 rounded-full border-4 border-blue-300/80"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute inset-0 rounded-full border-4 border-purple-300/60"
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                />
                <motion.div 
                  className="absolute inset-0 rounded-full border-4 border-pink-300/40"
                  animate={{ scale: [1, 1.6, 1], opacity: [1, 0.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                />
              </>
            )}
            
            <div className="w-56 h-56 md:w-72 md:h-72 bg-gray-800 rounded-full overflow-hidden border-4 border-gray-800 shadow-inner">
              {/* Show animated avatar on hover, normal image otherwise */}
              {isHovering && avatarData.animatedAvatar ? (
                <motion.img 
                  key="animated"
                  src={avatarData.animatedAvatar}
                  alt={`${avatarData.name} animated`}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              ) : avatarData.avatar ? (
                <motion.img 
                  key="normal"
                  src={avatarData.avatar} 
                  alt={avatarData.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              ) : (
                // Default fallback avatar
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-600">
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 }}
                      className="relative mx-auto mb-4"
                    >
                      <div className="w-16 h-20 md:w-20 md:h-24 bg-gray-500 rounded-full relative">
                        {/* Eyes */}
                        <div className="absolute top-6 left-4 md:left-5 w-3 h-3 md:w-4 md:h-4 bg-gray-800 rounded-full"></div>
                        <div className="absolute top-6 right-4 md:right-5 w-3 h-3 md:w-4 md:h-4 bg-gray-800 rounded-full"></div>
                        {/* Smile */}
                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-8 h-2 md:w-10 md:h-3 border-b-4 border-gray-800 rounded-full"></div>
                      </div>
                    </motion.div>
                    <motion.span 
                      className="text-xs md:text-sm text-gray-400 block"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      {isHovering ? 'Hello! 👋' : 'Hover me!'}
                    </motion.span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Floating elements */}
          <motion.div 
            className="absolute -top-2 -right-2 w-6 h-6 md:w-8 md:h-8 bg-yellow-500 rounded-full shadow-lg z-10"
            animate={{ 
              y: [0, -10, 0],
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute -bottom-2 -left-2 w-5 h-5 md:w-6 md:h-6 bg-green-500 rounded-full shadow-lg z-10"
            animate={{ 
              y: [0, 10, 0],
              scale: [1, 1.1, 1],
              rotate: [0, -180, -360]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div 
            className="absolute top-4 -right-4 w-4 h-4 md:w-5 md:h-5 bg-pink-500 rounded-full shadow-lg z-10"
            animate={{ 
              x: [0, 5, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
        </div>

        {/* Instruction tooltip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovering ? 0 : 1, y: 0 }}
          className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-700/90 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap backdrop-blur-sm border border-gray-600"
        >
          ✨ Hover to see magic
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HeroAvatar;