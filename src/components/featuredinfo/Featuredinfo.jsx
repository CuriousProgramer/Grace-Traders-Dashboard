import React, { useState, useEffect } from "react";
import "./Featuredinfo.css";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import axios from "axios";
export default function Featuredinfo() {
  ////States
  const [pendingOrders, setPendingOrders] = useState("");
  const [pendingPayments, setPendingPayments] = useState("");
  const [monthlyPurchases, setMonthlyPurchases] = useState(0);
  const [monthlySales, setMonthlySales] = useState(0);

  useEffect(() => {
    //Getting Pending Orders
    axios({
      method: "GET",
      url: "http://127.0.0.1:8080/api/v1/orders?orderStatus=Pending",
    })
      .then((res) => {
        console.log(res);
        setPendingOrders(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });

    ///Getting Monthly Purchases

    const d = new Date();
    const month = d.toISOString().split("T")[0].split("-")[1];
    const year = d.toISOString().split("T")[0].split("-")[0];
    console.log(month, year);
    axios({
      method: "GET",
      url: `http://127.0.0.1:8080/api/v1/purchases/getMonthlyPurchases/:${month}_${year}`,
    })
      .then((res) => {
        console.log("monthly purchases bro", res);
        setMonthlyPurchases(res.data.purchases[0].totalPurchases);
      })
      .catch((err) => {
        console.log(err);
      });

    ///Getting Pending Paymnets .... !!
    axios({
      method: "GET",
      url: "http://127.0.0.1:8080/api/v1/purchases?paymentStatus=Pending",
    })
      .then((res) => {
        console.log("pending payments", res);
        setPendingPayments(res.data.results);
        // setPendingOrders(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });

    ////Getting Monthy Sales
    axios({
      method: "GET",
      url: `http://127.0.0.1:8080/api/v1/orders/getMonthlySales/${month}_${year}`,
    })
      .then((res) => {
        console.log("monthly sales", res);
        setMonthlySales(res.data.sales[0].monthlySales);
      })
      .catch((err) => {
        console.log(err);
      });

    /////////////////////////
  }, []);

  const d = new Date();
  const monthString = d.toUTCString().split(" ")[2];
  const yearString = d.toUTCString().split(" ")[3];

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Purchases (Monthly)</span>
        <div className="featuredMoneyContainer">
          <span className="feturedMoney">RS {monthlyPurchases}</span>
          {/* <span className="featuredMoneyRate">
            -11.4 <ArrowDownwardIcon></ArrowDownwardIcon>
          </span> */}
        </div>
        <div className="featuredSub">
          {monthString} {yearString}
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales (Monthly)</span>
        <div className="featuredMoneyContainer">
          <span className="feturedMoney">RS {monthlySales}</span>
        </div>
        <div className="featuredSub">
          {monthString} {yearString}
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Pending Orders</span>
        <div className="featuredMoneyContainer">
          <span className="feturedMoney">{pendingOrders}</span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Pending Payments</span>
        <div className="featuredMoneyContainer">
          <span className="feturedMoney">{pendingPayments}</span>
        </div>
      </div>
    </div>
  );
}
