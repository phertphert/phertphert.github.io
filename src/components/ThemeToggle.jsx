import React, { useRef } from "react";
import { useThemeMode } from "./ThemeContext"; // path depends on your setup

const ThemeToggle = ({ lightIcon, darkIcon }) => {
  const { mode, toggleColorMode } = useThemeMode();
  const buttonRef = useRef(null);

  const handleClick = () => {
    const root = document.documentElement;

    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      document.documentElement.style.setProperty("--ripple-x", `${rect.left + rect.width / 2}px`);
      document.documentElement.style.setProperty("--ripple-y", `${rect.top + rect.height / 2}px`);
    }

    root.classList.add("dark-transition");
    toggleColorMode();

    setTimeout(() => {
      root.classList.remove("dark-transition");
    }, 500);
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className="fixed bottom-10 right-4 w-12 h-12 rounded-full bg-gray-800 dark:bg-gray-200 flex items-center justify-center shadow-lg transition-all duration-500 z-50 group overflow-hidden"
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-900 opacity-50 group-hover:opacity-70 transition-all duration-500" style={{ filter: "blur(20px)" }} />
      <img src={mode === "dark" ? lightIcon : darkIcon} alt="Toggle Theme" className="relative w-6 h-6 group-hover:scale-125 transition-transform duration-500" />
    </button>
  );
};

export default ThemeToggle;
