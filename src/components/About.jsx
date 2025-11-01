import React from 'react';
import { motion } from 'framer-motion';
import { FiBook, FiAward, FiCode } from 'react-icons/fi';
import { useAboutData } from '../hooks/usePortfolioData';

const About = () => {
  const { data: aboutData, loading, error } = useAboutData();

  const defaultEducationData = [
    {
      id: 1,
      institution: "Your College Name",
      degree: "Bachelor of Engineering in Computer Science",
      period: "2021 - 2025",
      status: "ongoing",
      description:
        "Currently pursuing my degree with focus on software development and algorithms.",
      iconType: "book",
    },
    {
      id: 2,
      institution: "12th Grade - PCMB",
      degree: "State Board",
      period: "2020 - 2021",
      status: "completed",
      description:
        "Completed with distinction in Physics, Chemistry, Mathematics, and Biology.",
      iconType: "award",
    },
    {
      id: 3,
      institution: "10th Grade",
      degree: "State Board",
      period: "2018 - 2019",
      status: "completed",
      description:
        "Secured top grades in all subjects with special interest in Mathematics and Science.",
      iconType: "award",
    },
  ];

  const educationData = aboutData?.education || defaultEducationData;

  const getIcon = (iconType) => {
    switch (iconType) {
      case "book":
        return <FiBook className="w-6 h-6" />;
      case "award":
        return <FiAward className="w-6 h-6" />;
      case "code":
        return <FiCode className="w-6 h-6" />;
      default:
        return <FiBook className="w-6 h-6" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  if (loading) {
    return (
      <section
        id="about"
        className="py-20 bg-gradient-to-br from-purple-100 via-blue-50 to-purple-200 dark:from-[#0f0c29] dark:via-[#302b63] dark:to-[#24243e] transition-colors duration-300"
      >
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-indigo-900 dark:text-blue-200">
            Loading about section...
          </p>
        </div>
      </section>
    );
  }

  if (error) console.error("Error loading about data:", error);

  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-br from-purple-100 via-blue-50 to-purple-200 dark:from-[#0f0c29] dark:via-[#302b63] dark:to-[#24243e] transition-all duration-700"
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
          <h2 className="text-4xl font-extrabold text-indigo-900 dark:text-blue-100 mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-indigo-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-800 dark:text-blue-200 max-w-2xl mx-auto">
            My educational journey and passion for technology that drives me forward.
          </p>
        </motion.div>

        {/* Timeline Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-indigo-300 dark:bg-indigo-700 transform -translate-x-1/2 transition-colors duration-300"></div>

            {educationData.map((edu, index) => (
              <motion.div
                key={edu.id || index}
                variants={itemVariants}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-indigo-600 rounded-full transform -translate-x-1/2 z-10 shadow-md"></div>

                {/* Timeline Card */}
                <div
                  className={`ml-16 md:ml-0 md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="bg-white/80 dark:bg-[#1e1e2f] rounded-xl shadow-xl p-6 border-l-4 border-indigo-600 hover:border-indigo-400 transition-all duration-300"
                  >
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-400 rounded-lg mr-4">
                        {getIcon(edu.iconType)}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-indigo-900 dark:text-blue-100">
                          {edu.institution}
                        </h3>
                        <p className="font-medium text-blue-700 dark:text-blue-300">
                          {edu.degree}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-indigo-900 dark:text-blue-200 bg-indigo-100 dark:bg-indigo-800 px-3 py-1 rounded-full">
                        {edu.period}
                      </span>
                      {edu.status === "ongoing" && (
                        <span className="text-sm bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-400 px-3 py-1 rounded-full font-medium">
                          Currently Studying
                        </span>
                      )}
                    </div>

                    <p className="text-gray-800 dark:text-blue-200 leading-relaxed">
                      {edu.description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Beyond Academics Section */}
          <motion.div
            variants={itemVariants}
            className="bg-white/80 dark:bg-[#1e1e2f] rounded-xl shadow-xl p-8 mt-12 transition-colors duration-300"
          >
            <h3 className="text-2xl font-bold text-center text-indigo-900 dark:text-blue-100 mb-6">
              Beyond Academics
            </h3>

            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiBook className="w-8 h-8 text-indigo-700 dark:text-blue-400" />
                </div>
                <h4 className="font-semibold text-indigo-900 dark:text-blue-100 mb-2">
                  Self Learning
                </h4>
                <p className="text-gray-800 dark:text-blue-200 text-sm">
                  Continuously learning new technologies and frameworks beyond curriculum. 
                  Exploring cutting-edge tools and methodologies to stay ahead in the tech landscape.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiAward className="w-8 h-8 text-green-700 dark:text-green-400" />
                </div>
                <h4 className="font-semibold text-indigo-900 dark:text-blue-100 mb-2">
                  Practical Projects
                </h4>
                <p className="text-gray-800 dark:text-blue-200 text-sm">
                  Building real-world applications to solve practical problems. 
                  Focused on creating scalable solutions with modern technologies and best practices.
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
