import { useState } from "react";
import "../App.css";
import CountriesList from "./CountriesList";
import SearchBar from "./SearchBar";
import SelectMenu from "./SelectMenu";
import { useTheme } from "../hooks/useTheme";
//import { ThemeContext } from "../contexts/ThemeContext";
//import { useOutletContext } from "react-router-dom";
//import { useWindowSize } from "../hooks/useWindowSize";

export default function Home() {
  //const [isDark] = useOutletContext();
  //const windowSize = useWindowSize()
  //const [isDark] = useContext(ThemeContext);
  const [filterQuery, setFilterQuery] = useState("");
  const [isDark] = useTheme();

  return (
    <main className={`${isDark && "dark"}`}>
      <div className="search-filter-container">
        <SearchBar setFilterQuery={setFilterQuery} />
        <SelectMenu setFilterQuery={setFilterQuery} />
      </div>
      <CountriesList filterQuery={filterQuery} />
      {/* <h1 style={{textAlign:"center"}}>{windowSize.height} X {windowSize.width}</h1> */}
    </main>
  );
}
