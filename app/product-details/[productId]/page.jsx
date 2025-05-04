"use client";

import BreadCrumb from "../../_components/BreadCrumb";
import React, { useEffect, useState } from "react";
import ProductBanner from "../_components/ProductBanner";
import ProductInfo from "../_components/ProductInfo";
import ProductApis from "/app/_utils/ProductApis";
import ProductList from "/app/_components/ProductList";

function ProductDetails({ params }) {
  const [productDetails, setProductDetails] = useState({});
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    ProductApis.getProductById(params.productId).then((res) => {
      setProductDetails(res.data.data);
      ProductApis.getProductsByCategory(
        res.data.data.attributes?.category
      ).then((res) => {
        setProductList(
          res.data.data.filter((product) => product.id != params.productId)
        );
      });
    });
  }, []);

  return (
    <div className="px-8 md:px-28 py-8">
      <BreadCrumb product={productDetails} />
      <div className="mt-10 flex flex-col md:flex-row gap-5">
        <ProductBanner product={productDetails} />
        <ProductInfo product={productDetails} />
      </div>
      <h2 className="mt-24 mb-4 text-xl">Similar Products</h2>
      <ProductList productList={productList} />
    </div>
  );
}

export default ProductDetails;
