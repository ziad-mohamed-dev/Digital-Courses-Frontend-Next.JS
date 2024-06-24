"use client";
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./_components/CheckoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY);

export default function Checkout() {
	const options = {
		mode: "payment",
		currency: "usd",
		amount: 100,
	};

	return (
		<Elements stripe={stripePromise} options={options}>
			<CheckoutForm />
		</Elements>
	);
}
