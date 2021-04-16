import React, { useEffect } from "react";
import "./productResults.styles.css";

import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { fetchProductsStart } from "../../redux/products/products.actions";
import Product from "../product/product";
import FormSelect from "../forms/form-select/formSelect";
import LoadMore from "../load-more/loadMore";

const mapState = ({ productsData }) => ({
  products: productsData.products, // dobija proizvode preko reduxa (useSelector)
});

function ProductResults({}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { filterType } = useParams();
  const { products } = useSelector(mapState);
  const { data, queryDoc, isLastPage } = products;

  useEffect(() => {
    dispatch(fetchProductsStart({ filterType }));
  }, [filterType]);

  const handleFilter = (e) => {
    const nextFilter = e.target.value;
    history.push(`/search/${nextFilter}`);
  };

  if (!Array.isArray(data)) return null;

  if (data.length < 1) {
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

  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        filterType,
        startAfterDoc: queryDoc,
        persistProducts: data,
      })
    );
  };

  const configLoadMore = {
    onLoadMoreEvent: handleLoadMore,
  };

  return (
    <>
      <div className="products__header">
        <h2>Browse Products</h2>
        <FormSelect {...configFilters} />
      </div>

      <div className="products">
        {data.map((product, pos) => {
          const { productThumbnail, productName, productPrice } = product;
          if (
            !productThumbnail ||
            !productName ||
            typeof productPrice === "undefined"
          )
            return null;
          const configProduct = {
            ...product,
          };
          return <Product {...configProduct} key={pos} />;
        })}
      </div>
      {!isLastPage ? <LoadMore {...configLoadMore} /> : null}
    </>
  );
}

export default ProductResults;
