import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub, FiTag } from 'react-icons/fi';
import { useProjectsData } from '../hooks/usePortfolioData';

const Projects = () => {
  const { data: projectsData, loading, error } = useProjectsData();
  const [activeFilter, setActiveFilter] = useState('all');

  // Default data
  const defaultProjects = [
    {
      id: 1,
      title: "Portfolio Website",
      description: "A dynamic portfolio website built with React and Firebase with real-time updates.",
      image: "",
      technologies: ["React", "Firebase", "Tailwind CSS"],
      category: "frontend",
      liveLink: "#",
      githubLink: "#",
      featured: true
    }
  ];

  // Ensure projects is always an array
  const projects = Array.isArray(projectsData) ? projectsData : defaultProjects;

  const filters = [
    { key: 'all', label: 'All Projects' },
    { key: 'fullstack', label: 'Full Stack' },
    { key: 'frontend', label: 'Frontend' },
    { key: 'backend', label: 'Backend' },
    { key: 'mobile', label: 'Mobile' }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  if (loading) {
    return (
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    console.error('Error loading projects:', error);
  }

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            My Projects
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and experience.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        {projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeFilter === filter.key
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </motion.div>
        )}

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id || index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                {/* Project Image */}
                <div className="relative group">
                  <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                    {project.image ? (
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <span className="text-gray-400">Project Image</span>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-4">
                      <a
                        href={project.liveLink || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white text-gray-900 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
                      >
                        <FiExternalLink className="w-5 h-5" />
                      </a>
                      <a
                        href={project.githubLink || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white text-gray-900 rounded-full hover:bg-gray-900 hover:text-white transition-colors"
                      >
                        <FiGithub className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                  {project.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  {project.technologies && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full text-sm"
                        >
                          <FiTag className="w-3 h-3" />
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Project Links */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                    <a
                      href={project.liveLink || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                    >
                      <FiExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                    <a
                      href={project.githubLink || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    >
                      <FiGithub className="w-4 h-4" />
                      Code
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No projects found. Projects will appear here once added.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;