import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import useBuyer from "../hooks/useBuyer";
import useSeller from "../hooks/useSeller";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  const [isSeller] = useSeller(user?.email);
  const [isBuyer] = useBuyer(user?.email);
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
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            {isBuyer && (
              <li>
                <Link to="/dashboard/my-orders">My orders</Link>
              </li>
            )}

            {isSeller && (
              <>
                {" "}
                <li>
                  <Link to="/dashboard/add-product">Add A product</Link>
                </li>
                <li>
                  <Link to="/dashboard/my-products">My Products</Link>
                </li>
              </>
            )}
            {isAdmin && (
              <>
                <li>
                  <Link to="/dashboard/all-buyers">All Buyers </Link>
                </li>
                <li>
                  <Link to="/dashboard/all-sellers">All Sellers</Link>
                </li>
                <li>
                  <Link to="/dashboard/reported-products">
                    Reported products
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
