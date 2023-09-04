import React from "react";

import styles from "./ProfileMainSec.module.css";

import ProfileLeftSec from "./ProfileLeftSec/ProfileLeftSec";
import ProfileRightSec from "./ProfileRightSec/index";
import ProfileRightSecDev from "./ProfileRightSec/ProfileRightSecDev";
import ProfileLeftSecDev from "./ProfileLeftSec/ProfileLeftSecDev";

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
