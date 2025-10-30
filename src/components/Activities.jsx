import React from 'react';
import { motion } from 'framer-motion';
import { FiBriefcase, FiAward, FiActivity } from 'react-icons/fi';

const Activities = () => {
  const internships = [
    {
      id: 1,
      company: "Tech Solutions Inc.",
      role: "Frontend Developer Intern",
      location: "Remote",
      period: "Jun 2023 - Aug 2023",
      description: "Developed responsive web applications using React.js and collaborated with the design team to implement user interfaces."
    },
    {
      id: 2,
      company: "StartUp Ventures",
      role: "Full Stack Intern",
      location: "Chennai, India",
      period: "Jan 2023 - Mar 2023",
      description: "Worked on both frontend and backend development, contributing to various projects using MERN stack."
    }
  ];

  const certifications = [
    {
      id: 1,
      name: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "2023",
      link: "#"
    },
    {
      id: 2,
      name: "Google Cloud Digital Leader",
      issuer: "Google Cloud",
      date: "2023",
      link: "#"
    },
    {
      id: 3,
      name: "React Developer Certification",
      issuer: "Meta",
      date: "2022",
      link: "#"
    }
  ];

  const activities = [
    {
      id: 1,
      type: "co-curricular",
      title: "Hackathon Winner",
      organization: "TechFest 2023",
      description: "Won first prize in the annual coding competition with a team of 4 members.",
      date: "2023"
    },
    {
      id: 2,
      type: "extra-curricular",
      title: "Open Source Contributor",
      organization: "GitHub",
      description: "Active contributor to various open source projects, focusing on React and Node.js ecosystems.",
      date: "2022-Present"
    },
    {
      id: 3,
      type: "co-curricular",
      title: "Technical Speaker",
      organization: "College Tech Club",
      description: "Regularly conduct workshops and sessions on web development and new technologies.",
      date: "2022-Present"
    }
  ];

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

  return (
    <section id="activities" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Experience & Activities
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My professional journey, certifications, and involvement in various activities.
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
          <div>
            <motion.div variants={itemVariants} className="flex items-center mb-8">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-lg mr-4">
                <FiBriefcase className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Internships
              </h3>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {internships.map((internship) => (
                <motion.div
                  key={internship.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 border-l-4 border-green-500"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {internship.role}
                    </h4>
                    <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded">
                      {internship.period}
                    </span>
                  </div>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                    {internship.company} • {internship.location}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {internship.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <motion.div variants={itemVariants} className="flex items-center mb-8">
                <div className="p-3 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-lg mr-4">
                  <FiAward className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Certifications
                </h3>
              </motion.div>

              <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-6">
                {certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 text-center group hover:shadow-xl transition-shadow"
                  >
                    <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiAward className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {cert.name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                      {cert.issuer}
                    </p>
                    <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded">
                      {cert.date}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          )}

          {/* Co-curricular & Extra-curricular Activities */}
          <div>
            <motion.div variants={itemVariants} className="flex items-center mb-8">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 rounded-lg mr-4">
                <FiActivity className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Activities
              </h3>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.map((activity) => (
                <motion.div
                  key={activity.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className={`bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 border-t-4 ${
                    activity.type === 'co-curricular' 
                      ? 'border-blue-500' 
                      : 'border-green-500'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${
                      activity.type === 'co-curricular'
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                        : 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400'
                    }`}>
                      {activity.type === 'co-curricular' ? 'Co-curricular' : 'Extra-curricular'}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.date}
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {activity.title}
                  </h4>
                  <p className="text-blue-600 dark:text-blue-400 text-sm mb-2">
                    {activity.organization}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {activity.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Activities;