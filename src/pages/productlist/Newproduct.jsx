import React from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState } from "react";
import { useEffect } from "react";
import "./Newproduct.css";
import { storage } from "../../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { useSelector } from "react-redux";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Newproduct() {
  const admin = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://127.0.0.1:8080/api/v1/categories",
    })
      .then((res) => {
        setCategories(res.data.categories);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);

  const [categories, setCategories] = useState([]);
  const [data, setData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    discount: "",
    category: true,
    img: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.img) {
      console.log("Error");
    } else {
      console.log("clicked");
      const imgRef = ref(storage, `products/${data.img.name + v4()} `);
      const snapshot = await uploadBytes(imgRef, data.img);
      const url = await getDownloadURL(snapshot.ref);
      const postData = {
        title: data.title,
        description: data.description,
        price: data.price,
        stock: data.stock,
        discount: data.discount,
        category: data.category,
        img: url,
      };
      console.log(postData);

      axios({
        method: "POST",
        url: "http://127.0.0.1:8080/api/v1/products",
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
        data: {
          title: data.title,
          description: data.description,
          price: data.price,
          stock: data.stock,
          discount: data.discount,
          category: data.category,
          img: url,
        },
      })
        .then((res) => {
          console.log(res);
          setMessage(["success", "Product added successfully"]);
          setOpen(true);
        })
        .catch((err) => {
          console.log("Error", err.response.data.message.split(" ")[0]);
          if (err.response.data.message.split(" ")[0] === "E11000") {
            setMessage(["error", "Product with same name already exist."]);
            setOpen(true);
          } else {
            setMessage(["error", "Something went wrong."]);
            setOpen(true);
          }

          setOpen(true);
        });
    }
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
          <div className="newProduct">
            <div>
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
            </div>
            <h1 className="newProductTitle">New Product</h1>
            <form className="newProductForm" onSubmit={(e) => handleSubmit(e)}>
              <div className="newProductItem">
                <label htmlFor="">Title</label>
                <input
                  type="text"
                  placeholder="xyz..."
                  required
                  onChange={(e) => {
                    setData({ ...data, title: e.target.value });
                  }}
                />
              </div>
              <div className="newProductItem">
                <label htmlFor="">Description</label>
                <input
                  type="text"
                  placeholder="xyz..."
                  required
                  onChange={(e) => {
                    setData({ ...data, description: e.target.value });
                  }}
                />
              </div>
              <div className="newProductItem">
                <label htmlFor="">Price</label>
                <input
                  type="number"
                  placeholder="0000"
                  required
                  onChange={(e) => {
                    setData({ ...data, price: e.target.value });
                  }}
                />
              </div>
              <div className="newProductItem">
                <label htmlFor="">Stock</label>
                <input
                  type="number"
                  placeholder="0000"
                  required
                  onChange={(e) => {
                    setData({ ...data, stock: e.target.value });
                  }}
                />
              </div>
              <div className="newProductItem">
                <label htmlFor="">Discount</label>
                <input
                  type="number"
                  required
                  placeholder="5%"
                  onChange={(e) => {
                    setData({ ...data, discount: e.target.value });
                  }}
                />
              </div>

              <div className="newProductItem">
                <label>Category</label>
                <select
                  className="newProductSelect"
                  name="proCategory"
                  id="proCategory"
                  required
                  placeholder="Choose"
                  onChange={(e) => {
                    setData({
                      ...data,
                      category: e.target.value,
                    });
                  }}
                >
                  {categories.map((cat) => {
                    return (
                      <option key={cat._id} value={cat.name}>
                        {cat.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="newProductItem">
                <label htmlFor="">Choose Photo</label>
                <input
                  type="file"
                  placeholder=""
                  required
                  onChange={(e) => {
                    setData({ ...data, img: e.target.files[0] });
                  }}
                />
              </div>
              <div width="100px" height="10px"></div>

              <button type="submit" className="newProductButton">
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
