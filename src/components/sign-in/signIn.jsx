import React, { useState } from "react";
import "./signIn.styles.css";
import { Link } from "react-router-dom";

import AuthWrapper from "../auth-wrapper/authWrapper";
import FormInput from "../forms/form-input/formInput";
import Button from "../forms/button/button";

import { auth, signInWithGoogle } from "../../firebase/utils";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      resetForm();
    } catch (err) {
      //console.log(err)
    }
  };

  const configAuthWrapper = {
    headline: "LogIn",
  };
  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="form__wrap">
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            handleChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">LogIn</Button>

          <div className="social__sign__in">
            <Button onClick={signInWithGoogle}>Sign In With Google</Button>
          </div>

          <div className="sign__in__links">
            <Link to="/recovery">Reset Password</Link>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default SignIn;
