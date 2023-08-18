import React from "react";
import axios from "axios";
import Styles from "./SignInUp.module.css";
import Button from "@mui/material/Button";
import { FormControlLabel, RadioGroup, Typography } from "@mui/material";
import StyledMUIInput from "./Helpers/StyledMUIInput";

import { useLocation, useHistory } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
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
  const [isStationSelected, setIsStationSelected] = React.useState(false);

  const [shown, setshown] = React.useState(false);
  const [urls, seturls] = React.useState([]);
  const [devData, setDevdata] = React.useState({});

  // const sendRequest = async () => {
  //     const res = await axios
  //     .post("http://localhost:5000/api/client/insertClient", devData)
  //     .catch((err) => console.log(err));
  //   console.log(res);
  //   const dat = await res.nClinet;
  //   return dat;
  // };

  const handleAdd = (event) => {
    const elements = formRef.current.elements;
    const urlll = elements.redirecturl.value;
    console.log(urlll);
    if (urlll != "") {
      seturls([...urls, urlll]);
    }
    elements.redirecturl.value = "";
    console.log(urls);
  };

  const signUp = async (e) => {
    e.preventDefault();
    const inputValidation = handleDataValidation();
    const elements = formRef.current.elements;

    if (inputValidation) {
      setIsDisabled(true);
      setDevdata({
        ClientName: elements.Cname.value,
        email: elements.SignUpEmail.value,
        ClientID: elements.Cid.value,
        Secret: elements.Csecret.value,
        scope: elements.Scope.value,
        AuthorizationCode: elements.Authcode.value,
        RedirectURIs: urls,
      });

      console.log("Developer data is here");
      console.log(devData);

      const requrl = "http://localhost:5000/api/client/insertClient";
      const reqOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ClientName: elements.Cname.value,
          email: elements.SignUpEmail.value,
          ClientID: elements.Cid.value,
          Secret: elements.Csecret.value,
          scope: elements.Scope.value,
          AuthorizationCode: elements.Authcode.value,
          RedirectURIs: urls,
        }),
      };
      const result = await fetch(requrl, reqOptions);
      const response = await result.json();

      if (response.status === 'success') {
        alert("Client added successfully 😃!!!")
      }
      else {
        alert("Failed to add client 😢!!!")
      }
      // sendRequest()
      // .then((data) => {
      //   console.log(data);
      //   window.location = "/";
      // })
      // .then(() => console.log("done"));
    }
  };

  const handleDataValidation = () => {
    if (formRef.current.elements.Cname.value === "") {
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
    if (formRef.current.elements.Cid.value === "") {
      notify("Please enter your client id", "warning");
      return false;
    }
    if (formRef.current.elements.Csecret.value === "") {
      notify("Please enter your secret value", "warning");
      return false;
    }
    if (formRef.current.elements.Authcode.value === "") {
      notify("Please enter your authorization code", "warning");
      return false;
    }
    if (formRef.current.elements.protocol.value === "") {
      notify("Please enter your protocol", "warning");
      return false;
    }
    if (formRef.current.elements.Scope.value === "") {
      notify("Please enter your Scope", "warning");
      return false;
    }
    if (formRef.current.elements.redirecturl.value === "") {
      notify("Please enter your redirect url", "warning");
      return false;
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

          <>
            <StyledMUIInput
              fullWidth
              id="redirecturl"
              label="Redirect URL's"
              variant="standard"
              margin="dense"
              disabled={isDisabled}
            />
            <AddCircleOutlineIcon
              onClick={handleAdd}
              style={{ fontSize: "3rem", margin: "1rem", color: "blue" }}
            />
          </>

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
