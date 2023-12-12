import {React,useState,useEffect} from "react";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { ReactComponent as Arrow } from "../../../Assets/Profile/Arrow.svg";
import styles from "./ProfileLeftSec.module.css";

import { PROFILE_DATA } from "../../../Utils/Constants/StaticData";

import Button from "../../Button2/Button";


function ProfileLeftSecDev() {
  const history = useHistory();
  const [udata, setUdata] = useState(null);
  const logout = () => {
    //////
  };
  const location = useLocation();
 



  return (
    <div className={styles.Wrapper}>
      <div className={styles.BackButtonWrapper}>
        <Button
          name={"back"}
          withIcon
          IconComp={Arrow}
          wrapperClass={styles.BackButton}
          primaryColor="var(--sec-black)"
          onClick={() => {
            history.push("/");
          }}
          inverted
          fullWidth
        />
      </div>
      <div className={styles.TopSec}>
        <img
          src={PROFILE_DATA.images.profileImg}
          alt="profileImg"
          className={styles.ProfileImg}
          onLoad={(e) => {
            e.target.style.opacity = 1;
          }}
        />
        <div className={styles.InfoSec}>
          <h4 className={styles.Name}> Developer </h4>
          <span className={styles.Email}>support@authify.com</span>
        </div>
      </div>

      <div className={styles.LinksAndButtonsSec}>
        {PROFILE_DATA.links2.map((link, index) => {
          return (
            
              <NavLink
                key={index}
                className={
                  styles.BottomItem +
                  " " +
                  (location.pathname.endsWith(link.to)
                    ? styles.BottomItemActive
                    : "")
                }
                style={
                  link.colors && {
                    "--primary-text-color": link.colors.primary,
                    "--background-color": link.colors.secondary,
                  }
                }
                to={`/profile${link.to}`}
              >
                {link.title}
              </NavLink>
            )
          
        })}
        <div
          className={styles.BottomItem}
          style={{
            "--primary-text-color": `var(--red-primary)`,
            "--background-color": `var(--red-bg)`,
          }}
          onClick={logout}
        >
          {PROFILE_DATA.logout}
        </div>
      </div>
    </div>
  );
}

export default ProfileLeftSecDev;
