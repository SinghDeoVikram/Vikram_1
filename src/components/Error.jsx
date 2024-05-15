import React from "react";
import { useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();
  return (
    <div>
      <h1>Something Went wrong. {error.status}</h1>
    </div>
  );
}
