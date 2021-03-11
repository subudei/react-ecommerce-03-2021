import React, { Component } from "react";
import "./signIn.styles.css";
import { Link } from "react-router-dom";

import AuthWrapper from "../auth-wrapper/authWrapper";
import FormInput from "../forms/form-input/formInput";
import Button from "../forms/button/button";

import { auth, signInWithGoogle } from "../../firebase/utils";

const initialState = {
  email: "",
  password: "",
};

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({
        ...initialState,
      });
    } catch (err) {
      //console.log(err)
    }
  };

  render() {
    const { email, password } = this.state;

    const configAuthWrapper = {
      headline: "LogIn",
    };
    return (
      <AuthWrapper {...configAuthWrapper}>
        <div className="form__wrap">
          <form onSubmit={this.handleSubmit}>
            <FormInput
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              handleChange={this.handleChange}
            />
            <FormInput
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              handleChange={this.handleChange}
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
  }
}

export default SignIn;
