import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import styles from "./Profile.module.css";

import ProfileMainSec from "./../../Components/ProfileMainSec";
import Navbar from "../../Components/Navbar";
import SecondaryFooter from "../../Components/SecondaryFooter/SecondaryFooter";
import DevProfileMain from "../../Components/ProfileMainSec/DevProfileMain";

const CProfile = ({ refreshUserData }) => {
  return (
    <div className={styles.Wrapper}>
    <Navbar/>
      <DevProfileMain refreshUserData={refreshUserData} />
     <SecondaryFooter/>
    </div>
  );
};

export default CProfile;
