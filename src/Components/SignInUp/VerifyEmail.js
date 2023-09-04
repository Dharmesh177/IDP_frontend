import React from "react";
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

function VerifyEmail() {
  const location = useLocation();
  const history = useHistory();


  const formRef = React.useRef(123);

  const [isDisabled, setIsDisabled] = React.useState(false);

  const verifyy = async (e) => {
    e.preventDefault();
    if (validateData()) {
      const codee = formRef.current.elements.verifyEmail.value;

    }
  };

  const validateData = () => {
    if (
      !formRef.current.elements.verifyEmail.value 
    ) {
      notify("Please enter Verification Code", "warning");
      return false;
    }
    return true;
  }

  return (
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
        <span className={Styles.Title}>Verify Email</span>
       <br/><br/>
       <div className={Styles.TextBlack}>
       You've been received a Verification code <br></br> on your registered email id.
        <Link
          className={Styles.TextOrange}
          to={``}
        >
         Resend ?
        </Link>
      </div>
       
       
      
        <form className={Styles.Form} onSubmit={verifyy} ref={formRef}>
          <StyledMUIInput
            fullWidth
            id="verifyEmail"
            label="Verification Code"
            variant="standard"
            type="text"
            margin="dense"
            autoComplete="code"
            disabled={isDisabled}
          />
          
          <Button
            content="Verify"
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

export default VerifyEmail;
