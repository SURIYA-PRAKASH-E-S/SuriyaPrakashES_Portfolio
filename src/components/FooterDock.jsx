import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiGithub,
  FiLinkedin,
  FiInstagram,
  FiTwitter,
  FiHome,
  FiSun,
  FiMoon,
  FiMail,
} from 'react-icons/fi';
import { useContactData } from '../hooks/usePortfolioData';
import { useTheme } from '../contexts/ThemeContext'; // Import useTheme

const FooterDock = () => {
  const { isDark, toggleTheme } = useTheme(); // Use the theme context
  const [isHovered, setIsHovered] = useState(false);
  const { data: contactData } = useContactData();

  const socialLinks = [
    { icon: <FiGithub />, name: 'GitHub', url: contactData?.social?.github },
    { icon: <FiLinkedin />, name: 'LinkedIn', url: contactData?.social?.linkedin },
    { icon: <FiInstagram />, name: 'Instagram', url: contactData?.social?.instagram },
    { icon: <FiTwitter />, name: 'Twitter', url: contactData?.social?.twitter },
  ].filter((link) => link.url && link.url.trim() !== '');

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          gap: isHovered ? 10 : 6,
        }}
        whileHover={{
          scale: 1.05,
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(0,0,0,0.25) 100%)',
          boxShadow: '0 0 30px rgba(180,180,180,0.25)',
        }}
        whileTap={{
          scale: 0.97,
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(0,0,0,0.35) 100%)',
        }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="
          flex items-center gap-3
          px-6 py-3
          border border-white/20 dark:border-gray-700/30
          rounded-2xl shadow-2xl
          backdrop-blur-2xl
          transition-all duration-500 ease-in-out
          bg-[linear-gradient(135deg,rgba(255,255,255,0.2)_0%,rgba(0,0,0,0.2)_100%)]
        "
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Home Button */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="
            p-2 rounded-xl
            text-gray-600 dark:text-gray-400
            hover:text-blue-600 dark:hover:text-blue-400
            hover:bg-blue-50 dark:hover:bg-blue-900/30
            transition-all duration-200
          "
          title="Back to top"
        >
          <FiHome className="w-5 h-5" />
        </motion.button>

        {/* Navigation Dots */}
        <div className="flex items-center gap-1">
          {['home', 'projects', 'work experience', 'contact'].map((section) => (
            <motion.button
              key={section}
              onClick={() => scrollToSection(section)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="
                w-2 h-2 rounded-full
                bg-gray-300 dark:bg-gray-600
                hover:bg-blue-500 dark:hover:bg-blue-400
                transition-all duration-200
              "
              title={`Scroll to ${section}`}
            />
          ))}
        </div>

        {/* Social Icons */}
        {socialLinks.map((social) => (
          <motion.a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="
              p-2 rounded-xl
              text-gray-600 dark:text-gray-400
              hover:text-blue-600 dark:hover:text-blue-400
              hover:bg-blue-50 dark:hover:bg-blue-900/30
              transition-all duration-200
            "
            title={social.name}
          >
            {social.icon}
          </motion.a>
        ))}

        {/* Contact Button */}
        <motion.button
          onClick={() => scrollToSection('contact')}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="
            p-2 rounded-xl
            text-gray-600 dark:text-gray-400
            hover:text-green-600 dark:hover:text-green-400
            hover:bg-green-50 dark:hover:bg-green-900/30
            transition-all duration-200
          "
          title="Contact Me"
        >
          <FiMail className="w-5 h-5" />
        </motion.button>

        {/* Theme Toggle - Now using the context */}
        <motion.button
          onClick={toggleTheme}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="
            p-2 rounded-xl
            text-gray-600 dark:text-gray-400
            hover:text-yellow-600 dark:hover:text-yellow-400
            hover:bg-yellow-50 dark:hover:bg-yellow-900/30
            transition-all duration-200
          "
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDark ? (
            <FiMoon className="w-5 h-5" />
          ) : (
            <FiSun className="w-5 h-5" />
          )}
        </motion.button>
      </motion.div>
    </footer>
  );
};

export default FooterDock;