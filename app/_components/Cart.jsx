import React, { useContext } from "react";
import { CartContext } from "../_context/CartContext";
import Link from "next/link";

function Cart({ cartState: { openCart, setOpenCart } }) {
	const { cart } = useContext(CartContext);
	return (
		<div
			className="absolute cursor-default right-0 sm:right-8 top-16 z-50 w-screen max-w-sm border border-primary bg-gray-100 dark:bg-gray-900 px-4 py-8 sm:px-6 lg:px-8"
			aria-modal="true"
			role="dialog"
			tabIndex="-1"
		>
			<button
				className="absolute end-4 top-4 text-primary transition hover:scale-110"
				onClick={() => {
					setOpenCart(!openCart);
				}}
			>
				<span className="sr-only">Close cart</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth="1.5"
					stroke="currentColor"
					className="h-5 w-5"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
			<div className="mt-4 space-y-6">
				<ul className="space-y-4">
					{cart?.products?.map((product) => {
						return (
							<li key={product.id}>
								<Link
									href={`/product-details/${product.id}`}
									className="flex items-center gap-4"
								>
									<img
										src={
											product?.attributes?.banner?.data
												?.attributes?.url
										}
										alt=""
										className="size-16 rounded object-cover"
									/>
									<div>
										<h3 className="text-sm line-clamp-1">
											{product?.attributes?.title}
										</h3>
										<dl className="mt-0.5 space-y-px text-[10px] text-gray-400">
											<div>
												<dt className="inline">
													Category:
												</dt>
												<dd className="inline">
													{` ${product?.attributes?.category}`}
												</dd>
											</div>
											<div>
												<dt className="inline">
													Price:
												</dt>
												<dd className="inline">{` $${product?.attributes?.price}`}</dd>
											</div>
										</dl>
									</div>
								</Link>
							</li>
						);
					})}
				</ul>
				<div className="space-y-4 text-center">
					<Link
						href="/cart"
						className="block rounded border border-primary px-5 py-3 text-sm bg-primary hover:bg-primaryHover text-white transition hover:ring-1 hover:ring-primaryHover"
					>
						View my cart ({cart.products.length})
					</Link>
					<Link
						href="/"
						className="inline-block text-sm text-primary underline underline-offset-4 transition hover:text-primaryHover"
					>
						Continue shopping
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Cart;
