import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';

const MGProject = ({ Img, Title, Description, Link: ProjectLink, id, ProjDate }) => {
  const handleLiveDemo = (e) => {
    if (!ProjectLink) {
      console.log("ProjectLink empty");
      e.preventDefault();
      alert("Live demo link N/A");
    }
  };
  
  const handleDetails = (e) => {
    if (!id) {
      console.log("ID empty");
      e.preventDefault();
      alert("Project details N/A");
    }
  };

  const handleLink = (e) => {
    if (!ProjectLink) {
      e.preventDefault();
      alert("No link available");
    }
  };
  
  console.log("MGCardProject Date prop:", ProjDate);

  return (
    <div className="group relative w-full">
            
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br dark:from-slate-900/10 from-slate-100/10 dark:to-slate-800/10 to-slate-200/10 backdrop-blur-lg border dark:border-white/10 border-black/20 shadow-2xl transition-all duration-500 dark:hover:shadow-purple-500/20 hover:shadow-purple-500/20">
        <div className="absolute inset-0 bg-gradient-to-br dark:from-blue-500/20 from-blue-500/20 dark:via-purple-500/20 via-purple-500/20 dark:to-pink-500/20 to-pink-500/20 opacity-50 dark:opacity-50 dark:group-hover:opacity-70 group-hover:opacity-70 transition-all duration-500"></div>
    
        <div className="relative p-5 z-10">
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={Img}
              alt={Title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 dark:text-white/90 text-black/90"
            />
          </div>
          
          {/* Title and Date aligned horizontally */}
          <div className="mt-4 flex items-center justify-between space-y-0">
            <h3 className="text-xl font-semibold bg-gradient-to-r dark:from-blue-400 from-blue-600 dark:via-purple-400 via-purple-500 dark:to-pink-400 to-pink-600 bg-clip-text text-transparent transition-colors duration-500 m-0">
              {Title}
            </h3>
            <div className="ml-4 flex-shrink-0">
              <span className="inline-block px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-xs font-medium text-gray-700 dark:text-gray-200 shadow transition-colors duration-500">
                {ProjDate && ProjDate.seconds
                  ? new Date(ProjDate.seconds * 1000).toLocaleDateString()
                  : <span className="text-red-400">No Date</span>}
              </span>
            </div>
          </div>
          <p className="mt-3 dark:text-gray-300/80 text-gray-700/80 text-sm leading-relaxed line-clamp-2 transition-colors duration-500">
            {Description}
          </p>
          
          <div className="pt-4 flex items-center justify-between">
              {/* If Title contains "Lecture" or "Image", show "View Full Image" button; else show default buttons */}
              {(Title?.toLowerCase().includes("lecture") || Title?.toLowerCase().includes("image")) ? (
                <a
                  href={ProjectLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLink}
                  className="inline-flex items-center space-x-2 dark:text-blue-400 text-blue-500 dark:hover:text-blue-300 hover:text-blue-700 transition-colors duration-500"
                >
                  <span className="text-sm font-medium">View Full Image</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <>
                  {ProjectLink ? (
                    <a
                      href={ProjectLink || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleLiveDemo}
                      className="inline-flex items-center space-x-2 dark:text-blue-400 text-blue-500 dark:hover:text-blue-300 hover:text-blue-700 transition-colors duration-500"
                    >
                      <span className="text-sm font-medium">Live Demo</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : (
                    <span className="text-gray-500 text-sm">Demo Not Available</span>
                  )}
                  
                  {id ? (
                    <Link
                      to={`/project/${id}`}
                      onClick={handleDetails}
                      className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg dark:bg-white/5 bg-black/10 dark:hover:bg-white/10 hover:bg-black/20 dark:text-white/90 text-black/90 transition-all duration-500 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    >
                      <span className="text-sm font-medium">Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <span className="text-gray-500 text-sm">Details Not Available</span>
                  )}
                </>
              )}
            </div>
          
          <div className="absolute inset-0 border dark:border-white/10 border-black/20 dark:group-hover:border-purple-500/50 group-hover:border-purple-500/50 rounded-xl transition-colors duration-500 -z-50"></div>
        </div>
      </div>
    </div>
  );
};

export default MGProject;