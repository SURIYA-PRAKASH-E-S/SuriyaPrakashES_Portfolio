import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSave, FiPlus, FiTrash2, FiBook, FiAward, FiCode } from 'react-icons/fi';

const AboutManager = ({ aboutData, onSave, saving }) => {
  // Ensure aboutData has proper structure
  const [formData, setFormData] = useState({
    education: aboutData?.education || []
  });

  const handleAddEducation = () => {
    const newEducation = {
      id: Date.now(),
      institution: '',
      degree: '',
      period: '',
      status: 'completed',
      description: '',
      iconType: 'book' // Changed from 'icon' to 'iconType'
    };
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, newEducation]
    }));
  };

  const handleUpdateEducation = (index, field, value) => {
    const updatedEducation = [...formData.education];
    updatedEducation[index][field] = value;
    setFormData(prev => ({
      ...prev,
      education: updatedEducation
    }));
  };

  const handleRemoveEducation = (index) => {
    const updatedEducation = formData.education.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      education: updatedEducation
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  // Icon options for dropdown
  const iconOptions = [
    { value: 'book', label: 'Book', icon: <FiBook className="w-4 h-4" /> },
    { value: 'award', label: 'Award', icon: <FiAward className="w-4 h-4" /> },
    { value: 'code', label: 'Code', icon: <FiCode className="w-4 h-4" /> }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          About Section Management
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handleAddEducation}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <FiPlus className="w-4 h-4" />
            Add Education
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
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Education Timeline
        </h3>

        {formData.education && formData.education.length > 0 ? (
          formData.education.map((edu, index) => (
            <div key={edu.id || index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  Education {index + 1}
                </h4>
                <button
                  onClick={() => handleRemoveEducation(index)}
                  className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Institution Name
                  </label>
                  <input
                    type="text"
                    value={edu.institution || ''}
                    onChange={(e) => handleUpdateEducation(index, 'institution', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="College/School name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Degree/Board
                  </label>
                  <input
                    type="text"
                    value={edu.degree || ''}
                    onChange={(e) => handleUpdateEducation(index, 'degree', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Degree or Board name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Period
                  </label>
                  <input
                    type="text"
                    value={edu.period || ''}
                    onChange={(e) => handleUpdateEducation(index, 'period', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 2020 - 2024"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={edu.status || 'completed'}
                    onChange={(e) => handleUpdateEducation(index, 'status', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="completed">Completed</option>
                    <option value="ongoing">Currently Studying</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Icon Type
                  </label>
                  <select
                    value={edu.iconType || 'book'}
                    onChange={(e) => handleUpdateEducation(index, 'iconType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {iconOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={edu.description || ''}
                    onChange={(e) => handleUpdateEducation(index, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Description of your studies and achievements"
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <FiBook className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">
              No education entries added yet. Click "Add Education" to get started.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AboutManager;