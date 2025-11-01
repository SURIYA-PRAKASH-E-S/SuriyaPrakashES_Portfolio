import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSave, FiPlus, FiTrash2, FiUpload } from 'react-icons/fi';
import { uploadToCloudinary } from '../../utils/cloudinary';

const SkillsManager = ({ skills, onSave, saving }) => {
  const [localSkills, setLocalSkills] = useState(Array.isArray(skills) ? skills : []);
  const [uploadingIndex, setUploadingIndex] = useState(null);

  // Popular simple-icons slugs for quick selection
  const popularIconSlugs = [
    "javascript", "typescript", "react", "nodedotjs", "python", "java",
    "html5", "css3", "tailwindcss", "bootstrap", "mongodb", "mysql",
    "firebase", "amazonaws", "docker", "git", "github", "gitlab",
    "visualstudiocode", "figma", "postman", "linux", "npm", "yarn",
    "express", "nextdotjs", "vuejs", "angular", "sass", "less",
    "redis", "postgresql", "sqlite", "vercel", "netlify", "heroku",
    "kubernetes", "jenkins", "graphql", "redux", "jest", "webpack"
  ];

  const handleAddSkill = () => {
    const newSkill = {
      id: Date.now(),
      name: '',
      iconSlug: '',
      icon: '', // Fallback emoji or custom icon
      iconUrl: '' // Cloudinary URL for custom icons
    };
    setLocalSkills(prev => [...prev, newSkill]);
  };

  const handleUpdateSkill = (index, field, value) => {
    const updatedSkills = [...localSkills];
    updatedSkills[index][field] = value;
    setLocalSkills(updatedSkills);
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = localSkills.filter((_, i) => i !== index);
    setLocalSkills(updatedSkills);
  };

  const handleSave = () => {
    onSave(localSkills);
  };

  const handleIconUpload = async (event, index) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Image size should be less than 2MB');
      return;
    }

    setUploadingIndex(index);
    try {
      const result = await uploadToCloudinary(file);
      handleUpdateSkill(index, 'iconUrl', result.url);
      // Clear simple-icons slug when using custom icon
      handleUpdateSkill(index, 'iconSlug', '');
    } catch (error) {
      alert('Failed to upload icon: ' + error.message);
    } finally {
      setUploadingIndex(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Tech Stack Management
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Manage all your technologies in one place
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleAddSkill}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <FiPlus className="w-4 h-4" />
            Add Technology
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
          >
            <FiSave className="w-4 h-4" />
            Save All
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {localSkills.map((skill, index) => (
          <div key={skill.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Technology {index + 1}
              </h3>
              <button
                onClick={() => handleRemoveSkill(index)}
                className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
              >
                <FiTrash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Skill Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Technology Name *
                </label>
                <input
                  type="text"
                  value={skill.name || ''}
                  onChange={(e) => handleUpdateSkill(index, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., React, JavaScript, etc."
                  required
                />
              </div>

              {/* Simple-icons Slug */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Simple-icons Slug
                </label>
                <select
                  value={skill.iconSlug || ''}
                  onChange={(e) => {
                    handleUpdateSkill(index, 'iconSlug', e.target.value);
                    // Clear custom icon when selecting simple-icons
                    if (e.target.value) {
                      handleUpdateSkill(index, 'iconUrl', '');
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select from popular icons</option>
                  {popularIconSlugs.map(slug => (
                    <option key={slug} value={slug}>
                      {slug}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Choose from <a href="https://simpleicons.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">simple-icons.org</a>
                </p>
              </div>

              {/* Fallback Icon (Emoji)
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Fallback Icon (Emoji)
                </label>
                <input
                  type="text"
                  value={skill.icon || ''}
                  onChange={(e) => handleUpdateSkill(index, 'icon', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., ⚛️ 🟨 🔷"
                  maxLength={2}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Emoji fallback if no icon available
                </p>
              </div> */}

              {/* Custom Icon Upload */}
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Custom Icon Upload
                </label>
                <div className="flex gap-4 items-start">
                  <div className="flex-1">
                    <input
                      type="url"
                      value={skill.iconUrl || ''}
                      onChange={(e) => handleUpdateSkill(index, 'iconUrl', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Or enter custom icon URL"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleIconUpload(e, index)}
                      className="hidden"
                      id={`icon-upload-${index}`}
                    />
                    <label
                      htmlFor={`icon-upload-${index}`}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer transition-colors"
                    >
                      {uploadingIndex === index ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <FiUpload className="w-4 h-4" />
                      )}
                      Upload
                    </label>
                  </div>
                </div>
                {skill.iconUrl && (
                  <div className="mt-2">
                    <img 
                      src={skill.iconUrl} 
                      alt="Icon preview" 
                      className="w-8 h-8 object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Preview */}
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Preview
                </label>
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                  {skill.iconUrl ? (
                    <img 
                      src={skill.iconUrl} 
                      alt={skill.name}
                      className="w-6 h-6 object-contain"
                      onError={(e) => {
                        // Fallback to simple-icons or emoji
                        e.target.style.display = 'none';
                      }}
                    />
                  ) : skill.iconSlug ? (
                    <img 
                      src={`https://cdn.simpleicons.org/${skill.iconSlug}`}
                      alt={skill.name}
                      className="w-6 h-6"
                    />
                  ) : (
                    <span className="text-lg">{skill.icon || '💡'}</span>
                  )}
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {skill.name || 'Technology Name'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {localSkills.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiPlus className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No technologies added yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Start by adding your first technology to the stack
            </p>
            <button
              onClick={handleAddSkill}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <FiPlus className="w-4 h-4" />
              Add First Technology
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SkillsManager;