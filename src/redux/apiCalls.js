import axios from "axios";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logOut,
  uploadStart,
  uploadFinish,
  changePhoto,
} from "./userRedux";
import { Navigate } from "react-router-dom";
export const login = async (dispatch, user, setMessage, setOpen) => {
  dispatch(loginStart());
  axios({
    method: "POST",
    url: "http://127.0.0.1:8080/api/v1/users/login",
    data: {
      email: user.email,
      password: user.password,
    },
  })
    .then((res) => {
      console.log("see this", res.data.data.user.role);
      if (res.data.data.user.role === "admin") {
        setMessage(["success", "Login Successful.Redirecting...."]);

        setOpen(true);
        setTimeout(() => {
          dispatch(loginSuccess(res.data));

          // window.location.assign("http://localhost:3000/");
        }, 2000);
      } else {
        setMessage(["error", "You dont have access for this action...."]);

        setOpen(true);
        dispatch(loginFailure());
      }
    })
    .catch((err) => {
      setMessage(["error", "Invalid Username or password...."]);

      setOpen(true);
      console.log(err);
      dispatch(loginFailure());
    });
};

export const logAdminOut = async (dispatch) => {
  dispatch(logOut());
};

export const changeAdminPhoto = async (dispatch, up) => {
  dispatch(uploadStart());
  axios({
    method: "PATCH",
    url: "http://127.0.0.1:8080/api/v1/users/updateMe",
    headers: {
      Authorization: `Bearer ${up.adminToken}`,
    },
    data: {
      photo: up.photo,
    },
  })
    .then((res) => {
      console.log("see this", res);

      dispatch(logOut());
    })
    .catch((err) => {
      console.log(err);
    });
  // dispatch(changePhoto(up));
};
