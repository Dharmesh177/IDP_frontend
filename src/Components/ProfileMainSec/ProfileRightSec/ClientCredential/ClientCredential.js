import React, { useMemo, useState, useEffect, useRef } from "react";

import { PROFILE_DATA } from "../../../../Utils/Constants/StaticData";
import CopyToClipboard from "react-copy-to-clipboard";
import Button from "./../../../Button2/Button";
import { ReactComponent as PlusImg } from "../../../../Assets/Profile/Plus.svg";
import DeleteIcon from "@mui/icons-material/Delete";
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import ReportIcon from "@mui/icons-material/Report";
import notify from "../../../../Utils/helper/notifyToast";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import styles from "./Bookings.module.css";
import LinkIcon from '@mui/icons-material/Link';

function ClientCredential() {
  const devData = [];
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
 const history = useHistory();
  const [udata, setUdata] = useState(null);
  const location = useLocation();
  const t = location.state;

  console.log("data is");
  console.log(t);

  const [copied, setCopied] = React.useState(false);
  const [copied2, setCopied2] = React.useState(false);
  const onCopy = React.useCallback(() => {
    setCopied(true);
    notify("Client ID Copied !!");
  }, []);

  const sendd = async () => {
    console.log("Start");
    const response = await fetch("http://localhost:5000/api/client/getClient", {
      method: "POST",
      body: JSON.stringify({
        ClientID: t.ClientID,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${t.token}`,
      },
    });

    const result = await response.json();
    console.log("---");

    console.log(result);

    setUdata(result);
    setClientId(result.ClientID);
    setClientSecret(result.Secret);
    console.log(udata);
  };

  const handleDiscard = async () => {
    sendd();
    notify("Data reset successfully!!");
  };

  const handleUpdates = ()=>{
    history.push(`/developer`, { ClientID : t.ClientID , token : t.token}); 
  }

  useEffect(() => {
    sendd();
  }, []);

  const onCopy2 = React.useCallback(() => {
    setCopied2(true);
    notify("Client Secret Copied!!");
  }, []);
  return (
    <>
      {udata === null ? undefined : (
        <div className={styles.Wrapper}>
          <div className={styles.TopSec}>
            <h3 className={styles.Title}>
              {PROFILE_DATA.personalInfoSec.title}
            </h3>
            <div className={styles.Buttons}>
              <Button
                name="Update Details"
                primaryColor={`var(--primary-blue)`}
                inverted
                hoverBgColor={`var(--white)`}
                wrapperClass={styles.ReportComp}
                withIcon
                IconComp={ManageHistoryIcon}
                onClick={handleUpdates}
              />
            </div>
          </div>

          <div className={styles.BottomSec}>
            <div className={styles.KeyValuePairs}>
              <div className={styles.KeyValuePair} key="0">
                <h4 className={styles.Key}>Email Id</h4>
                <input
                  className={styles.Value}
                  value={udata.email}
                  // onChange={(e) => {
                  //   setUdata({ ...udata, Email: e.target.value });
                  // }}
                ></input>
              </div>

              <div className={styles.KeyValuePair} key="1">
                <h4 className={styles.Key}>Client Name</h4>
                <input
                  className={styles.Value}
                  value={udata.ClientName}
                ></input>
              </div>

              <div className={styles.KeyValuePair} key="2">
                <h4 className={styles.Key}>Client ID</h4>
                <input className={styles.Value} value={clientId}></input>
                <CopyToClipboard
                  style={{ cursor: "pointer",color: `var(--primary-blue)` }}
                  onCopy={onCopy}
                  text={clientId}
                >
                  <ContentCopyIcon />
                </CopyToClipboard>
              </div>

              <div className={styles.KeyValuePair} key="3">
                <h4 className={styles.Key}>Client Secret</h4>
                <input className={styles.Value} value={clientSecret}></input>
                <CopyToClipboard style={{ cursor: "pointer",color: `var(--primary-blue)` }} onCopy={onCopy2} text={clientSecret}>
                  <ContentCopyIcon />
                </CopyToClipboard>
              </div>

              <div className={styles.KeyValuePair} key="4">
                <h4 className={styles.Key}>Protocol</h4>
                <input className={styles.Value} value={udata.protocol}></input>
              </div>

              <div className={styles.KeyValuePair} key="5">
                <h4 className={styles.Key}>Scope</h4>
                <input className={styles.Value} value={udata.scope}></input>
              </div>

              <div className={styles.AddressSec}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h4 className={styles.AddressTitle}>Access Required</h4>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    margin: "4px",
                    flexWrap: "wrap",
                  }}
                >
                  {udata &&
                    udata.access.map((e) => (
                      <div style={{ marginRight: "7px" }}>
                        <Button
                          name={e}
                          primaryColor={`var(--primary-blue)`}
                          inverted
                          hoverBgColor={`var(--white)`}
                          wrapperClass={styles.ReportComp}
                          withIcon
                          IconComp={AccessibilityNewIcon}
                        />
                      </div>
                    ))}
                </div>
              </div>

              <div className={styles.AddressSec}>
              <div
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <h4 className={styles.AddressTitle}>Redirected URL's</h4>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  margin: "4px",
                  flexWrap: "wrap",
                }}
              >
                {udata &&
                  udata.RedirectURIs.map((e) => (
                    <div style={{ marginRight: "7px" }}>
                      <Button
                        name={e}
                        primaryColor={`var(--primary-blue)`}
                        inverted
                        hoverBgColor={`var(--white)`}
                        wrapperClass={styles.ReportComp}
                        withIcon
                        IconComp={LinkIcon}
                      />
                    </div>
                  ))}
              </div>
            </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ClientCredential;
