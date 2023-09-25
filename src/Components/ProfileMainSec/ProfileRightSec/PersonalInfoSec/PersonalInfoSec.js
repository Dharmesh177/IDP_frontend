import React, { useMemo, useState, useEffect, useRef } from "react";

import styles from "./PersonalInfoSec.module.css";

import { PROFILE_DATA } from "../../../../Utils/Constants/StaticData";

import Button from "./../../../Button2/Button";
import { ReactComponent as PlusImg } from "../../../../Assets/Profile/Plus.svg";
import DeleteIcon from "@mui/icons-material/Delete";
import ReportIcon from "@mui/icons-material/Report";
import axios from "axios";
import { BASE_URL } from "../../../../configs";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

import notify from "../../../../Utils/helper/notifyToast";
function PersonalInfoSec(props) {
  const userData = [];
  const [localeUserData, setLocaleUserData] = useState({ ...userData });
  const [flag, setFlag] = useState(false);
  const [emailId, setemailId] = useState("dvala453@gmail.com");
  const [fname, setfname] = useState("Dharmesh");
  const [lname, setlname] = useState("Vala");
  const [phone, setphone] = useState("6354434661");

  const [states, setstate] = useState("Gujarat");
  const [pass, setpass] = useState("Dharmesh@123");
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

  //   const handleClick = async () =>{
  //     const response = await fetch(BASE_URL + "/user/mySelf",{
  //       method: 'PATCH',
  //   body: udata,
  //   headers: {
  //     'Content-type': 'application/json; charset=UTF-8',
  //     "authorization" : `Bearer ${t.token}`
  //   },
  //     })
  // console.log(response)
  //     const message = response.data.message;
  //     notify(message);
  //   }
  const handleClick = async () => {
    const response = await fetch(BASE_URL + "/user/mySelf", {
      method: "PATCH",
      body: JSON.stringify({
       
        FirstName: udata.FirstName,
        LastName: udata.LastName,
        ContactNo: udata.ContactNo,
        ProfilePhoto: udata.ProfilePhoto,
      
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        authorization: `Bearer ${t.token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };
  useEffect(() => {
    sendd();
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
                onClick={handleClick}
              />
            </div>
          </div>

          <div className={styles.BottomSec}>
            <div className={styles.KeyValuePairs}>
              <div className={styles.KeyValuePair} key="0">
                <h4 className={styles.Key}>Email Id</h4>
                <input
                  className={styles.Value}
                  value={udata.Email}
                  onChange={(e) => {
                    setUdata({ ...udata, Email: e.target.value });
                  }}
                ></input>
              </div>

              <div className={styles.KeyValuePair} key="1">
                <h4 className={styles.Key}>First Name</h4>
                <input
                  className={styles.Value}
                  value={udata.FirstName}
                  onChange={(e) => {
                    setUdata({ ...udata, FirstName: e.target.value });
                  }}
                ></input>
              </div>

              <div className={styles.KeyValuePair} key="2">
                <h4 className={styles.Key}>Last Name</h4>
                <input
                  className={styles.Value}
                  value={udata.LastName}
                  onChange={(e) => {
                    setUdata({ ...udata, LastName: e.target.value });
                  }}
                ></input>
              </div>

              <div className={styles.KeyValuePair} key="3">
                <h4 className={styles.Key}>Phone No.</h4>
                <input
                  className={styles.Value}
                  value={udata.ContactNo}
                  onChange={(e) => {
                    setUdata({ ...udata, ContactNo: e.target.value });
                  }}
                ></input>
              </div>

              <div className={styles.KeyValuePair} key="4">
                <h4 className={styles.Key}>State</h4>
                <input
                  className={styles.Value}
                  value={states}
                  onChange={(e) => {
                    setstate(e.target.value);
                  }}
                ></input>
              </div>

              <div className={styles.KeyValuePair} key="5">
                <h4 className={styles.Key}>Password</h4>
                <input
                  className={styles.Value}
                  value={pass}
                  onChange={(e) => {
                    setpass(e.target.value);
                  }}
                ></input>
              </div>
            </div>

            <div className={styles.AddressSec}>
              <h4 className={styles.AddressTitle}>
                {PROFILE_DATA.personalInfoSec.addresses}
              </h4>

              <>
                <div className={styles.AddressListWrapper}>
                  {flag == true ? (
                    <textarea
                      className={styles.AddressLine}
                      autoComplete="address-line1"
                      onChange={(e) => {
                        setLocaleUserData({
                          ...localeUserData,
                          address: e.target.value,
                        });
                      }}
                      value={localeUserData.address}
                    />
                  ) : null}
                  <Button
                    name="Add Addresss"
                    primaryColor={`var(--ter-black)`}
                    inverted
                    hoverBgColor={`var(--white)`}
                    wrapperClass={styles.AddAddressBtn}
                    withIcon
                    IconComp={PlusImg}
                    onClick={(e) => {
                      setFlag(true);
                    }}
                  />
                </div>
              </>
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
      )}
    </>
  );
}

export default PersonalInfoSec;
