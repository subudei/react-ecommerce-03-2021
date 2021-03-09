import React, { Component } from "react";
import "./signIn.styles.css";

import Button from "../forms/button/button";
import { signInWithGoogle } from "../../firebase/utils";

class SignIn extends Component {
  handleSubmit = async (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <div className="sign__in__container">
        <div className="sign__in__wrap">
          <h2>sign in</h2>
          <div className="form__wrap">
            <form onSubmit={this.handleSubmit}>
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
