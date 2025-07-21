import React from "react";
import Select from "./Select.jsx";
import { useSearchParams } from "react-router-dom";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSortBy = searchParams.get("sortBy");

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select options={options} onChange={handleChange} value={currentSortBy} />
  );
}

export default SortBy;
