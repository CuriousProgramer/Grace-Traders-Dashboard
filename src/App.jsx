import "./App.css";
import "./components/topbar/Topbar";
import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import Home from "./pages/home/Home";
import Newuser from "./pages/newuser/Newuser";
import Userlist from "./pages/userList/Userlist";
import SupplierList from "./pages/supplierList/SupplierList";
import Supplier from "./pages/supplier/Supplier";
import Newsupplier from "./pages/newsupplier/Newsupplier";
import Purchaselist from "./pages/purchaseList/Purchaselist";
import Purchase from "./pages/purchase/Purchase";
import Newpurchase from "./pages/newpurchase/Newpurchase";
import Orderlist from "./pages/orders/Orderlist";
import Order from "./pages/orders/Order";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import User from "./pages/user/User";
import Productlist from "./pages/productlist/Productlist";
import Product from "./pages/productlist/Product";
import Settings from "./pages/Settings/Settings";
import Newproduct from "./pages/productlist/Newproduct";
import Login from "./pages/Login/Login";
import { useSelector } from "react-redux";
// import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  // const user = true;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/"></Navigate> : <Login></Login>}
        ></Route>
        <Route
          path="/"
          element={!user ? <Navigate to="/login"></Navigate> : <Home></Home>}
        ></Route>
        <Route
          path="/settings"
          element={
            !user ? <Navigate to="/login"></Navigate> : <Settings></Settings>
          }
        ></Route>
        <Route
          path="/orders"
          element={
            !user ? <Navigate to="/login"></Navigate> : <Orderlist></Orderlist>
          }
        ></Route>
        <Route
          path="/orders/:orderId"
          element={!user ? <Navigate to="/login"></Navigate> : <Order></Order>}
        ></Route>
        <Route
          path="/users"
          element={
            !user ? <Navigate to="/login"></Navigate> : <Userlist></Userlist>
          }
        ></Route>
        <Route
          path="/user/:userId"
          element={!user ? <Navigate to="/login"></Navigate> : <User></User>}
        ></Route>
        <Route
          path="/newuser"
          element={
            !user ? <Navigate to="/login"></Navigate> : <Newuser></Newuser>
          }
        ></Route>
        <Route
          path="/suppliers"
          element={
            !user ? (
              <Navigate to="/login"></Navigate>
            ) : (
              <SupplierList></SupplierList>
            )
          }
        ></Route>
        <Route
          path="/suppliers/:supplierId"
          element={
            !user ? <Navigate to="/login"></Navigate> : <Supplier></Supplier>
          }
        ></Route>
        <Route
          path="/newsupplier"
          element={
            !user ? (
              <Navigate to="/login"></Navigate>
            ) : (
              <Newsupplier></Newsupplier>
            )
          }
        ></Route>
        <Route
          path="/purchases"
          element={
            !user ? (
              <Navigate to="/login"></Navigate>
            ) : (
              <Purchaselist></Purchaselist>
            )
          }
        ></Route>
        <Route
          path="/purchases/:purchaseId"
          element={
            !user ? <Navigate to="/login"></Navigate> : <Purchase></Purchase>
          }
        ></Route>
        <Route
          path="/newpurchase"
          element={
            !user ? (
              <Navigate to="/login"></Navigate>
            ) : (
              <Newpurchase></Newpurchase>
            )
          }
        ></Route>
        <Route
          path="/products"
          element={
            !user ? (
              <Navigate to="/login"></Navigate>
            ) : (
              <Productlist></Productlist>
            )
          }
        ></Route>
        <Route
          path="/products/:productId"
          element={
            !user ? <Navigate to="/login"></Navigate> : <Product></Product>
          }
        ></Route>
        <Route
          path="/newproduct"
          element={
            !user ? (
              <Navigate to="/login"></Navigate>
            ) : (
              <Newproduct></Newproduct>
            )
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
