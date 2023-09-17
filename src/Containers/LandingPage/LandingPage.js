import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

import Styles from "./LandingPage.module.css";

import SignIn from "./../../Components/SignInUp/SignIn";
import SignUp from "./../../Components/SignInUp/SignUp";
import { useSelector } from "react-redux";
import LandingPageMainSec from "./../../Components/LandingPage/LandingPage";
import Footer from './../../Components/Footer/Footer';
import DevSignIn from "../../Components/SignInUp/DevSignIn";
import VerifyEmail from "../../Components/SignInUp/VerifyEmail";
import ForgetPassword from "../../Components/SignInUp/ForgetPassword";
import SelectUser from "../../Components/SignInUp/SelectUser";
import ResetPassword from "../../Components/SignInUp/ResetPassword";

function LandingPage() {
  const Location = useLocation();
  const history = useHistory();

  const signInUpWrapperRef = React.useRef(123);

  const handleBgOnClick = (e) => {
    if (signInUpWrapperRef.current === e.target) {
      history.push("/");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key == "Escape") {
      if (Location.pathname != "/") {
        history.push("/");
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <div>
        <LandingPageMainSec />
        <Footer />
      </div>
      <div
        ref={signInUpWrapperRef}
        className={Styles.SignInUpWrapper}
        onClick={handleBgOnClick}
        style={{
          background: Location.pathname != "/" ? "rgba(0, 0, 0, 0.4)" : "none",
          pointerEvents: Location.pathname != "/" ? "all" : "none",
        }}
      >
        <SignIn />
        <SignUp />
        <DevSignIn/>
        <VerifyEmail/>
        <ForgetPassword/>
        <SelectUser />
        <ResetPassword />
      </div>
    </>
  );
}

export default LandingPage;
