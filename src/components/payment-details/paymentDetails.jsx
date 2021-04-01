import React from "react";
import "./paymentDetails.styles.css";

import { CountryDropdown } from "react-country-region-selector";

import Button from "../forms/button/button";
import FormInput from "../forms/form-input/formInput";

function PaymentDetails() {
  const handleFormSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <div className="payment__details">
      <form onSubmit={handleFormSubmit}>
        <div className="pd__group">
          <h2>Shipping Address</h2>
          <FormInput type="text" placeholder="Recipiant Name" />
          <FormInput type="text" placeholder="Line 1" />
          <FormInput type="text" placeholder="Line 2" />
          <FormInput type="text" placeholder="City" />
          <FormInput type="text" placeholder="State" />
          <FormInput type="text" placeholder="Postal Code" />
          <div className="form__row checkoutInput">
            <CountryDropdown valueType="short" />
          </div>
        </div>
        <div className="pd__group">
          <h2>Billing Address</h2>
          <FormInput type="text" placeholder="Name on Card" />
          <FormInput type="text" placeholder="Line 1" />
          <FormInput type="text" placeholder="Line 2" />
          <FormInput type="text" placeholder="City" />
          <FormInput type="text" placeholder="State" />
          <FormInput type="text" placeholder="Postal Code" />
        </div>
        <div className="pd__group">
          <h2>Card Details</h2>
        </div>
      </form>
    </div>
  );
}

export default PaymentDetails;
