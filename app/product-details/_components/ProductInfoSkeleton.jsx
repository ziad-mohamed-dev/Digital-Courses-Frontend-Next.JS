import React from "react";

function ProductInfoSkeleton() {
	return (
		<div className="flex flex-col gap-5">
			<div className="h-[20px] w-full md:w-[200px] bg-slate-200 dark:bg-gray-700 animate-pulse"></div>
			<div className="h-[20px] w-[70px] bg-slate-200 dark:bg-gray-700 animate-pulse"></div>
			<div className="h-[20px] w-full md:w-[200px] bg-slate-200 dark:bg-gray-700 animate-pulse"></div>
			<div className="h-[20px] w-full md:w-[200px] bg-slate-200 dark:bg-gray-700 animate-pulse"></div>
			<div className="h-[20px] w-full md:w-[200px] bg-slate-200 dark:bg-gray-700 animate-pulse"></div>
			<div className="h-[20px] w-[100px] bg-slate-200 dark:bg-gray-700 animate-pulse"></div>
		</div>
	);
}

export default ProductInfoSkeleton;
