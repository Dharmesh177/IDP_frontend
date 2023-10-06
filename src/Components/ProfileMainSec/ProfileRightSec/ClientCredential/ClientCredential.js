
import React, { useMemo, useState, useEffect, useRef } from "react";

import { PROFILE_DATA } from "../../../../Utils/Constants/StaticData";
import CopyToClipboard from "react-copy-to-clipboard"
import Button from "./../../../Button2/Button";
import { ReactComponent as PlusImg } from "../../../../Assets/Profile/Plus.svg";
import DeleteIcon from '@mui/icons-material/Delete';
import ReportIcon from '@mui/icons-material/Report';
import notify from "../../../../Utils/helper/notifyToast";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import styles from "./Bookings.module.css";

function ClientCredential() {
 
    const devData = [];
    const [clientId,setClientId] = useState("15454d5c4v5cv5sdv4df5");
    const [clientSecret, setClientSecret] = useState("dsvdfv4dFdvdf4d5f45d4d5v4dv");

    const [udata, setUdata] = useState(null);
    const location = useLocation();
    const t = location.state;

  console.log("data is");
  console.log(t);

  const [copied, setCopied] = React.useState(false);
  const [copied2, setCopied2] = React.useState(false);
  const onCopy = React.useCallback(() => {
    setCopied(true);
    notify("Client ID Copied !!")
  }, [])

  const sendd = async () => {
    console.log("Start");
    const response = await fetch( "/user/mySelf", {
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

  const handleDiscard = async ()=>{
    sendd();
    notify("Data reset successfully!!")
  }

  useEffect(() => {
    sendd();
  }, []);

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



