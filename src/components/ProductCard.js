import React, { useContext, useState } from "react";
import { format } from "date-fns";
import { CheckmarkIcon, toast } from "react-hot-toast";
import PurchaseModal from "./PurchaseModal";
import { AuthContext } from "../contexts/AuthProvider";
import useBuyer from "../hooks/useBuyer";
import { useLocation } from "react-router-dom";
import useVerified from "../hooks/useVerified";
const ProductCard = ({ product }) => {
  const { user } = useContext(AuthContext);
  const [isBuyer] = useBuyer(user?.email);
  const locationName = useLocation();

  const [singleProduct, setSingleProduct] = useState(null);
  const {
    _id,
    name,
    location,
    image,
    description,
    sellerName,
    category,
    sellerEmail,
    originalprice,
    resaleprice,
    purchaseyear,
    condition,
    created_at,
  } = product;
  const [isVerified] = useVerified(sellerEmail);
  const isCategoryRoute = locationName.pathname === `/category/${category}`;
  const handleAddToReport = () => {
    const reported = {
      productId: _id,
      user: user?.displayName,
      name: name,
      email: user?.email,
      price: resaleprice,
      image: image,
    };
    fetch(`${process.env.REACT_APP_domain}/report`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(reported),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Reported placed successfully");
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => toast.error(err));
  };
  const handleAddToWishlist = (product) => {
    const order = {
      userName: sellerName,
      name: name,
      email: sellerEmail,
      price: resaleprice,
      image: image,
    };
  };

  return (
    <>
      <div className="card bg-base-100 shadow-xl">
        <figure className="px-5 pt-10">
          <img src={image} alt="Shoes" className="rounded-xl h-48" />
        </figure>
        <div className="card-body">
          <span>{format(new Date(created_at).getTime(), "PPpp")}</span>
          <h5 className="font-bold flex items-center">
            {sellerName}
            {isVerified && (
              <div className="badge bg-transparent border-0">
                <CheckmarkIcon />
              </div>
            )}

            <div className="badge flex-1 bg-transparent border-0 justify-end">
              <svg
                onClick={() => handleAddToWishlist(product)}
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-primary cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
          </h5>
          <h2 className="card-title">{name}</h2>
          <p>{description}</p>
          <p className="flex justify-between">
            <span>Resale price: ${resaleprice}</span>
            <span>Original price: ${originalprice}</span>
          </p>
          <p>
            <span>Used </span>
            {format(new Date().getTime(), "yyyy") - purchaseyear} years
          </p>
          <p>
            <span>Condition:</span> {condition}
          </p>
          <p className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            <span>{location}</span>
          </p>
          <div className="card-actions mt-4 flex justify-between">
            <label
              htmlFor="purchase-modal"
              onClick={() => setSingleProduct(product)}
              className="btn btn-primary text-white"
            >
              Book now
            </label>
            {isBuyer && isCategoryRoute && (
              <label
                htmlFor="purchase-modal"
                onClick={handleAddToReport}
                className="btn btn-primary text-white"
              >
                Report to admin
              </label>
            )}
          </div>
        </div>
      </div>
      {(singleProduct && (
        <PurchaseModal
          singleProduct={singleProduct}
          setSingleProduct={setSingleProduct}
        ></PurchaseModal>
      )) ||
        ""}
    </>
  );
};

export default ProductCard;
