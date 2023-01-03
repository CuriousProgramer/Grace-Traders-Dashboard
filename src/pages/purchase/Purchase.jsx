import React, { useState, useEffect } from "react";
import "./Purchase.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function User() {
  const { purchaseId } = useParams();
  const [paymentStatus, setPaymentStatus] = useState("");
  const [data, setData] = useState({
    quantity: "",
    unitPrice: "",
    totalPrice: "",
    _id: "",
    material: "",
    supplier: {
      firstName: "",
      lastName: "",
    },
    paymentStatus: "",
  });
  useEffect(() => {
    const getPurchase = async () => {
      axios({
        method: "GET",
        url: `http://127.0.0.1:8080/api/v1/purchases/${purchaseId}`,
      })
        .then((res) => {
          console.log(res);
          setData(res.data.purchase);
        })
        .catch((err) => {
          console.log("Error", err);
        });
      //   setData(res.data.supplier);
    };
    getPurchase();
  }, []);
  const handleUpdate = async (e) => {
    e.preventDefault();

    axios({
      method: "PATCH",
      url: `http://127.0.0.1:8080/api/v1/purchases/${purchaseId}`,
      data: {
        paymentStatus: "Approved",
      },
    })
      .then((res) => {
        console.log("Approved");
        setData({ ...data, paymentStatus: "Approved" });
        setMessage(["success", "Purcahse Record updated successfully."]);
        setOpen(true);
      })
      .catch((err) => {
        console.log("Error ", err);
        setMessage(["error", "Something went wrong"]);
        setOpen(true);
      });
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
          <div className="purchase">
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
            <div className="purchaseTitleContainer">
              <h1 className="editSupplier">Purchase Managemnet</h1>
              <Link to="/newpurchase">
                <button className="userAddButton">Create</button>
              </Link>
            </div>
            <div className="purchaseContainer">
              <div className="purchaseShow">
                <span className="purchaseShowTitle">Supplier</span>

                <div className="purchaseShowTop">
                  {/* <span className="purchaseShowTitle">Supplier</span> */}
                  <img
                    src={data.supplier.photo}
                    alt=""
                    srcSet=""
                    className="purchaseShowImg"
                  />
                  <div className="purchaseShowJobTitle">
                    <span className="purchaseShowUsername">
                      {data.supplier.firstName + " " + data.supplier.lastName}
                    </span>
                  </div>
                </div>
                <div className="purchaseShowBottom">
                  <span className="purchaseShowTitle">Purchase Details</span>
                  <div className="purchaseShowInfo">
                    <span className="purchaseShowInfoTitle">
                      <b>Purchase ID : </b> {data._id}
                    </span>
                  </div>
                  <div className="purchaseShowInfo">
                    <span className="purchaseShowInfoTitle">
                      <b>Material : </b> {data.material}
                    </span>
                  </div>
                  <div className="purchaseShowInfo">
                    <span className="purchaseShowInfoTitle">
                      <b>Unit Price : </b> {data.unitPrice}
                    </span>
                  </div>
                  <div className="purchaseShowInfo">
                    <span className="purchaseShowInfoTitle">
                      <b>Quantity : </b> {data.quantity}
                    </span>
                  </div>
                  <div className="purchaseShowInfo">
                    <span className="purchaseShowInfoTitle">
                      <b>Total Price : </b> {data.totalPrice}
                    </span>
                  </div>
                  <div className="purchaseShowInfo">
                    <span className="purchaseShowInfoTitle">
                      <b>Payment Status : </b> {data.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>
              <div className="purchaseUpdate">
                <div className="purchaseUpdateTitle">
                  <span>Update Purchase</span>
                  <form
                    onSubmit={(e) => handleUpdate(e)}
                    className="purchaseUpdateForm"
                  >
                    <div className="purchaseUpdateLeft">
                      <div className="purchaseUpdateItem">
                        <label htmlFor="">
                          {data.paymentStatus === "Pending"
                            ? "Click here to Approve Payment"
                            : ""}
                        </label>
                        {/* <select
                          onChange={(e) => setPaymentStatus(e.target.value)}
                          className="purchaseUpdateSelect"
                        >
                          <option disabled>Approve Payment</option>
                          <option value={"Approved"}>Approved</option>
                          <option value={"Pending"}>Pending</option>
                        </select> */}
                        {data.paymentStatus === "Pending" ? (
                          <button
                            type="submit"
                            className="purchaseUpdateButton"
                          >
                            Approve
                          </button>
                        ) : (
                          ""
                        )}
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
