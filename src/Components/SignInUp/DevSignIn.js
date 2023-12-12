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
  CustomisedCheckBox,
} from "./Helpers/StyledMUIInput";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import Buttonn from "../Button";
import BottomText from "./Helpers/BottomText";

import { DsignUpData } from "../StaticData";

import notify from "../../Utils/helper/notifyToast";
import { validateEmail } from "./Helpers/ValidateEmail";

function DevSignIn() {
  const formRef = React.useRef(123);
  const history = useHistory();
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [isStationSelected, setIsStationSelected] = React.useState(false);

  const [shown, setshown] = React.useState(false);
  const [urls, seturls] = React.useState([]);
  const [devData, setDevdata] = React.useState({});
  // const [access,setaccess] = React.useState([]);

  const access = [];

  const location = useLocation();
  const t = location.state;

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

  const handleChange = (e) => {
    console.log(access);
    if (access.includes(e.target.value)) {
      const idx = access.indexOf(e.target.value);
      access.splice(idx, 1);
    } else {
      access.push(e.target.value);
    }
    console.log("after change");
    console.log(access);
  };

  const signUp = async (e) => {
    e.preventDefault();
    const inputValidation = handleDataValidation();
    const elements = formRef.current.elements;

    if (inputValidation) {
      setIsDisabled(true);

      console.log("token in frontend" + t.token);

      try {
        const response = await fetch(
          "http://localhost:5000/api/client/insertClient",
          {
            method: "POST",
            body: JSON.stringify({
              ClientID: t.ClientID,
              name: elements.Cname.value,
              scope: elements.Scope.value,
              protocol: elements.protocol.value,
              RedirectURIs: urls,
              access: access,
            }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${t.token}`,
            },
          }
        );
        notify("Data Inserted Successfully!!");
        history.push(`/cprofile`, { ClientID : t.ClientID , token : t.token}); 
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleDataValidation = () => {
    if (formRef.current.elements.Cname.value === "") {
      notify("Please enter your name", "warning");
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
    if (access.length == 0) {
      notify("Checkmark required access's", "warning");
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
            id="ClientID"
            label="Client ID"
            variant="standard"
            type="text"
            margin="dense"
            autoComplete="username"
            disabled={isDisabled}
            value={t != null ? t.ClientID : " s"}
          />
          <StyledMUIInput
            fullWidth
            id="Cname"
            label="Client Name"
            variant="standard"
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
          <br />

          <Typography sx={{ fontSize: "var(--font-16)", fontWeight: 400 }}>
            Access Required
          </Typography>

          <FormControlLabel
            disabled={isDisabled}
            id="1"
            value="FirstName"
            control={<CustomisedCheckBox />}
            onChange={handleChange}
            label={
              <Typography sx={{ fontSize: "var(--font-16)", fontWeight: 400 }}>
                FirstName
              </Typography>
            }
          />
          <FormControlLabel
            disabled={isDisabled}
            value="LastName"
            id="2"
            control={<CustomisedCheckBox />}
            onChange={handleChange}
            label={
              <Typography sx={{ fontSize: "var(--font-16)", fontWeight: 400 }}>
                LastName
              </Typography>
            }
          />
          <FormControlLabel
            disabled={isDisabled}
            value="Email"
            id="3"
            control={<CustomisedCheckBox />}
            onChange={handleChange}
            label={
              <Typography sx={{ fontSize: "var(--font-16)", fontWeight: 400 }}>
                Email
              </Typography>
            }
          />
          <FormControlLabel
            disabled={isDisabled}
            value="ContactNo"
            id="4"
            control={<CustomisedCheckBox />}
            onChange={handleChange}
            label={
              <Typography sx={{ fontSize: "var(--font-16)", fontWeight: 400 }}>
                ContactNo
              </Typography>
            }
          />
          <FormControlLabel
            disabled={isDisabled}
            value="ProfilePhoto"
            id="5"
            control={<CustomisedCheckBox />}
            onChange={handleChange}
            label={
              <Typography sx={{ fontSize: "var(--font-16)", fontWeight: 400 }}>
                ProfilePhoto
              </Typography>
            }
          />

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
