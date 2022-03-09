import React, { useState } from "react";
import { getAuth, updateProfile } from "@firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
// import { LoggedInUser } from "../models/model";

export const Profile = (): JSX.Element => {
  const auth = getAuth();
  const [changeUserDetails, setChangeUserDetails] = useState(false);
  const [formObject, setFormObject] = useState<any>({
    name: auth.currentUser?.displayName,
    email: auth.currentUser?.email,
  });

  const { name, email } = formObject;

  const navigate = useNavigate();
  const handleLogout = () => {
    auth.signOut();

    navigate("/login");
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      if (auth.currentUser?.displayName !== name) {
        // update profile in db
        updateProfile(auth.currentUser!, {
          displayName: name,
        });

        // update in firestore

        const userRef = doc(db, "users", auth.currentUser?.uid!);
        await updateDoc(userRef, { name });
      }
    } catch (error) {}
  };
  const handleChange = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const { name, value } = e.target as HTMLInputElement;
    setFormObject((prevState: any) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">{auth.currentUser?.displayName} Profile</p>
        <button type="button" className="logOut" onClick={handleLogout}>
          Log Out
        </button>
      </header>

      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal Details</p>
          <p
            className="changePersonalDetails"
            onClick={(e) => {
              changeUserDetails && handleSubmit(e);
              setChangeUserDetails((prevState) => !prevState);
            }}
          >
            {changeUserDetails ? "done" : "change"}
          </p>
        </div>

        <div className="profileCard">
          <form>
            <input
              name="name"
              id="name"
              type="text"
              placeholder="Full name"
              value={name}
              onChange={handleChange}
              className={
                changeUserDetails ? "profileName" : "profileNameActive"
              }
              disabled={!changeUserDetails}
            />
            <input
              name="email"
              id="email"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={handleChange}
              className={
                changeUserDetails ? "profileEmail" : "profileEmailActive"
              }
              disabled={!changeUserDetails}
            />
          </form>
        </div>
      </main>
    </div>
  );
};
