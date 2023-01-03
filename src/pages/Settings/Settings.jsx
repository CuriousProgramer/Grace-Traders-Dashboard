import React, { useState } from "react";
import "./Settings.css";
import PublishIcon from "@mui/icons-material/Publish";

import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import TextField from "@mui/material/TextField";

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";

import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { storage } from "../../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { changeAdminPhoto } from "../../redux/apiCalls";
import axios from "axios";

import { uploadStart, uploadFinish, logOut } from "../../redux/userRedux";
import { useSelect } from "@mui/base";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

///Material UI Tabs
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

///Material UI TAb
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Settings() {
  ////For admin profile pic
  const admin = useSelector((state) => state.user.currentUser);
  const { isFetching } = useSelector((state) => state.user);
  console.log("this", admin);
  const dispatch = useDispatch();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleImg = async (e) => {
    console.log(e.target.files[0]);
    dispatch(uploadStart());
    console.log("fetching", isFetching);
    const imgRef = ref(storage, `adminPhoto/${e.target.files[0].name + v4()} `);
    const snapshot = await uploadBytes(imgRef, e.target.files[0]);
    const url = await getDownloadURL(snapshot.ref);
    const up = {
      adminToken: admin.token,
      photo: url,
    };
    console.log("Uploaded to firebase", admin);
    dispatch(uploadFinish());
    changeAdminPhoto(dispatch, up);
    // // setData({ ...data, img: url });
  };

  ///Updating Password
  const [pass, setPass] = useState({
    passwordCurrent: "",
    password: "",
    passwordConfirmed: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(pass);
    axios({
      method: "PATCH",
      url: "http://127.0.0.1:8080/api/v1/users/updatePassword",
      headers: {
        Authorization: `Bearer ${admin.token}`,
      },
      data: {
        passwordCurrent: pass.passwordCurrent,
        password: pass.password,
        passwordConfirmed: pass.passwordConfirmed,
      },
    })
      .then((res) => {
        console.log(res);
        setMessage(["success", "Password updated successfully"]);
        setOpen(true);
        setTimeout(() => {
          dispatch(logOut());
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setMessage(["error", "Something went wrong! Try Again"]);
        setOpen(true);
      });
  };

  ///Snackbar Control States
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState([
    "success",
    "Product added successfully",
  ]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  ////////////////////
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  return (
    <div className="productUpdatePage">
      <Topbar></Topbar>
      <div className="container">
        <Sidebar></Sidebar>
        <div className="switcher">
          <Stack spacing={2} sx={{ width: "100%" }}>
            <Snackbar
              open={open}
              autoHideDuration={3000}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              onClose={handleClose}
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
          <h1 className="adminHome">Settings</h1>
          <div className="home">
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Change Profile Pic" {...a11yProps(0)} />
                  <Tab label="Change Password" {...a11yProps(1)} />
                  <Tab label="Item Three" {...a11yProps(2)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <Box sx={{ display: "flex" }}>
                  <div className="adminUpdateUpload">
                    <img
                      className="productUpdateImg adminUpdateImg"
                      src={admin.data.user.photo}
                      alt=""
                      srcSet=""
                    />
                    <div>
                      <p className="loading">
                        {isFetching ? (
                          <Box sx={{ width: "100%" }}>
                            <LinearProgress />
                          </Box>
                        ) : (
                          ""
                        )}
                      </p>
                    </div>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Button variant="contained" component="label">
                        <label htmlFor="adminImgFile">Upload</label>
                      </Button>
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="label"
                      >
                        <PhotoCamera />
                      </IconButton>
                    </Stack>
                    <input
                      type="file"
                      name=""
                      id="adminImgFile"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        handleImg(e);
                      }}
                    />
                    <span className="note">
                      Recommended Image dimensions 200 x 200. <br /> You will be
                      redirected to login page after finish.
                    </span>
                  </div>
                </Box>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <TextField
                      id="passwordCurrent"
                      label="Current Password"
                      type="password"
                      variant="standard"
                      onChange={(e) =>
                        setPass({ ...pass, passwordCurrent: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <TextField
                      id="password"
                      label="New Password"
                      type="password"
                      variant="standard"
                      onChange={(e) =>
                        setPass({ ...pass, password: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <TextField
                      id="passwordConfirmed"
                      label="New Password Confirmed"
                      type="password"
                      variant="standard"
                      onChange={(e) =>
                        setPass({ ...pass, passwordConfirmed: e.target.value })
                      }
                    />
                  </div>
                  <Stack direction="row" spacing={2}>
                    <Button
                      sx={{
                        width: 300,
                        marginTop: "20px",
                      }}
                      variant="contained"
                      type="submit"
                      onClick={(e) => {
                        handleSubmit(e);
                      }}
                      endIcon={<SendIcon />}
                    >
                      Confirm
                    </Button>
                  </Stack>
                </Box>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <Box sx={{ height: 400, width: "100%" }}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    components={{
                      Toolbar: CustomToolbar,
                    }}
                    disableSelectionOnClick
                  />
                </Box>
              </TabPanel>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}
