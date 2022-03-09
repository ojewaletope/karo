import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import { OAuth, TextField } from "../components";
import { AuthDetails } from "../models/model";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

type FormObjProps = AuthDetails;

export const SignIn = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formObject, setFormObject] = useState<FormObjProps>({
    email: "",
    password: "",
  });

  const { email, password } = formObject;

  const navigate = useNavigate();

  const handleChange = (e: React.SyntheticEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormObject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password!
      );

      if (userCredential.user) {
        navigate("/");
      }
    } catch (error) {
      toast.error("Bad user credentials");
    }
  };

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>
        <form onSubmit={handleSubmit}>
          <TextField
            type="email"
            name="email"
            placeholder="Email"
            className="emailInput"
            id="email"
            value={email}
            onChange={handleChange}
          />
          <div className="passwordInputDiv">
            <TextField
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="passwordInput"
              id="password"
              value={password}
              onChange={handleChange}
            />

            <img
              src={visibilityIcon}
              alt="showPassword"
              className="showPassword"
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>
          <Link to="/forgot-password" className="forgotPasswordLink">
            Forgot Password?
          </Link>

          <div className="signInBar">
            <p className="signInText">Sign In</p>
            <button className="signInButton">
              <ArrowRightIcon fill="#fff" width="34px" height="34px" />
            </button>
          </div>
        </form>
        <OAuth />
        <Link to="/register" className="registerLink">
          Sign Up Instead
        </Link>
      </div>
    </>
  );
};
