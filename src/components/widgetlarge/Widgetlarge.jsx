import React, { useState, useEffect } from "react";
import "./Widgetlarge.css";
import { Link } from "react-router-dom";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function Widgetlarge() {
  const Button = ({ type }) => {
    return <button className={"widgetLargeButton" + type}>{type}</button>;
  };
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios({
      method: "GET",
      url: "http://127.0.0.1:8080/api/v1/orders/getNewOrders",
    })
      .then((res) => {
        console.log(res);
        res.data.newOrders.forEach((item, index) => {
          item.id = index + 1;
        });
        setOrders(res.data.newOrders);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 130 },
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
  ];

  return (
    <div className="widgetLarge">
      <h3 className="widgetLargeTitle">New Orders</h3>
      <div style={{ height: 375, width: "100%" }}>
        <DataGrid
          className="orderDataTable"
          rows={orders}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </div>
  );
}
