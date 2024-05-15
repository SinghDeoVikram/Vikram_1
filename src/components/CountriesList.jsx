import React, { useEffect, useState } from "react";
import CountryCard from "./CountryCard.jsx";
import CountriesListShimmer from "./CountriesListShimmer.jsx";

export default function CountriesList({ filterQuery }) {
  const [CountriesData, setCountriesData] = useState([]);
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        setCountriesData(data);
      });
  }, []);

  return (
    <>
      {!CountriesData.length ? (
        <CountriesListShimmer />
      ) : (
        <div className="countries-container">
          {CountriesData.filter((con) => {
            return con.name.common.toLowerCase().includes(filterQuery) || con.region.toLowerCase().includes(filterQuery)
          }).map((country) => {
            return (
              <CountryCard
                key={country.name.common}
                Name={country.name.common}
                NativeName={country.name.common}
                Population={country.population}
                Region={country.region}
                Flag={country.flags.svg}
                data={country}
              />
            );
          })}
        </div>
      )}
    </>
  );
}
