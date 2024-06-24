import axiosClient from "./axiosClient";

const addToCart = (payload) =>
	axiosClient.post("carts?populate[products][populate]=banner", payload);

const updateCartItems = (id, payload) =>
	axiosClient.put(`carts/${id}?populate[products][populate]=banner`, payload);

const getUserCartItems = (email) =>
	axiosClient.get(
		`carts?populate[products][populate]=banner&filters[email][$eq]=${email}`
	);

export default { addToCart, getUserCartItems, updateCartItems };
