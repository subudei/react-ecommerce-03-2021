import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  resetPasswordStart,
  resetUserState,
} from "../../redux/user/user.actions";

import AuthWrapper from "../auth-wrapper/authWrapper";
import FormInput from "../forms/form-input/formInput";
import Button from "../forms/button/button";

const mapState = ({ user }) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  userErr: user.userErr,
});

const EmailPassword = (props) => {
  const dispatch = useDispatch();
  const { resetPasswordSuccess, userErr } = useSelector(mapState);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (resetPasswordSuccess) {
      dispatch(resetUserState());
      history.push("/login");
    }
  }, [resetPasswordSuccess]);

  useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
      setErrors(userErr);
    }
  }, [userErr]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPasswordStart({ email }));
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
};

export default EmailPassword;
