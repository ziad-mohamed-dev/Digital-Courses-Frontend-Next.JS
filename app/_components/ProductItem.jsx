import { List } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function ProductItem({ product }) {
  return (
    <Link
      href={`/product-details/${product.id}`}
      className="rounded-lg transition ease-linear shadow-[0_0_5px_0px] hover:shadow-[0_0_5px_4px] shadow-gray-500 hover:shadow-gray-500 dark:shadow-primary dark:hover:shadow-primary cursor-pointer"
    >
      <div className="relative h-[200px]">
        <Image
          src={product?.attributes?.banner?.data?.attributes?.url}
          alt="banner-card"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority
          className="rounded-t-lg object-cover h-[170px]"
        />
      </div>
      <div className="p-3 flex justify-between items-center flex-col md:flex-row">
        <div>
          <h2 className="text-[12px] font-medium line-clamp-1 text-center md:text-start">
            {product?.attributes?.title}
          </h2>
          <h2 className="text-[10px] text-gray-400 flex gap-1 items-center justify-center md:justify-start">
            <List className="w-4 h-4" />
            {product?.attributes?.category}
          </h2>
        </div>
        <h2>${product?.attributes?.price}</h2>
      </div>
    </Link>
  );
}

export default ProductItem;
