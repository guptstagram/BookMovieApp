import React from "react";
import logo from "../../assets/logo.svg";
import "./Header.css";
import { Button } from "@material-ui/core";
import Modal from "../../screens/modals/Modal";
import { Link } from "react-router-dom";

const Header = (props) => {
  const [openModal, setIsOpen] = React.useState(false);
  const [showBookShowBtn, setBookShowBtn] = React.useState(false);
  const [showLogout, setShowLogout] = React.useState(false);

  const lastKey = window.location.href.split("/");
  const key = lastKey[lastKey.length - 1];

  const openModalHandler = () => {
    if (showLogout) {
      const logout = async () => {
        const accessToken = JSON.parse(
          window.sessionStorage.getItem("token-details")
        );
        try {
          const res = await fetch("http://localhost:8085/api/v1/auth/logout", {
            method: "POST",
            headers: {
              Accept: "application/json;charset=UTF-8",
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (res.ok) {
            window.sessionStorage.removeItem("token-details");
            window.sessionStorage.removeItem("user-details");
            props.logoutIsSuccessful();
          } else {
            const error = new Error();
            error.message = error.message
              ? error.message
              : "something happened";
            throw error;
          }
        } catch (error) {
          alert(error);
        }
      };
      logout();
      return;
    }
    setIsOpen(true);
  };

  const onCloseModalHandler = () => {
    setIsOpen(false);
  };
  const showBookShowButton = () => {
    setBookShowBtn(true);
  };
  const hideBookShowButton = () => {
    setBookShowBtn(false);
  };
  const showLogoutFunc = () => {
    setShowLogout(true);
  };
  const hideLogoutFunc = () => {
    setShowLogout(false);
  };

  const ButtonComponent = () => {
    if (!showLogout) {
      return (
        <div className="bookButton">
          {showBookShowBtn ? (
            <Button
              color="primary"
              onClick={openModalHandler}
              variant="contained"
            >
              Book Show
            </Button>
          ) : null}
        </div>
      );
    } else {
      return (
        <div className="bookButton">
          {showBookShowBtn ? (
            <Link to={{ pathname: `/bookshow/${key}` }}>
              <Button color="primary" variant="contained">
                Book Show
              </Button>
            </Link>
          ) : null}
        </div>
      );
    }
  };

  React.useEffect(() => {
    props.updateBtn ? showBookShowButton() : hideBookShowButton();
    props.isLoggedIn ? showLogoutFunc() : hideLogoutFunc();
  });

  return (
    <div className="header">
      <img src={logo} className="logo" alt="LOGO" />

      <div className="logButton">
        <Button color="default" variant="contained" onClick={openModalHandler}>
          {showLogout ? "Logout" : "Login"}
        </Button>
      </div>

      <ButtonComponent></ButtonComponent>

      {openModal ? (
        <Modal
          closeModal={onCloseModalHandler}
          loginIsSuccessful={props.loginIsSuccessful}
          showLogout={showLogoutFunc}
        ></Modal>
      ) : null}
    </div>
  );
};

export default Header;
