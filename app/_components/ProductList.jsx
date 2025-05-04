import React from "react";
import ProductItem from "./ProductItem";

function ProductList({ productList }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {productList.length > 0
        ? productList.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))
        : [...Array(5)].map((_, i) => (
            <div
              key={i}
              className="bg-slate-200 dark:bg-gray-700 animate-pulse h-[220px] rounded-lg"
            ></div>
          ))}
    </div>
  );
}

export default ProductList;
