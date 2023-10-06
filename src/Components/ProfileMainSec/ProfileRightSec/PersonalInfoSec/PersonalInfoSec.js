import React, { useMemo, useState, useEffect, useRef } from "react";

import styles from "./PersonalInfoSec.module.css";
import DeleteIcon from '@mui/icons-material/Delete';
import { PROFILE_DATA } from "../../../../Utils/Constants/StaticData";
import { DataGrid } from '@mui/x-data-grid';
import Button from "./../../../Button2/Button";
import { ReactComponent as PlusImg } from "../../../../Assets/Profile/Plus.svg";

import ReportIcon from "@mui/icons-material/Report";
import axios from "axios";
import { BASE_URL } from "../../../../configs";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";

import notify from "../../../../Utils/helper/notifyToast";
function PersonalInfoSec(props) {
  const userData = [];

  const [states, setstate] = useState("Gujarat");
 
  const [udata, setUdata] = useState(null);
  const history = useHistory();
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
    notify("Data Updated Successfully!!");
    // notify(message);
  };

  const handleDiscard = async () => {
    sendd();
    notify("Data reset successfully!!");
  };

  useEffect(() => {
    sendd();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "website", headerName: "Website Name", width: 350 },
    { field: "datause", headerName: "Data Using", width: 350 },
   
   
  ];

  const rows = [
    { id: 1, website: "www.authify.in", datause: "[Email, FirstName, LastName]" },
    { id: 2, website: "www.manavtanimahek.000webhost.in", datause: "[Email, FirstName, ContactNo]" },
    { id: 3, website: "www.dharmeshvala.onrender.in", datause: "[Email, FirstName, ContactNo]"  },
    { id: 4, website: "www.bvmengineering.com", datause: "[Email, FirstName, LatName, ProfilePhoto]" },
    { id: 5, website: "www.aicte.com", datause: "[Email, FirstName, LastName]"},
    
  ];

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
                onClick={handleDiscard}
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
                  // onChange={(e) => {
                  //   setUdata({ ...udata, Email: e.target.value });
                  // }}
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
            </div>

            <div className={styles.AddressSec}>
            <div  style={{display:'flex',justifyContent:"space-between"}}>
              <h4 className={styles.AddressTitle}>
                Access History
              </h4>

              <div>
              <Button
                name=""
                primaryColor={`var(--redd)`}
                inverted
                hoverBgColor={`var(--white)`}
                wrapperClass={styles.DeleteAcc}
                withIcon
                IconComp={DeleteIcon}
              />
              </div>
              </div>

              <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  pageSizeOptions={[5, 10]}
                  checkboxSelection
                  sx={{
                    color:"var(black)",
                    fontSize: 16,
                    fontFamily: 'Poppins',
                    borderColor: 'primary.light',
                    "&.Mui-checked": {
                      color:"var(--primary-blue)",
                    },
                    "& .MuiSvgIcon-root": {
                      fontSize: "var(--font-22)",
                    },
                    '&.Mui-selected': {
                      backgroundColor: "var(--primary-blue)"
                    },
                    '& .MuiDataGrid-cell:hover': {
                      color: 'primary.main',
                    },                   
                  }}
                />
              </div>

              <div  style={{display:'flex',justifyContent:"space-between"}}>
              <div>
              <Button
              name="Delete Account"
              primaryColor={`var(--redd)`}
              inverted
              hoverBgColor={`var(--white)`}
              wrapperClass={styles.DeleteAcc}
              withIcon
              IconComp={DeleteIcon}
              onClick={()=>{
                notify("Kindly Mail us at authify@support.com for Delete Account Request !! 🙋‍♂️😪");
                history.push('/')
              }}
            />
            </div>

              <div>
              <Button
                name="Report Complain"
                primaryColor={`var(--light-green)`}
                inverted
                hoverBgColor={`var(--white)`}
                wrapperClass={styles.ReportComp}
                withIcon
                IconComp={ReportIcon}
                onClick={()=>{
                  notify("Kindly Mail us at authify@support.com to Report Complain.. 💫👋");
                  history.push('/')
                }}
              />
              </div>
              </div>
             

              
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PersonalInfoSec;
