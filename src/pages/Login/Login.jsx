import axios from "axios";
import React from "react";
import { useState } from "react";

import "./Login.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { loginStart, loginSuccess, loginFailure } from "../../redux/userRedux";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { login } from "../../redux/apiCalls";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });

  const dispatch = useDispatch();
  const { error, isFetching } = useSelector((state) => state.user);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(data);
    login(dispatch, data, setMessage, setOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    axios({
      method: "POST",
      url: "http://127.0.0.1:8080/api/v1/users/login",
      data: {
        email: data.email,
        password: data.password,
      },
    })
      .then((res) => {
        if (res.status == 200) {
          console.log("Logged In", res);

          if (res.data.data.user.role === "admin") {
            console.log("You are admin");
            window.localStorage.setItem("adminAccessToken", res.data.token);
            window.localStorage.setItem(
              "adminData",
              JSON.stringify(res.data.data.user)
            );
            setMessage(["success", "Login Successful.Redirecting...."]);
            setOpen(true);
            // window.location.assign("http://localhost:3000/");
          } else {
            console.log("You are not admin");
          }
        }
      })
      .catch((err) => {
        console.log("Invalid username or password");
        setMessage(["error", "Invalid email or password"]);
        setOpen(true);
      });
  };

  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState([]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="outerContainer">
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Alert
            onClose={handleClose}
            severity={message[0]}
            sx={{ width: "100%" }}
          >
            {message[1]}
          </Alert>
        </Snackbar>
      </Stack>
      <div className="loginContainer">
        <div className="loginWrapper">
          <form
            className="loginForm"
            onSubmit={(e) => {
              handleLogin(e);
            }}
          >
            <h1 className="loginTitle">Welcome Back</h1>

            <input
              className="loginInput"
              type="email"
              autoFocus
              required
              placeholder="Email..."
              onChange={(e) => {
                setData({ ...data, email: e.target.value });
              }}
            />

            <input
              className="loginInput"
              type="password"
              required
              autoFocus
              placeholder="password"
              onChange={(e) => {
                setData({ ...data, password: e.target.value });
              }}
            />
            <button className="loginButton">LOG IN</button>
          </form>
        </div>
      </div>
    </div>
  );
}
