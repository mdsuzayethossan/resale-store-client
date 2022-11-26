import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
const Orders = () => {
  const { user } = useContext(AuthContext);
  const url = `${process.env.REACT_APP_domain}/orders?email=${user?.email}`;
  const { data: orders = [] } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await fetch(url, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });
  return (
    <div>
      <h2 className="font-bold">My Orders</h2>
      <div className="overflow-x-auto mt-7">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>SN</th>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {orders.length &&
              orders?.map((order, index) => (
                <tr key={order._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="avatar">
                      <div className="w-16 rounded-xl">
                        <img src={order.image} alt="" />
                      </div>
                    </div>
                  </td>
                  <td>{order.name}</td>
                  <td>{order.price}</td>
                  <td>
                    {(!order.paid && (
                      <Link
                        to={`/dashboard/payment/${order._id}`}
                        className="btn btn-sm btn-success"
                      >
                        Pay
                      </Link>
                    )) || (
                      <div className="badge badge-success text-white gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                        Paid
                      </div>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
