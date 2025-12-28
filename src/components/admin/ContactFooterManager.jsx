import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSave, FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiInstagram, FiTwitter, FiGlobe, FiMusic, FiUpload } from 'react-icons/fi';
import { set, ref as dbRef, onValue } from 'firebase/database';
import { database } from '../../firebase/config';

const ContactFooterManager = ({ contactData, onSave, saving }) => {
  const [formData, setFormData] = useState(contactData);
  const [audioUploading, setAudioUploading] = useState(false);
  const [audioUploadProgress, setAudioUploadProgress] = useState(0);
  const [manualAudioUrl, setManualAudioUrl] = useState('');

  // Fetch current audio URL from Firebase
  useEffect(() => {
    const audioUrlRef = dbRef(database, 'portfolio/bgm/audioUrl');
    const unsubscribe = onValue(audioUrlRef, (snapshot) => {
      const url = snapshot.val();
      if (url && url.trim() !== '') {
        setManualAudioUrl(url);
      } else {
        setManualAudioUrl('');
      }
    }, (error) => {
      console.error('Error fetching audio URL:', error);
    });

    return () => unsubscribe();
  }, []);

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

  const handleAudioUpload = async (file) => {
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('audio/')) {
      alert('Please select an audio file (MP3, WAV, etc.)');
      return;
    }
    
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('Audio file must be less than 10MB');
      return;
    }

    setAudioUploading(true);
    setAudioUploadProgress(0);

    try {
      // Create form data for Cloudinary upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', import.meta.env.VITE_PresetName || 'portfolio_audio');
      formData.append('resource_type', 'video'); // Cloudinary treats audio as video resource type

      setAudioUploadProgress(25);

      // Upload to Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CloudName}/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Cloudinary upload failed');
      }

      setAudioUploadProgress(75);

      const data = await response.json();
      const audioUrl = data.secure_url;

      // Save URL to Firebase Database
      await set(dbRef(database, 'portfolio/bgm/audioUrl'), audioUrl);
      setAudioUploadProgress(100);
      
      // Update manual URL field to show the uploaded URL
      setManualAudioUrl(audioUrl);
      
      alert('Audio uploaded successfully! It will be available in your portfolio shortly.');
    } catch (error) {
      console.error('Error uploading audio:', error);
      alert('Failed to upload audio. Please check your Cloudinary configuration and try again.');
    } finally {
      setAudioUploading(false);
      setAudioUploadProgress(0);
    }
  };

  const handleManualUrlSave = async () => {
    if (!manualAudioUrl.trim()) {
      alert('Please enter a valid audio URL');
      return;
    }

    // Validate URL format
    try {
      new URL(manualAudioUrl);
    } catch {
      alert('Please enter a valid URL (e.g., https://example.com/audio.mp3)');
      return;
    }

    try {
      // Save URL to Firebase Database
      await set(dbRef(database, 'portfolio/bgm/audioUrl'), manualAudioUrl.trim());
      alert('Audio URL saved successfully! It will be available in your portfolio shortly.');
    } catch (error) {
      console.error('Error saving audio URL:', error);
      alert('Failed to save audio URL. Please try again.');
    }
  };

  const handleClearAudio = async () => {
    try {
      // Clear URL from Firebase Database
      await set(dbRef(database, 'portfolio/bgm/audioUrl'), '');
      setManualAudioUrl('');
      alert('Audio cleared successfully! The BGM button will be hidden from your portfolio.');
    } catch (error) {
      console.error('Error clearing audio:', error);
      alert('Failed to clear audio. Please try again.');
    }
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

        {/* BGM Audio Upload */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            <FiMusic className="w-4 h-4 inline mr-2" />
            Background Music (BGM)
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Upload an audio file or paste a URL to play ambient background music on your portfolio.
            The BGM button will only appear if you have uploaded a file or saved a URL.
          </p>
          
          <div className="space-y-6">
            {/* Upload Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Upload Audio File
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => e.target.files[0] && handleAudioUpload(e.target.files[0])}
                  disabled={audioUploading}
                  className="hidden"
                  id="audio-upload"
                />
                <label
                  htmlFor="audio-upload"
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-colors
                    ${audioUploading 
                      ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed' 
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }
                  `}
                >
                  <FiUpload className="w-4 h-4" />
                  {audioUploading ? 'Uploading...' : 'Choose Audio File'}
                </label>
                {audioUploading && (
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${audioUploadProgress}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {audioUploadProgress}%
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
              <span className="text-sm text-gray-500 dark:text-gray-400">OR</span>
              <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
            </div>

            {/* Manual URL Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Paste Audio URL
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={manualAudioUrl}
                  onChange={(e) => setManualAudioUrl(e.target.value)}
                  placeholder="https://example.com/audio.mp3"
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleManualUrlSave}
                  disabled={!manualAudioUrl.trim()}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  Save URL
                </button>
                <button
                  onClick={handleClearAudio}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
            
            <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
              <p>• Upload: Store audio in Cloudinary with automatic URL generation</p>
              <p>• Paste URL: Use any audio URL from external sources</p>
              <p>• Audio will loop continuously when played by visitors</p>
              <p>• Users can toggle the BGM on/off using the music button</p>
              <p>• BGM button appears only when audio is configured</p>
              <p>• Changes take effect immediately after successful upload/save</p>
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