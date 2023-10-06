import React, { useEffect } from "react";
import {
  Switch,
  Route,
  useLocation,
  useHistory,
  Redirect,
} from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import LandingPage from "./Containers/LandingPage";
import { ToastContainer } from "react-toastify";
import Preloader from "./Components/Preloader/Preloader";
import Profile from "./Containers/Profile/Profile";
import CProfile from "./Containers/CProfile";
import LandingPage2 from "./Containers/EmailTokenVerification";

const App = () => {


  const location = useLocation();
  const history = useHistory();
  return (
    <>
        <>
          <ToastContainer bodyClassName="ToastBody" />
          <Switch>
                 
              <>
                <Route
                  exact
                  path={["/signin", "/signup","/clientsignin","/clientsignup", "/","/developer","/verify","/forgetpassword", "/SelectUser", "/resetPassword"]}
                  component={LandingPage}
                />
              
              <Route
                  exact
                  path={"/profile"}
                  component={Profile}
                />

                <Route
                  exact
                  path={"/cprofile"}
                  component={CProfile}
                />

                <Route
                  exact
                  path={"/emailVerification"}
                  component={LandingPage2}
                />
              </> 
          </Switch>
        </>
    </>
  );
};

export default App;
