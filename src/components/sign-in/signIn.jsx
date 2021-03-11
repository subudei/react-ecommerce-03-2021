import React, { Component } from "react";
import "./signIn.styles.css";

import Button from "../forms/button/button";
import { auth, signInWithGoogle } from "../../firebase/utils";
import FormInput from "../forms/form-input/formInput";

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
    return (
      <div className="sign__in__container">
        <div className="sign__in__wrap">
          <h2>login</h2>
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
                <div className="sign__in__row">
                  <Button onClick={signInWithGoogle}>
                    Sign In With Google
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
