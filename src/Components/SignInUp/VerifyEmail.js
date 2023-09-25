import React, { useEffect, useState } from "react";
import Styles from "./SignInUp.module.css";

import StyledMUIInput from "./Helpers/StyledMUIInput";

import { useLocation, useHistory ,Link} from "react-router-dom";


import Button from "../Button";
import BottomText from "./Helpers/BottomText";

import { signInData } from "../StaticData.js";

import { validateEmail } from "./Helpers/ValidateEmail";
import notify from "../../Utils/helper/notifyToast";

import { BASE_URL } from '../../configs'
import axios from "axios";
import { Construction } from "@mui/icons-material";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import EmailSent from "../../Assets/LandingPage/emailSent.png";

function VerifyEmail() {
  const location = useLocation();
  const data = location.state;

  const [message, setMessage] = useState("Link will be sent to your registered email");
  const [title, setTitle] = useState("Verification of Email Needed!");
  const [isSent, setIsSent] = useState(false);

  const requestEmail = async () => {
    const email = data.email;

    const verificationResponse = await fetch(BASE_URL+"/user/requestEmailVerification", {
      method:"POST",
      body : JSON.stringify({
        Email : email
      }),
      headers : { "Content-Type" : "application/json" }
    });

    await verificationResponse.json();
    if (verificationResponse.ok) {
      setMessage("Email is sent to your registered email")
      setTitle("Email Sent!")
      setIsSent(true)
    }
  }

  useEffect(() => {
    setMessage("Link will be sent to your registered email")
    setTitle("Verification of Email Needed!")
    setIsSent(false)
  }, [])

  return (
    <>
      {data !== undefined ?  (
        <>
          <div
            className={Styles.Wrapper}
            style={{
              transform:
                location.pathname === "/verify"
                  ? "translatex(0)"
                  : "translatex(100%)",
            }}
          >
            <div className={Styles.UpperSection}>
              <span className={Styles.Title}>{title}</span>
              <br/><br/>
              <div className={Styles.TextBlack}>
                {message}
              </div>       
            
            {!isSent ? (
                <Button
                  onClick={requestEmail}
                  content="Send Email"
                  mainColor="linear-gradient(
                    63.31deg,
                    #00d1ff -9.99%,
                    #06c4ff -9.98%,
                    rgba(3, 195, 255, 0.23) 131.09%
                  )"
                  fontSize="var(--font-20)"
                  wrapperClass={Styles.verifyEmail}
                />
              ) : (
                <img
                  style={{
                    width : "15rem",
                    marginTop : "10rem",
                    marginLeft : "7rem"
                  }}
                  src={EmailSent} />
              )}
              
            </div>
            <div className={Styles.BottomSecWrapper}>
              <BottomText data={signInData} />
            </div>
          </div>
        </>
      ):( undefined )}
    </>
  );
}

export default VerifyEmail;
