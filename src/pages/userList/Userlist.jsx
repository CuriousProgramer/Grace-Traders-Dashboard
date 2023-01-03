import React, { useState, useEffect } from "react";
import "./Userlist.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";

import { Link } from "react-router-dom";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";

export default function Userlist() {
  const rows = [
    {
      id: 1,
      firstName: "Ahamad",
      lastName: "Ali",
      username: "Ahmad Ali",
      email: "theyologamer960@gmail.com",
      status: "active",
      transaction: "$120.00",
    },
    {
      id: 2,
      username: "Leo Messi",
      email: "theyologamer960@gmail.com",
      status: "inactive",
      transaction: "$150.00",
    },
    {
      id: 3,
      username: "Jon Snow",
      email: "theyologamer960@gmail.com",
      status: "active",
      transaction: "$170.00",
    },
  ];

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      // renderCell: (params) => {
      //   return <span>{params.row._id}</span>;
      // },
    },
    { field: "firstName", headerName: "FirstName", width: 120 },
    { field: "lastName", headerName: "Last Name", width: 120 },
    {
      field: "userName",
      headerName: "Username",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="usercell">
            <img
              src={params.row.photo}
              alt=""
              srcSet=""
              className="userListImg"
            />
            <span>{params.row.userName}</span>
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 220 },
    {
      field: "status",
      headerName: "Status",
      type: "string",
      width: 90,
      renderCell: (params) => {
        return <span>Active</span>;
      },
    },

    // {
    //   field: "action",
    //   heaerName: "Action",
    //   width: 150,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <Link to={"/user/" + params.row.id}>
    //           <button className="userListEdit">Edit</button>
    //         </Link>
    //         <DeleteOutlineIcon
    //           className="userListDelete"
    //           onClick={() => handleDelete(params.row.id)}
    //         ></DeleteOutlineIcon>
    //       </>
    //     );
    //   },
    // },
  ];

  const [data, setData] = useState([]);
  useEffect(() => {
    axios({
      method: "GET",
      url: "http://127.0.0.1:8080/api/v1/users",
    })
      .then((res) => {
        console.log(res);
        const users = res.data.users;
        users.forEach((item, index) => {
          item.id = index + 1;
        });
        console.log(users);
        setData(users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
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
          <h1 style={{ paddingLeft: 20 }}>Users</h1>
          <div className="user" style={{ height: 400, width: "90%" }}>
            <DataGrid
              rows={data}
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
