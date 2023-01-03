import React, { useEffect, useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import "./Purchaselist.css";
import { Link } from "react-router-dom";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function Purchaselist() {
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "supplier",
      headerName: "Supplier",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="usercell">
            <img
              src={params.row.supplier.photo}
              alt=""
              srcSet=""
              className="purchaseListImg"
            />
            <span>
              {params.row.supplier.firstName +
                " " +
                params.row.supplier.lastName}
            </span>
          </div>
        );
      },
    },
    { field: "material", headerName: "Material", width: 150 },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "Number",
      width: 90,
    },
    {
      field: "totalPrice",
      headerName: "Total Price",
      type: "Number",
      width: 90,
    },
    {
      field: "purchaseDate",
      headerName: "Purchase Date",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 130,
    },
    {
      field: "paymentStatus",
      headerName: "Status",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 100,
      renderCell: (params) => {
        return (
          <span className={`paymentStatus ${params.row.paymentStatus}`}>
            {params.row.paymentStatus}
          </span>
        );
      },
    },
    {
      field: "action",
      heaerName: "Action",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/purchases/" + params.row._id}>
              <button className="purchaseListEdit">Edit</button>
            </Link>
            <DeleteOutlineIcon
              className="purchaseListDelete"
              onClick={() => handleDelete(params.row.id)}
            ></DeleteOutlineIcon>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    console.log("Purchae rendered");

    axios({
      method: "GET",
      url: "http://127.0.0.1:8080/api/v1/purchases",
    })
      .then((res) => {
        setData(res.data.purchases);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const rows = [
    {
      id: 1,
      supplier: "Haider Ali",
      unitPrice: "400",
      quantity: "50",
      totalPrice: "20000",
      purchaseDate: "18 Nov 2022",
      paymentStatus: "Approved",
    },
    {
      id: 2,
      supplierId: "Muhammad Ali",
      unitPrice: "250",
      quantity: "30",
      totalPrice: "7500",
      purchaseDate: "14 Nov 2022",
      paymentStatus: "Approved",
    },
    {
      id: 3,
      supplierId: "Ronaldinho",
      unitPrice: "750",
      quantity: "40",
      totalPrice: "30000",
      purchaseDate: "09 Nov 2022",
      paymentStatus: "Pending",
    },
  ];

  ////////////////
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }
  ////////////////
  const [data, setData] = useState([]);
  const handleDelete = async (id) => {
    const res = await axios({
      method: "DELETE",
      url: `http://127.0.0.1:8080/api/v1/purchases/${id}`,
    });
    console.log(res);
    const mydata = await axios({
      method: "GET",
      url: "http://127.0.0.1:8080/api/v1/purchases",
    });
    setData(mydata.data.purchases);

    // setData(supplierData);
  };
  return (
    <div className="productUpdatePage">
      <Topbar></Topbar>
      <div className="container">
        <Sidebar></Sidebar>
        <div className="switcher">
          <div className="purchase" style={{ height: 400 }}>
            <div className="purchaseTop">
              <h1 className="purchaseTitle">Purchases</h1>
              <Link to="/newpurchase">
                <button className="createPurchaseButton">Create</button>
              </Link>
            </div>
            <DataGrid
              className="purchaseDataTable"
              rows={data}
              columns={columns}
              pageSize={10}
              components={{
                Toolbar: CustomToolbar,
              }}
              rowsPerPageOptions={[10]}
              checkboxSelection
            />
          </div>
        </div>
      </div>
    </div>
  );
}
