import React from 'react';
import { motion } from 'framer-motion';
import { FiBook, FiAward, FiPhone } from 'react-icons/fi';

const About = () => {
  const educationData = [
    {
      id: 1,
      institution: "Your College Name",
      degree: "Bachelor of Engineering in Computer Science",
      period: "2021 - 2025",
      status: "ongoing",
      description: "Currently pursuing my degree with focus on software development and algorithms.",
      icon: <FiBook className="w-6 h-6" />
    },
    {
      id: 2,
      institution: "12th Grade - PCMB",
      degree: "State Board",
      period: "2020 - 2021",
      status: "completed",
      description: "Completed with distinction in Physics, Chemistry, Mathematics, and Biology.",
      icon: <FiAward className="w-6 h-6" />
    },
    {
      id: 3,
      institution: "10th Grade",
      degree: "State Board",
      period: "2018 - 2019",
      status: "completed",
      description: "Secured top grades in all subjects with special interest in Mathematics and Science.",
      icon: <FiAward className="w-6 h-6" />
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
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My educational journey and passion for technology that drives me forward.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {/* Education Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-800 transform -translate-x-1/2"></div>
            
            {educationData.map((edu, index) => (
              <motion.div
                key={edu.id}
                variants={itemVariants}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-blue-600 rounded-full transform -translate-x-1/2 z-10"></div>
                
                {/* Content */}
                <div className={`ml-16 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                }`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 border-l-4 border-blue-600"
                  >
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-lg mr-4">
                        {edu.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {edu.institution}
                        </h3>
                        <p className="text-blue-600 dark:text-blue-400 font-medium">
                          {edu.degree}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-600 px-3 py-1 rounded-full">
                        {edu.period}
                      </span>
                      {edu.status === 'ongoing' && (
                        <span className="text-sm bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 px-3 py-1 rounded-full font-medium">
                          Currently Studying
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300">
                      {edu.description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Info */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-8 mt-12"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Beyond Academics
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiBook className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Self Learning</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Continuously learning new technologies and frameworks beyond curriculum
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiAward className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Projects</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Building real-world applications to solve practical problems
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiPhone className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Community</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Active participation in tech communities and open source
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;