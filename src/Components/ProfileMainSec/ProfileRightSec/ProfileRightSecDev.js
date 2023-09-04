
import React, { useEffect } from "react";
import {
  Switch,
  Route,
  useLocation,
  useHistory,
  Redirect,
} from "react-router-dom";
import styles from "./ProfileRightSec.module.css";
import ClientInfo from "./PersonalInfoSec/ClientInfo";
import ClientCredential from "./ClientCredential/ClientCredential";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";


function ProfileRightSecDev({ refreshUserData }) {
  return (
    <>
    <ClientCredential/>
    </>

  )
}

export default ProfileRightSecDev

