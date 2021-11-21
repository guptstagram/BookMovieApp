import React from "react";
import Home from "../screens/home/Home";
import Details from "../screens/details/Details";
import { BrowserRouter as Router, Route } from "react-router-dom";
import BookShow from "../screens/bookshow/BookShow";
import Confirmation from "../screens/confirmation/Confirmation";
import Header from "../common/header/Header";

const Controller = () => {
  const baseUrl = "/api/v1/";

  const [updateDom, setUpdateDom] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const showButtonInHeader = () => {
    setUpdateDom(true);
  };
  const loginIsSuccessful = () => {
    setIsLoggedIn(true);
  };
  const hideButtonInHeader = () => {
    setUpdateDom(false);
  };
  const logoutIsSuccessful = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="main-container">
        <Header
          updateBtn={updateDom}
          isLoggedIn={isLoggedIn}
          logoutIsSuccessful={logoutIsSuccessful}
          loginIsSuccessful={loginIsSuccessful}
        ></Header>
        <Route
          exact
          path="/"
          render={(props) => (
            <Home
              {...props}
              hideButtonInHeader={hideButtonInHeader}
              baseUrl={baseUrl}
            />
          )}
        />
        <Route
          path="/movie/:id"
          render={(props) => (
            <Details
              {...props}
              headerCall={showButtonInHeader}
              baseUrl={baseUrl}
            />
          )}
        />
        <Route
          path="/bookshow/:id"
          render={(props) => <BookShow {...props} baseUrl={baseUrl} />}
        />
        <Route
          path="/confirm/:id"
          render={(props) => <Confirmation {...props} baseUrl={baseUrl} />}
        />
      </div>
    </Router>
  );
};

export default Controller;
