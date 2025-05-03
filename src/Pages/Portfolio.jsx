import React, { useEffect, useState, useCallback } from "react";
import { db, collection } from "../firebase";
import { getDocs } from "firebase/firestore";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FGCardProject from "../components/FGCardProject";
import MGCardProject from "../components/FGCardProject";
import FINALCardProject from "../components/FGCardProject";
import AOS from "aos";
import "aos/dist/aos.css";
import { Code } from "lucide-react";

// Separate ShowMore/ShowLess button component
const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5
      dark:text-slate-300
      text-slate-700 
      dark:hover:text-white
      hover:text-black 
      text-sm 
      font-medium 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-2
      dark:bg-white/5
      bg-black/5 
      dark:hover:bg-white/10
      hover:bg-black/10
      rounded-md
      border 
      dark:border-white/10
      border-black/10
      dark:hover:border-white/20
      hover:border-black/20
      backdrop-blur-sm
      group
      relative
      overflow-hidden
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          transition-transform 
          duration-300 
          ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}
        `}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};


function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [fgprojects, setFGProjects] = useState([]);
  const [mgprojects, setMGProjects] = useState([]);
  const [finalprojects, setFINALProjects] = useState([]);
  const [showAllFGProjects, setShowAllFGProjects] = useState(false);
  const [showAllMGProjects, setShowAllMGProjects] = useState(false);
  const [showAllFINALProjects, setShowAllFINALProjects] = useState(false);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    // Initialize AOS once
    AOS.init({
      once: false, // This will make animations occur only once
    });
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const fgprojectsCollection = collection(db, "fgprojects");
      const mgprojectsCollection = collection(db, "mgprojects");
      const finalprojectsCollection = collection(db, "finalprojects");

      const [fgprojectsSnapshot, mgprojectsSnapshot, finalprojectsSnapshot] = await Promise.all([
        getDocs(fgprojectsCollection),
        getDocs(mgprojectsCollection),
        getDocs(finalprojectsCollection),
      ]);

      const fgprojectsData = fgprojectsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        TechStack: doc.data().TechStack || [],
      }));

      const mgprojectsData = mgprojectsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        TechStack: doc.data().TechStack || [],
      }));

      const finalprojectsData = finalprojectsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        TechStack: doc.data().TechStack || [],
      }));
      
      setFGProjects(fgprojectsData);
      setMGProjects(mgprojectsData);
      setFINALProjects(finalprojectsData);

      // Store in localStorage
      localStorage.setItem("fgprojects", JSON.stringify(fgprojectsData));
      localStorage.setItem("mgprojects", JSON.stringify(mgprojectsData));
      localStorage.setItem("finalprojects", JSON.stringify(finalprojectsData));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShowMore = useCallback((type) => {
    if (type === 'fgprojects') {
      setShowAllFGProjects(prev => !prev);
    } else if (type === 'mgprojects') {
      setShowAllMGProjects(prev => !prev);
    } else if (type === 'finalprojects') {
      setShowAllFINALProjects(prev => !prev);
    }
  }, []);

  const displayedFGProjects = showAllFGProjects ? fgprojects : fgprojects.slice(0, initialItems);
  const displayedMGProjects = showAllMGProjects ? mgprojects : mgprojects.slice(0, initialItems);
  const displayedFINALProjects = showAllFINALProjects ? finalprojects : finalprojects.slice(0, initialItems);

  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] dark:bg-[#030014] bg-[#f8f6f8] overflow-hidden transition-colors duration-500" id="Portfolio">
      {/* Header section - unchanged */}
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          <span style={{
            color: '#6366f1',
            backgroundImage: 'linear-gradient(45deg, #6366f1 10%, #a855f7 93%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Portfolio Showcase
          </span>
        </h2>
        <p className="text-base sm:text-lg dark:text-slate-400 text-slate-600 max-w-2xl mx-auto md:text-base mt-2 transition-colors duration-500 leading-relaxed lm:text-justify pb-4 sm:pb-0">
          Explore my journey through projects, certifications, and technical expertise. 
          Each section represents a milestone in my continuous learning path.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        {/* AppBar and Tabs section - unchanged */}
          <AppBar
            position="static"
            elevation={0}
            sx={{
              bgcolor: "transparent",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "20px",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
                backdropFilter: "blur(10px)",
                zIndex: 0,
              },
            }}
            className="md:px-4"
          >
          {/* Tabs remain unchanged */}
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              // Existing styles remain unchanged
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: theme.palette.text.secondary,
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "&:hover": {
                  color: theme.palette.text.primary,
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                  transform: "translateY(-2px)",
                  "& .lucide": {
                    transform: "scale(1.1) rotate(5deg)",
                  },
                },
                "&.Mui-selected": {
                  color: theme.palette.text.primary,
                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                  boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)",
                  "& .lucide": {
                    color: "#a78bfa",
                  },
                },
              },
              "& .MuiTabs-indicator": {
                height: 0,
              },
              "& .MuiTabs-flexContainer": {
                gap: "8px",
              },
            }}
          >
            <Tab
              icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="First Grading Projects"
              {...a11yProps(0)}
            />
            <Tab
              icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Midterm Grading Projects"
              {...a11yProps(1)}
            />
            <Tab
              icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Finals Grading Projects"
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={setValue}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
                {displayedFGProjects.map((fgprojects, index) => (
                  <div
                    key={fgprojects.id || index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <FGCardProject
                      Img={fgprojects.Img}
                      Title={fgprojects.Title}
                      Description={fgprojects.Description}
                      Link={fgprojects.Link}
                      id={fgprojects.id}
                    />
                  </div>
                ))}
              </div>
            </div>
            {fgprojects.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('fgprojects')}
                  isShowingMore={showAllFGProjects}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
                {displayedMGProjects.map((mgprojects, index) => (
                  <div
                    key={mgprojects.id || index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <MGCardProject
                      Img={mgprojects.Img}
                      Title={mgprojects.Title}
                      Description={mgprojects.Description}
                      Link={mgprojects.Link}
                      id={mgprojects.id}
                    />
                  </div>
                ))}
              </div>
            </div>
            {mgprojects.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('mgprojects')}
                  isShowingMore={showAllMGProjects}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
                {displayedFINALProjects.map((finalprojects, index) => (
                  <div
                    key={finalprojects.id || index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <FINALCardProject
                      Img={finalprojects.Img}
                      Title={finalprojects.Title}
                      Description={finalprojects.Description}
                      Link={finalprojects.Link}
                      id={finalprojects.id}
                    />
                  </div>
                ))}
              </div>
            </div>
            {finalprojects.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('finalprojects')}
                  isShowingMore={showAllFINALProjects}
                />
              </div>
            )}
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
}