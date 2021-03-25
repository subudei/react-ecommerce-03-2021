import React from "react";
import Button from "../forms/button/button";

function LoadMore({ onLoadMoreEvent = () => {} }) {
  return (
    <div>
      <Button onClick={() => onLoadMoreEvent()}>Load More</Button>
    </div>
  );
}

export default LoadMore;
