import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSave, FiPlus, FiTrash2, FiBriefcase, FiAward } from 'react-icons/fi';

const ActivitiesManager = ({ activities, onSave, saving }) => {
  const [formData, setFormData] = useState({
    internships: activities?.internships || [],
    certifications: activities?.certifications || [],
    curricular: activities?.curricular || []
  });

  const handleAddInternship = () => {
    const newInternship = {
      id: Date.now(),
      role: '',
      company: '',
      location: '',
      period: '',
      description: '',
      technologies: []
    };
    setFormData(prev => ({
      ...prev,
      internships: [...prev.internships, newInternship]
    }));
  };

  const handleAddCertification = () => {
    const newCertification = {
      id: Date.now(),
      name: '',
      issuer: '',
      date: '',
      link: ''
    };
    setFormData(prev => ({
      ...prev,
      certifications: [...prev.certifications, newCertification]
    }));
  };

  const handleAddActivity = () => {
    const newActivity = {
      id: Date.now(),
      type: 'co-curricular',
      title: '',
      organization: '',
      description: '',
      date: ''
    };
    setFormData(prev => ({
      ...prev,
      curricular: [...prev.curricular, newActivity]
    }));
  };

  const handleUpdateItem = (section, index, field, value) => {
    const updatedSection = [...formData[section]];
    updatedSection[index][field] = value;
    setFormData(prev => ({
      ...prev,
      [section]: updatedSection
    }));
  };

  const handleRemoveItem = (section, index) => {
    const updatedSection = formData[section].filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      [section]: updatedSection
    }));
  };

  const handleAddTechnology = (internshipIndex) => {
    const updatedInternships = [...formData.internships];
    if (!updatedInternships[internshipIndex].technologies) {
      updatedInternships[internshipIndex].technologies = [];
    }
    updatedInternships[internshipIndex].technologies.push('');
    setFormData(prev => ({
      ...prev,
      internships: updatedInternships
    }));
  };

  const handleUpdateTechnology = (internshipIndex, techIndex, value) => {
    const updatedInternships = [...formData.internships];
    updatedInternships[internshipIndex].technologies[techIndex] = value;
    setFormData(prev => ({
      ...prev,
      internships: updatedInternships
    }));
  };

  const handleRemoveTechnology = (internshipIndex, techIndex) => {
    const updatedInternships = [...formData.internships];
    updatedInternships[internshipIndex].technologies = updatedInternships[internshipIndex].technologies.filter((_, i) => i !== techIndex);
    setFormData(prev => ({
      ...prev,
      internships: updatedInternships
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Experience Management
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
        {/* Internships Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <FiBriefcase className="w-5 h-5" />
              Internships
            </h3>
            <button
              onClick={handleAddInternship}
              className="flex items-center gap-2 px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
            >
              <FiPlus className="w-3 h-3" />
              Add Internship
            </button>
          </div>

          <div className="space-y-6">
            {formData.internships.map((internship, index) => (
              <div key={internship.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Internship {index + 1}
                  </h4>
                  <button
                    onClick={() => handleRemoveItem('internships', index)}
                    className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Role *
                    </label>
                    <input
                      type="text"
                      value={internship.role || ''}
                      onChange={(e) => handleUpdateItem('internships', index, 'role', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Web Development Intern"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Company *
                    </label>
                    <input
                      type="text"
                      value={internship.company || ''}
                      onChange={(e) => handleUpdateItem('internships', index, 'company', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tostot Software Solutions"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      value={internship.location || ''}
                      onChange={(e) => handleUpdateItem('internships', index, 'location', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Hybrid"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Period *
                    </label>
                    <input
                      type="text"
                      value={internship.period || ''}
                      onChange={(e) => handleUpdateItem('internships', index, 'period', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="2023"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={internship.description || ''}
                      onChange={(e) => handleUpdateItem('internships', index, 'description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Revamped a website for a client using HTML, Bootstrap, CSS, and JavaScript..."
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Technologies
                      </label>
                      <button
                        onClick={() => handleAddTechnology(index)}
                        className="flex items-center gap-1 px-2 py-1 text-sm bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
                      >
                        <FiPlus className="w-3 h-3" />
                        Add Tech
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {internship.technologies?.map((tech, techIndex) => (
                        <div key={techIndex} className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded">
                          <input
                            type="text"
                            value={tech}
                            onChange={(e) => handleUpdateTechnology(index, techIndex, e.target.value)}
                            className="bg-transparent border-none focus:outline-none text-sm w-24"
                            placeholder="Technology"
                          />
                          <button
                            onClick={() => handleRemoveTechnology(index, techIndex)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FiTrash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {formData.internships.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                No internships added yet.
              </p>
            )}
          </div>
        </div>

        {/* Certifications Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <FiAward className="w-5 h-5" />
              Certifications
            </h3>
            <button
              onClick={handleAddCertification}
              className="flex items-center gap-2 px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
            >
              <FiPlus className="w-3 h-3" />
              Add Certification
            </button>
          </div>

          <div className="space-y-4">
            {formData.certifications.map((cert, index) => (
              <div key={cert.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Certification {index + 1}
                  </h4>
                  <button
                    onClick={() => handleRemoveItem('certifications', index)}
                    className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Certification Name
                    </label>
                    <input
                      type="text"
                      value={cert.name || ''}
                      onChange={(e) => handleUpdateItem('certifications', index, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Issuing Organization
                    </label>
                    <input
                      type="text"
                      value={cert.issuer || ''}
                      onChange={(e) => handleUpdateItem('certifications', index, 'issuer', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Date
                    </label>
                    <input
                      type="text"
                      value={cert.date || ''}
                      onChange={(e) => handleUpdateItem('certifications', index, 'date', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., June 2023"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Certificate Link
                    </label>
                    <input
                      type="url"
                      value={cert.link || ''}
                      onChange={(e) => handleUpdateItem('certifications', index, 'link', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="URL to certificate"
                    />
                  </div>
                </div>
              </div>
            ))}

            {formData.certifications.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                No certifications added yet.
              </p>
            )}
          </div>
        </div>

        {/* Activities Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Activities
            </h3>
            <button
              onClick={handleAddActivity}
              className="flex items-center gap-2 px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
            >
              <FiPlus className="w-3 h-3" />
              Add Activity
            </button>
          </div>

          <div className="space-y-4">
            {formData.curricular.map((activity, index) => (
              <div key={activity.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Activity {index + 1}
                  </h4>
                  <button
                    onClick={() => handleRemoveItem('curricular', index)}
                    className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={activity.title || ''}
                      onChange={(e) => handleUpdateItem('curricular', index, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Organization
                    </label>
                    <input
                      type="text"
                      value={activity.organization || ''}
                      onChange={(e) => handleUpdateItem('curricular', index, 'organization', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Type
                    </label>
                    <select
                      value={activity.type || 'co-curricular'}
                      onChange={(e) => handleUpdateItem('curricular', index, 'type', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="co-curricular">Co-curricular</option>
                      <option value="extra-curricular">Extra-curricular</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Date
                    </label>
                    <input
                      type="text"
                      value={activity.date || ''}
                      onChange={(e) => handleUpdateItem('curricular', index, 'date', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 2023"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      value={activity.description || ''}
                      onChange={(e) => handleUpdateItem('curricular', index, 'description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  </div>
                </div>
              </div>
            ))}

            {formData.curricular.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                No activities added yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ActivitiesManager;