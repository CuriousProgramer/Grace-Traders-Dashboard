import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import LineStyle from "@mui/icons-material/LineStyle";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import InventoryIcon from "@mui/icons-material/Inventory";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccessibleIcon from "@mui/icons-material/Accessible";
export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarwrapper">
        <div className="sidebarmenu">
          <h4 className="sidebartitle">Dashboard</h4>
          <ul className="sidebarlist">
            <Link to="/" className="link">
              <li className="sidebarlistitem">
                <LineStyle fontSize="small"></LineStyle> Home
              </li>
            </Link>

            {/* <li className="sidebarlistitem">
              <MonetizationOnIcon fontSize="small"></MonetizationOnIcon> Sales
            </li> */}
            <Link to="/orders" className="link">
              <li className="sidebarlistitem">
                <ProductionQuantityLimitsIcon fontSize="small"></ProductionQuantityLimitsIcon>{" "}
                Orders
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarmenu">
          <h4 className="sidebartitle">Quick Access</h4>
          <ul className="sidebarlist">
            <Link to="/products" className="link">
              <li className="sidebarlistitem">
                <ProductionQuantityLimitsIcon fontSize="small"></ProductionQuantityLimitsIcon>{" "}
                Products
              </li>
            </Link>

            <Link to="/purchases" className="link">
              <li className="sidebarlistitem">
                <InventoryIcon fontSize="small"></InventoryIcon> Purchases
              </li>
            </Link>

            <Link to="/users" className="link">
              <li className="sidebarlistitem">
                <AccountCircleIcon fontSize="small"></AccountCircleIcon> Users
              </li>
            </Link>
            <Link to="/suppliers" className="link">
              <li className="sidebarlistitem">
                <AccessibleIcon fontSize="small"></AccessibleIcon> Supplier
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
