import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSave, FiPlus, FiTrash2, FiUpload, FiTag } from 'react-icons/fi';
import { uploadToCloudinary } from '../../utils/cloudinary';

const ProjectsManager = ({ projects, onSave, saving }) => {
  const [localProjects, setLocalProjects] = useState(projects);
  const [uploadingIndex, setUploadingIndex] = useState(null);

  const handleAddProject = () => {
    const newProject = {
      id: Date.now(),
      title: 'New Project',
      description: 'Project description',
      image: '',
      technologies: [],
      liveLink: '',
      githubLink: '',
      featured: false
    };
    setLocalProjects(prev => [...prev, newProject]);
  };

  const handleUpdateProject = (index, field, value) => {
    const updatedProjects = [...localProjects];
    updatedProjects[index][field] = value;
    setLocalProjects(updatedProjects);
  };

  const handleRemoveProject = (index) => {
    const updatedProjects = localProjects.filter((_, i) => i !== index);
    setLocalProjects(updatedProjects);
  };

  const handleAddTechnology = (projectIndex) => {
    const updatedProjects = [...localProjects];
    if (!updatedProjects[projectIndex].technologies) {
      updatedProjects[projectIndex].technologies = [];
    }
    updatedProjects[projectIndex].technologies.push('');
    setLocalProjects(updatedProjects);
  };

  const handleUpdateTechnology = (projectIndex, techIndex, value) => {
    const updatedProjects = [...localProjects];
    updatedProjects[projectIndex].technologies[techIndex] = value;
    setLocalProjects(updatedProjects);
  };

  const handleRemoveTechnology = (projectIndex, techIndex) => {
    const updatedProjects = [...localProjects];
    updatedProjects[projectIndex].technologies = updatedProjects[projectIndex].technologies.filter((_, i) => i !== techIndex);
    setLocalProjects(updatedProjects);
  };

  const handleImageUpload = async (event, projectIndex) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setUploadingIndex(projectIndex);
    try {
      const result = await uploadToCloudinary(file);
      handleUpdateProject(projectIndex, 'image', result.url);
    } catch (error) {
      alert('Failed to upload image: ' + error.message);
    } finally {
      setUploadingIndex(null);
    }
  };

  const handleSave = () => {
    onSave(localProjects);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Projects Management
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handleAddProject}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <FiPlus className="w-4 h-4" />
            Add Project
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
        {localProjects.map((project, index) => (
          <div key={project.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Project {index + 1}
              </h3>
              <button
                onClick={() => handleRemoveProject(index)}
                className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
              >
                <FiTrash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => handleUpdateProject(index, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={project.description}
                  onChange={(e) => handleUpdateProject(index, 'description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Live Link
                </label>
                <input
                  type="url"
                  value={project.liveLink}
                  onChange={(e) => handleUpdateProject(index, 'liveLink', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  GitHub Link
                </label>
                <input
                  type="url"
                  value={project.githubLink}
                  onChange={(e) => handleUpdateProject(index, 'githubLink', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Project Image
                </label>
                <div className="flex gap-4 items-start">
                  <div className="flex-1">
                    <input
                      type="url"
                      value={project.image}
                      onChange={(e) => handleUpdateProject(index, 'image', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Or enter image URL"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, index)}
                      className="hidden"
                      id={`project-image-${index}`}
                    />
                    <label
                      htmlFor={`project-image-${index}`}
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
                {project.image && (
                  <div className="mt-2">
                    <img 
                      src={project.image} 
                      alt="Project preview" 
                      className="w-32 h-20 object-cover rounded border border-gray-300"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
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
                  {project.technologies?.map((tech, techIndex) => (
                    <div key={techIndex} className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      <FiTag className="w-3 h-3 text-gray-500" />
                      <input
                        type="text"
                        value={tech}
                        onChange={(e) => handleUpdateTechnology(index, techIndex, e.target.value)}
                        className="bg-transparent border-none focus:outline-none text-sm w-20"
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

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={project.featured}
                  onChange={(e) => handleUpdateProject(index, 'featured', e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Featured Project
                </label>
              </div>
            </div>
          </div>
        ))}

        {localProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No projects added yet. Click "Add Project" to get started.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectsManager;