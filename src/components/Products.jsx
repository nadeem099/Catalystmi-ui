import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { includes, isEmpty } from "lodash";
import FilterContext from "../contexts/FiltersContext";
import {
  BEARER_TOKEN as token,
  PRODUCTS_ENDPOINT,
  FEATURED_PRODUCT_ENDPOINT,
} from "../config/api";
import Card from "./Card";

function Products() {
  const {
    filters: { colors = [], material = [] } = {},
    selectedFilters: { colorsIds = [], materialIds = [] } = {},
  } = useContext(FilterContext);
  const [allProducts, setAllProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      if (location.pathname.includes("featured")) {
        try {
          const { data: { featured = [] } = {} } = await axios.get(
            FEATURED_PRODUCT_ENDPOINT,
            {
              headers: { Authorization: token },
            }
          );
          setFeaturedProducts(featured);
        } catch (err) {
          console.debug("error while fetching products");
          return;
        }
      }
      if (isEmpty(allProducts)) {
        try {
          const { data: { products = [] } = {} } = await axios.get(
            PRODUCTS_ENDPOINT,
            {
              headers: { Authorization: token },
            }
          );
          setAllProducts(products);
        } catch (err) {
          console.debug("error while fetching products");
        }
      }
    };
    fetchProducts();
  }, [location.pathname]);

  useEffect(() => {
    let filteredProducts = allProducts;
    filteredProducts = filteredProducts.filter((product) => {
      if (isEmpty(colorsIds) && isEmpty(materialIds)) {
        return product;
      }
      if (
        colorsIds.includes(product.colorId) ||
        materialIds.includes(product.materialId)
      ) {
        return product;
      }
    });

    if (location.pathname.includes("featured")) {
      filteredProducts = filteredProducts.filter((product) => {
        const featuredProductsIds = featuredProducts.map(
          (item) => item.productId
        );
        if (featuredProductsIds.includes(product.id)) {
          return product;
        }
      });
    }
    if (!isEmpty(filteredProducts)) {
      setFilteredProducts(filteredProducts);
    }
  }, [location.pathname, featuredProducts, colorsIds, materialIds]);

  return (
    <div className="flex gap-12 flex-wrap ml-16">
      {!isEmpty(filteredProducts) ? (
        filteredProducts.map((product) => (
          <Card
            key={product.id}
            data={product}
            colors={colors}
            material={material}
          />
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Products;
