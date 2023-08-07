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
      const userData = {
        name: elements.Name.value,
        email: elements.SignUpEmail.value,
        phone: elements.Mobile.value,
        state: elements.State.value,
        city: elements.City.value,
      };
      if (isStationSelected) {
        userData.address = elements.Address.value;
        userData.location = elements.URL.value;
      }
    }
  };

  const handleDataValidation = () => {
    if (formRef.current.elements.Name.value === "") {
      notify("Please enter your name", "warning");
      return false;
    }
    if (
      !formRef.current.elements.SignUpEmail.value ||
      !validateEmail(formRef.current.elements.SignUpEmail.value)
    ) {
      notify("Please enter valid Email address", "warning");
      return false;
    }
    if (formRef.current.elements.State.value === "") {
      notify("Please enter your state name", "warning");
      return false;
    }
    if (formRef.current.elements.City.value === "") {
      notify("Please enter your city name", "warning");
      return false;
    }
    if (formRef.current.elements.SignUpPassword.value.length < 6) {
      notify("Password should be atleast 6 characters long", "warning");
      return false;
    }
    if (
      formRef.current.elements.ConfirmPassword.value.length !==
      formRef.current.elements.SignUpPassword.value.length
    ) {
      notify("Confirm password should be same as password", "warning");
      return false;
    }
    if (formRef.current.elements.UserType.value === "Station") {
      if (formRef.current.elements.Address.value === "") {
        notify("Please enter your address", "warning");
        return false;
      }

      if (formRef.current.elements.URL.value === "") {
        notify("Please enter your Google map URL", "warning");
        return false;
      }
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
            id="Name"
            label="Name"
            variant="standard"
            disabled={isDisabled}
          />
          <StyledMUIInput
            fullWidth
            id="SignUpEmail"
            label="Email address"
            variant="standard"
            type="email"
            margin="dense"
            autoComplete="username"
            disabled={isDisabled}
          />
          <StyledMUIInput
            fullWidth
            id="State"
            label="State"
            variant="standard"
            margin="dense"
            disabled={isDisabled}
          />
          <StyledMUIInput
            fullWidth
            id="City"
            label="City/Town"
            variant="standard"
            margin="dense"
            disabled={isDisabled}
          />

          <StyledMUIInput
            fullWidth
            label="Mobile ( Optional )"
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
