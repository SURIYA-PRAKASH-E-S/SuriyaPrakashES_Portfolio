import React from 'react';
import { motion } from 'framer-motion';
import { FiGlobe, FiGithub, FiTag, FiExternalLink } from 'react-icons/fi';
import { useProjectsData } from '../hooks/usePortfolioData';

const Projects = () => {
  const { data: projectsData, loading, error } = useProjectsData();

  // Default projects
  const defaultProjects = [
    {
      id: 1,
      title: "Portfolio Website",
      description:
        "A dynamic portfolio website built with React and Firebase, featuring real-time updates, animations, and responsive design.",
      image: "",
      technologies: ["React", "Firebase", "Tailwind CSS", "Framer Motion"],
      liveLink: "#",
      githubLink: "#",
      featured: true,
    },

  ];

  const projects = Array.isArray(projectsData) ? projectsData : defaultProjects;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      } 
    },
  };

  // Loading state
  if (loading) {
    return (
      <section id="projects" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-900 via-purple-900/80 to-blue-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-purple-200 text-sm sm:text-base">Loading projects...</p>
        </div>
      </section>
    );
  }

  if (error) console.error('Error loading projects:', error);

  return (
    <section
      id="projects"
      className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-900 via-purple-900/80 to-blue-900 transition-colors duration-300"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2
            className="
              text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold 
              text-gray-900 dark:text-gray-100 bg-gradient-to-r from-purple-300 via-blue-300 to-violet-300 bg-clip-text
              mb-3 sm:mb-4
            "
          >
            My Projects
          </h2>
          <div className="w-16 sm:w-20 lg:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-purple-400 via-blue-400 to-violet-400 mx-auto mb-4 sm:mb-6 rounded-full"></div>
          <p
            className="
              text-base sm:text-lg lg:text-xl max-w-2xl mx-auto 
              text-purple-100 px-4
            "
          >
            Here are some of my projects showcasing my development skills and creativity.
          </p>
        </motion.div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id || index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                className="
                  group relative 
                  bg-gradient-to-br from-gray-800/60 via-purple-900/40 to-blue-900/50
                  rounded-lg sm:rounded-xl lg:rounded-2xl 
                  shadow-lg overflow-hidden 
                  border border-purple-500/30
                  transition-all duration-300 
                  hover:shadow-2xl hover:shadow-purple-500/20
                  backdrop-blur-sm sm:backdrop-blur-md
                  min-h-[300px] sm:min-h-[350px]
                "
              >
                {/* Image or Placeholder */}
                <div className="relative h-36 sm:h-44 md:h-48 lg:h-52 xl:h-56 bg-gradient-to-br from-purple-800 via-blue-900 to-gray-900 flex items-center justify-center overflow-hidden">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : (
                    <div className="text-purple-100 text-center p-3 sm:p-4 flex flex-col items-center justify-center">
                      <FiGlobe className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 opacity-80" />
                      <span className="text-xs sm:text-sm font-medium opacity-90">
                        Project Preview
                      </span>
                    </div>
                  )}
                  
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                      <span className="bg-gradient-to-r from-purple-400 to-blue-400 text-gray-900 px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
                        Featured
                      </span>
                    </div>
                  )}
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300"></div>

                  {/* Mobile Quick Actions */}
                  <div className="sm:hidden absolute top-2 right-2 flex gap-2">
                    {project.liveLink && project.liveLink !== '#' && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          p-2 rounded-full 
                          bg-purple-600/80 
                          text-white 
                          backdrop-blur-sm
                          transition-all hover:bg-purple-500
                        "
                        title="Live Demo"
                      >
                        <FiExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {project.githubLink && project.githubLink !== '#' && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          p-2 rounded-full 
                          bg-blue-600/80 
                          text-white 
                          backdrop-blur-sm
                          transition-all hover:bg-blue-500
                        "
                        title="GitHub Repo"
                      >
                        <FiGithub className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-4 sm:p-5 lg:p-6">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-100 mb-2 sm:mb-3 line-clamp-1">
                    {project.title}
                  </h3>

                  {/* Description - visible on mobile, hidden on hover for desktop */}
                  <p className="text-purple-200 text-sm sm:text-base mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 lg:hidden">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="
                          flex items-center gap-1 px-2 py-1 
                          bg-purple-500/30 
                          text-purple-200 
                          rounded-full text-xs
                          border border-purple-400/50
                          whitespace-nowrap
                        "
                      >
                        <FiTag className="w-2 h-2 sm:w-3 sm:h-3 flex-shrink-0" /> 
                        <span className="truncate max-w-[80px] sm:max-w-none">{tech}</span>
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="
                        px-2 py-1 
                        bg-blue-500/20 text-blue-200 
                        rounded-full text-xs 
                        border border-blue-400/30
                        whitespace-nowrap
                      ">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Desktop Hover Overlay */}
                <div className="
                  hidden lg:flex
                  absolute inset-0 
                  bg-gradient-to-br from-gray-900/95 via-purple-900/90 to-blue-900/95 
                  backdrop-blur-md text-purple-100 
                  flex-col items-center justify-center text-center 
                  opacity-0 group-hover:opacity-100 
                  transition-all duration-300 
                  p-4 sm:p-6
                ">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-white">
                    {project.title}
                  </h3>
                  <p className="text-purple-200 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 line-clamp-4 sm:line-clamp-5">
                    {project.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-3 sm:gap-4 lg:gap-5">
                    <a
                      href={project.liveLink || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        p-2 sm:p-3 rounded-full 
                        bg-gradient-to-r from-purple-500 to-blue-500 
                        hover:from-purple-600 hover:to-blue-600 
                        text-white transition-all 
                        shadow-lg hover:shadow-xl hover:scale-110
                        transform transition-transform duration-300
                        flex items-center justify-center
                      "
                      title="Live Demo"
                    >
                      <FiGlobe className="w-4 h-4 sm:w-5 sm:h-5" />
                    </a>

                    <a
                      href={project.githubLink || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        p-2 sm:p-3 rounded-full 
                        bg-gradient-to-r from-blue-500 to-purple-500 
                        hover:from-blue-600 hover:to-purple-600 
                        text-white transition-all 
                        shadow-lg hover:shadow-xl hover:scale-110
                        transform transition-transform duration-300
                        flex items-center justify-center
                      "
                      title="GitHub Repo"
                    >
                      <FiGithub className="w-4 h-4 sm:w-5 sm:h-5" />
                    </a>
                  </div>

                  {project.featured && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-gradient-to-r from-purple-400 to-blue-400 text-gray-900 px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Mobile Bottom Actions */}
                <div className="lg:hidden border-t border-purple-500/20 p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-purple-300 text-xs">
                      {project.technologies.length} technologies
                    </span>
                    <div className="flex gap-2">
                      {project.liveLink && project.liveLink !== '#' && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            text-purple-300 hover:text-purple-200 
                            transition-colors duration-200
                            text-xs flex items-center gap-1
                          "
                        >
                          <FiExternalLink className="w-3 h-3" />
                          <span>Live</span>
                        </a>
                      )}
                      {project.githubLink && project.githubLink !== '#' && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            text-blue-300 hover:text-blue-200 
                            transition-colors duration-200
                            text-xs flex items-center gap-1
                          "
                        >
                          <FiGithub className="w-3 h-3" />
                          <span>Code</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-8 sm:py-12 lg:py-16">
            <p className="text-purple-200 text-base sm:text-lg lg:text-xl">
              No projects found. Projects will appear here once added.
            </p>
          </div>
        )}

        {/* View More Button for mobile when many projects */}
        {projects.length > 3 && (
          <div className="lg:hidden text-center mt-8">
            <button className="
              text-purple-300 hover:text-purple-200 
              text-sm font-medium
              transition-colors duration-200
              underline
            ">
              View All Projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;