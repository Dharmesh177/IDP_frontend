import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import styles from "./Profile.module.css";
import { BASE_URL } from "../../configs";
import ProfileMainSec from "./../../Components/ProfileMainSec";
import Navbar from "../../Components/Navbar";
import SecondaryFooter from "../../Components/SecondaryFooter/SecondaryFooter";

const Profile = ({ refreshUserData }) => {
  const [udata, setUdata] = useState(null);

  const location = useLocation();
  const t = location.state;

  console.log("data is");
  console.log(t);
  const queryParameter = new URLSearchParams(window.location.search);
  // const token = data.token;

  const sendd = async () => {
    console.log("Start");
    const response = await fetch(BASE_URL + "/user/mySelf", {
      method: "GET",
      headers: {
        authorization: `Bearer ${t.token}`,
      },
    });

    const result = await response.json();
    console.log("---");

    console.log(result.data[0]);

    setUdata(result.data[0]);
    console.log(udata);
  };
  useEffect(() => {
    sendd();
  }, []);
  return (
    <>
    {udata === null ? undefined : (
    <div className={styles.Wrapper}>
    <Navbar namee={udata.FirstName}/>
      <ProfileMainSec refreshUserData={refreshUserData} />
     <SecondaryFooter/>
    </div>
    )}
    </>
  );
};

export default Profile;
