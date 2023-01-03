import React from "react";
import "./User.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";

import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PublishIcon from "@mui/icons-material/Publish";
import { Link } from "react-router-dom";
export default function user() {
  return (
    <div className="productUpdatePage">
      <Topbar></Topbar>
      <div className="container">
        <Sidebar></Sidebar>
        <div className="switcher">
          <div className="user">
            <div className="userTitleContainer">
              <h1 className="editUser">Edit User</h1>
              <Link to="/newuser">
                <button className="userAddButton">Create</button>
              </Link>
            </div>
            <div className="userContainer">
              <div className="userShow">
                <div className="userShowTop">
                  <img
                    src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
                    alt=""
                    className="userShowImg"
                  />
                  <div className="userShowJobTitle">
                    <span className="userShowUsername">Anna Becker</span>
                    <span className="userShowUserTitle">Software Engineer</span>
                  </div>
                </div>
                <div className="userShowBottom">
                  <span className="userShowTitle">Account Details</span>
                  <div className="userShowInfo">
                    <PermIdentityIcon className="userShowIcon"></PermIdentityIcon>
                    <span className="userShowInfoTitle">Annabeck99</span>
                  </div>
                  <div className="userShowInfo">
                    <CalendarTodayIcon className="userShowIcon"></CalendarTodayIcon>
                    <span className="userShowInfoTitle">10.12.1999</span>
                  </div>
                  <span className="userShowTitle">Contact Details</span>

                  <div className="userShowInfo">
                    <PhoneAndroidIcon className="userShowIcon"></PhoneAndroidIcon>
                    <span className="userShowInfoTitle">+92 3091573489</span>
                  </div>
                  <div className="userShowInfo">
                    <MailOutlineIcon className="userShowIcon"></MailOutlineIcon>
                    <span className="userShowInfoTitle">anna@outlook.com</span>
                  </div>
                  <div className="userShowInfo">
                    <MyLocationIcon className="userShowIcon"></MyLocationIcon>
                    <span className="userShowInfoTitle">Newyork | USA</span>
                  </div>
                </div>
              </div>
              <div className="userUpdate">
                <div className="userUpdateTitle">
                  <span>Edit</span>
                  <form action="" className="userUpdateForm">
                    <div className="userUpdateLeft">
                      <div className="userUpdateItem">
                        <label htmlFor="">Username</label>
                        <input
                          type="text"
                          placeholder="annabeck99"
                          className="userUpdateInput"
                        />
                      </div>
                      <div className="userUpdateItem">
                        <label htmlFor="">Full Name</label>
                        <input
                          type="text"
                          placeholder="Anna Becker"
                          className="userUpdateInput"
                        />
                      </div>
                      <div className="userUpdateItem">
                        <label htmlFor="">Email</label>
                        <input
                          type="email"
                          placeholder="anna@outlook.com"
                          className="userUpdateInput"
                        />
                      </div>
                      <div className="userUpdateItem">
                        <label htmlFor="">Phone</label>
                        <input
                          type="text"
                          placeholder="+92 3091573489"
                          className="userUpdateInput"
                        />
                      </div>
                      <div className="userUpdateItem">
                        <label htmlFor="">Address</label>
                        <input
                          type="text"
                          placeholder="Newyork | USA"
                          className="userUpdateInput"
                        />
                      </div>
                    </div>
                    <div className="userUpdateRight">
                      <div className="userUpdateUpload">
                        <img
                          className="userUpdateImg"
                          src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
                          alt=""
                          srcset=""
                        />
                        <label htmlFor="file">
                          <PublishIcon className="userUpdateIcon"></PublishIcon>
                        </label>
                        <input
                          type="file"
                          name=""
                          id="file"
                          style={{ display: "none" }}
                        />
                      </div>
                      <button className="userUpdateButton">Update</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
