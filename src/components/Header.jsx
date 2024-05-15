import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
//import { ThemeContext } from "../contexts/ThemeContext";

export default function Header() {
  //const [isDark, setIsDark] = useContext(ThemeContext);
  const [isDark, setIsDark] = useTheme();
  return (
    <div>
      <header className={`header-container ${isDark && "dark"}`}>
        <div className="header-content">
          <h2 className="title">
            <Link to="/">Where in the world?</Link>
          </h2>
          <p
            className="theme-changer"
            onClick={() => {
              setIsDark(!isDark);
              localStorage.setItem("isDarkMode", !isDark);
            }}
          >
            <i className={`fa-solid fa-${isDark ? "sun" : "moon"}`}></i>
            &nbsp;&nbsp;{`${isDark ? "Light" : "Dark"}`} Mode
          </p>
        </div>
      </header>
    </div>
  );
}
