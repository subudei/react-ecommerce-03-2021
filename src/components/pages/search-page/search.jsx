import React, { useEffect } from "react";
import ProductResults from "../../product-results/productResults";

function Search({}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="search__page__conatiner">
      <ProductResults />
    </div>
  );
}

export default Search;
{
}
