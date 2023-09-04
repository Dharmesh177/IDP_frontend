import React from "react";

import Styles from "./SignInUp.module.css";

import { FormControlLabel, RadioGroup, Typography } from "@mui/material";
import StyledMUIInput from "./Helpers/StyledMUIInput";

import { useLocation, useHistory } from "react-router-dom";

import {
  MobileNumberTextMask,
  CustomisedRadio,
} from "./Helpers/StyledMUIInput";

import Button from "../Button";
import BottomText from "./Helpers/BottomText";

import { signUpData } from "../StaticData";

import notify from "../../Utils/helper/notifyToast";
import { validateEmail } from "./Helpers/ValidateEmail";
import axios from "axios";
import { BASE_URL } from "../../configs";


function SignUp() {
  const location = useLocation();
  const formRef = React.useRef(123);
  const history = useHistory();
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [isStationSelected,setIsStationSelected] = React.useState(false)

  const [values, setValues] = React.useState({
    textmask: "",
    numberformat: "",
    Mobile: "",
  });

  
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const signUp = async (e) => {
    e.preventDefault();
    const inputValidation = handleDataValidation();
    const elements = formRef.current.elements;

    if (inputValidation) {
      setIsDisabled(true);
      const data = {
        FirstName : elements.FirstName.value.trim(),
        LastName : elements.LastName.value.trim(),
        Email : elements.SignUpEmail.value.trim(),
        ContactNo : elements.Mobile.value.trim(),
        Password : elements.SignUpPassword.value.trim(),
        ProfilePhoto : "https://avatars.githubusercontent.com/u/51825251?v=4"
      }

      try {
        const res = await axios.post(BASE_URL+"/user", data);
        const message = res.data.message;
        notify(message)
        history.push(`/verify`);
        // to-do : signup successful, redirect to login or email verification
        
      }catch(error) {
        const errorMessage = error.response.data.message;
        notify(errorMessage)
        setIsDisabled(false);
      }
    }
  };

  const handleDataValidation = () => {
    const elements = formRef.current.elements;

    const firstName = elements.FirstName.value.trim();
    const lastName = elements.LastName.value.trim();
    const email = elements.SignUpEmail.value.trim();
    const mobile = elements.Mobile.value.trim();
    const pass = elements.SignUpPassword.value.trim();
    const confirmPass = elements.ConfirmPassword.value.trim();


    if (firstName.length < 2 || firstName.length > 20) {
      notify("FisrtName length must be between 2 & 20")
      return false;
    }

    if (lastName.length < 2 || lastName.label > 20) {
      notify("LastName length must be between 2 & 20")
      return false;
    }

    if (email.length < 5 || email.length > 40) {
      notify("Enter Valid Email")
      return false;
    }
    
    if (mobile.length != 10) {
      notify("Enter Valid Contact No")
      return false;
    }

    if (pass.length < 8 || pass.length > 15) {
      notify("Password should be of length 8 to 15");
      return false;
    }

    if (confirmPass != pass) {
      notify("Password and Confirm Password Not same");
      return false;
    }

    return true;
  };

  return (
    <div
      className={Styles.Wrapper}
      style={{
        transform:
          location.pathname === "/signup"
            ? "translatex(0)"
            : "translatex(100%)",
      }}
    >
      <div className={Styles.UpperSection}>
        <span className={Styles.Title}>{signUpData.title}</span>
        <form ref={formRef} className={Styles.Form} onSubmit={signUp}>
          <StyledMUIInput
            fullWidth
            id="FirstName"
            label="FirstName"
            variant="standard"
            margin="dense"
            disabled={isDisabled}
          />
          <StyledMUIInput
            fullWidth
            id="LastName"
            label="LastName"
            variant="standard"
            margin="dense"
            disabled={isDisabled}
          />
          <StyledMUIInput
            fullWidth
            id="SignUpEmail"
            label="Email"
            variant="standard"
            type="email"
            margin="dense"
            autoComplete="username"
            disabled={isDisabled}
          />
          <StyledMUIInput
            fullWidth
            label="Mobile"
            value={values.Mobile}
            onChange={handleChange}
            name="Mobile"
            id="Mobile"
            InputProps={{
              inputComponent: MobileNumberTextMask,
            }}
            variant="standard"
            margin="dense"
            disabled={isDisabled}
          />
          <StyledMUIInput
            fullWidth
            id="SignUpPassword"
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
            content="Continue"
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
        <BottomText data={signUpData} />
      </div>
    </div>
  );
}

export default SignUp;
