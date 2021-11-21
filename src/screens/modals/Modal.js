import React from "react";
import "./Modal.css";
import { Tab } from "@material-ui/core";
import { Tabs } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import { Button } from "@material-ui/core";
import Modal from "react-modal";

const LoginModal = (props) => {
  const [openModal, setIsOpen] = React.useState(true);
  const [value, setValue] = React.useState("one");
  const loggedIn = props.loginIsSuccessful;

  Modal.setAppElement("#root");

  React.useEffect(() => {
    isOpenModal();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const isOpenModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    props.closeModal();
  };

  const TabPanel = (props) => {
    const { value } = props;

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [contact, setContact] = React.useState("");

    const [reqUsername, setreqUsername] = React.useState("dispNone");
    const [reqPassword, setreqPassword] = React.useState("dispNone");
    const [reqFirstName, setreqFirstName] = React.useState("dispNone");
    const [reqLastName, setreqLastName] = React.useState("dispNone");
    const [reqEmail, setreqEmail] = React.useState("dispNone");
    const [reqContact, setreqContact] = React.useState("dispNone");

    function onLoginClick(e) {
      username === ""
        ? setreqUsername("dispBlock")
        : setreqUsername("dispNone");
      password === ""
        ? setreqPassword("dispBlock")
        : setreqPassword("dispNone");

      if (username === "" || password === "") {
        return;
      }
      async function login() {
        var params = window.btoa(`${username}:${password}`);
        try {
          const res = await fetch("http://localhost:8085/api/v1/auth/login", {
            method: "POST",
            headers: {
              Accept: "application/json;charset=UTF-8",
              authorization: `Basic ${params}`,
            },
          });
          var result = await res.json();

          if (res.ok) {
            window.sessionStorage.setItem(
              "user-details",
              JSON.stringify(result)
            );
            window.sessionStorage.setItem(
              "token-details",
              JSON.stringify(res.headers.get("access-token"))
            );
            loggedIn();
            closeModal();
          } else {
            const error = new Error();
            error.message = result.message
              ? result.message
              : "something happened";
            throw error;
          }
        } catch (error) {
          alert(error);
        }
      }
      login();
    }
    function onRegisterClick(e) {
      password === ""
        ? setreqPassword("dispBlock")
        : setreqPassword("dispNone");
      firstName === ""
        ? setreqFirstName("dispBlock")
        : setreqFirstName("dispNone");
      lastName === ""
        ? setreqLastName("dispBlock")
        : setreqLastName("dispNone");
      email === "" ? setreqEmail("dispBlock") : setreqEmail("dispNone");
      contact === "" ? setreqContact("dispBlock") : setreqContact("dispNone");

      if (
        password === "" ||
        firstName === "" ||
        lastName === "" ||
        email === "" ||
        contact === ""
      ) {
        return;
      }

      async function registerSubmit() {
        const params = {
          email_address: email,
          first_name: firstName,
          last_name: lastName,
          mobile_number: contact,
          password: password,
        };
        try {
          const res = await fetch("http://localhost:8085/api/v1/signup", {
            body: JSON.stringify(params),
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json;charset=UTF-8",
            },
          });
          var result = await res.json();

          if (res.ok) {
            alert("Logged in Successfully")
          } else {
            const error = new Error();
            error.message = error.message
              ? error.message
              : "something happened";
            throw error;
          }
        } catch (error) {}
      }
      registerSubmit();
    }

    if (value === "one") {
      return (
        <div className="loginPanel">
          <FormControl required className="formControl">
            <InputLabel htmlFor="username">username</InputLabel>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FormHelperText className={reqUsername}>
              <span className="red">Required</span>
            </FormHelperText>
          </FormControl>
          <br />
          <br />
          <FormControl required className="formControl">
            <InputLabel htmlFor="password">password</InputLabel>
            <Input
              id="password"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormHelperText className={reqPassword}>
              <span className="red">Required</span>
            </FormHelperText>
          </FormControl>
          <br />
          <br />
          <br />
          <Button color="primary" variant="contained" onClick={onLoginClick}>
            Login
          </Button>
        </div>
      );
    } else {
      return (
        <div className="RegisterPanel">
          <FormControl required className="formControl">
            <InputLabel htmlFor="firstname">First Name</InputLabel>
            <Input
              id="firstname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <FormHelperText className={reqFirstName}>
              <span className="red">Required</span>
            </FormHelperText>
          </FormControl>
          <br />
          <br />
          <FormControl required className="formControl">
            <InputLabel htmlFor="lastname">Last Name</InputLabel>
            <Input
              id="lastname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <FormHelperText className={reqLastName}>
              <span className="red">Required</span>
            </FormHelperText>
          </FormControl>
          <br />
          <br />
          <FormControl required className="formControl">
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormHelperText className={reqEmail}>
              <span className="red">Required</span>
            </FormHelperText>
          </FormControl>
          <br />
          <br />
          <FormControl required className="formControl">
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormHelperText className={reqPassword}>
              <span className="red">Required</span>
            </FormHelperText>
          </FormControl>
          <br />
          <br />
          <FormControl required className="formControl">
            <InputLabel htmlFor="contact">Contact No</InputLabel>
            <Input
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
            <FormHelperText className={reqContact}>
              <span className="red">Required</span>
            </FormHelperText>
          </FormControl>
          <br />
          <br />
          <br />
          <Button color="primary" variant="contained" onClick={onRegisterClick}>
            Register
          </Button>
        </div>
      );
    }
  };

  return (
    <div>
      <Modal
        isOpen={openModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value="one" label="LOGIN" />
          <Tab value="two" label="REGISTER" />
        </Tabs>
        <TabPanel value={value}></TabPanel>
      </Modal>
    </div>
  );
};

export default LoginModal;
