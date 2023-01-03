import React, { useEffect, useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import "./Orderlist.css";
import { Link } from "react-router-dom";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function Orderlist() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://127.0.0.1:8080/api/v1/orders`,
    })
      .then((res) => {
        console.log(res);
        setOrders(res.data.orders);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(orders);
  const columns = [
    { field: "trackingId", headerName: "Tracking ID", width: 130 },
    {
      field: "customer",
      headerName: "Customer",
      type: "string",
      width: 150,
      renderCell: (params) => {
        return <span>{params.row.firstName + " " + params.row.lastName}</span>;
      },
    },
    {
      field: "orderTotalPrice",
      headerName: "Total Price",
      type: "number",
      width: 90,
    },
    {
      field: "orderQuantity",
      headerName: "Quantity",
      type: "Number",
      width: 90,
    },
    {
      field: "city",
      headerName: "City",
      type: "String",
      width: 90,
      renderCell: (params) => {
        return <span>{params.row.city}</span>;
      },
    },
    {
      field: "createdAt",
      headerName: "PLaced At",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 120,
    },
    {
      field: "orderStatus",
      headerName: "Status",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 100,
      renderCell: (params) => {
        return (
          <span className={`orderStatus ${params.row.orderStatus}`}>
            {params.row.orderStatus}
          </span>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/orders/" + params.row._id}>
              <button className="orderListEdit">View</button>
            </Link>
            <DeleteOutlineIcon
              className="orderListDelete"
              onClick={() => handleDelete(params.row.id)}
            ></DeleteOutlineIcon>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    console.log("Purchae rendered");
    const d = new Date(Date.now());
    console.log(d.getMonth());
    axios({
      method: "GET",
      url: "http://127.0.0.1:8080/api/v1/purchases",
    })
      .then((res) => {
        const purchaseRecord = res.data.purchases;

        purchaseRecord.forEach((item, index) => {
          item.id = index + 1;
          let dummyDate = new Date(item.purchaseDate);
          dummyDate = dummyDate.toUTCString().split(" ");
          item.actualDate = `${dummyDate[1]} ${dummyDate[2]} ${dummyDate[3]}`;
        });

        console.log(purchaseRecord);

        setData(purchaseRecord);
      })
      .catch((err) => {
        console.log("Error Caught", err);
      });
  }, []);

  const rows = [
    {
      id: 14567898762323,
      user: "Usama",
      totalPrice: "12000",
      quantity: "50",
      dueIn: "0 days",
      placedAt: "18 Nov 2022",
      paymentStatus: "Delivered",
    },
    {
      id: 24578987654323,
      user: "Haider Ali",
      totalPrice: "4000",
      quantity: "15",
      dueIn: "5 days",
      placedAt: "16 Nov 2022",
      paymentStatus: "Shipped",
    },

    {
      id: 35678924234567,
      user: "Muhammad Ali",
      totalPrice: "6500",
      quantity: "25",
      dueIn: "3 days",
      placedAt: "13 Nov 2022",
      paymentStatus: "Pending",
    },
  ];
  const [data, setData] = useState([]);
  const handleDelete = (id) => {
    axios({
      method: "DELETE",
      url: `http://127.0.0.1:8080/api/v1/orders/${id}`,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  ////////////////
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }
  ////////////////

  return (
    <div className="productUpdatePage">
      <Topbar></Topbar>
      <div className="container">
        <Sidebar></Sidebar>
        <div className="switcher">
          <div className="order" style={{ height: 400 }}>
            <div className="orderTop">
              <h1 className="orderTitle">Orders</h1>
            </div>
            <DataGrid
              className="orderDataTable"
              rows={orders}
              columns={columns}
              pageSize={5}
              components={{
                Toolbar: CustomToolbar,
              }}
              rowsPerPageOptions={[5]}
              checkboxSelection
            />
          </div>
        </div>
      </div>
    </div>
  );
}
