import React, { useEffect } from "react";
import "./productResults.styles.css";

import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { fetchProductsStart } from "../../redux/products/products.actions";
import Product from "../product/product";
import FormSelect from "../forms/form-select/formSelect";

const mapState = ({ productsData }) => ({
  products: productsData.products, // dobija proizvode preko reduxa (useSelector)
});

function ProductResults({}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { filterType } = useParams();
  const { products } = useSelector(mapState);

  useEffect(() => {
    dispatch(fetchProductsStart({ filterType }));
  }, [filterType]);

  const handleFilter = (e) => {
    const nextFilter = e.target.value;
    history.push(`/search/${nextFilter}`);
  };

  if (!Array.isArray(products)) return null;

  if (products.length < 1) {
    return (
      <div className="products">
        <p>No Search Results</p>
      </div>
    );
  }

  const configFilters = {
    defaultValue: filterType,
    options: [
      {
        name: "Show All",
        value: "",
      },
      {
        name: "Gloves",
        value: "gloves",
      },
      {
        name: "Protection",
        value: "protection",
      },
      {
        name: "Accessories",
        value: "accessories",
      },
      {
        name: "Footwear",
        value: "shoes",
      },
    ],
    handleChange: handleFilter,
  }; // default params from component FormSelect

  return (
    <>
      <span className="products__header">Browse Products</span>
      <FormSelect {...configFilters} />
      <div className="products">
        {products.map((product, pos) => {
          const {
            productThumbnail,
            productName,
            productDescription,
            productPrice,
          } = product;
          if (
            !productThumbnail ||
            !productName ||
            typeof productPrice === "undefined"
          )
            return null;
          const configProduct = {
            productThumbnail,
            productPrice,
            productDescription,
            productName,
          };
          return <Product {...configProduct} />;
        })}
      </div>
    </>
  );
}

export default ProductResults;

// 18:00
