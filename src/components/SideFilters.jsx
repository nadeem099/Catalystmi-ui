import React, { useContext } from "react";
import FilterContext from "../contexts/FiltersContext";
import isEmpty from "lodash/isEmpty";

function SideFilters() {
  const { filters, updateSelectedFilters } = useContext(FilterContext);
  return (
    <>
      {filters &&
        Object.entries(filters).map((filter) => {
          const [filterName, filterData] = filter;
          return !isEmpty(filterData) ? (
            <div key={filterName} className="mb-8">
              <div className="mb-2">
                {filterName.charAt(0).toUpperCase()}
                {filterName.slice(1)}
              </div>
              {filterData.map((filter) => {
                const activeClassName = filter.selected ? "font-bold" : "";
                return (
                  <div
                    className={`${activeClassName}  mb-2 text-sm pr-8 mr-8 cursor-pointer`}
                    key={`${filterName}-${filter.id}-${filter.name}`}
                    onClick={() => updateSelectedFilters(filterName, filter)}
                  >
                    {filter.name}
                  </div>
                );
              })}
            </div>
          ) : (
            <div>Loading...</div>
          );
        })}
    </>
  );
}

export default SideFilters;
