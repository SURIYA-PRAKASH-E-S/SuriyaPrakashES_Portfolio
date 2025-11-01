import React from 'react';
import { motion } from 'framer-motion';
import { FiGlobe, FiGithub, FiTag } from 'react-icons/fi';
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
    {
      id: 2,
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with authentication, payments, and admin dashboard using modern web technologies.",
      image: "",
      technologies: ["Next.js", "Node.js", "MongoDB", "Stripe"],
      liveLink: "#",
      githubLink: "#",
      featured: false,
    },
    {
      id: 3,
      title: "Task Management App",
      description:
        "A collaborative productivity app for managing projects and deadlines in real-time.",
      image: "",
      technologies: ["React", "Socket.io", "Express", "PostgreSQL"],
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
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-gradient-to-br from-gray-900 via-purple-900/80 to-blue-900">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-purple-200">Loading projects...</p>
        </div>
      </section>
    );
  }

  if (error) console.error('Error loading projects:', error);

  return (
    <section
      id="projects"
      className="py-20 bg-gradient-to-br from-gray-900 via-purple-900/80 to-blue-900 transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="
              text-3xl md:text-4xl font-bold 
              text-transparent bg-gradient-to-r from-purple-300 via-blue-300 to-violet-300 bg-clip-text
              mb-4
            "
          >
            My Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 via-blue-400 to-violet-400 mx-auto mb-6 rounded-full"></div>
          <p
            className="
              text-lg max-w-2xl mx-auto 
              text-purple-100
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
            viewport={{ once: true }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id || index}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                className="
                  group relative bg-gradient-to-br from-gray-800/60 via-purple-900/40 to-blue-900/50
                  rounded-xl shadow-lg overflow-hidden 
                  border border-purple-500/30
                  transition-transform duration-300 hover:shadow-2xl hover:shadow-purple-500/30
                  backdrop-blur-md
                "
              >
                {/* Image or Placeholder */}
                <div className="relative h-44 sm:h-48 md:h-52 lg:h-56 bg-gradient-to-br from-purple-800 via-blue-900 to-gray-900 flex items-center justify-center overflow-hidden">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => (e.target.style.display = 'none')}
                    />
                  ) : (
                    <div className="text-purple-100 text-center p-4">
                      <FiGlobe className="w-10 h-10 mx-auto mb-2 opacity-80" />
                      <span className="text-sm font-medium opacity-90">
                        Project Preview
                      </span>
                    </div>
                  )}
                  {project.featured && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-gradient-to-r from-purple-400 to-blue-400 text-gray-900 px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
                        Featured
                      </span>
                    </div>
                  )}
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300"></div>
                </div>

                {/* Project Info */}
                <div className="p-5 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-purple-100 mb-3">
                    {project.title}
                  </h3>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="
                          flex items-center gap-1 px-2 py-1 
                          bg-purple-500/30 
                          text-purple-200 
                          rounded-full text-xs font-medium
                          border border-purple-400/50
                        "
                      >
                        <FiTag className="w-3 h-3" /> {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-200 rounded-full text-xs font-medium border border-blue-400/30">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-purple-900/90 to-blue-900/95 backdrop-blur-md text-purple-100 flex flex-col items-center justify-center text-center opacity-0 group-hover:opacity-100 transition-all duration-300 p-6">
                  <h3 className="text-xl font-bold mb-3 text-white">{project.title}</h3>
                  <p className="text-purple-200 text-sm leading-relaxed mb-6 line-clamp-4">
                    {project.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-5">
                    <a
                      href={project.liveLink || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="
                        p-3 rounded-full 
                        bg-gradient-to-r from-purple-500 to-blue-500 
                        hover:from-purple-600 hover:to-blue-600 
                        text-white transition-all shadow-lg hover:shadow-xl hover:scale-110
                        transform transition-transform duration-300
                      "
                      title="Live Demo"
                    >
                      <FiGlobe className="w-5 h-5" />
                    </a>

                    <a
                      href={project.githubLink || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="
                        p-3 rounded-full 
                        bg-gradient-to-r from-blue-500 to-purple-500 
                        hover:from-blue-600 hover:to-purple-600 
                        text-white transition-all shadow-lg hover:shadow-xl hover:scale-110
                        transform transition-transform duration-300
                      "
                      title="GitHub Repo"
                    >
                      <FiGithub className="w-5 h-5" />
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
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-purple-200 text-lg">
              No projects found. Projects will appear here once added.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;