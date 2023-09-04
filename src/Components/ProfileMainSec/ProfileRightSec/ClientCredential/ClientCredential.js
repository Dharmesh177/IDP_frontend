
import React, { useMemo, useState, useEffect, useRef } from "react";

import { PROFILE_DATA } from "../../../../Utils/Constants/StaticData";
import CopyToClipboard from "react-copy-to-clipboard"
import Button from "./../../../Button2/Button";
import { ReactComponent as PlusImg } from "../../../../Assets/Profile/Plus.svg";
import DeleteIcon from '@mui/icons-material/Delete';
import ReportIcon from '@mui/icons-material/Report';
import notify from "../../../../Utils/helper/notifyToast";

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import styles from "./Bookings.module.css";

function ClientCredential() {
 
    const devData = [];
    const [clientId,setClientId] = useState("15454d5c4v5cv5sdv4df5");
    const [clientSecret, setClientSecret] = useState("dsvdfv4dFdvdf4d5f45d4d5v4dv");

  const [copied, setCopied] = React.useState(false);
  const [copied2, setCopied2] = React.useState(false);
  const onCopy = React.useCallback(() => {
    setCopied(true);
    notify("Client ID Copied !!")
  }, [])

  const onCopy2 = React.useCallback(() => {
    setCopied2(true);
    notify("Client Secret Copied!!")
  }, [])
  return (
    <div className={styles.Wrapper}>
      <div className={styles.TopSec}>
        <h3 className={styles.Title}>{PROFILE_DATA.personalInfoSec.title}</h3>
        <div className={styles.Buttons}>
        <Button
        name="Need Help ?"
        primaryColor={`var(--light-green)`}
        inverted
        hoverBgColor={`var(--white)`}
        wrapperClass={styles.ReportComp}
        withIcon
        IconComp={ReportIcon}
      />
          
        </div>
      </div>

      <div className={styles.BottomSec}>
        <div className={styles.KeyValuePairs}>
          
              <div className={styles.KeyValuePair} key='0'>
                <h4 className={styles.Key}>Client ID</h4>
                <input
                  className={styles.Value}
                  value={clientId}
                ></input>
                <CopyToClipboard style={{"cursor":"pointer"}} onCopy={onCopy} text={clientId}>
                <ContentCopyIcon/>
                 </CopyToClipboard>
                
              </div>

              <div className={styles.KeyValuePair} key='1'>
              <h4 className={styles.Key}>Client Secret</h4>
              <input
                className={styles.Value}
                value={clientSecret}
              ></input>
              <CopyToClipboard onCopy={onCopy2} text={clientSecret}>
              <ContentCopyIcon/>
               </CopyToClipboard>
              
            </div>
            
        </div>
      </div>
    </div>
  );
}

export default ClientCredential



