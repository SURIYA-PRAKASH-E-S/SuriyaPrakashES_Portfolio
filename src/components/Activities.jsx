import React from 'react';
import { motion } from 'framer-motion';
import { FiBriefcase, FiAward, FiActivity } from 'react-icons/fi';
import { useActivitiesData } from '../hooks/usePortfolioData';

const Activities = () => {
  const { data: activitiesData, loading, error } = useActivitiesData();

  // Default data
  const defaultInternships = [
    {
      id: 1,
      role: "Web Development Intern",
      company: "Tostot Software Solutions",
      location: "Hybrid",
      period: "2023",
      description:
        "Revamped a website for a client using HTML, Bootstrap, CSS, and JavaScript. Focused on improving user experience and responsiveness.",
      technologies: ["HTML", "Bootstrap", "CSS", "JavaScript"],
    },
  ];

  const defaultCertifications = [];
  const defaultActivities = [];

  const internships = activitiesData?.internships || defaultInternships;
  const certifications = activitiesData?.certifications || defaultCertifications;
  const activities = activitiesData?.curricular || defaultActivities;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  if (loading) {
    return (
      <section
        id="experience"
        className="py-20 bg-slate-950 text-white transition-colors duration-300"
      >
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading experience...</p>
        </div>
      </section>
    );
  }

  if (error) console.error('Error loading experience data:', error);

  const hasInternships = internships && internships.length > 0;
  const hasCertifications = certifications && certifications.length > 0;
  const hasActivities = activities && activities.length > 0;

  if (!hasInternships && !hasCertifications && !hasActivities) return null;

  return (
    <section
      id="experience"
      className="py-20 bg-white transition-colors duration-500 dark:bg-slate-950"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Work Experience
          </h2>
          <div className="w-24 h-1 bg-sky-500 mx-auto mb-6"></div>
          <p className="text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            A showcase of my internships, certifications, and various activities that have shaped my professional journey.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-16"
        >
          {/* Internships */}
          {hasInternships && (
            <div>
              <motion.div variants={itemVariants} className="flex items-center mb-8">
                <div className="p-3 bg-sky-100 text-sky-700 rounded-lg mr-4 dark:bg-sky-900/60 dark:text-sky-300">
                  <FiBriefcase className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Internships
                </h3>
              </motion.div>

              <div className="space-y-8">
                {internships.map((internship) => (
                  <motion.div
                    key={internship.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.01 }}
                    className="
                      bg-white dark:bg-slate-900/70
                      rounded-xl shadow-lg p-6
                      border-l-4 border-sky-500
                      transition-all duration-300
                    "
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-4">
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                          {internship.role}
                        </h4>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-slate-700 dark:text-slate-300">
                          <span className="font-medium">{internship.company}</span>
                          <span className="hidden sm:inline">•</span>
                          <span>{internship.location}</span>
                        </div>
                      </div>
                      <span
                        className="
                          text-sm font-semibold text-sky-700 dark:text-sky-300
                          bg-sky-100 dark:bg-sky-900/60
                          px-4 py-2 rounded-full shadow-sm
                          transition-all duration-300 hover:bg-sky-200 dark:hover:bg-sky-800
                          hover:scale-105 cursor-pointer
                        "
                      >
                        {internship.period}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sky-700 dark:text-sky-300 mb-4 leading-relaxed transition-colors duration-300">
                        {internship.description}
                    </p>


                    {/* Tech badges */}
                    {internship.technologies && internship.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {internship.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="
                              px-3 py-1 bg-sky-100 dark:bg-sky-900/70
                              text-sky-700 dark:text-sky-300
                              rounded-full text-sm font-medium
                            "
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {hasCertifications && (
            <div>
              <motion.div variants={itemVariants} className="flex items-center mb-8">
                <div className="p-3 bg-emerald-100 text-emerald-700 rounded-lg mr-4 dark:bg-emerald-900/50 dark:text-emerald-300">
                  <FiAward className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Certifications
                </h3>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="
                      bg-white dark:bg-slate-900/70 rounded-xl shadow-lg p-6 text-center
                      border border-slate-200 dark:border-slate-700
                      hover:shadow-xl transition-all duration-300
                    "
                  >
                    <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/60 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiAward className="w-6 h-6 text-amber-600 dark:text-amber-300" />
                    </div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2 line-clamp-2">
                      {cert.name}
                    </h4>
                    <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
                      {cert.issuer}
                    </p>
                    <span className="inline-block text-xs text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                      {cert.date}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          )}

          {/* Activities */}
          {hasActivities && (
            <div>
              <motion.div variants={itemVariants} className="flex items-center mb-8">
                <div className="p-3 bg-violet-100 text-violet-700 rounded-lg mr-4 dark:bg-violet-900/50 dark:text-violet-300">
                  <FiActivity className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Activities
                </h3>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6">
                {activities.map((activity) => (
                  <motion.div
                    key={activity.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    className={`
                      bg-white dark:bg-slate-900/70 
                      rounded-xl shadow-lg p-6 
                      border-t-4 transition-all duration-300
                      ${
                        activity.type === 'co-curricular'
                          ? 'border-sky-500'
                          : 'border-emerald-500'
                      }
                    `}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span
                        className={`
                          text-xs font-semibold px-3 py-1 rounded-full
                          ${
                            activity.type === 'co-curricular'
                              ? 'bg-sky-100 dark:bg-sky-900/60 text-sky-700 dark:text-sky-300'
                              : 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300'
                          }
                        `}
                      >
                        {activity.type === 'co-curricular'
                          ? 'Co-curricular'
                          : 'Extra-curricular'}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                      {activity.title}
                    </h4>
                    <p className="text-sky-700 dark:text-sky-300 text-sm font-medium mb-2">
                      {activity.organization}
                    </p>

                    <p
                      className="
                        text-slate-700 dark:text-slate-300 text-sm leading-relaxed
                        transition-all duration-300
                        hover:text-slate-900 dark:hover:text-slate-100
                      "
                    >
                      {activity.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Activities;
