import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Productlist.css";
import { Link } from "react-router-dom";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";

import { useSelector } from "react-redux";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Productlist() {
  const admin = useSelector((state) => state.user.currentUser);

  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState([]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "title",
      headerName: "Title",
      width: 280,
      renderCell: (params) => {
        return (
          <div className="usercell">
            <img src={params.row.img} alt="" srcSet="" />
            <span>{params.row.title}</span>
          </div>
        );
      },
    },
    { field: "price", headerName: "Price", width: 100 },
    {
      field: "discount",
      headerName: "Discount",
      type: "string",
      width: 100,
    },
    {
      field: "stock",
      headerName: "Stock",
      sortable: true,
      width: 100,
    },
    {
      field: "category",
      headerName: "Category",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 150,
      //   renderCell: (params) => {
      //     return (
      //       <>
      //         <span>Active</span>
      //       </>
      //     );
      //   },
    },
    {
      field: "action",
      heaerName: "Action",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/products/" + params.row._id}>
              <button className="supplierListEdit">Edit</button>
            </Link>
            <DeleteOutlineIcon
              className="supplierListDelete"
              onClick={() => handleDelete(params.row._id)}
            ></DeleteOutlineIcon>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    const getData = async () => {
      const res = await axios({
        method: "GET",
        url: "http://127.0.0.1:8080/api/v1/products",
      });
      const productData = res.data.products;

      productData.forEach((item, index) => {
        item.id = index + 1;
      });
      console.log(productData);
      setData(productData);
    };
    getData();
  }, []);

  const handleFilters = async (e) => {
    console.log(e.target.value);
    axios({
      method: "GET",
      url: `http://127.0.0.1:8080/api/v1/products/${e.target.value}`,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {});
  };

  const handleCategory = async (e) => {
    console.log(e.target.value);
  };

  const handleDelete = async (id) => {
    axios({
      method: "DELETE",
      url: `http://127.0.0.1:8080/api/v1/products/${id}`,
      headers: {
        Authorization: `Bearer ${admin.token}`,
      },
    })
      .then((res) => {
        console.log("Pro");
        setOpen(true);
        axios({
          method: "GET",
          url: "http://127.0.0.1:8080/api/v1/products",
        }).then((res) => {
          setData(res.data.products);
        });
      })
      .catch((err) => {
        console.log("Error", err);
        setMessage(["error", "Failed to delete product"]);
      });
  };

  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState([
    "success",
    "Product deleted successfully",
  ]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  //////////////
  ////////////////
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }
  ////////////////
  ////////////

  return (
    <div className="productPage">
      <Topbar></Topbar>
      <div className="container">
        <Sidebar></Sidebar>
        <div className="switcher">
          <div className="product" style={{ height: 400 }}>
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
            <div className="productTop">
              <h1 className="productTitle">Products</h1>
              <Link to="/newproduct">
                <button className="createProductButton">Create</button>
              </Link>
            </div>
            {/* <div className="productListOptions">
              <select
                name=""
                id=""
                onChange={(e) => {
                  handleFilters(e);
                }}
              >
                <option value="" disabled>
                  Filter By
                </option>
                <option value="?sort=-price">Price: High to low</option>
                <option value="?sort=price">Price: Low to High</option>
                <option value="?sort=-stock">Stock: High to low</option>
                <option value="?sort=stock">Stock: Low to High</option>
              </select>
              <select
                name=""
                id=""
                onChange={(e) => {
                  handleCategory(e);
                }}
              >
                <option value="" disabled>
                  Category
                </option>
                <option value="a">Price: High to low</option>
                <option value="b">Price: Low to High</option>
                <option value="c">Stock: High to low</option>
                <option value="d">Stock: Low to High</option>
              </select>
            </div> */}
            <DataGrid
              className="productDataTable"
              rows={data}
              columns={columns}
              pageSize={5}
              components={{
                Toolbar: CustomToolbar,
              }}
              rowsPerPageOptions={[5]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
