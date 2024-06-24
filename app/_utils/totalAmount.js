import { useContext } from "react";
import { CartContext } from "../_context/CartContext";

export default function getTotalPrice() {
	const { cart } = useContext(CartContext);
	let totalPrice = 0;
	if (cart?.products.length !== 0) {
		cart.products.forEach((product) => {
			totalPrice += product?.attributes?.price;
		});
	}
	return totalPrice.toFixed(2);
}
