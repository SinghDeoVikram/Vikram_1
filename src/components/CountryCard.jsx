import React from "react";
import { Link } from "react-router-dom";

export default function CountryCard({
  Name,
  NativeName,
  Population,
  Region,
  Flag,
  data,
}) {
  return (
    <div>
      <Link className="country-card" to={`/${Name}`} state={data}>
        <div className="flag-container">
          <img src={Flag} alt={`${Name} Flag`} />
        </div>
        <div className="card-text">
          <h3 className="card-title">{Name}</h3>
          <p>
            <b>Native Name: </b>
            {NativeName}
          </p>
          <p>
            <b>Population: </b>
            {Population.toLocaleString("en-IN")}
          </p>
          <p>
            <b>Region: </b>
            {Region}
          </p>
        </div>
      </Link>
    </div>
  );
}
