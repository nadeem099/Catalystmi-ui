import React, { useState, useEffect } from "react";
import axios from "axios";
import isEmpty from "lodash/isEmpty";
import { COLOR_ENDPOINT, MATERIAL_ENDPOINT, BEARER_TOKEN } from "../config/api";

const FilterContext = React.createContext();

export const FilterContextProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    tags: [
      {
        id: 0,
        name: "All",
      },
      {
        id: 1,
        name: "Generic",
      },
      {
        id: 2,
        name: "Generic",
      },
      {
        id: 3,
        name: "Generic",
      },
      {
        id: 4,
        name: "Generic",
      },
    ],
  });
  const [selectedFilters, setSelectedFilters] = useState({});

  // fetch filters
  useEffect(() => {
    const fetchFilters = async (endpoint, filterName) => {
      if (isEmpty(filters[filterName])) {
        try {
          const { data: { colors = [], material = [] } = {} } = await axios.get(
            endpoint,
            {
              headers: { Authorization: BEARER_TOKEN },
            }
          );

          const filterData = !isEmpty(colors)
            ? colors
            : !isEmpty(material)
            ? material
            : [];

          filterData.unshift({ id: 0, name: "All" });

          setFilters((prev) => ({ ...prev, [filterName]: filterData }));
        } catch (err) {
          console.debug("error occured while fetching filters");
        }
      }
    };
    fetchFilters(COLOR_ENDPOINT, "colors");
    fetchFilters(MATERIAL_ENDPOINT, "material");
  }, []);

  // update selectedFilters
  useEffect(() => {
    const newSelectedFilters = {};
    Object.entries(filters).forEach((filterArr = []) => {
      const [filterName, filterData = []] = filterArr;
      if (!isEmpty(filterData)) {
        const newFilterData = filterData.filter((item) => item.selected);
        const newFilterIds = newFilterData.map((item) => item.id);
        newSelectedFilters[filterName] = newFilterData;
        newSelectedFilters[`${filterName}Ids`] = newFilterIds;
      }
    });
    setSelectedFilters(newSelectedFilters);
  }, [filters]);

  // update selcted property of filters
  const updateSelectedFilters = (name, selected) => {
    Object.entries(filters).forEach((filterArr = []) => {
      const [filterName, filterData = []] = filterArr;
      if (filterName === name) {
        let newFilterData = filterData.map((item) => {
          const updatedItem = item;
          updatedItem.id === selected.id
            ? updatedItem.selected
              ? (updatedItem.selected = undefined)
              : (updatedItem.selected = true)
            : "";
          return updatedItem;
        });
        setFilters((prev) => ({ ...prev, [name]: newFilterData }));
      }
    });
  };

  return (
    <FilterContext.Provider
      value={{ filters, selectedFilters, updateSelectedFilters }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterContext;
