import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSave, FiPlus, FiTrash2, FiUpload, FiVideo, FiFile, FiDownload } from 'react-icons/fi';
import { uploadToCloudinary } from '../../utils/cloudinary';
import LazyImage from '../LazyImage';

const HeroManager = ({ heroData, onSave, saving }) => {
  const [formData, setFormData] = useState(heroData);
  const [uploading, setUploading] = useState(false);
  const [uploadingAnimated, setUploadingAnimated] = useState(false);
  const [uploadingCV, setUploadingCV] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRoleChange = (index, value) => {
    const updatedRoles = [...formData.roles];
    updatedRoles[index] = value;
    setFormData(prev => ({ ...prev, roles: updatedRoles }));
  };

  const handleAddRole = () => {
    setFormData(prev => ({ ...prev, roles: [...prev.roles, ''] }));
  };

  const handleRemoveRole = (index) => {
    const updatedRoles = formData.roles.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, roles: updatedRoles }));
  };

  const handleImageUpload = async (event, isAnimated = false) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    const imageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const videoTypes = ['video/mp4', 'video/webm', 'image/gif'];
    
    const allowedTypes = isAnimated ? [...imageTypes, ...videoTypes] : imageTypes;
    
    if (!allowedTypes.includes(file.type)) {
      alert(`Please select a valid ${isAnimated ? 'image, video, or GIF file' : 'image file'}`);
      return;
    }

    // Validate file size (10MB max for animated, 5MB for static)
    const maxSize = isAnimated ? 10 * 1024 * 1024 : 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert(`File size should be less than ${isAnimated ? '10MB' : '5MB'}`);
      return;
    }

    isAnimated ? setUploadingAnimated(true) : setUploading(true);
    try {
      const result = await uploadToCloudinary(file);
      setFormData(prev => ({ 
        ...prev, 
        [isAnimated ? 'animatedAvatar' : 'avatar']: result.url 
      }));
    } catch (error) {
      alert(`Failed to upload ${isAnimated ? 'animated avatar' : 'image'}: ${error.message}`);
    } finally {
      isAnimated ? setUploadingAnimated(false) : setUploading(false);
    }
  };

  const handleCVUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type (PDF and common document formats)
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      alert('Please select a valid PDF, DOC, DOCX, or TXT file');
      return;
    }

    // Validate file size (5MB max for CV)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('CV file size should be less than 5MB');
      return;
    }

    setUploadingCV(true);
    try {
      const result = await uploadToCloudinary(file);
      setFormData(prev => ({ 
        ...prev, 
        cvUrl: result.url,
        cvName: file.name
      }));
    } catch (error) {
      alert(`Failed to upload CV: ${error.message}`);
    } finally {
      setUploadingCV(false);
    }
  };

  const handleSave = () => {
    const filteredRoles = formData.roles.filter(role => role.trim() !== '');
    onSave({ ...formData, roles: filteredRoles });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
    >
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Hero Section
      </h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Your description"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Roles (for typewriter effect)
            </label>
            <button
              type="button"
              onClick={handleAddRole}
              className="flex items-center gap-1 px-3 py-1 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <FiPlus className="w-3 h-3" />
              Add Role
            </button>
          </div>
          {formData.roles.map((role, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={role}
                onChange={(e) => handleRoleChange(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={`Role ${index + 1}`}
              />
              {formData.roles.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveRole(index)}
                  className="px-3 py-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Static Avatar Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Static Avatar Image (Shows by default)
          </label>
          <div className="flex gap-4 items-start">
            <div className="flex-1">
              <input
                type="url"
                value={formData.avatar}
                onChange={(e) => handleChange('avatar', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter static image URL"
              />
            </div>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, false)}
                className="hidden"
                id="avatar-upload"
              />
              <label
                htmlFor="avatar-upload"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer transition-colors"
              >
                {uploading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <FiUpload className="w-4 h-4" />
                )}
                Upload
              </label>
            </div>
          </div>
          {formData.avatar && (
            <div className="mt-2">
              <LazyImage 
                src={formData.avatar} 
                alt="Static avatar preview" 
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
              />
            </div>
          )}
        </div>

        {/* Animated Avatar Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Animated Avatar (Shows on hover - GIF/Video/Image)
          </label>
          <div className="flex gap-4 items-start">
            <div className="flex-1">
              <input
                type="url"
                value={formData.animatedAvatar || ''}
                onChange={(e) => handleChange('animatedAvatar', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter animated avatar URL (GIF/Video/Image)"
              />
            </div>
            <div className="relative">
              <input
                type="file"
                accept="image/*,video/*,.gif"
                onChange={(e) => handleImageUpload(e, true)}
                className="hidden"
                id="animated-avatar-upload"
              />
              <label
                htmlFor="animated-avatar-upload"
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg cursor-pointer transition-colors"
              >
                {uploadingAnimated ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <FiVideo className="w-4 h-4" />
                )}
                Upload
              </label>
            </div>
          </div>
          {formData.animatedAvatar && (
            <div className="mt-2">
              {formData.animatedAvatar.match(/\.(gif|mp4|webm)$/i) ? (
                <video 
                  src={formData.animatedAvatar} 
                  alt="Animated avatar preview"
                  className="w-20 h-20 rounded-full object-cover border-2 border-purple-300"
                  autoPlay
                  loop
                  muted
                  onError={(e) => {
                    // If video fails, try as image
                    e.target.style.display = 'none';
                    const img = document.createElement('img');
                    img.src = formData.animatedAvatar;
                    img.className = 'w-20 h-20 rounded-full object-cover border-2 border-purple-300';
                    e.target.parentNode.appendChild(img);
                  }}
                />
              ) : (
                <LazyImage 
                  src={formData.animatedAvatar} 
                  alt="Animated avatar preview" 
                  className="w-20 h-20 rounded-full object-cover border-2 border-purple-300"
                />
              )}
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Preview: This will show when users hover over your avatar</p>
            </div>
          )}
        </div>

        {/* CV Upload Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            CV/Resume Upload
          </label>
          <div className="flex gap-4 items-start">
            <div className="flex-1">
              <input
                type="url"
                value={formData.cvUrl || ''}
                onChange={(e) => handleChange('cvUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Or enter CV URL (Google Drive, Dropbox, etc.)"
              />
              {formData.cvName && (
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                  Current CV: {formData.cvName}
                </p>
              )}
            </div>
            <div className="relative">
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleCVUpload}
                className="hidden"
                id="cv-upload"
              />
              <label
                htmlFor="cv-upload"
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg cursor-pointer transition-colors"
              >
                {uploadingCV ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <FiFile className="w-4 h-4" />
                )}
                Upload CV
              </label>
            </div>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 space-y-1">
            <p>• Supported formats: PDF, DOC, DOCX, TXT</p>
            <p>• Max file size: 5MB</p>
            <p>• Or provide a direct download link (Google Drive, etc.)</p>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
        >
          {saving ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <FiSave className="w-5 h-5" />
              Save Hero Section
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default HeroManager;