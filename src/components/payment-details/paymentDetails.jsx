import React, { useState, useEffect } from "react";
import "./paymentDetails.styles.css";

import { CountryDropdown } from "react-country-region-selector";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createStructuredSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Button from "../forms/button/button";
import FormInput from "../forms/form-input/formInput";

import { apiInstance } from "../../utils/index";
import {
  selectCartTotal,
  selectCartItemsCount,
  selectCartItems,
} from "../../redux/cart/cart.selectors";
// import { clearCart } from "../../redux/cart/cart.actions";
import { saveOrderHistory } from "../../redux/orders/orders.actions";

const initialAddressState = {
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
};

const mapState = createStructuredSelector({
  total: selectCartTotal,
  itemCount: selectCartItemsCount,
  cartItems: selectCartItems,
});

function PaymentDetails() {
  const elements = useElements();
  const stripe = useStripe();
  const dispatch = useDispatch();
  const { total, itemCount, cartItems } = useSelector(mapState);
  const history = useHistory();
  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });
  const [recipientName, setRecipientName] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");

  useEffect(() => {
    if (itemCount < 1) {
      history.push("/dashboard");
    }
  }, [itemCount]);

  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  const handleBilling = (e) => {
    const { name, value } = e.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const cardElement = elements.getElement("card");

    if (
      !shippingAddress.line1 ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.postal_code ||
      !shippingAddress.country ||
      !billingAddress.line1 ||
      !billingAddress.city ||
      !billingAddress.state ||
      !billingAddress.postal_code ||
      !billingAddress.country ||
      !recipientName ||
      !nameOnCard
    ) {
      return;
    }

    apiInstance
      .post("/payments/create", {
        amount: total * 100,
        shipping: {
          name: recipientName,
          address: {
            ...shippingAddress,
          },
        },
      })
      .then(({ data: clientSecret }) => {
        stripe
          .createPaymentMethod({
            type: "card",
            card: cardElement,
            billing_details: {
              name: nameOnCard,
              address: {
                ...billingAddress,
              },
            },
          })
          .then(({ paymentMethod }) => {
            stripe
              .confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id,
              })
              .then(({ paymentIntent }) => {
                const configOrder = {
                  orderTotal: total,
                  orderItems: cartItems.map((item) => {
                    const {
                      documentID,
                      productName,
                      productPrice,
                      productThumbnail,
                      quantity,
                    } = item;
                    return {
                      documentID,
                      productThumbnail,
                      productName,
                      productPrice,
                      quantity,
                    };
                  }),
                };
                dispatch(saveOrderHistory(configOrder));
              });
          });
      });
  };

  const configCardElement = {
    iconStyle: "solid",
    style: {
      base: {
        fontSize: "16px",
      },
    },
    hidePostalCode: true,
  };
  return (
    <div className="payment__details">
      <form onSubmit={handleFormSubmit}>
        <div className="pd__group">
          <h2>Shipping Address</h2>
          <FormInput
            required
            type="text"
            name="recipientName"
            placeholder="Recipient Name"
            value={recipientName}
            handleChange={(e) => setRecipientName(e.target.value)}
          />
          <FormInput
            required
            type="text"
            name="line1"
            placeholder="Line 1"
            value={shippingAddress.line1}
            handleChange={(e) => handleShipping(e)}
          />
          <FormInput
            type="text"
            name="line2"
            placeholder="Line 2"
            value={shippingAddress.line2}
            handleChange={(e) => handleShipping(e)}
          />
          <FormInput
            required
            type="text"
            name="city"
            placeholder="City"
            value={shippingAddress.city}
            handleChange={(e) => handleShipping(e)}
          />
          <FormInput
            required
            type="text"
            name="state"
            placeholder="State"
            value={shippingAddress.state}
            handleChange={(e) => handleShipping(e)}
          />
          <FormInput
            required
            type="text"
            name="postal_code"
            placeholder="Postal Code"
            value={shippingAddress.postal_code}
            handleChange={(e) => handleShipping(e)}
          />
          <div className="form__row checkoutInput">
            <CountryDropdown
              required
              onChange={(val) =>
                handleShipping({
                  target: {
                    name: "country",
                    value: val,
                  },
                })
              }
              valueType="short"
              value={shippingAddress.country}
            />
          </div>
        </div>
        <div className="pd__group">
          <h2>Billing Address</h2>
          <FormInput
            required
            type="text"
            name="nameOnCard"
            placeholder="Name on Card"
            value={nameOnCard}
            handleChange={(e) => setNameOnCard(e.target.value)}
          />
          <FormInput
            required
            type="text"
            name="line1"
            placeholder="Line 1"
            value={billingAddress.line1}
            handleChange={(e) => handleBilling(e)}
          />
          <FormInput
            type="text"
            name="line2"
            placeholder="Line 2"
            value={billingAddress.line2}
            handleChange={(e) => handleBilling(e)}
          />
          <FormInput
            required
            type="text"
            name="city"
            placeholder="City"
            value={billingAddress.city}
            handleChange={(e) => handleBilling(e)}
          />
          <FormInput
            required
            type="text"
            name="state"
            placeholder="State"
            value={billingAddress.state}
            handleChange={(e) => handleBilling(e)}
          />
          <FormInput
            required
            type="text"
            name="postal_code"
            placeholder="Postal Code"
            value={billingAddress.postal_code}
            handleChange={(e) => handleBilling(e)}
          />
          <div className="form__row checkoutInput">
            <CountryDropdown
              required
              valueType="short"
              value={billingAddress.country}
              onChange={(val) =>
                handleBilling({
                  target: {
                    name: "country",
                    value: val,
                  },
                })
              }
            />
          </div>
        </div>
        <div className="pd__group">
          <h2>Card Details *</h2>
          <h3 style={{ color: "red", marginBottom: "10px" }}>
            Use TEST CARD for payment
          </h3>
          <CardElement options={configCardElement} />
        </div>
        <Button type="submit">Pay Now</Button>
        <div className="payment__note">
          <h3>Test Card Number: 4242 4242 4242 4242</h3>
          <h3>Test Card CVC: Any 3 number</h3>
          <h3>Test Card Date: Any future date</h3>
        </div>
      </form>
    </div>
  );
}

export default PaymentDetails;
