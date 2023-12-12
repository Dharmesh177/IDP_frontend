import React from "react";
import Styles from "./SignInUp.module.css";

import StyledMUIInput from "./Helpers/StyledMUIInput";

import { useLocation, useHistory, Link } from "react-router-dom";

import Button from "../Button";
import BottomText from "./Helpers/BottomText";

import { CsignInData } from "../StaticData.js";

import { validateEmail } from "./Helpers/ValidateEmail";
import notify from "../../Utils/helper/notifyToast";

import { BASE_URL } from '../../configs'
import axios from "axios";
import { Construction } from "@mui/icons-material";

function ClientSignIn() {
  const location = useLocation();
  const history = useHistory();


  const formRef = React.useRef(123);

  const [isDisabled, setIsDisabled] = React.useState(false);

  const signIn = async (e) => {   
    e.preventDefault();
    if (validateData()) {
      const email = formRef.current.elements.SignInEmail.value;
      const password = formRef.current.elements.SignInPassword.value;

     
        const res = await axios.post("http://localhost:5000/api/client/login", {
          email : email,
          password : password 
        })
    
        if (res.data.status === 'success') {
        console.log(res);
          // to-do : save the token to cookies or browser storage
          // to-do : display the success in the UI
         
            notify("You are logged succesffuly 🎊 !!");
            notify("Your Client ID is " + res.data.client.ClientID);
            console.log(res.data)
            history.push(`/cprofile`, { ClientID : res.data.client.ClientID , token : res.data.token});  
    }else{
      notify("Error occred!!!")
    }
  }
  };

  const validateData = () => {
    if (
      !formRef.current.elements.SignInEmail.value ||
      !validateEmail(formRef.current.elements.SignInEmail.value)
    ) {
      notify("Please enter valid Email address", "warning");
      return false;
    }

    if (formRef.current.elements.SignInPassword.value.length < 8 || formRef.current.elements.SignInPassword.value.length > 15) {
      notify("Password should be of length 8 to 15");
      return false;
    }

    return true;
  }

  return (
    <div
      className={Styles.Wrapper}
      style={{
        transform:
          location.pathname === "/clientsignin"
            ? "translatex(0)"
            : "translatex(100%)",
      }}
    >
      <div className={Styles.UpperSection}>
        <span className={Styles.Title}>Developer Login</span>
        <form className={Styles.Form} onSubmit={signIn} ref={formRef}>
          <StyledMUIInput
            fullWidth
            id="SignInEmail"
            label="Email address"
            variant="standard"
            type="email"
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
          <div className={Styles.TextBlack}>
        
        <Link
          to={`/forgetpassword`}
        >
        Forget Password ?
        </Link>
      </div>
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
        <BottomText data={CsignInData} />
      </div>
    </div>
  );
}

export default ClientSignIn;
