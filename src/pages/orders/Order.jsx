import React, { useState, useEffect } from "react";

import "./Order.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PublishIcon from "@mui/icons-material/Publish";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Link, useParams } from "react-router-dom";

import { useSelector } from "react-redux";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Order() {
  const admin = useSelector((state) => state.user.currentUser);

  const [order, setOrder] = useState({
    createdAt: "",
    _id: "",
    orderQuantity: "",
    orderStatus: "",
    orderTotalPrice: "",
    orderType: "",
    products: [],
    firstName: "",
    lastName: "",
    city: "",
    shippingAddress: "",
    photo: "",
    phone: "",
    email: "",
  });
  console.log("order", order);
  const [status, setStatus] = useState("");
  const { orderId } = useParams();
  const handleStatus = (e) => {
    e.preventDefault();
    console.log(status);
    axios({
      method: "PATCH",
      url: `http://127.0.0.1:8080/api/v1/orders/${orderId}`,
      headers: {
        Authorization: `Bearer ${admin.token}`,
      },
      data: {
        orderStatus: status,
      },
    })
      .then((res) => {
        console.log(res);
        setMessage(["success", "Order Status Upated successfully"]);
        setOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setMessage(["error", "Some thing went wrong"]);
        setOpen(true);
      });
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://127.0.0.1:8080/api/v1/orders/${orderId}`,
    })
      .then((res) => {
        console.log(res);
        setOrder(res.data.order);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  ///Toast Message

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
          <div className="order">
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
            <div className="orderTitleContainer">
              <h1 className="editUser">Order Management</h1>
              <Link to="/neworder">
                <button className="orderAddButton">Create</button>
              </Link>
            </div>
            <div className="orderContainer">
              <div className="orderShow">
                <h2 className="orderShowBy">Customer</h2>
                <div className="orderShowTop">
                  <img src={order.photo} alt="" className="orderShowImg" />
                  <div className="orderShowJobTitle">
                    <span className="orderShowUsername">
                      {order.firstName + " " + order.lastName}
                    </span>
                  </div>
                </div>
                <div className="orderShowBottom">
                  <span className="orderShowTitle">Order Details</span>
                  <div className="userShowInfo">
                    <span className="orderShowInfoTitle">
                      <b>Order Id: </b> {order._id}
                    </span>
                  </div>
                  <div className="orderShowInfo">
                    <span className="orderShowInfoTitle">
                      <b>Ordered By: </b>
                      {order.firstName + " " + order.lastName}
                    </span>
                  </div>
                  <div className="userShowInfo">
                    <span className="orderShowInfoTitle">
                      <b>Total Price: </b> Rs {order.orderTotalPrice}
                    </span>
                  </div>
                  <div className="userShowInfo">
                    <span className="orderShowInfoTitle">
                      <b>Products: </b> {order.orderQuantity}
                    </span>
                  </div>
                  <div className="orderShowInfo">
                    <span className="orderShowInfoTitle">
                      <b>Placed At: </b> {order.createdAt}
                    </span>
                  </div>

                  <div className="orderShowInfo">
                    <span className="orderShowInfoTitle">
                      <b>Delivery Address : </b> {order.shippingAddress}
                    </span>
                  </div>
                  <div className="orderShowInfo">
                    <span className="orderShowInfoTitle">
                      <b>Order Status : </b> {order.orderStatus}
                    </span>
                  </div>
                </div>
              </div>
              <div className="orderUpdate">
                <div className="orderUpdateTitle">
                  <span>Edit</span>
                  <form
                    onSubmit={(e) => {
                      handleStatus(e);
                    }}
                    className="orderUpdateForm"
                  >
                    <div className="orderUpdateLeft">
                      <div className="orderUpdateItem">
                        <label htmlFor="">Update Order Status</label>
                        <select
                          className="orderUpdateInput"
                          onChange={(e) => {
                            setStatus(e.target.value);
                          }}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                      <div className="orderUpdateItem">
                        <button type="submit" className="orderUpdateButton">
                          Update
                        </button>
                      </div>
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
