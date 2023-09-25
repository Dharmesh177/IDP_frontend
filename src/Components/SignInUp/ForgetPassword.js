import React, { useState } from "react";
import Styles from "./SignInUp.module.css";
import StyledMUIInput from "./Helpers/StyledMUIInput";
import { useLocation, useHistory } from "react-router-dom";
import Button from "../Button";
import BottomText from "./Helpers/BottomText";
import { signInData } from "../StaticData.js";
import notify from "../../Utils/helper/notifyToast";
import EmailSent from "../../Assets/LandingPage/emailSent.png";
import { BASE_URL } from "../../configs";


function ForgetPassword() {

  const location = useLocation();
  const formRef = React.useRef(123);

  const [isDisabled, setIsDisabled] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("You will receive link on email");

  const signIn = async (e) => {
    e.preventDefault();
    if (validateData()) {
      const email = formRef.current.elements.SignInEmail.value;
      requestForgetPassword(email)
    }
  };

  const requestForgetPassword = async (email) => {
    setIsDisabled(true);

    const response = await fetch(BASE_URL+"/user/forgotPassword", {
      method:"POST",
      body : JSON.stringify({
        Email : email
      }),
      headers : { "Content-Type" : "application/json" }
    });

    if (response.ok) {
      setMessage("Email is sent...");
      setIsSuccess(true);
    }else {
      setIsDisabled(false);
      notify("Account Not Exist...");
    }
  }

  const validateData = () => {
    if (!formRef.current.elements.SignInEmail.value) {
      notify("Please Enter Email", "warning");
      return false;
    }
    return true;
  }

  return (
    <div
      className={Styles.Wrapper}
      style={{
        transform:
          location.pathname === "/forgetpassword"
            ? "translatex(0)"
            : "translatex(100%)",
      }}
    >
      <div className={Styles.UpperSection}>
        <span className={Styles.Title}>Reset Password</span>
        
        <br/><br/>
        
        <div className={Styles.TextBlack}>
          {message} 
        </div>

        <form className={Styles.Form} onSubmit={signIn} ref={formRef}>
          {!isSuccess ? (
            <>
              <StyledMUIInput
                fullWidth
                id="SignInEmail"
                label="Email"
                variant="standard"
                type="text"
                margin="dense"
                autoComplete="username"
                disabled={isDisabled}
              />
            
              <Button
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
            </>
          ):(
            <img
                  style={{
                    width : "15rem",
                    marginTop : "10rem",
                    marginLeft : "7rem"
                  }}
                  src={EmailSent} />
          )}
        </form>
      </div>

      <div className={Styles.BottomSecWrapper}>
        <BottomText data={signInData} />
      </div>

    </div>
  );
}

export default ForgetPassword;
