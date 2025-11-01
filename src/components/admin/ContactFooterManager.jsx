import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSave, FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiInstagram, FiTwitter, FiGlobe } from 'react-icons/fi';

const ContactFooterManager = ({ contactData, onSave, saving }) => {
  const [formData, setFormData] = useState(contactData);

  const socialPlatforms = {
    github: { icon: FiGithub, label: 'GitHub', placeholder: 'https://github.com/username' },
    linkedin: { icon: FiLinkedin, label: 'LinkedIn', placeholder: 'https://linkedin.com/in/username' },
    instagram: { icon: FiInstagram, label: 'Instagram', placeholder: 'https://instagram.com/username' },
    twitter: { icon: FiTwitter, label: 'Twitter', placeholder: 'https://twitter.com/username' },
    portfolio: { icon: FiGlobe, label: 'Portfolio', placeholder: 'https://yourwebsite.com' }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ 
      ...prev, 
      [field]: value 
    }));
  };

  const handleSocialChange = (platform, value) => {
    setFormData(prev => ({
      ...prev,
      social: {
        ...prev.social,
        [platform]: value
      }
    }));
  };

  const handleSave = () => {
    // Filter out empty social media links before saving
    const filteredSocial = Object.fromEntries(
      Object.entries(formData.social || {}).filter(([_, value]) => value.trim() !== '')
    );
    
    onSave({
      ...formData,
      social: filteredSocial
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Contact & Footer
        </h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
        >
          <FiSave className="w-4 h-4" />
          Save All
        </button>
      </div>

      <div className="space-y-8">
        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Contact Information
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <FiMail className="w-4 h-4 inline mr-2" />
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <FiPhone className="w-4 h-4 inline mr-2" />
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+91 98765 43210"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <FiMapPin className="w-4 h-4 inline mr-2" />
                Location *
              </label>
              <input
                type="text"
                value={formData.location || ''}
                onChange={(e) => handleChange('location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tamil Nadu, India"
                required
              />
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Social Media Links
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Add your social media profiles. Leave blank to hide from your portfolio.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(socialPlatforms).map(([platform, { icon: Icon, label, placeholder }]) => (
              <div key={platform}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Icon className="w-4 h-4 inline mr-2" />
                  {label} URL
                </label>
                <input
                  type="url"
                  value={formData.social?.[platform] || ''}
                  onChange={(e) => handleSocialChange(platform, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={placeholder}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Web3Forms Configuration */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Contact Form Configuration
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Web3Forms Access Key *
            </label>
            <input
              type="text"
              value={formData.web3formsKey || ''}
              onChange={(e) => handleChange('web3formsKey', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your Web3Forms access key"
              required
            />
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 space-y-1">
              <p>
                Get your free access key from{' '}
                <a 
                  href="https://web3forms.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  web3forms.com
                </a>
              </p>
              <p>• Create a free account</p>
              <p>• Go to Dashboard → API Keys</p>
              <p>• Copy your access key and paste it here</p>
              <p className="text-green-600 dark:text-green-400 mt-2">
                ✅ Contact form will work immediately after saving!
              </p>
            </div>
          </div>
        </div>

        {/* Preview Note */}
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
            Preview Note
          </h4>
          <p className="text-sm text-yellow-700 dark:text-yellow-300">
            Changes will appear immediately on your portfolio contact section after saving.
            Make sure to test the contact form after setting up Web3Forms.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactFooterManager;