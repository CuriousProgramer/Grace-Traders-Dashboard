import React from "react";
import "./Newuser.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";

export default function Newuser() {
  return (
    <div className="productUpdatePage">
      <Topbar></Topbar>
      <div className="container">
        <Sidebar></Sidebar>
        <div className="switcher">
          <div className="newUser">
            <h1 className="newUserTitle">New User</h1>
            <form className="newUserForm">
              <div className="newUserItem">
                <label htmlFor="">Username</label>
                <input type="text" placeholder="john" />
              </div>
              <div className="newUserItem">
                <label htmlFor="">Fullname</label>
                <input type="text" placeholder="johnsmith" />
              </div>
              <div className="newUserItem">
                <label htmlFor="">E-mail</label>
                <input type="email" placeholder="john@gmail.com" />
              </div>
              <div className="newUserItem">
                <label htmlFor="">Password</label>
                <input type="password" placeholder="john@gmail.com" />
              </div>
              <div className="newUserItem">
                <label htmlFor="">Phone</label>
                <input type="text" placeholder="+92 3091573489" />
              </div>
              <div className="newUserItem">
                <label htmlFor="">Address</label>
                <input type="text" placeholder="Newyork | USA" />
              </div>
              <div className="newUserItem">
                <label htmlFor="">Gender</label>

                <div className="newUserGender">
                  <input type="radio" name="gender" id="male" value="male" />
                  <label for="male">Male</label>
                  <input type="radio" name="gender" id="female" value="male" />
                  <label for="female">Female</label>
                </div>
              </div>
              <div className="newUserItem">
                <label>Active</label>
                <select className="newUserSelect" name="active" id="active">
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <button className="newUserButton">Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
