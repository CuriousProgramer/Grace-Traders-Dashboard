import React from "react";
import "./Widgetsmall.css";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function Widgetsmall() {
  return (
    <div className="widgetSmall">
      <span className="widgetSmallTitle">New Orders</span>
      <ul className="widgetSmallList">
        <li className="widgetSmallListItem">
          <img
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
            alt="person"
          />
          <div className="widgetSmallUser">
            <span className="widgetSmallUsername">Muhammad Ibrahim</span>
            <span className="widgetSmallJobtitle">Gujrat</span>
          </div>
          <button className="widgetSmallBtn">
            <VisibilityIcon className="widgetSmallIcon"></VisibilityIcon>Display
          </button>
        </li>
        <li className="widgetSmallListItem">
          <img
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
            alt="person"
          />
          <div className="widgetSmallUser">
            <span className="widgetSmallUsername">Muhammad Ibrahim</span>
            <span className="widgetSmallJobtitle">Lahore</span>
          </div>
          <button className="widgetSmallBtn">
            <VisibilityIcon className="widgetSmallIcon"></VisibilityIcon>Display
          </button>
        </li>
      </ul>
    </div>
  );
}
