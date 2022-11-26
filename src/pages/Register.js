import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { ImageUpload } from "../api/ImageUpload";
import { AuthContext } from "../contexts/AuthProvider";
import useToken from "../hooks/useToken";
const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { createUser, updateUser } = useContext(AuthContext);
  const [createdEmail, setCreatedEmail] = useState("");
  const [token] = useToken(createdEmail);
  if (token) {
    navigate("/");
  }
  const handleRegister = (event) => {
    event.preventDefault();
    setLoading(true);
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
        .catch((err) => {
          setLoading(false);
        });
    });
  };
  const saveUser = (image, userInfo) => {
    const email = userInfo.email;
    ImageUpload(image)
      .then((data) => {
        // save user information to the database
        userInfo.image = data;
        delete userInfo.password;
        fetch(`${process.env.REACT_APP_domain}/users`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userInfo),
        })
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            setCreatedEmail(email);
            console.log(loading);
          })
          .catch(() => {
            setLoading(false);
          });
      })
      .catch((err) => {
        setLoading(false);
      });
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
                required
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
                required
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
              {(loading && (
                <div
                  aria-label="Loading..."
                  role="status"
                  className="text-center w-full"
                >
                  <svg class="h-6 w-6 animate-spin" viewBox="3 3 18 18">
                    <path
                      class="fill-gray-200"
                      d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
                    ></path>
                    <path
                      class="fill-gray-800"
                      d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
                    ></path>
                  </svg>
                </div>
              )) || (
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              )}

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
