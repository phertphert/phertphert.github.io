import React, { memo, useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion, AnimatePresence } from "framer-motion";

const SkillBar = ({ skill }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    if (window.innerWidth < 640) {
      setIsExpanded((prev) => !prev);
    }
  };

  return (
    <motion.div
      layout
      onClick={toggleExpand}
      onMouseEnter={() => window.innerWidth >= 640 && setIsExpanded(true)}
      onMouseLeave={() => window.innerWidth >= 640 && setIsExpanded(false)}
      className="transform transition-all duration-500 group cursor-pointer space-y-2"
      data-aos="fade-up"
      data-aos-delay="500"
    >
      <motion.div
        layout
        className="p-4 rounded-xl border dark:border-transparent border-transparent dark:hover:border-white/10 hover:border-black/10 dark:hover:bg-white/5 hover:bg-black/5 backdrop-blur-sm transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
      >
        {/* Skill Name + Level */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm md:text-base font-semibold dark:text-white text-black">
            {skill.name}
          </span>
          <span className="text-sm md:text-base dark:text-gray-400 text-gray-600">
            {skill.level}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="relative w-full h-4 rounded-full bg-black/20 dark:bg-white/30 overflow-hidden mb-2">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-white/20 translate-x-[100%] group-hover:translate-x-[-100%] transition-transform duration-1000"></div>
          </div>
          <div
            className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-900 opacity-40 z-0"
            style={{ filter: "blur(10px)" }}
          ></div>
          <div
            className="h-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] z-10 relative"
            style={{ width: `${skill.level}%` }}
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-white/50 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </div>
          </div>
        </div>

        {/* Animated description */}
        <AnimatePresence>
          {isExpanded && (
            <motion.p
              key="desc"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="text-xs md:text-sm text-gray-700 dark:text-gray-300 overflow-hidden"
            >
              {skill.description}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const Skills = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const skills = [
    { name: "HTML", level: 85, description: "Markup language for structuring web content" },
    { name: "CSS", level: 75, description: "Stylesheets for layout, colors, and fonts" },
    { name: "JavaScript", level: 50, description: "Programming language for interactivity" },
    { name: "TailWindCSS", level: 40, description: "Utility-first CSS framework" },
    { name: "React", level: 20, description: "JavaScript library for building UIs" },
    { name: "Git", level: 20, description: "Version control system for tracking changes" },
  ];

  return (
    <div className="min-h-screen bg-[#f8f6f8] dark:bg-[#030014] px-[5%] py-10 pb-32 transition-colors duration-500" id="Skills">
      <div className="container mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center">
          <h1
            className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
            data-aos="fade-down"
          >
            My Skills
          </h1>
          <p
            className="text-base sm:text-lg dark:text-gray-400 text-gray-600 transition-colors duration-500 mt-4 leading-relaxed pb-4 sm:pb-0"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            A showcase of my technical expertise and the progress I’ve made in mastering various tools and technologies.
          </p>
        </div>

        {/* Skills List */}
        <div className="space-y-6">
          {skills.map((skill, index) => (
            <SkillBar key={index} skill={skill} />
          ))}
        </div>

        {/* Closing Statement */}
        <div
          className="text-center mt-10"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <p className="text-base sm:text-lg lg:text-lg dark:text-gray-400 text-gray-600 transition-colors duration-500 leading-relaxed pb-4 sm:pb-0"
            data-aos="fade-up"
            data-aos-delay="300">
            I am constantly learning and improving my skills to stay updated with the latest trends in technology.
          </p>
        </div>
      </div>
    </div>
  );
};

export default memo(Skills);