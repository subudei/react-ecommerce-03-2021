import React, { useEffect } from "react";
import "./productCard.styles.css";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchProductStart,
  setProduct,
} from "../../redux/products/products.actions";
import { addProduct } from "../../redux/cart/cart.actions";

import Button from "../forms/button/button";

const mapState = (state) => ({
  product: state.productsData.product,
});

function ProductCard({}) {
  const dispatch = useDispatch();
  const { productID } = useParams();
  const { product } = useSelector(mapState);

  const {
    productName,
    productThumbnail,
    productPrice,
    productDescription,
  } = product;

  useEffect(() => {
    dispatch(fetchProductStart(productID));

    return () => {
      dispatch(setProduct({})); // clean up last opened product, fixing bug
    };
  }, []);

  const configAddToCart = {
    type: "button",
  };
  const handleAddToCart = (product) => {
    if (!product) return;
    dispatch(addProduct(product));
  };

  return (
    <div className="product__card__container">
      <div className="product__card__hero">
        <img src={productThumbnail} alt={productName} />
      </div>
      <div className="product__card__details">
        <ul>
          <li>
            <h1>{productName}</h1>
          </li>
          <li>
            <span>$ {productPrice}</span>
          </li>
          <span dangerouslySetInnerHTML={{ __html: productDescription }} />
          <div className="product__card__add__to__cart">
            <Button
              {...configAddToCart}
              onClick={() => handleAddToCart(product)}
            >
              Add to cart
            </Button>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default ProductCard;
