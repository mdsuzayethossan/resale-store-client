import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import Loading from "../../components/Loading";
const ReportedProducts = () => {
  const url = `${process.env.REACT_APP_domain}/report`;
  const {
    data: ReportedProducts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["ReportedProducts"],
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
  if (isLoading) {
    return <Loading></Loading>;
  }
  const handleDelete = (id) => {
    const url = `${process.env.REACT_APP_domain}/report/product/${id}`;
    fetch(url, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("ReportedProduct deleted successfully");
          refetch();
        }
      });
  };
  return (
    <div>
      <h2 className="font-bold">All ReportedProducts</h2>
      <div className="overflow-x-auto mt-7">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>SN</th>
              <th>Product Name</th>
              <th>Reported User</th>
              <th>Image</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {ReportedProducts.length &&
              ReportedProducts?.map((ReportedProduct, index) => (
                <tr key={ReportedProduct._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="avatar">
                      <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={ReportedProduct.image} alt="" />
                      </div>
                    </div>
                  </td>
                  <td>{ReportedProduct.name}</td>
                  <td>{ReportedProduct.user}</td>
                  <td>{ReportedProduct.email}</td>
                  <td>
                    {" "}
                    <svg
                      onClick={() => handleDelete(ReportedProduct.productId)}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 cursor-pointer"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportedProducts;
