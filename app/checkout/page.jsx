"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./_components/CheckoutForm";
import { useSearchParams } from "next/navigation";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY);

export default function Checkout() {
  const search = useSearchParams();
  const options = {
    mode: "payment",
    currency: "usd",
    amount: Math.trunc(search.get("amount") * 100),
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm amount={search.get("amount")} />
    </Elements>
  );
}
