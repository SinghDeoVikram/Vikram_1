import React from "react";

export default function SelectMenu({ setFilterQuery }) {
  const changeHandler = (e) => {
    setFilterQuery(e.target.value.toLowerCase());
  };

  return (
    <select className="filter-by-region" onChange={changeHandler}>
      <option hidden>Filter by Region</option>
      <option value="Africa">Africa</option>
      <option value="Americas">America</option>
      <option value="Asia">Asia</option>
      <option value="Europe">Europe</option>
      <option value="Oceania">Oceania</option>
    </select>
  );
}
