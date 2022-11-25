import { format } from "date-fns";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../contexts/AuthProvider";
const PurchaseModal = ({ singleProduct }) => {
  const {
    _id,
    name,
    location,
    image,
    description,
    sellerName,
    originalprice,
    resaleprice,
    purchaseyear,
    condition,
    created_at,
  } = singleProduct;
  console.log("modell", singleProduct);
  const { user } = useContext(AuthContext);
  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;

    const order = {
      userName: form.userName.value,
      name: form.name.value,
      email: form.email.value,
      resaleprice: form.resaleprice.value,
      phone: form.phone.value,
      meetingLocation: form.meetingLocation.value,
      image: image,
      paid: false,
    };
    fetch(`${process.env.REACT_APP_domain}/order`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Order placed successfully");
          console.log(data);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => toast.error(err));
  };

  return (
    <>
      <input type="checkbox" id="purchase-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="purchase-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <form
            onSubmit={handleBooking}
            className="grid grid-cols-1 gap-3 mt-10"
          >
            <input
              type="text"
              name="userName"
              disabled
              className="input w-full input-bordered"
              defaultValue={user?.displayName}
            />
            <input
              name="email"
              type="email"
              disabled
              defaultValue={user?.email}
              placeholder="Email Address"
              className="input w-full input-bordered"
            />
            <input
              name="name"
              type="text"
              defaultValue={name}
              disabled
              placeholder="Product name"
              className="input w-full input-bordered"
            />
            <input
              name="price"
              type="number"
              defaultValue={resaleprice}
              disabled
              placeholder="Product price"
              className="input w-full input-bordered"
            />
            <input
              name="phone"
              type="text"
              required
              placeholder="Phone Number"
              className="input w-full input-bordered"
            />
            <input
              name="meetingLocation"
              type="text"
              required
              placeholder="Meeting location"
              className="input w-full input-bordered"
            />
            <br />
            <input
              className="btn btn-accent w-full"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default PurchaseModal;
