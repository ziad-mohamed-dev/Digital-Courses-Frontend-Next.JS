"use client";
import React, { useContext, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import CartApis from "../../_utils/CartApis";
import { CartContext } from "../../_context/CartContext";

export default function CheckoutForm({ amount }) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const { cart } = useContext(CartContext);

  const handleError = (error) => {
    setLoading(false);
    setErrorMessage(error.message);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe) {
      return;
    }

    setLoading(true);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }

    const res = await fetch("/api/create-intent", {
      method: "POST",
      body: JSON.stringify({
        amount: Number(amount),
      }),
    }).catch((err) => {
      console.log(err);
    });

    const clientSecret = await res.json();

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: "https://e-commerce-frontend-next-js.vercel.app/",
      },
    });

    if (error) {
      handleError(error);
    } else {
      CartApis.updateCartItems(cart.cartId, {
        data: {
          products: [],
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-4 max-w-[500px] mx-auto my-8 bg-gray-100 rounded-lg">
        <PaymentElement />
        <button
          disabled={!stripe || loading || cart.products.length === 0}
          className={`p-2 rounded-lg bg-primary hover:bg-primaryHover block mx-auto text-white w-full mt-4 ${
            !stripe ||
            loading ||
            (cart.products.length === 0 && "cursor-not-allowed")
          }`}
        >
          Submit
        </button>
        {errorMessage && <div>{errorMessage}</div>}
      </div>
    </form>
  );
}
