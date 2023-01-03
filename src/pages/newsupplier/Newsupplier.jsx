import React from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState } from "react";
import { useEffect } from "react";
import "./Newsupplier.css";
import { storage } from "../../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import axios from "axios";

export default function Newsupplier() {
  useEffect(() => {
    console.log("rendered");
  }, []);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phone: "",
    active: true,
    photo: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.photo) {
      axios({
        method: "POST",
        url: "http://127.0.0.1:8080/api/v1/suppliers",
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          address: data.address,
          phone: data.phone,
          active: data.active,
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log("Error", err);
        });
    } else {
      console.log(data.photo);
      const imgRef = ref(storage, `test/${data.photo.name + v4()} `);
      const snapshot = await uploadBytes(imgRef, data.photo);
      const url = await getDownloadURL(snapshot.ref);

      axios({
        method: "POST",
        url: "http://127.0.0.1:8080/api/v1/suppliers",
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          address: data.address,
          phone: data.phone,
          active: data.active,
          photo: url,
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log("Error", err);
        });
    }
  };
  return (
    <div className="productUpdatePage">
      <Topbar></Topbar>
      <div className="container">
        <Sidebar></Sidebar>
        <div className="switcher">
          <div className="newSupplier">
            <h1 className="newSupplierTitle">New Supplier</h1>
            <form className="newSupplierForm" onSubmit={(e) => handleSubmit(e)}>
              <div className="newSupplierItem">
                <label htmlFor="">First Name</label>
                <input
                  type="text"
                  placeholder="john"
                  required
                  onChange={(e) => {
                    setData({ ...data, firstName: e.target.value });
                  }}
                />
              </div>
              <div className="newSupplierItem">
                <label htmlFor="">Last</label>
                <input
                  type="text"
                  placeholder="smith"
                  required
                  onChange={(e) => {
                    setData({ ...data, lastName: e.target.value });
                  }}
                />
              </div>
              <div className="newSupplierItem">
                <label htmlFor="">E-mail</label>
                <input
                  type="email"
                  placeholder="john@gmail.com"
                  required
                  onChange={(e) => {
                    setData({ ...data, email: e.target.value });
                  }}
                />
              </div>
              <div className="newSupplierItem">
                <label htmlFor="">Phone</label>
                <input
                  type="tel"
                  placeholder="+92 3091573489"
                  required
                  onChange={(e) => {
                    setData({ ...data, phone: e.target.value });
                  }}
                />
              </div>
              <div className="newSupplierItem">
                <label htmlFor="">Address</label>
                <input
                  type="text"
                  placeholder="Newyork | USA"
                  onChange={(e) => {
                    setData({ ...data, address: e.target.value });
                  }}
                />
              </div>

              <div className="newSupplierItem">
                <label>Active</label>
                <select
                  className="newSupplierSelect"
                  name="active"
                  id="active"
                  placeholder="Choose"
                  onChange={(e) => {
                    setData({
                      ...data,
                      active: e.target.value === "yes" ? true : false,
                    });
                  }}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div className="newSupplierItem">
                <label htmlFor="">Choose Photo</label>
                <input
                  type="file"
                  placeholder=""
                  onChange={(e) => {
                    setData({ ...data, photo: e.target.files[0] });
                  }}
                />
              </div>

              <button type="submit" className="newSupplierButton">
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
