import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import { OAuth, TextField } from "../components";
import { AuthDetails } from "../models/model";

type FormObjProps = AuthDetails;

export const SignUp = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formObject, setFormObject] = useState<FormObjProps>({
    name: "",
    email: "",
    password: "" ?? undefined,
  });

  const { name, email, password } = formObject;

  const navigate = useNavigate();

  const handleChange = (e: React.SyntheticEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormObject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log(db);

    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password!
      );
      const user = userCredential.user;

      console.log(user);

      updateProfile(auth.currentUser!, { displayName: name });

      const formObjectCopy = { ...formObject };
      delete formObjectCopy.password;
      formObjectCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formObjectCopy);

      navigate("/");
    } catch (error) {
      toast.error("Something went wrong, please try again!");
    }
  };

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome to Karo</p>
        </header>
        <form onSubmit={handleSubmit}>
          <TextField
            type="text"
            name="name"
            placeholder="Full Name"
            className="nameInput"
            id="name"
            value={name}
            onChange={handleChange}
          />
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

          <div className="signUpBar">
            <p className="signUpText">Sign Up</p>
            <button className="signUpButton">
              <ArrowRightIcon fill="#fff" width="34px" height="34px" />
            </button>
          </div>
        </form>

        <OAuth />

        <Link to="/login" className="registerLink">
          Sign In Instead
        </Link>
      </div>
    </>
  );
};
