import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, ExternalLink, Github, Code2, Star,
  ChevronRight, Layers, Layout, Globe, Package, Cpu, Code,
} from "lucide-react";
import Swal from 'sweetalert2';
import ThemeToggle from "./ThemeToggle";
import lightIcon from "../assets/light-icon.png"; // Replace with your light mode icon
import darkIcon from "../assets/dark-icon.png"; // Replace with your dark mode icon

const TECH_ICONS = {
  React: Globe,
  Tailwind: Layout,
  Express: Cpu,
  Python: Code,
  Javascript: Code,
  HTML: Code,
  CSS: Code,
  default: Package,
};

const TechBadge = ({ tech }) => {
  const Icon = TECH_ICONS[tech] || TECH_ICONS["default"];
  
  return (
    <div className="group relative overflow-hidden px-3 py-2 md:px-4 md:py-2.5 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300 cursor-default">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500" />
      <div className="relative flex items-center gap-1.5 md:gap-2">
        <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 dark:text-blue-400 text-blue-500 dark:group-hover:text-blue-300 group-hover:text-blue-600 transition-colors duration-500" />
        <span className="text-xs md:text-sm font-medium dark:text-blue-300/90 text-blue-500/90 dark:group-hover:text-blue-200 group-hover:text-blue-700 transition-colors duration-500">
          {tech}
        </span>
      </div>
    </div>
  );
};

const FeatureItem = ({ feature }) => {
  return (
    <li className="group flex items-start space-x-3 p-2.5 md:p-3.5 rounded-xl dark:hover:bg-white/5 hover:bg-black/5 transition-all duration-300 border border-transparent dark:hover:border-white/10 hover:border-black/10">
      <div className="relative mt-2">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
        <div className="relative w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 group-hover:scale-125 transition-transform duration-300" />
      </div>
      <span className="text-sm md:text-base dark:text-gray-300 text-gray-700 dark:group-hover:text-white group-hover:text-black transition-colors duration-500">
        {feature}
      </span>
    </li>
  );
};

const ProjectStats = ({ project }) => {
  const techStackCount = project?.TechStack?.length || 0;
  const featuresCount = project?.Features?.length || 0;

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 p-3 md:p-4 dark:bg-[#0a0a1a] bg-[#f8f6f8] rounded-xl overflow-hidden relative transition-colors duration-500">
      <div className="absolute inset-0 bg-gradient-to-br dark:from-blue-900/20 from-blue-900/40 dark:to-purple-900/20 to-purple-600/40 opacity-50 blur-2xl z-0 transition-colors duration-500" />

      <div className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-white/5 p-2 md:p-3 rounded-lg border border-blue-500/20 transition-all duration-300 hover:scale-105 hover:border-blue-500/50 hover:shadow-lg">
        <div className="bg-blue-500/20 p-1.5 md:p-2 rounded-full">
          <Code2 className="dark:text-blue-300 text-blue-700 w-4 h-4 md:w-6 md:h-6 transition-colors duration-500" strokeWidth={1.5} />
        </div>
        <div className="flex-grow">
          <div className="text-lg md:text-xl font-semibold dark:text-blue-200 text-blue-600 transition-colors duration-500">{techStackCount}</div>
          <div className="text-[10px] md:text-xs dark:text-gray-400 text-gray-600 transition-colors duration-500">Languages Used</div>
        </div>
      </div>

      <div className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-white/5 p-2 md:p-3 rounded-lg border border-purple-500/20 transition-all duration-300 hover:scale-105 hover:border-purple-500/50 hover:shadow-lg">
        <div className="bg-purple-500/20 p-1.5 md:p-2 rounded-full">
          <Layers className="dark:text-purple-300 text-purple-700 w-4 h-4 md:w-6 md:h-6 transition-colors duration-500" strokeWidth={1.5} />
        </div>
        <div className="flex-grow">
          <div className="text-lg md:text-xl font-semibold dark:text-purple-200 text-purple-600 transition-colors duration-300">{featuresCount}</div>
          <div className="text-[10px] md:text-xs dark:text-gray-400 text-gray-600 transition-colors duration-300">Features</div>
        </div>
      </div>
    </div>
  );
};

const handleGithubClick = (githubLink) => {
  if (githubLink === 'Private') {
    Swal.fire({
      icon: 'info',
      title: 'Source Code Private',
      text: 'Maaf, source code untuk proyek ini bersifat privat.',
      confirmButtonText: 'Mengerti',
      confirmButtonColor: '#3085d6',
      background: '#030014',
      color: '#ffffff'
    });
    return false;
  }
  return true;
};

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const storedFGProjects = JSON.parse(localStorage.getItem("fgprojects")) || [];
    const storedMGProjects = JSON.parse(localStorage.getItem("mgprojects")) || [];
    const storedFINALProjects = JSON.parse(localStorage.getItem("finalprojects")) || [];
    const selectedFGProject = storedFGProjects.find((p) => String(p.id) === id);
    const selectedMGProject = storedMGProjects.find((p) => String(p.id) === id);
    const selectedFINALProject = storedFINALProjects.find((p) => String(p.id) === id);
    
    if (selectedFGProject) {
      const enhancedFGProject = {
        ...selectedFGProject,
        Features: selectedFGProject.Features || [],
        TechStack: selectedFGProject.TechStack || [],
        Github: selectedFGProject.Github || 'https://github.com/phertphert',
      };
      setProject(enhancedFGProject);
    }

    if (selectedMGProject) {
      const enhancedMGProject = {
        ...selectedMGProject,
        Features: selectedMGProject.Features || [],
        TechStack: selectedMGProject.TechStack || [],
        Github: selectedMGProject.Github || 'https://github.com/phertphert',
      };
      setProject(enhancedMGProject);
    }

    if (selectedFINALProject) {
      const enhancedFINALProject = {
        ...selectedFINALProject,
        Features: selectedFINALProject.Features || [],
        TechStack: selectedFINALProject.TechStack || [],
        Github: selectedFINALProject.Github || 'https://github.com/phertphert',
      };
      setProject(enhancedFINALProject);
    }
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen dark:bg-[#030014] bg-[#f8f6f8] flex items-center justify-center transition-colors duration-500">
        <div className="text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 md:w-24 md:h-24 mx-auto border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
          <h2 className="text-xl md:text-3xl font-bold dark:text-white text-black">Loading Project...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen dark:bg-[#030014] bg-[#f8f6f8] px-[2%] sm:px-0 relative overflow-hidden transition-colors duration-500">
      {/* Background animations remain unchanged */}
      <div className="fixed inset-0">
        <div className="absolute -inset-[10px] opacity-20">
          <div className="absolute top-0 -left-4 w-72 md:w-96 h-72 md:h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
          <div className="absolute top-0 -right-4 w-72 md:w-96 h-72 md:h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 md:w-96 h-72 md:h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
        </div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
      </div>
      <div className="fixed bottom-10 right-4 w-12 h-12 rounded-full bg-gray-800 border-gray-200 dark:border-gray-800 dark:bg-gray-200 flex items-center justify-center shadow-lg transition-colors duration-500 z-50 overflow-hidden">
        <ThemeToggle lightIcon={lightIcon} darkIcon={darkIcon}/>
      </div>
      <div className="relative pt-20 md:pt-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
          <div
            className="fixed top-0 left-0 w-full flex items-center space-x-2 md:space-x-4 px-4 md:px-6 py-4 md:py-6 bg-[#f8f6f8]/50 dark:bg-[#030014]/50 shadow-lg z-50 backdrop-blur-xl animate-fadeIn transition-colors duration-500"
          >
            <button
              onClick={() => navigate(-1)}
              className="group inline-flex items-center space-x-1.5 md:space-x-2 px-3 md:px-5 py-2 md:py-2.5 dark:bg-white/5 bg-black/5 backdrop-blur-xl rounded-xl dark:text-white/90 text-black/90 dark:hover:bg-white/10 hover:bg-black/10 transition-all duration-500 border border-white/10 dark:hover:border-white/20 hover:border-black/20 text-sm md:text-base"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform"/>
              <span>Back</span>
            </button>
            <div className="flex items-center space-x-1 md:space-x-2 text-sm md:text-base dark:text-white/50 text-black/50 transition-colors duration-500">
              <span>Projects</span>
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
              <span className="dark:text-white/90 text-black/90 truncate transition-colors duration-500">
                {project.Title}
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-16">
            <div className="space-y-6 md:space-y-10 animate-slideInLeft">
              <div className="space-y-4 md:space-y-6">
                <h1 className="text-3xl md:text-6xl font-bold bg-gradient-to-r dark:from-blue-200 from-blue-800 dark:via-purple-200 via-purple-600 dark:to-pink-200 to-pink-600 bg-clip-text text-transparent leading-tight transition-colors duration-500">
                  {project.Title}
                </h1>
                <div className="relative h-1 w-16 md:w-24">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm" />
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-base md:text-lg dark:text-gray-300/90 text-gray-700/90 leading-relaxed transition-colors duration-500">
                  {project.Description}
                </p>
              </div>

              <ProjectStats project={project} />

              <div className="flex flex-wrap gap-3 md:gap-4">
                {/* Action buttons */}
                <a
                  href={project.Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center space-x-1.5 md:space-x-2 px-4 md:px-8 py-2.5 md:py-4 bg-gradient-to-r dark:from-blue-600/10 from-blue-600/20 dark:to-purple-600/10 to-purple-600/20 dark:hover:from-blue-600/20 hover:from-blue-600/30 dark:hover:to-purple-600/20 hover:to-purple-600/30 dark:text-blue-300 text-blue-700 rounded-xl transition-all duration-500 border border-blue-500/20 hover:border-blue-500/40 backdrop-blur-xl overflow-hidden text-sm md:text-base"
                >
                  <div className="absolute inset-0 translate-y-[100%] bg-gradient-to-r from-blue-600/10 to-purple-600/10 transition-transform duration-300 group-hover:translate-y-[0%]" />
                  <ExternalLink className="relative w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
                  <span className="relative font-medium">Live Demo</span>
                </a>

                <a
                  href={project.Github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center space-x-1.5 md:space-x-2 px-4 md:px-8 py-2.5 md:py-4 bg-gradient-to-r dark:from-purple-600/10 from-purple-600/20 dark:to-pink-600/10 to-pink-600/20 dark:hover:from-purple-600/20 hover:from-purple-600/30 dark:hover:to-pink-600/20 hover:to-pink-600/30 dark:text-purple-300 text-purple-700 rounded-xl transition-all duration-500 border border-purple-500/20 hover:border-purple-500/40 backdrop-blur-xl overflow-hidden text-sm md:text-base"
                  onClick={(e) => !handleGithubClick(project.Github) && e.preventDefault()}
                >
                  <div className="absolute inset-0 translate-y-[100%] bg-gradient-to-r from-purple-600/10 to-pink-600/10 transition-transform duration-300 group-hover:translate-y-[0%]" />
                  <Github className="relative w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
                  <span className="relative font-medium">Github</span>
                </a>
              </div>

              <div className="space-y-4 md:space-y-6">
                <h3 className="text-lg md:text-xl font-semibold dark:text-white/90 text-black/90 mt-[3rem] md:mt-0 flex items-center gap-2 md:gap-3 transition-colors duration-500">
                  <Code2 className="w-4 h-4 md:w-5 md:h-5 dark:text-blue-400 text-blue-600 transition-colors duration-500" />
                  Technologies Used
                </h3>
                {project.TechStack.length > 0 ? (
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {project.TechStack.map((tech, index) => (
                      <TechBadge key={index} tech={tech} />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm md:text-base dark:text-gray-400 text-gray-600 opacity-50 transition-colors duration-500">No technologies added.</p>
                )}
              </div>
            </div>

            <div className="space-y-6 md:space-y-10 animate-slideInRight">
              <div className="relative rounded-2xl overflow-hidden border dark:border-white/10 border-black/10 shadow-2xl group transition-colors duration-300">
              
                <div className="absolute inset-0 bg-gradient-to-t dark:from-[#030014] from-[#f8f6f8] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={project.Img}
                  alt={project.Title}
                  className="w-full  object-cover transform transition-transform duration-700 will-change-transform group-hover:scale-105"
                  onLoad={() => setIsImageLoaded(true)}
                />
                <div className="absolute inset-0 border-2 dark:border-white/0 border-black/0 dark:group-hover:border-white/10 group-hover:border-black/10 transition-colors duration-300 rounded-2xl" />
              </div>

              {/* Features */}
              <div className="dark:bg-white/[0.02] bg-black/[0.02] backdrop-blur-xl rounded-2xl p-8 border dark:border-white/10 border-black/10 space-y-6 dark:hover:border-white/20 hover:border-black/20 transition-all duration-300 group">
                <h3 className="text-xl font-semibold dark:text-white/90 text-black/90 flex items-center gap-3 trabnsition-colors duration-500">
                  <Star className="w-5 h-5 dark:text-yellow-400 text-yellow-500 group-hover:rotate-[20deg] transition-transform duration-300" />
                  Key Features
                </h3>
                {project.Features.length > 0 ? (
                  <ul className="list-none space-y-2">
                    {project.Features.map((feature, index) => (
                      <FeatureItem key={index} feature={feature} />
                    ))}
                  </ul>
                ) : (
                  <p className="dark:text-gray-400 text-gray-800 opacity-50 transition-colors duration-500">No description added.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`

        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 10s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fadeIn {
          animation: fadeIn 0.7s ease-out;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.7s ease-out;
        }
        .animate-slideInRight {
          animation: slideInRight 0.7s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectDetails;
