import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const DashboardLayout = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className="drawer drawer-mobile">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 text-base-content">
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/dashboard/my-orders">My orders</Link>
            </li>
            <li>
              <Link to="/dashboard/add-product">Add A product</Link>
            </li>
            <li>
              <Link to="/dashboard/my-products">My Products</Link>
            </li>
            <li>
              <Link to="/dashboard/all-buyers">All Buyers </Link>
            </li>
            <li>
              <Link to="/dashboard/all-sellers">All Sellers</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
