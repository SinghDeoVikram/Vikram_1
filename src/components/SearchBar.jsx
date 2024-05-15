import React from "react";

export default function SearchBar({ setFilterQuery }) {
  const changeHandler = (e) => {
    setFilterQuery(e.target.value.toLowerCase());
  };

  return (
    <div className="search-container">
      <i className="fa-solid fa-magnifying-glass"></i>
      <input
        type="text"
        placeholder="Search for a country..."
        onChange={changeHandler}
      />
    </div>
  );
}
