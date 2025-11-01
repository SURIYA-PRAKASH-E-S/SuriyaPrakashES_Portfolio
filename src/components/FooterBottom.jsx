import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiHeart } from 'react-icons/fi';
import { useContactData } from '../hooks/usePortfolioData';

const FooterBottom = () => {
  const { data: contactData } = useContactData();

  // Contact info from Firebase or defaults
  const email = contactData?.email || "suriyaprakashes@example.com";
  const phone = contactData?.phone || "";
  const github = contactData?.social?.github || "https://github.com/SURIYA-PRAKASH-E-S";

  return (
    <footer
      className="
        w-full mt-10
        bg-gradient-to-r from-black/60 via-purple-700/50 to-black/60
        dark:bg-gray-900/40
        backdrop-blur-xl
        border-t border-gray-300 dark:border-gray-800
        rounded-t-3xl
        shadow-lg
        transition-colors duration-300
      "
    >
      <div className="max-w-5xl mx-auto py-6 px-4 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="
            flex flex-wrap items-center justify-center gap-6
            text-center
          "
        >
          {/* Email */}
          {email && (
            <motion.a
              href={`mailto:${email}`}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="
                flex items-center gap-2 px-3 py-2 rounded-xl
                text-blue-100 dark:text-gray-300
                hover:text-blue-300 dark:hover:text-blue-400
                hover:bg-blue-900/20 dark:hover:bg-blue-900/20
                transition-all duration-200
              "
              title={`Email: ${email}`}
            >
              <FiMail className="w-5 h-5" />
            </motion.a>
          )}

          {/* Phone */}
          {phone && (
            <motion.a
              href={`tel:${phone}`}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="
                flex items-center gap-2 px-3 py-2 rounded-xl
                text-blue-100 dark:text-gray-300
                hover:text-green-300 dark:hover:text-green-400
                hover:bg-green-900/20 dark:hover:bg-green-900/20
                transition-all duration-200
              "
              title={`Call: ${phone}`}
            >
              <FiPhone className="w-5 h-5" />
            </motion.a>
          )}

          {/* Made with ❤️ by ES */}
          <motion.div
            className="flex items-center gap-2 px-3 py-2 text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <span className="text-blue-100 dark:text-gray-300 text-sm">
              Made with
            </span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FiHeart className="text-red-500 w-4 h-4" />
            </motion.div>
            <span className="text-blue-100 dark:text-gray-300 text-sm">
              by
            </span>
            <motion.a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="
                text-blue-300 dark:text-blue-400
                hover:text-blue-400 dark:hover:text-blue-300
                font-semibold text-sm transition-colors
              "
            >
              ES
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterBottom;
