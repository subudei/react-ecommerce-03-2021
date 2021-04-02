import React from "react";

import PaymentDetails from "../../payment-details/paymentDetails";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { publishableKey } from "../../../stripe/config";

const stripePromise = loadStripe(publishableKey);

function PaymentPage() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentDetails />
    </Elements>
  );
}

export default PaymentPage;
