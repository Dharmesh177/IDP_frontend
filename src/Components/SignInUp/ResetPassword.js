import React, { useRef, useState } from "react";
import Styles from "./SignInUp.module.css";
import StyledMUIInput from "./Helpers/StyledMUIInput";
import { useLocation, useHistory } from "react-router-dom";
import Button from "../Button";
import BottomText from "./Helpers/BottomText";
import { signInData } from "../StaticData.js";
import notify from "../../Utils/helper/notifyToast";
import ResetPassword from "../../Assets/LandingPage/reset-password.png";
import { BASE_URL } from "../../configs";

function ForgetPassword() {

  const location = useLocation();
  const formRef = useRef(123);
  const history = useHistory();

  const [isDisabled, setIsDisabled] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("Enter Your New Password...");

  const queryParameters = new URLSearchParams(window.location.search)
  const token = queryParameters.get("token");

  const signIn = async (e) => {
    e.preventDefault();
    if (validateData()) {
      const password = formRef.current.elements.NewPassword.value;
      requestResetPassword(password)
    }
  };

  const requestResetPassword = async (password) => {
    setIsDisabled(true);

    const response = await fetch(BASE_URL+"/user/resetPassword", {
      method:"POST",
      body : JSON.stringify({
        password : password,
        token : token
      }),
      headers : { "Content-Type" : "application/json" }
    });

    if (response.ok) {
      setMessage("Password Reset Successfully...");
      setIsSuccess(true);
    }else {
      setIsDisabled(false);
      notify("Credentials Expired, Request Again...");
      history.push("/forgetpassword")
    }
  }

  const validateData = () => {
    if (formRef.current.elements.NewPassword.value.length < 8 || formRef.current.elements.NewPassword.value.length > 15) {
        notify("Password should be of length 8 to 15");
        return false;
    }

    if(formRef.current.elements.ConfirmPassword.value !== formRef.current.elements.NewPassword.value) {
        notify("Password and Confirm Password Not same");
        return false;
    }

    return true;
  }

  return (
    <>
    {!token ? undefined : (
        <div
            className={Styles.Wrapper}
            style={{
                transform:
                location.pathname === "/resetPassword" ? "translatex(0)" : "translatex(100%)",
            }}
        >
            <div className={Styles.UpperSection}>
                <span className={Styles.Title}>New Password...</span>
                
                <br/><br/>
            
                <div className={Styles.TextBlack}>
                    {message} 
                </div>

                <form className={Styles.Form} onSubmit={signIn} ref={formRef}>
                    {!isSuccess ? (
                        <>
                            <StyledMUIInput
                                fullWidth
                                id="NewPassword"
                                label="Password"
                                variant="standard"
                                type="password"
                                margin="dense"
                                autoComplete="current-password"
                                disabled={isDisabled}
                            />

                            <StyledMUIInput
                                fullWidth
                                id="ConfirmPassword"
                                label="Confirm Password"
                                variant="standard"
                                type="password"
                                margin="dense"
                                autoComplete="current-password"
                                disabled={isDisabled}
                            />
                        
                            <Button
                                content="Reset Password"
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
                            src={ResetPassword} />
                    )}
                </form>
            </div>

            <div className={Styles.BottomSecWrapper}>
                <BottomText data={signInData} />
            </div>

        </div>
    )}
    </>
  );
}

export default ForgetPassword;
