import React, { useEffect, useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import "./SupplierList.css";
import { Link } from "react-router-dom";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function SupplierList() {
  const [data, setData] = useState([]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Name",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="usercell">
            <img
              src={params.row.photo}
              alt=""
              srcSet=""
              className="supplierListImg"
            />
            <span>{params.row.firstName + " " + params.row.lastName}</span>
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 170 },
    {
      field: "phone",
      headerName: "Phone",
      type: "string",
      width: 120,
    },
    {
      field: "address",
      headerName: "Address",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 200,
    },
    {
      field: "status",
      headerName: "Status",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 80,
      renderCell: (params) => {
        return (
          <>
            <span>Active</span>
          </>
        );
      },
    },
    {
      field: "action",
      heaerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/suppliers/" + params.row._id}>
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
        url: "http://127.0.0.1:8080/api/v1/suppliers",
      });
      const supplierData = res.data.suppliers;
      supplierData.forEach((item, index) => {
        item.id = index + 1;
      });
      setData(supplierData);
    };
    getData();
  }, []);

  const handleDelete = async (id) => {
    const res = await axios({
      method: "DELETE",
      url: `http://127.0.0.1:8080/api/v1/suppliers/${id}`,
    });
    console.log(res);
    const mydata = await axios({
      method: "GET",
      url: "http://127.0.0.1:8080/api/v1/suppliers",
    });
    console.log(mydata);
    const supplierData = mydata.data.suppliers;
    supplierData.forEach((item, index) => {
      item.id = index + 1;
    });

    setData(supplierData);
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
          <div className="supplier" style={{ height: 400 }}>
            <div className="supplierTop">
              <h1 className="supplierTitle">Suppliers</h1>
              <button className="createSupplierButton">Create</button>
            </div>
            <DataGrid
              className="supplierDataTable"
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
