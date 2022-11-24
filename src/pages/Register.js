import React from "react";
import { Link } from "react-router-dom";
const Register = () => {
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
          <form className="card-body">
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
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                name="photoURL"
                placeholder="Your photo url"
                required
                className="input input-bordered focus:border-none"
              />
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
