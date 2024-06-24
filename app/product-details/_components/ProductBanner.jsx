import Image from "next/image";
import React from "react";

function ProductBanner({ product }) {
	return (
		<div>
			{product?.attributes?.banner?.data?.attributes?.url ? (
				<Image
					src={product?.attributes?.banner?.data?.attributes?.url}
					width={300}
					height={255}
					alt="banner"
					className="rounded-lg w-full md:w-[370px] max-w-[370px] h-[225px] object-cover "
					priority
				/>
			) : (
				<div className="rounded-lg w-full md:w-[370px] max-w-[370px] h-[225px] bg-slate-200 dark:bg-gray-700 animate-pulse"></div>
			)}
		</div>
	);
}

export default ProductBanner;
