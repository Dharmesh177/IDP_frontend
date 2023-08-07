import React from "react";
import { useHistory } from "react-router-dom";

import Button from "../../Button/Button";
import styles from "./UpperSection.module.css";
import { ReactComponent as Logo } from "../../../Assets/_General/evian.svg";
import  EV1  from "../../../Assets/LandingPage/fnn.jpg";

function UpperSection() {
  const history = useHistory();

  const goToSignUp = () => {
    history.push("/developer");
  };

  const goToSignIn = () => {
    history.push("/signin");
  };
  return (
    <div className={styles.Wrapper}>
      <div className={styles.LogoWrapper}>
        <Logo className={styles.Logo} />
      </div>

      <div className={styles.SubWrapper}>
        <div className={styles.LeftContainer}>
          <div className={styles.Heading}>
          Authify: Empowering Your Digital Identity Safely.
          </div>
          <div className={styles.Buttons}>
            <Button
              wrapperClass={styles.ButtonStyle1}
              content="Registration"
              onClick={goToSignUp}
            />
            <Button
              wrapperClass={styles.ButtonStyle2}
              isNotBorder
              content="User Login"
              onClick={goToSignIn}
            />
          </div>
        </div>

        <div className={styles.RightContainer}>
        <img src={EV1} className={styles.Ev1}
         />
        </div>
      </div>
    </div>
  );
}

export default UpperSection;
