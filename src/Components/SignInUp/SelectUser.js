import React from "react";
import Button from "../Button";
import BottomText from "./Helpers/BottomText";
import { Box, Typography } from "@mui/material";
import Developer from "../../Assets/LandingPage/developer.png";
import Styles from "./SignInUp.module.css";
import { useLocation } from "react-router-dom";
import users from "../../Assets/LandingPage/users.png";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const SelectUser = () => {
    const location = useLocation();
    const history = useHistory();

    const isRegistration = location.state;

    const onDeveloperClick = () => {
        if (isRegistration === undefined) {
            isRegistration = true;
        }

        if (isRegistration) {
            history.push("/developer");
        } else {
            history.push("/developer");
        }
    }

    const onUserClick = () => {
        if (isRegistration === undefined) {
            isRegistration = true;
        }

        if (isRegistration) {
            history.push("/singup");
        } else {
            history.push("/signin");
        }
    }

    return (
        <div
            className={Styles.Wrapper}
            style={{
                transform: location.pathname === "/SelectUser" ? "translatex(0)" : "translatex(100%)",
            }}
        >
            <div className={Styles.UpperSection} style={{ textAlign : "center" }}>
                <span className={Styles.Title}>Are You?</span>

                <Box
                    sx={{
                        width: "25rem",
                        m : "5rem 5rem",
                        borderRadius : "2rem",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent : "center",
                        alignItems : "center",
                        border : "1px solid black",
                        padding : "2rem",
                        "&:hover" : {
                            cursor : "pointer",
                            backgroundColor : "#F0F0F1"
                        }
                    }}
                    onClick={onDeveloperClick}
                >
                    <img
                        src={Developer}
                        style={{
                            width : "10rem",
                            padding : "2rem",
                            justifyContent : "center",
                            alignItems : "center"
                        }}
                    />

                    <Typography
                        style={{
                            fontSize: "2rem",
                            fontWeight: "bold"
                        }}
                    >
                        Developer
                    </Typography>
                </Box>

                <Box
                    sx={{
                        width: "25rem",
                        m : "5rem 5rem",
                        borderRadius : "2rem",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent : "center",
                        alignItems : "center",
                        border : "1px solid black",
                        padding : "2rem",
                        "&:hover" : {
                            cursor : "pointer",
                            backgroundColor : "#F0F0F1"
                        }
                    }}
                    onClick={onUserClick}
                >
                    <img
                        src={users}
                        style={{
                            width : "10rem",
                            padding : "2rem",
                            justifyContent : "center",
                            alignItems : "center"
                        }}
                    />

                    <Typography
                        style={{
                            fontSize: "2rem",
                            fontWeight: "bold"
                        }}
                    >
                        User
                    </Typography>
                </Box>
            </div>
        </div>
    );
}

export default SelectUser;