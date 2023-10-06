import React from "react";
import { useHistory } from "react-router-dom";

import styles from "./Navbar.module.css";

import { ReactComponent as Logo } from "../../Assets/_General/evian.svg";
import DefaultImage from "../../Assets/_General/DefaultImg.png";

function Navbar(props) {
   const history = useHistory();

  const handleClickHomePage = () => {
    // if (userData) {
    //   history.push(`/home`);
    // } else {
      history.push(`/`);
    // }
  };

  const handleClickProfile = () => {
    history.push(`/profile`);
  };

  return (
    <div className={styles.Wrapper}>
      <div className={styles.SubWrapper}>
        <div className={styles.LeftWrapper} onClick={handleClickHomePage}>
          <Logo style={{height: "51px"}} className={styles.Logo} />
        </div>
        <div className={styles.RightWrapper} onClick={handleClickProfile}>
          <img
          // userData.profilePicture ? userData.profilePicture : 
            src={
              DefaultImage
            }
            alt="Default Profile Photo"
            className={styles.ProfilePhoto}
            onLoad={(e) => {
              e.target.style.opacity = "1";
            }}
          />
          
          <span className={styles.UserName}>{props.namee}</span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
