import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "@firebase/auth";
import { toast } from "react-toastify";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { value } = e.target as HTMLInputElement;
    setEmail(value);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);

      toast.success(`Email was sent to ${email}`);
    } catch (error) {
      toast.error("Unable to send reset link");
    }
  };

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Forgot Password</p>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="emailInput"
            placeholder="Email Address"
            value={email}
            name="email"
            onChange={handleChange}
          />

          <Link className="forgotPasswordLink" to="/login">
            Back to Login
          </Link>
          <div className="signInBar">
            <div className="signInText">Reset Password</div>
            <button className="signInButton">
              <ArrowRightIcon fill="#fff" width="34px" height="34px" />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};
