import React, { useEffect, useState } from "react";
import "./CountryDetail.css";
import { Link, useLocation, useParams } from "react-router-dom";
import CountryCardShimmer from "./CountryCardShimmer";
import { useTheme } from "../hooks/useTheme";

export default function CountryDetail() {
  const Params = useParams();
  const countryName = Params.Country;
  const [countryData, setCountryData] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const { state } = useLocation();
  const [isDark] = useTheme();

  function updateCountryData(data) {
    setCountryData({
      name: data.name.common,
      nativeName: Object.values(data.name.nativeName || {})[0]?.common,
      population: data.population,
      region: data.region,
      subregion: data.subregion,
      capital: data.capital,
      tld: data.tld,
      currency: Object.values(data.currencies || {})
        .map((currency) => currency.name)
        .join(","),
      languages: Object.values(data.languages || {}).join(","),
      flag: data.flags.svg,
      borders: [],
    });
    if (!data.borders) {
      data.borders = [];
    }
    Promise.all(
      data.borders.map((border) => {
        return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => borderCountry.name.common);
      })
    )
      .then((borders) => {
        setTimeout(() => {
          setCountryData((prevState) => ({
            ...prevState,
            borders,
          }));
        });
      })
      .catch((error) => {
        console.error("Error fetching border countries:", error);
      });
  }

  useEffect(() => {
    if (state) {
      updateCountryData(state);
      return;
    }
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => res.json())
      .then(([data]) => {
        updateCountryData(data);
      })
      .catch(() => {
        setNotFound(true);
      });
  }, [countryName, state]);

  if (notFound) {
    return <h1>Country Not Found</h1>;
  }
  return (
    <main className={`${isDark && "dark"}`}>
      <div className="country-details-container">
        <span className="back-button" onClick={() => window.history.back()}>
          <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
        </span>
        {countryData === null ? (
          <CountryCardShimmer />
        ) : (
          <div className="country-details">
            <img src={countryData.flag} alt={countryData.name} />
            <div className="details-text-container">
              <h1>{countryData.name}</h1>
              <div className="details-text">
                <p>
                  <b>
                    Native Name: {countryData.nativeName || countryData.name}
                  </b>
                  <span className="native-name"></span>
                </p>
                <p>
                  <b>
                    Population:{" "}
                    {countryData.population?.toLocaleString("en-IN")}
                  </b>
                  <span className="population"></span>
                </p>
                <p>
                  <b>Region: {countryData.region}</b>
                  <span className="region"></span>
                </p>
                <p>
                  <b>Sub Region: {countryData.subregion}</b>
                  <span className="sub-region"></span>
                </p>
                <p>
                  <b>Capital: {countryData.capital?.join(" ")}</b>
                  <span className="capital"></span>
                </p>
                <p>
                  <b>Top Level Domain: {countryData.tld}</b>
                  <span className="top-level-domain"></span>
                </p>
                <p>
                  <b>Currencies: {countryData.currency}</b>
                  <span className="currencies"></span>
                </p>
                <p>
                  <b>Languages: {countryData.languages}</b>
                  <span className="languages"></span>
                </p>
              </div>
              {countryData.borders.length === 0 ? (
                ""
              ) : (
                <div className="border-countries">
                  <b>Border Countries: </b>&nbsp;
                  {countryData.borders.map((border) => {
                    return (
                      <Link key={border} to={`/${border}`}>
                        {border}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
