import { useState } from "react";
import "../App.css";
import CountriesList from "./CountriesList";
import SearchBar from "./SearchBar";
import SelectMenu from "./SelectMenu";
import { useTheme } from "../hooks/useTheme";

export default function Home() {
  const [filterQuery, setFilterQuery] = useState("");
  const [isDark] = useTheme();

  return (
    <main className={`${isDark && "dark"}`}>
      <div className="search-filter-container">
        <SearchBar setFilterQuery={setFilterQuery} />
        <SelectMenu setFilterQuery={setFilterQuery} />
      </div>
      <CountriesList filterQuery={filterQuery} />
    </main>
  );
}
