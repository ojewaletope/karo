import { useNavigate, useLocation } from "react-router";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "@firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "@firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";
import googleIcon from "../assets/svg/googleIcon.svg";

export const OAuth = () => {
  const navige = useNavigate();
  const location = useLocation();

  const handleAuth = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // check for user
      const docRef = doc(db, "users", user.uid);
      const docSnapShot = await getDoc(docRef);

      // if user doesn't exist, create user
      if (!docSnapShot.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navige("/");
    } catch (error) {
      toast.error("Could not authorize with Google");
    }
  };
  return (
    <div className="socialLogin">
      <p>Sign {location.pathname === "/login" ? "in" : "up"} with</p>
      <button className="socialIconDiv" onClick={handleAuth}>
        <img className="socialIconImg" src={googleIcon} alt="google" />
      </button>
    </div>
  );
};
