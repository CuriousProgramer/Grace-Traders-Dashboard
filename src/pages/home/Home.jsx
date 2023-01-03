import React from "react";
import "./Home.css";
import Featuredinfo from "../../components/featuredinfo/Featuredinfo";
import Widgetlarge from "../../components/widgetlarge/Widgetlarge";
import Widgetsmall from "../../components/widgetsmall/Widgetsmall";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";

export default function Home() {
  return (
    <div className="productUpdatePage">
      <Topbar></Topbar>
      <div className="container">
        <Sidebar></Sidebar>
        <div className="switcher">
          <h1 className="adminHome">Home</h1>
          <div className="home">
            <Featuredinfo></Featuredinfo>
            <div className="homeWidgets">
              {/* <Widgetsmall></Widgetsmall> */}
              <Widgetlarge></Widgetlarge>
              //{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
