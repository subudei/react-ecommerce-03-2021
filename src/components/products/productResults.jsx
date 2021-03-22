import React, { useEffect } from "react";
import "./products.styles.css";

import { useDispatch, useSelector } from "react-redux";

import { fetchProductsStart } from "../../redux/products/products.actions";

const mapState = ({ productsData }) => ({
  products: productsData.products, // dobija proizvode preko reduxa (useSelector)
});

function ProductResults({}) {
  const dispatch = useDispatch();
  const { products } = useSelector(mapState);
  useEffect(() => {
    dispatch(fetchProductsStart());
  }, []);

  if (!Array.isArray(products)) return null;

  if (products.length < 1) {
    return (
      <div className="products">
        <p>No Search Results</p>
      </div>
    );
  }

  return (
    <div className="products">
      <h1>Browse Products</h1>
      {products.map((product, pos) => {
        const { productThumbnail, productName, productPrice } = product;
        if (
          !productThumbnail ||
          !productName ||
          typeof productPrice === "undefined"
        )
          return null;
        return (
          <div key={pos}>
            {productName}
            {productPrice}
          </div>
        );
      })}
    </div>
  );
}

export default ProductResults;
