import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Explore,
  Offers,
  Profile,
  SignIn,
  SignUp,
  ForgotPassword,
} from "./pages";

import { Navbar, PrivateRoute } from "./components";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<h2>Not found</h2>} />
        </Routes>
        <Navbar />
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
