import React, { useState, useEffect } from "react";
import "./Product.css";
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
import { storage } from "../../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";

import { useSelector } from "react-redux";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Product() {
  const admin = useSelector((state) => state.user.currentUser);

  const { productId } = useParams();
  const [data, setData] = useState({});
  console.log("this is data", data);
  useEffect(() => {
    const getProduct = async () => {
      const res = await axios({
        method: "GET",
        url: `http://127.0.0.1:8080/api/v1/products/${productId}`,
      });

      setData(res.data.product);
    };
    getProduct();
  }, []);
  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log(data);
    axios({
      method: "PATCH",
      url: `http://127.0.0.1:8080/api/v1/products/${productId}`,
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
        img: data.img,
      },
    })
      .then((res) => {
        console.log(res);
        setOpen(true);
      })
      .catch((err) => {
        console.log("Error", err);
        setMessage(["error", "Failed to Update Product"]);
        setOpen(true);
      });
  };
  const handleImg = async (e) => {
    const imgRef = ref(storage, `products/${e.target.files[0].name + v4()} `);
    const snapshot = await uploadBytes(imgRef, e.target.files[0]);
    const url = await getDownloadURL(snapshot.ref);
    console.log(url);
    setData({ ...data, img: url });
  };

  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState([
    "success",
    "Product updated successfully",
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
          <div className="product">
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
            <div className="productTitleContainer">
              <h1 className="editProduct">Edit Product</h1>
              <Link to="/newproduct">
                <button className="userAddButton">Create</button>
              </Link>
            </div>
            <div className="productContainer">
              <div className="productShow">
                <div className="productShowTop">
                  <img
                    src={data.img}
                    alt=""
                    srcSet=""
                    className="productShowImg"
                  />
                  {/* <div className="productShowJobTitle">
              <span className="productShowUsername">{data.title}</span>
              <span className="productShowUserTitle m20">
                <b>Stock: </b> {data.stock}
              </span>
            </div> */}
                </div>
                <div className="productShowBottom">
                  <span className="productShowTitle">Product Details</span>
                  <div className="productShowInfo">
                    {/* <PermIdentityIcon className="productShowIcon"></PermIdentityIcon> */}
                    <span className="productShowInfoTitle">
                      <b>ProductID: </b>
                      {data._id}
                    </span>
                  </div>
                  <div className="productShowInfo">
                    {/* <PermIdentityIcon className="productShowIcon"></PermIdentityIcon> */}
                    <span className="productShowInfoTitle">
                      <b>Title: : </b>
                      {data.title}
                    </span>
                  </div>
                  <div className="productShowInfo">
                    {/* <PermIdentityIcon className="productShowIcon"></PermIdentityIcon> */}
                    <span className="productShowInfoTitle">
                      <b>Stock: </b>
                      {data.stock}
                    </span>
                  </div>

                  <div className="productShowInfo">
                    {/* <PermIdentityIcon className="productShowIcon"></PermIdentityIcon> */}
                    <span className="productShowInfoTitle">
                      <b>Description: </b>
                      {data.description}
                    </span>
                  </div>
                  <div className="productShowInfo">
                    {/* <CalendarTodayIcon className="productShowIcon"></CalendarTodayIcon> */}
                    <span className="productShowInfoTitle">
                      <b>Price: </b> {data.price}
                    </span>
                  </div>
                  {/* <span className="productShowTitle">Contact Details</span> */}

                  <div className="productShowInfo">
                    {/* <PhoneAndroidIcon className="productShowIcon"></PhoneAndroidIcon> */}
                    <span className="productShowInfoTitle">
                      <b>Discount: </b> {data.discount}
                    </span>
                  </div>
                  <div className="productShowInfo">
                    {/* <MailOutlineIcon className="productShowIcon"></MailOutlineIcon> */}
                    <span className="productShowInfoTitle">
                      <b>Category: </b> {data.category}
                    </span>
                  </div>
                  {/* <div className="productShowInfo">
              <MyLocationIcon className="productShowIcon"></MyLocationIcon>
              <span className="productShowInfoTitle">{data.address}</span>
            </div> */}
                </div>
              </div>
              <div className="productUpdate">
                <div className="productUpdateTitle">
                  <span>Edit</span>
                  <form
                    onSubmit={(e) => handleUpdate(e)}
                    className="productUpdateForm"
                  >
                    <div className="productUpdateLeft">
                      <div className="productUpdateItem">
                        <label htmlFor="">Title</label>
                        <input
                          type="text"
                          placeholder="Product xyz"
                          className="productUpdateInput"
                          value={data.title}
                          onChange={(e) => {
                            setData({ ...data, title: e.target.value });
                          }}
                        />
                      </div>
                      <div className="productUpdateItem">
                        <label htmlFor="">Description</label>
                        <input
                          type="text"
                          placeholder="Desc..."
                          className="productUpdateInput"
                          value={data.description}
                          onChange={(e) => {
                            setData({ ...data, description: e.target.value });
                          }}
                        />
                      </div>
                      <div className="productUpdateItem">
                        <label htmlFor="">Price</label>
                        <input
                          type="number"
                          placeholder="0000"
                          className="productUpdateInput"
                          value={data.price}
                          onChange={(e) => {
                            setData({ ...data, price: e.target.value });
                          }}
                        />
                      </div>
                      <div className="productUpdateItem">
                        <label htmlFor="">Stock</label>
                        <input
                          type="number"
                          placeholder="0000"
                          className="productUpdateInput"
                          value={data.stock}
                          onChange={(e) => {
                            setData({ ...data, stock: Number(e.target.value) });
                          }}
                        />
                      </div>
                      <div className="productUpdateItem">
                        <label htmlFor="">Discount</label>
                        <input
                          type="number"
                          placeholder="0000"
                          className="productUpdateInput"
                          value={data.dicount}
                          onChange={(e) => {
                            setData({
                              ...data,
                              discount: Number(e.target.value),
                            });
                          }}
                        />
                      </div>
                      <div className="productUpdateItem">
                        <label htmlFor="">Category</label>
                        <select
                          className="productUpdateInput"
                          id="productCategoryInput"
                          onChange={(e) => {
                            setData({ ...data, category: e.target.value });
                          }}
                        >
                          <option value={"Body Part"}>Body Part</option>
                          <option value={"Accessories"}>Accessories</option>
                        </select>
                      </div>
                    </div>
                    <div className="productUpdateRight">
                      <div className="productUpdateUpload">
                        <img
                          className="productUpdateImg"
                          src={data.img}
                          alt=""
                          srcSet=""
                        />
                        <label htmlFor="file">
                          <PublishIcon className="productUpdateIcon"></PublishIcon>
                        </label>
                        <input
                          type="file"
                          name=""
                          id="file"
                          style={{ display: "none" }}
                          onChange={(e) => handleImg(e)}
                        />
                      </div>
                      <button className="productUpdateButton">Update</button>
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
