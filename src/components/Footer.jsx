import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiGithub, 
  FiLinkedin, 
  FiInstagram, 
  FiTwitter,
  FiHeart 
} from 'react-icons/fi';
import { useSocialData } from '../hooks/usePortfolioData';

const Footer = () => {
  const { data: socialData } = useSocialData();

  const defaultSocialLinks = [
    {
      icon: <FiGithub className="w-5 h-5" />,
      name: "GitHub",
      url: "https://github.com/suriya-prakash",
      color: "hover:text-gray-700 dark:hover:text-white"
    },
    {
      icon: <FiLinkedin className="w-5 h-5" />,
      name: "LinkedIn",
      url: "https://linkedin.com/in/suriya-prakash",
      color: "hover:text-blue-600"
    },
    {
      icon: <FiInstagram className="w-5 h-5" />,
      name: "Instagram",
      url: "https://instagram.com/suriya.prakash",
      color: "hover:text-pink-600"
    },
    {
      icon: <FiTwitter className="w-5 h-5" />,
      name: "Twitter",
      url: "https://twitter.com/suriya_prakash",
      color: "hover:text-blue-400"
    }
  ];

  const socialLinks = socialData?.links || defaultSocialLinks;

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Activities", href: "#activities" },
    { name: "Contact", href: "#contact" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-8"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-2xl font-bold">
              Suriya<span className="text-blue-400">Prakash</span>
            </h3>
            <p className="text-gray-400 max-w-md">
              Full Stack Developer and Problem Solver passionate about creating 
              innovative solutions and bringing ideas to life through code.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  whileHover={{ scale: 1.2, y: -2 }}
                  className={`p-2 bg-gray-800 rounded-lg text-gray-400 transition-colors ${social.color}`}
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold">Get In Touch</h4>
            <div className="space-y-2 text-gray-400">
              <p>📧 {socialData?.email || 'suriya.prakash@example.com'}</p>
              <p>📱 {socialData?.phone || '+91 98765 43210'}</p>
              <p>📍 {socialData?.location || 'Tamil Nadu, India'}</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <p className="text-gray-400 text-sm flex items-center">
            Copy Rights Reserved @2025 by SURIYA-PRAKASH-E-S 
            <FiHeart className="w-4 h-4 text-red-500 mx-1" />
          </p>
          
          <div className="flex space-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </motion.div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg z-50"
        aria-label="Back to top"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </motion.button>
    </footer>
  );
};

export default Footer;