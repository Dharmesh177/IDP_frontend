import React, { useMemo, useState, useEffect, useRef } from "react";


import styles from "./PersonalInfoSec.module.css";

import { PROFILE_DATA } from "../../../../Utils/Constants/StaticData";

import Button from "./../../../Button2/Button";
import { ReactComponent as PlusImg } from "../../../../Assets/Profile/Plus.svg";
import DeleteIcon from '@mui/icons-material/Delete';
import ReportIcon from '@mui/icons-material/Report';

function ClientInfo(props) {
  const devData = [];
  const [localedevData, setLocaledevData] = useState({ ...devData });
  const [flag,setFlag] = useState(false);

  return (
    <div className={styles.Wrapper}>
      <div className={styles.TopSec}>
        <h3 className={styles.Title}>{PROFILE_DATA.personalInfoSec.title}</h3>
        <div className={styles.Buttons}>
          <Button
            name={PROFILE_DATA.personalInfoSec.discard}
            value="Discard"
            primaryColor="var(--ter-black)"
            wrapperClass={styles.UpdateBtn}
            empty
          />
          <Button
            name={PROFILE_DATA.personalInfoSec.update}
            value="Update"
            primaryColor="var( --primary-blue)"
            wrapperClass={styles.UpdateBtn}
            inverted
          />
        </div>
      </div>

      <div className={styles.BottomSec}>
  
        <div className={styles.KeyValuePairs}>
          {(1
            ? PROFILE_DATA.DevInfoSec.feilds.slice(0, 8)
            : PROFILE_DATA.DevInfoSec.feilds.slice(0, 5)
          ).map((feild, index) => {
            return (
              <div className={styles.KeyValuePair} key={index}>
                <h4 className={styles.Key}>{feild.key}</h4>
                <input
                  className={styles.Value}
                  value={localedevData[feild.value]}
                  onChange={(e) => {
                    setLocaledevData({
                      ...localedevData,
                      [feild.value]: e.target.value,
                    });
                  }}
                ></input>
              </div>
            );
          })}
        </div>
       
      
        

        <div className={styles.AddressSec}>
          
            <Button
            name="Delete Account"
            primaryColor={`var(--redd)`}
            inverted
            hoverBgColor={`var(--white)`}
            wrapperClass={styles.DeleteAcc}
            withIcon
            IconComp={DeleteIcon}
          />
            
          <Button
          name="Report Complain"
          primaryColor={`var(--light-green)`}
          inverted
          hoverBgColor={`var(--white)`}
          wrapperClass={styles.ReportComp}
          withIcon
          IconComp={ReportIcon}
        />
          
        </div>
      </div>
    </div>
  );
}

export default ClientInfo;
