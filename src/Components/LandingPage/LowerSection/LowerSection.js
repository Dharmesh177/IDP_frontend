import React from "react";
import { useHistory } from "react-router-dom";
import Button from "../../Button/Button";
import styles from "./LowerSection.module.css";
import { ReactComponent as EV2 } from "../../../Assets/LandingPage/left_elements.svg";
import { ReactComponent as EV3 } from "../../../Assets/LandingPage/grass_right.svg";
import { ReactComponent as EV4 } from "../../../Assets/LandingPage/car.svg";

function LowerSection() {
  const history = useHistory();
  return (
    <div className={styles.Wrapper}>
      <div className={styles.SubWrapper}>
        <div className={styles.Heading}>
        Unlock Your Digital Identity, Seamlessly Secure.
        </div>
        <div className={styles.Button}>
          <Button
            wrapperClass={styles.ButtonStyle}
            content="Join Now"
            onClick={() => history.push("/developer")}
          />
        </div>
      </div>

      <EV2 className={styles.Ev2} />
      <EV3 className={styles.Ev3} />
      <EV4 className={styles.Ev4} />
    </div>
  );
}

export default LowerSection;
