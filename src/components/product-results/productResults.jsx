import React, { useEffect } from "react";
import "./productResults.styles.css";

import { useDispatch, useSelector } from "react-redux";

import { fetchProductsStart } from "../../redux/products/products.actions";
import Product from "../product/product";

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
    <>
      <span className="products__header">Browse Products</span>
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
