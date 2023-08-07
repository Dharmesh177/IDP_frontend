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
                  path={["/signin", "/signup", "/","/developer"]}
                  component={LandingPage}
                />
                {location.pathname !== "/signin" &&
                location.pathname !== "/signup" &&
                location.pathname !== "/developer" &&
                location.pathname !== "/" ? (
                  <Redirect to="/" />
                ) : null}
              </> 
          </Switch>
        </>
    </>
  );
};

export default App;
