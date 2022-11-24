import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layouts/DashboardLayout";
import Main from "../Layouts/Main";
import AllBuyers from "../pages/Dashboard/Buyer/AllBuyers";
import MyOrder from "../pages/Dashboard/Buyer/MyOrder";
import Dashboard from "../pages/Dashboard/Dashboard";
import AddProduct from "../pages/Dashboard/Seller/AddProduct";
import AllSellers from "../pages/Dashboard/Seller/AllSellers";
import MyProducts from "../pages/Dashboard/Seller/MyProducts";
import Login from "../pages/Login";
import Register from "../pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "/dashboard/my-orders",
        element: <MyOrder></MyOrder>,
      },
      {
        path: "/dashboard/add-product",
        element: <AddProduct></AddProduct>,
      },
      {
        path: "/dashboard/my-products",
        element: <MyProducts></MyProducts>,
      },
      {
        path: "/dashboard/all-sellers",
        element: <AllSellers></AllSellers>,
      },
      {
        path: "/dashboard/all-buyers",
        element: <AllBuyers></AllBuyers>,
      },
    ],
  },
]);
export default router;