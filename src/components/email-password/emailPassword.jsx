import React, { useState } from "react";

import { withRouter } from "react-router-dom";

import AuthWrapper from "../auth-wrapper/authWrapper";
import FormInput from "../forms/form-input/formInput";
import Button from "../forms/button/button";

import { auth } from "../../firebase/utils";

function EmailPassword(props) {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        url: "http://localhost:3000/login", // config is a adres where to resend user after password reset
      };
      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          props.history.push("/login");
        })
        .catch(() => {
          const err = [`Email not found. Please try again.`];
          setErrors(err);
        });
    } catch (err) {
      //console.log(err)
    }
  };

  const configAuthWrapper = {
    headline: "Email Password",
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="form__wrap">
        {errors.length > 0 && (
          <ul>
            {errors.map((e, index) => {
              return (
                <li style={{ color: "red", listStyle: "none" }} key={index}>
                  {e}
                </li>
              );
            })}
          </ul>
        )}
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit">Email Password</Button>
        </form>
      </div>
    </AuthWrapper>
  );
}

export default withRouter(EmailPassword);
