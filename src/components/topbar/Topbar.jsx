import React, { useEffect, useState } from "react";
import "./Topbar.css";
import NotificationsNone from "@mui/icons-material/NotificationsNone";
import SettingsIcon from "@mui/icons-material/Settings";
import LanguageIcon from "@mui/icons-material/Language";
import { logAdminOut } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Badge } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Topbar() {
  const admin = useSelector((state) => state.user.currentUser);
  console.log("admin", admin);
  const [adminPhoto, setAdminPhoto] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("bhai");
    // const adminToken = window.localStorage.getItem("adminAccessToken");
    // const adminData = JSON.parse(window.localStorage.getItem("adminData"));
    // if (!adminToken) {
    //   window.location.assign("http://localhost:3000/login");
    // }
    // setAdminPhoto(adminData.photo);
  }, []);

  //Material UI menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="topbar">
      <div className="topbarwrapper">
        <div className="topleft">
          <span className="logo">
            <img
              className="logoImg"
              src="https://firebasestorage.googleapis.com/v0/b/my-react-img.appspot.com/o/images%2Flogo%20without.png?alt=media&token=8edf70b1-5d56-4108-aff9-c663b9882e9d"
              alt=""
            />
          </span>
        </div>
        <div className="topright">
          {/* <div className="toprighticoncontainer">
            <NotificationsNone fontSize="large"></NotificationsNone>
            <span className="topbariconbadge">2</span>
          </div>
          <div className="toprighticoncontainer">
            <LanguageIcon fontSize="large"></LanguageIcon>
          </div> */}

          <div className="toprighticoncontainer">
            {/* <Badge badgeContent={4} color="primary">
              <MailIcon sx={{ color: "white", fontSize: 30 }} />
            </Badge> */}
            <Link to="/settings">
              <SettingsIcon
                sx={{ color: "white", fontSize: 30 }}
                fontSize="large"
              ></SettingsIcon>
            </Link>
          </div>

          <div className="topavatar">
            <div>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <img
                  src={admin.data.user.photo}
                  alt="person"
                  onClick={() => {
                    console.log("logging out");
                    // logAdminOut(dispatch);
                  }}
                />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    logAdminOut(dispatch);
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </div>
            {/* <img
              src="https://firebasestorage.googleapis.com/v0/b/my-react-img.appspot.com/o/test%2Fprofile-img.png540693fe-12ba-486a-8908-436841c47ace%20?alt=media&token=2bbc9129-9105-4e0d-9498-bdfa6b7d848a"
              alt="person"
              onClick={() => {
                console.log("logging out");
                logAdminOut(dispatch);
              }}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
