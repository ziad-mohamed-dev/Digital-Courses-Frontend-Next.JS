"use client";
import { AlertOctagon, BadgeCheck, List, ShoppingCart } from "lucide-react";
import React, { useContext } from "react";
import ProductInfoSkeleton from "./ProductInfoSkeleton";
import { useRouter } from "next/navigation";
import CartApis from "../../_utils/CartApis";
import { CartContext } from "../../_context/CartContext";
import { useUser } from "@clerk/nextjs";

function ProductInfo({ product }) {
	const { user } = useUser();
	const router = useRouter();
	const { cart, setCart } = useContext(CartContext);

	const arrayOfCartProductsId = cart.products.map((product) => product.id);

	function handelAddToCart() {
		// Check if the user auth
		if (!user) {
			router.push("/sign-in");
		}
		// Check if there is no cart for this auth user so create cart
		else if (cart.cartId === undefined) {
			const data = {
				data: {
					username: user.fullName,
					email: user.primaryEmailAddress.emailAddress,
					products: [product?.id],
				},
			};
			CartApis.addToCart(data).then((res) => {
				setCart({
					products: res.data.data.attributes.products.data,
					cartId: res.data.data.id,
				});
			});
		}
		// Check if the auth user have cart to add the items to it
		else if (cart.cartId !== undefined) {
			const oldCartProductsId = cart.products.map((product) => {
				return product.id;
			});
			const data = {
				data: {
					products: [...oldCartProductsId, product.id],
				},
			};
			CartApis.updateCartItems(cart.cartId, data).then((res) => {
				setCart({
					products: res.data.data.attributes.products.data,
					cartId: res.data.data.id,
				});
			});
		}
	}

	return (
		<>
			{product.id ? (
				<div>
					<h2 className="text-[20px]">
						{product?.attributes?.title}
					</h2>
					<h2 className="text-[15px] text-gray-400 flex gap-1 items-center">
						<List className="w-4 h-4" />
						{product?.attributes?.category}
					</h2>
					<h2 className="text-[11px] mt-5">
						{
							product?.attributes?.description?.[0]?.children?.[0]
								?.text
						}
					</h2>
					<h2 className="text-[11px] text-gray-500 flex items-center gap-2">
						{product?.attributes?.instantDelivery ? (
							<BadgeCheck className="w-5 h-5 text-green-500" />
						) : (
							<AlertOctagon className="w-5 h-5 text-red-500" />
						)}
						Eligible For Instant Delivery
					</h2>
					<h2 className="mt-3 text-[32px] text-primary">
						${product?.attributes?.price}
					</h2>
					<button
						onClick={handelAddToCart}
						disabled={arrayOfCartProductsId.includes(product.id)}
						className={`flex gap-2 rounded-lg p-3 bg-primary hover:bg-primaryHover transition text-white ${
							arrayOfCartProductsId.includes(product.id) &&
							"cursor-not-allowed"
						}`}
					>
						<ShoppingCart />
						Add To Cart
					</button>
					{arrayOfCartProductsId.includes(product.id) && (
						<span className="text-[10px] text-red-500">
							In Cart
						</span>
					)}
				</div>
			) : (
				<ProductInfoSkeleton />
			)}
		</>
	);
}

export default ProductInfo;
