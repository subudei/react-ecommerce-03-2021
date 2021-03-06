import React, { useEffect } from "react";
import "./productCard.styles.css";

import { useParams, useHistory } from "react-router-dom";
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
  const history = useHistory();
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

  const handleAddToCart = (product) => {
    if (!product) return;
    dispatch(addProduct(product));
    history.push("/cart");
  };
  const configAddToCartBtn = {
    type: "button",
  };

  return (
    <div className="product__card__container">
      <div className="product__card__img">
        <img src={productThumbnail} alt={productName} />
      </div>
      <div className="product__card__details">
        <h1 className="product__card__name">{productName}</h1>

        <h2 className="product__card__price">$ {productPrice}</h2>

        <span
          className="product__card__description"
          dangerouslySetInnerHTML={{ __html: productDescription }}
        />
        <div className="product__card__add__to__cart">
          <Button
            {...configAddToCartBtn}
            onClick={() => handleAddToCart(product)}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
