import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";
import DashboardLayout from "../Layouts/DashboardLayout";
import Main from "../Layouts/Main";
import AllBuyers from "../pages/Dashboard/Buyer/AllBuyers";
import Orders from "../pages/Dashboard/Buyer/Orders";
import Dashboard from "../pages/Dashboard/Dashboard";
import Payment from "../pages/Dashboard/Payment/Payment";
import ReportedProducts from "../pages/Dashboard/ReportedProducts";
import AddProduct from "../pages/Dashboard/Seller/AddProduct";
import AllSellers from "../pages/Dashboard/Seller/AllSellers";
import MyProducts from "../pages/Dashboard/Seller/MyProducts";
import Home from "../pages/Home/Home";
import Login from "../pages/Login";
import Products from "../pages/Products/Products";
import Register from "../pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/home",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/category/:id",
        element: <Products></Products>,
        loader: ({ params }) =>
          fetch(`${process.env.REACT_APP_domain}/category/${params.id}`),
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
        element: <Orders></Orders>,
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
      {
        path: "/dashboard/reported-products",
        element: <ReportedProducts></ReportedProducts>,
      },
      {
        path: "/dashboard/payment/:id",
        element: <Payment></Payment>,
        loader: ({ params }) =>
          fetch(`${process.env.REACT_APP_domain}/orders/${params.id}`),
      },
    ],
  },
]);
export default router;
