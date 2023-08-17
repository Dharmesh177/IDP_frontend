import React from "react";

import Styles from "./SignInUp.module.css";
import Button from '@mui/material/Button';
import { FormControlLabel, RadioGroup, Typography } from "@mui/material";
import StyledMUIInput from "./Helpers/StyledMUIInput";

import { useLocation, useHistory } from "react-router-dom";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
  MobileNumberTextMask,
  CustomisedRadio,
} from "./Helpers/StyledMUIInput";

import Buttonn from "../Button";
import BottomText from "./Helpers/BottomText";

import { DsignUpData } from "../StaticData";

import notify from "../../Utils/helper/notifyToast";
import { validateEmail } from "./Helpers/ValidateEmail";


function DevSignIn() {
  const location = useLocation();
  const formRef = React.useRef(123);
  const history = useHistory();
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [isStationSelected,setIsStationSelected] = React.useState(false)
  
  const [shown,setshown] = React.useState(false);
  const [urls,seturls] = React.useState([]);
  const [urll,seturll] = React.useState();
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
          location.pathname === "/developer"
            ? "translatex(0)"
            : "translatex(100%)",
      }}
    >
      <div className={Styles.UpperSection}>
        <span className={Styles.Title}>{DsignUpData.title}</span>
        <form ref={formRef} className={Styles.Form} onSubmit={signUp}>
        <StyledMUIInput
          fullWidth
          id="Cname"
          label="Client Name"
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
          id="Cid"
          label="Client ID"
          variant="standard"
          margin="dense"
          disabled={isDisabled}
        />
        <StyledMUIInput
          fullWidth
          id="Csecret"
          label="Client Secret"
          variant="standard"
          margin="dense"
          disabled={isDisabled}
        />

        <StyledMUIInput
          fullWidth
          id="Scope"
          label="Scope"
          variant="standard"
          margin="dense"
          disabled={isDisabled}
        />
       
        <StyledMUIInput
          fullWidth
          id="protocol"
          label="Protocol"
          variant="standard"
          margin="dense"
          disabled={isDisabled}
        />
        <StyledMUIInput
          fullWidth
          id="Authcode"
          label="Authorization Code"
          variant="standard"
          margin="dense"
          disabled={isDisabled}
        />

        <StyledMUIInput
          fullWidth
          id="redirecturl"
          label="Redirect URL's"
          variant="standard"
          margin="dense"
          disabled={isDisabled}
        />
        <RadioGroup
          row
          aria-label="Type"
          defaultValue="User"
          name="UserType"
          className={Styles.RadioWrapper}
          onChange={(e) => {
            setIsStationSelected(e.target.value === "Add");
          }}
        >
          
          <FormControlLabel
            disabled={isDisabled}
            value="Add"
            control={<CustomisedRadio />}
            label={
              <Typography
                sx={{ fontSize: "var(--font-16)", fontWeight: 400 }}
              >
                Add More
              </Typography>
            }
          />
        </RadioGroup>
        {isStationSelected ? (
          <>
            <StyledMUIInput
              fullWidth
              id="redirecturl"
              label="Redirect URL's"
              variant="standard"
              margin="dense"
              disabled={isDisabled}
            />
            <AddCircleOutlineIcon style={{fontSize:"3rem", margin:"1rem", color:"blue"}} />
            

          
					
          </>
        ) : null}
        <Buttonn
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
        <BottomText data={DsignUpData} />
      </div>
    </div>
  );
}

export default DevSignIn;
