import React, { useState, useEffect } from "react";
import "./Supplier.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PublishIcon from "@mui/icons-material/Publish";
import { storage } from "../../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function User() {
  const { supplierId } = useParams();
  const [data, setData] = useState({});
  useEffect(() => {
    const getSupplier = async () => {
      const res = await axios({
        method: "GET",
        url: `http://127.0.0.1:8080/api/v1/suppliers/${supplierId}`,
      });
      console.log(res.data.supplier);
      setData(res.data.supplier);
    };
    getSupplier();
  }, []);
  const handleUpdate = async (e) => {
    e.preventDefault();
    axios({
      method: "PATCH",
      url: `http://127.0.0.1:8080/api/v1/suppliers/${supplierId}`,
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        active: data.active,
        photo: data.photo,
      },
    })
      .then((res) => {
        console.log(res);
        setMessage(["success", "Supplier Record Updated successfully."]);
        setOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setMessage(["error", "Something went wrong"]);
        setOpen(true);
      });
  };
  const handleImg = async (e) => {
    const imgRef = ref(storage, `test/${e.target.files[0].name + v4()} `);
    const snapshot = await uploadBytes(imgRef, e.target.files[0]);
    const url = await getDownloadURL(snapshot.ref);
    console.log(url);
    setData({ ...data, photo: url });
  };

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

  return (
    <div className="productUpdatePage">
      <Topbar></Topbar>
      <div className="container">
        <Sidebar></Sidebar>
        <div className="switcher">
          <div className="supplier">
            <div>
              <Stack spacing={2} sx={{ width: "100%" }}>
                <Snackbar
                  open={open}
                  autoHideDuration={3000}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
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
            </div>
            <div className="supplierTitleContainer">
              <h1 className="editSupplier">Edit Supplier</h1>
              <Link to="/newsupplier">
                <button className="userAddButton">Create</button>
              </Link>
            </div>
            <div className="supplierContainer">
              <div className="supplierShow">
                <div className="supplierShowTop">
                  <img
                    src={data.photo}
                    alt=""
                    srcSet=""
                    className="supplierShowImg"
                  />
                  <div className="supplierShowJobTitle">
                    <span className="supplierShowUsername">
                      {data.firstName + " " + data.lastName}
                    </span>
                  </div>
                </div>
                <div className="supplierShowBottom">
                  <span className="supplierShowTitle">Account Details</span>
                  <div className="supplierShowInfo">
                    <PermIdentityIcon className="supplierShowIcon"></PermIdentityIcon>
                    <span className="supplierShowInfoTitle">
                      {data.firstName + " " + data.lastName}
                    </span>
                  </div>
                  <div className="supplierShowInfo">
                    <CalendarTodayIcon className="supplierShowIcon"></CalendarTodayIcon>
                    <span className="supplierShowInfoTitle">10.12.1999</span>
                  </div>
                  <span className="supplierShowTitle">Contact Details</span>

                  <div className="supplierShowInfo">
                    <PhoneAndroidIcon className="supplierShowIcon"></PhoneAndroidIcon>
                    <span className="supplierShowInfoTitle">{data.phone}</span>
                  </div>
                  <div className="supplierShowInfo">
                    <MailOutlineIcon className="supplierShowIcon"></MailOutlineIcon>
                    <span className="supplierShowInfoTitle">{data.email}</span>
                  </div>
                  <div className="supplierShowInfo">
                    <MyLocationIcon className="supplierShowIcon"></MyLocationIcon>
                    <span className="supplierShowInfoTitle">
                      {data.address}
                    </span>
                  </div>
                </div>
              </div>
              <div className="supplierUpdate">
                <div className="supplierUpdateTitle">
                  <span>Edit</span>
                  <form
                    onSubmit={(e) => handleUpdate(e)}
                    className="supplierUpdateForm"
                  >
                    <div className="supplierUpdateLeft">
                      <div className="supplierUpdateItem">
                        <label htmlFor="">First Name</label>
                        <input
                          type="text"
                          placeholder="annabeck99"
                          className="supplierUpdateInput"
                          value={data.firstName}
                          onChange={(e) => {
                            setData({ ...data, firstName: e.target.value });
                          }}
                        />
                      </div>
                      <div className="supplierUpdateItem">
                        <label htmlFor="">Last Name</label>
                        <input
                          type="text"
                          placeholder="Anna Becker"
                          className="supplierUpdateInput"
                          value={data.lastName}
                          onChange={(e) => {
                            setData({ ...data, lastName: e.target.value });
                          }}
                        />
                      </div>
                      <div className="supplierUpdateItem">
                        <label htmlFor="">Email</label>
                        <input
                          type="email"
                          placeholder="anna@outlook.com"
                          className="supplierUpdateInput"
                          value={data.email}
                          onChange={(e) => {
                            setData({ ...data, email: e.target.value });
                          }}
                        />
                      </div>
                      <div className="supplierUpdateItem">
                        <label htmlFor="">Phone</label>
                        <input
                          type="text"
                          placeholder="+92 3091573489"
                          className="supplierUpdateInput"
                          value={data.phone}
                          onChange={(e) => {
                            setData({ ...data, phone: e.target.value });
                          }}
                        />
                      </div>
                      <div className="supplierUpdateItem">
                        <label htmlFor="">Address</label>
                        <input
                          type="text"
                          placeholder="Newyork | USA"
                          className="supplierUpdateInput"
                          value={data.address}
                          onChange={(e) => {
                            setData({ ...data, address: e.target.value });
                          }}
                        />
                      </div>
                    </div>
                    <div className="supplierUpdateRight">
                      <div className="supplierUpdateUpload">
                        <img
                          className="supplierUpdateImg"
                          src={data.photo}
                          alt=""
                          srcSet=""
                        />
                        <label htmlFor="file">
                          <PublishIcon className="supplierUpdateIcon"></PublishIcon>
                        </label>
                        <input
                          type="file"
                          name=""
                          id="file"
                          style={{ display: "none" }}
                          onChange={(e) => handleImg(e)}
                        />
                      </div>
                      <button className="supplierUpdateButton">Update</button>
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
