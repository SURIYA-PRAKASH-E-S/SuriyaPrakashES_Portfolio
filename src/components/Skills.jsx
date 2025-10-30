import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiCode, 
  FiDatabase, 
  FiCloud, 
  FiTool,
  FiChevronDown,
  FiChevronUp 
} from 'react-icons/fi';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');

  const skillsData = {
    frontend: {
      icon: <FiCode className="w-6 h-6" />,
      title: "Frontend Development",
      skills: [
        { name: "React", level: 90, icon: "⚛️" },
        { name: "JavaScript", level: 85, icon: "🟨" },
        { name: "TypeScript", level: 75, icon: "🔷" },
        { name: "HTML5", level: 95, icon: "🌐" },
        { name: "CSS3", level: 90, icon: "🎨" },
        { name: "Tailwind CSS", level: 88, icon: "💨" }
      ]
    },
    backend: {
      icon: <FiDatabase className="w-6 h-6" />,
      title: "Backend Development",
      skills: [
        { name: "Node.js", level: 80, icon: "🟢" },
        { name: "Express.js", level: 75, icon: "🚂" },
        { name: "Python", level: 70, icon: "🐍" },
        { name: "MongoDB", level: 75, icon: "🍃" },
        { name: "MySQL", level: 70, icon: "🐬" },
        { name: "REST APIs", level: 85, icon: "🔗" }
      ]
    },
    cloud: {
      icon: <FiCloud className="w-6 h-6" />,
      title: "Cloud & DevOps",
      skills: [
        { name: "AWS", level: 65, icon: "☁️" },
        { name: "Firebase", level: 80, icon: "🔥" },
        { name: "Docker", level: 60, icon: "🐳" },
        { name: "Git", level: 85, icon: "📚" },
        { name: "CI/CD", level: 65, icon: "🔄" }
      ]
    },
    tools: {
      icon: <FiTool className="w-6 h-6" />,
      title: "Tools & Others",
      skills: [
        { name: "GitHub", level: 90, icon: "🐙" },
        { name: "VS Code", level: 95, icon: "💻" },
        { name: "Figma", level: 70, icon: "🎨" },
        { name: "Postman", level: 80, icon: "📬" },
        { name: "Linux", level: 75, icon: "🐧" }
      ]
    }
  };

  const categories = Object.keys(skillsData);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const ProgressBar = ({ level }) => (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: true }}
        className="bg-blue-600 h-2 rounded-full"
      />
    </div>
  );

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Skills & Technologies
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Here are the technologies and tools I work with to bring ideas to life.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all ${
                activeCategory === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <div className={`p-2 rounded-lg ${
                activeCategory === category
                  ? 'bg-white/20'
                  : 'bg-white dark:bg-gray-700'
              }`}>
                {skillsData[category].icon}
              </div>
              {skillsData[category].title}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {skillsData[activeCategory].skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{skill.icon}</span>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {skill.name}
                  </h3>
                </div>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {skill.level}%
                </span>
              </div>
              <ProgressBar level={skill.level} />
            </motion.div>
          ))}
        </motion.div>

        {/* Visual Skills Display */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Technology Stack
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {Object.values(skillsData).flatMap(category => 
              category.skills.map(skill => (
                <motion.div
                  key={skill.name}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
                >
                  <span className="text-3xl mb-2">{skill.icon}</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {skill.name}
                  </span>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;