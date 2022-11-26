import React from "react";
import { useRouteError, Link } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div
      className="flex justify-center items-center h-screen bg-white"
      id="error-page"
    >
      <div className="text-center">
        <img
          src="https://i.ibb.co/YTGHsm6/TB1-SU4up-FT7g-K0j-SZFp-XXa-Tkp-Xa-440-348.webp"
          alt=""
        />
        <p className="text-3xl">Sorry, an unexpected error has occurred.</p>
        <p className="text-2xl font-bold mt-3 mb-5">
          <i>{error.statusText || error.message}</i>
        </p>
        <Link
          to="/"
          className="btn-sm btn-primary font-bold py-2 rounded-full px-8 text-md"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
