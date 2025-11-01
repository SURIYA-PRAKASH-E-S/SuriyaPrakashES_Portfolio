import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useSkillsData } from "../hooks/usePortfolioData";
import { Cloud, fetchSimpleIcons, renderSimpleIcon } from "react-icon-cloud";

// 3D Cloud configuration
const cloudProps = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "400px",
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "default",
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.04,
    minSpeed: 0.02,
    dragControl: true,
  },
};

const renderCustomIcon = (icon, theme) => {
  const bgHex = theme === "light" ? "#f3f2ef" : "#080510";
  const fallbackHex = theme === "light" ? "#6e6e73" : "#ffffff";
  const minContrastRatio = theme === "dark" ? 2 : 1.2;

  return renderSimpleIcon({
    icon,
    bgHex,
    fallbackHex,
    minContrastRatio,
    size: 42,
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e) => e.preventDefault(),
    },
  });
};

const IconCloud = ({ iconSlugs, theme = "light" }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchSimpleIcons({ slugs: iconSlugs }).then(setData);
  }, [iconSlugs]);

  const renderedIcons = useMemo(() => {
    if (!data) return null;
    return Object.values(data.simpleIcons).map((icon) =>
      renderCustomIcon(icon, theme)
    );
  }, [data, theme]);

  return (
    <Cloud {...cloudProps}>
      <>{renderedIcons}</>
    </Cloud>
  );
};

const Skills = () => {
  const { data: skillsData, loading, error } = useSkillsData();
  const [theme, setTheme] = useState("light");

  // Default skills
  const defaultSkills = [
    { name: "JavaScript", iconSlug: "javascript" },
    { name: "TypeScript", iconSlug: "typescript" },
    { name: "React", iconSlug: "react" },
    { name: "Node.js", iconSlug: "nodedotjs" },
    { name: "Python", iconSlug: "python" },
    { name: "HTML5", iconSlug: "html5" },
    { name: "CSS3", iconSlug: "css3" },
    { name: "Tailwind CSS", iconSlug: "tailwindcss" },
    { name: "MongoDB", iconSlug: "mongodb" },
    { name: "MySQL", iconSlug: "mysql" },
    { name: "Firebase", iconSlug: "firebase" },
    { name: "AWS", iconSlug: "amazonaws" },
    { name: "Docker", iconSlug: "docker" },
    { name: "Git", iconSlug: "git" },
    { name: "GitHub", iconSlug: "github" },
    { name: "VS Code", iconSlug: "visualstudiocode" },
    { name: "Figma", iconSlug: "figma" },
    { name: "Postman", iconSlug: "postman" },
    { name: "Linux", iconSlug: "linux" },
    { name: "NPM", iconSlug: "npm" },
  ];

  const skills =
    Array.isArray(skillsData) && skillsData.length > 0
      ? skillsData
      : defaultSkills;

  const iconSlugs = skills.map((s) => s.iconSlug).filter(Boolean);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
  };

  if (loading) {
    return (
      <section id="skills" className="py-20 text-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading skills...</p>
      </section>
    );
  }

  if (error) console.error("Error loading skills data:", error);

  return (
    <section
      id="skills"
      className="relative py-20 md:py-28 bg-transparent text-center overflow-hidden"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-black mb-4">
          Skills
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-yellow-500 mx-auto mb-6 rounded-full"></div>
        <p className="text-lg text-black dark:text-black max-w-2xl mx-auto">
          Technologies I work with to build innovative digital experiences
        </p>
      </motion.div>

      {/* 3D Cloud */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative h-96 flex items-center justify-center mb-16"
      >
        {iconSlugs.length > 0 ? (
          <IconCloud iconSlugs={iconSlugs} theme={theme} />
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p>Loading 3D Tech Cloud...</p>
          </div>
        )}
      </motion.div>

      {/* Skills Buttons */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-wrap justify-center gap-4 px-6"
      >
        {skills.map((skill) => (
          <motion.button
            key={skill.name}
            variants={itemVariants}
            whileHover={{
              scale: 1.08,
              background:
                "linear-gradient(to right, #3b82f6, #a855f7, #facc15)",
              color: "#fff",
            }}
            whileTap={{ scale: 0.95 }}
            className="
              px-8 py-3
              rounded-full
              font-semibold
              text-black dark:text-black
              bg-white/30 dark:bg-gray-800/40
              backdrop-blur-md
              shadow-md hover:shadow-xl
              border border-gray-300/40 dark:border-gray-600/40
              transition-all duration-300 ease-in-out
            "
          >
            {skill.name}
          </motion.button>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;
