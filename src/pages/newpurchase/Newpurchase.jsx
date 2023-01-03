import React from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useEffect, useState } from "react";
import "./Newpurchase.css";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Newpurchase() {
  const [suppliers, setSuppliers] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const res = await axios({
        method: "GET",
        url: "http://127.0.0.1:8080/api/v1/suppliers",
      });
      const supplierData = res.data.suppliers;
      supplierData.forEach((item, index) => {
        item.id = index + 1;
      });
      console.log(supplierData);
      setSuppliers(supplierData);
    };
    getData();
  }, []);

  const [data, setData] = useState({
    unitPrice: "",
    purchaseDate: "",
    material: "",
    quantity: "",
    paymentStatus: "Approved",
    supplier: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: "http://127.0.0.1:8080/api/v1/purchases",
      data,
    })
      .then((res) => {
        console.log(res);
        setMessage(["success", "Purcahse Record added successfully."]);
        setOpen(true);
      })
      .catch((err) => {
        console.log("Error", err);
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
          <div className="newPurchase">
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
            <h1 className="newPurchaseTitle">New Purcahse</h1>
            <form
              className="newPurchaseForm"
              onSubmit={(e) => {
                handleClick(e);
              }}
            >
              <div className="newPurchaseItem">
                <label htmlFor="">Unitprice</label>
                <input
                  type="number"
                  placeholder="0000"
                  onChange={(e) => {
                    setData({ ...data, unitPrice: e.target.value });
                  }}
                />
              </div>
              <div className="newPurchaseItem">
                <label htmlFor="">Quantity</label>
                <input
                  type="number"
                  placeholder="0000"
                  onChange={(e) => {
                    setData({ ...data, quantity: e.target.value });
                  }}
                />
              </div>
              <div className="newPurchaseItem">
                <label htmlFor="">Material</label>
                <input
                  type="text"
                  placeholder="xyz"
                  onChange={(e) => {
                    setData({ ...data, material: e.target.value });
                  }}
                />
              </div>
              <div className="newPurchaseItem">
                <label htmlFor="">Purchase Date</label>
                <input
                  type="date"
                  placeholder=""
                  onChange={(e) => {
                    setData({ ...data, purchaseDate: e.target.value });
                  }}
                />
              </div>
              <div className="newPurchaseItem">
                <label htmlFor="">Payment</label>
                <select
                  className="newPurchaseSelect"
                  id="paymentStatus"
                  name="paymentStatus"
                  onChange={(e) => {
                    setData({ ...data, paymentStatus: e.target.value });
                  }}
                >
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              <div className="newPurchaseItem">
                <label>Supplier</label>
                <select
                  className="newPurchaseSelect"
                  name="active"
                  id="active"
                  onChange={(e) => {
                    setData({ ...data, supplier: e.target.value });
                  }}
                >
                  <option disabled>Select Supplier</option>
                  {suppliers.map((item) => {
                    return (
                      <option
                        value={item._id}
                      >{`${item.firstName} ${item.lastName}`}</option>
                    );
                  })}
                </select>
              </div>
              <button className="newPurchaseButton">Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
