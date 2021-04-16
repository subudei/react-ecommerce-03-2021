import React, { useEffect } from "react";
import ProductCard from "../../product-card/productCard";

function ProductPage({}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <ProductCard />
    </div>
  );
}

export default ProductPage;
