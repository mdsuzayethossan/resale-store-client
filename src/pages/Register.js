import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { ImageUpload } from "../api/ImageUpload";
import { AuthContext } from "../contexts/AuthProvider";
import useToken from "../hooks/useToken";
const Register = () => {
  const navigate = useNavigate();
  const { createUser, updateUser } = useContext(AuthContext);
  const [createdEmail, setCreatedEmail] = useState("");
  const [token] = useToken(createdEmail);
  if (token) {
    navigate("/");
  }
  const handleRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    const user = {
      name: form.name.value,
      role: form.role.value,
      email: form.email.value,
      password: form.password.value,
      image: event.target.image.files[0],
    };
    createUser(user.email, user.password).then((result) => {
      toast.success("User Created Successfully.");
      const userInfo = {
        displayName: user.name,
      };
      updateUser(userInfo)
        .then((result) => {
          saveUser(user.image, user);
        })
        .catch((err) => console.log(err));
    });
  };
  const saveUser = (image, userInfo) => {
    ImageUpload(image)
      .then((data) => {
        // save user information to the database
        userInfo.image = data;
        fetch(`${process.env.REACT_APP_domain}/users`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(userInfo),
        })
          .then((res) => res.json())
          .then((result) => {
            setCreatedEmail(userInfo.email);
            toast.success(`${data.name} is added successfully`);
          });
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleRegister} className="card-body">
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
                <span className="label-text">Photo</span>
              </label>
              <input
                type="file"
                name="image"
                className="file-input file-input-bordered w-full max-w-xs"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Select your role</span>
              </label>
              <select
                name="role"
                className="select focus:border-none select-bordered w-full max-w-xs"
              >
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="Your email"
                className="input input-bordered focus:border-none"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                required
                placeholder="Enter password"
                className="input input-bordered focus:border-none"
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>

              <label className="label">
                <span className="label-text-alt">
                  Already have an account?{" "}
                  <Link
                    className="font-bold text-base text-primary link link-hover"
                    to="/login"
                  >
                    Log In
                  </Link>
                </span>
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
