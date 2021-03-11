import React, { Component } from "react";
import Button from "../forms/button/button";
import FormInput from "../forms/form-input/formInput";
import "./signUp.styles.css";

const initialState = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

class SignUp extends Component {
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

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className="sign__up__container">
        <div className="sign__up__wrap">
          <h2>Signup</h2>
          <div className="form__wrap">
            <form>
              <FormInput
                type="text"
                name="displayName"
                value={displayName}
                placeholder="Full name"
                onChange={this.handleChange}
              />
              <FormInput
                type="email"
                name="email"
                value={email}
                placeholder="Email"
                onChange={this.handleChange}
              />
              <FormInput
                type="pasword"
                name="pasword"
                value={password}
                placeholder="Password"
                onChange={this.handleChange}
              />
              <FormInput
                type="pasword"
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={this.handleChange}
              />
              <Button type="submit">Register</Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
