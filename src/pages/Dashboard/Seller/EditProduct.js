import React, { useContext, useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { ImageUpload } from "../../../api/ImageUpload";
import { AuthContext } from "../../../contexts/AuthProvider";
import toast from "react-hot-toast";
import Loading from "../../../components/Loading";
const EditProduct = () => {
  const { user } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const loadSingleProduct = useLoaderData();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleEditProduct = (event) => {
    setLoading(true);
    event.preventDefault();
    const form = event.target;
    const produtInfo = {
      sellerName: user?.displayName,
      sellerEmail: user?.email,
      name: form.name.value,
      category: form.category.value,
      originalprice: form.originalprice.value,
      resaleprice: form.resaleprice.value,
      condition: form.condition.value,
      phone: form.phone.value,
      location: form.location.value,
      purchaseyear: form.purchaseyear.value,
      description: form.description.value,
      image: event.target.image.files[0],
      advertised: false,
      status: "available",
    };
    saveUser(produtInfo.image, produtInfo);
  };
  const saveUser = (image, produtInfo) => {
    ImageUpload(image)
      .then((data) => {
        // save user information to the database
        produtInfo.image = data;
        fetch(`${process.env.REACT_APP_domain}/add-product`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(produtInfo),
        })
          .then((res) => res.json())
          .then((result) => {
            setLoading(false);
            if (result.acknowledged) {
              toast.success("Product successfully added");
              navigate("/dashboard/my-products");
            } else {
              toast.error(result.message);
            }
          })
          .catch((err) => {
            setLoading(false);
            toast.error(err.message);
          });
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Something was wrong. Plese try again");
      });
  };

  return (
    <form onSubmit={handleEditProduct}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 text-center px-8">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            required
            className="input input-bordered focus:border-none"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Select category</span>
          </label>
          <select
            name="category"
            className="select focus:border-none select-bordered w-full"
          >
            {categories.map((category) => (
              <option value={category._id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Original price</span>
          </label>
          <input
            type="text"
            name="originalprice"
            placeholder="1250"
            required
            className="input input-bordered focus:border-none"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Resale price</span>
          </label>
          <input
            type="text"
            name="resaleprice"
            placeholder="400"
            required
            className="input input-bordered focus:border-none"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Select product condition</span>
          </label>
          <select
            name="condition"
            className="select focus:border-none select-bordered w-full"
          >
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Mobile number</span>
          </label>
          <input
            type="number"
            name="phone"
            placeholder="+8801409126505"
            required
            className="input input-bordered focus:border-none"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <input
            type="text"
            name="location"
            placeholder="Dhaka"
            required
            className="input input-bordered focus:border-none"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Year of purchase</span>
          </label>
          <input
            type="number"
            name="purchaseyear"
            placeholder="2020"
            required
            className="input input-bordered focus:border-none"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo</span>
          </label>
          <input
            type="file"
            name="image"
            className="file-input file-input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Product description</span>
          </label>
          <textarea
            name="description"
            className="textarea focus:border-none textarea-bordered"
            placeholder="Description"
          ></textarea>
        </div>
      </div>
      <div className="text-center mt-7">
        <button className="btn btn-primary">Edit Product</button>
      </div>
    </form>
  );
};

export default EditProduct;
