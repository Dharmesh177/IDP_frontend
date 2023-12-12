

import styles from "./ProfileMainSec.module.css";

import ProfileLeftSec from "./ProfileLeftSec/ProfileLeftSec";
import ProfileRightSec from "./ProfileRightSec/index";
import ProfileRightSecDev from "./ProfileRightSec/ProfileRightSecDev";
import ProfileLeftSecDev from "./ProfileLeftSec/ProfileLeftSecDev";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import {React,useState,useEffect} from "react";

function DevProfileMain({ refreshUserData }) {

  return (
    <div className={styles.Wrapper}>
      <div className={styles.LeftSec}>
        <ProfileLeftSecDev />
      </div>
      <div className={styles.RightSec}>
        <ProfileRightSecDev refreshUserData={refreshUserData} />
      </div>
    </div>
  );
}

export default DevProfileMain;
