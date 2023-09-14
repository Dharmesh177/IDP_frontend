import React, { useEffect, useState } from "react";
import Styles from "./SignInUp.module.css";
import Button from "../Button";
import BottomText from "./Helpers/BottomText";
import { signInData } from "../StaticData.js";
import { BASE_URL } from '../../configs'
import { Redirect, useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import ErrorImg from "../../Assets/LandingPage/emailFailed.png";
import SuccessImg from "../../Assets/LandingPage/emailVerified.png";

function EmailTokenVerification() {
  const location = useLocation();

  const [message, setMessage] = useState("");
  const [color, setColor] = useState("green");
  const [succees, setSuccess] = useState(false);

  const history = useHistory();

  const queryParameters = new URLSearchParams(window.location.search)
  const token = queryParameters.get("token");

  const verifyEmail = async () => { 

    const response = await fetch(BASE_URL+"/user/verifyEmail", {
        method : "GET",
        headers : {
          Authorization : `Bearer ${token}`
        }
    })

    const result = await response.json();
    if (response.ok) {
      setMessage(result.message)
      setColor("green");
      setSuccess(true);
    } else {
      setMessage("Link Expired, Try Again!");
      setColor("red");
      setSuccess(false);
    }
  }

  useEffect(() => {
    if (token != undefined) {
        verifyEmail();
    }
  }, []);

  const navigateToLogin = () => {
    history.push("/signin")
  }

  return (
    <>
    {!token ? <Redirect to="/" /> : null}
    <div
      className={Styles.Wrapper}
      style={{
        transform:
          location.pathname === "/emailVerification"
            ? "translatex(0)"
            : "translatex(100%)",
      }}
    >
      <div className={Styles.UpperSection}>
        <span className={Styles.Title}>Email Verification!</span>
        <div className={Styles.TextBlack} style={{ color : color }}>
            {message}
        </div> 
        <img 
          style={{
            width : "15rem",
            marginTop : "5rem",
            marginLeft : "7rem"
          }}
          alt="image"
          src={succees === true ? SuccessImg : ErrorImg} />

          <Button
            onClick={navigateToLogin}
            content={succees ? "Continue" : "Resend"}
            mainColor="linear-gradient(
              63.31deg,
              #00d1ff -9.99%,
              #06c4ff -9.98%,
              rgba(3, 195, 255, 0.23) 131.09%
            )"
            fontSize="var(--font-20)"
            wrapperClass={Styles.verifyEmail}
          />
      </div>
      <div className={Styles.BottomSecWrapper}>
        <BottomText data={signInData} />
      </div>
    </div>
    </>
  );
}

export default EmailTokenVerification;
