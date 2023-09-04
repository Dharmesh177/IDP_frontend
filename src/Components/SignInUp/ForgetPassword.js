import React from "react";
import Styles from "./SignInUp.module.css";

import StyledMUIInput from "./Helpers/StyledMUIInput";

import { useLocation, useHistory, Link } from "react-router-dom";

import Button from "../Button";
import BottomText from "./Helpers/BottomText";

import { signInData } from "../StaticData.js";

import { validateEmail } from "./Helpers/ValidateEmail";
import notify from "../../Utils/helper/notifyToast";

import { BASE_URL } from '../../configs'
import axios from "axios";
import { Construction } from "@mui/icons-material";

function ForgetPassword() {
  const location = useLocation();
  const history = useHistory();


  const formRef = React.useRef(123);

  const [isDisabled, setIsDisabled] = React.useState(false);

  const signIn = async (e) => {
    e.preventDefault();
    if (validateData()) {
      const email = formRef.current.elements.SignInEmail.value;
      const pass = formRef.current.elements.SignInPassword.value;
      const cpass = formRef.current.elements.SignInPassword2.value;

     

    }
  };

  const validateData = () => {
    if (
      !formRef.current.elements.SignInEmail.value
    ) {
      notify("Please Enter Security Code", "warning");
      return false;
    }

    
    if (formRef.current.elements.SignInPassword.value.length < 8 || formRef.current.elements.SignInPassword.value.length > 15) {
      notify("Password should be of length 8 to 15");
      return false;
    }
    if (formRef.current.elements.SignInPassword2.value.length < 8 || formRef.current.elements.SignInPassword.value.length > 15) {
        notify("Password should be of length 8 to 15");
        return false;
      }

      if(formRef.current.elements.SignInPassword.value.length < 8 || formRef.current.elements.SignInPassword.value === formRef.current.elements.SignInPassword.value.length < 8 || formRef.current.elements.SignInPassword2.value){
            notify("Password and Confirm Password Not same");
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
        You've been received a Security code <br></br> on your registered email id.
         
       </div>
        <form className={Styles.Form} onSubmit={signIn} ref={formRef}>
          <StyledMUIInput
            fullWidth
            id="SignInEmail"
            label="Security Code"
            variant="standard"
            type="text"
            margin="dense"
            autoComplete="username"
            disabled={isDisabled}
          />
          <StyledMUIInput
            fullWidth
            id="SignInPassword"
            label="Password"
            variant="standard"
            type="password"
            margin="dense"
            autoComplete="current-password"
            disabled={isDisabled}
          />
          <StyledMUIInput
          fullWidth
          id="SignInPassword2"
          label="Confirm Password"
          variant="standard"
          type="password"
          margin="dense"
          autoComplete="current-password2"
          disabled={isDisabled}
        />
         
          <Button
            content="Submit"
            mainColor="linear-gradient(
              63.31deg,
              #00d1ff -9.99%,
              #06c4ff -9.98%,
              rgba(3, 195, 255, 0.23) 131.09%
            )"
            fontSize="var(--font-20)"
            wrapperClass={Styles.SignInUpButton}
          />
        </form>
      </div>
      <div className={Styles.BottomSecWrapper}>
        <BottomText data={signInData} />
      </div>
    </div>
  );
}

export default ForgetPassword;
