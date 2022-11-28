import React, { useContext, useEffect, useState } from "react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { AuthContext } from "../contexts/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useToken from "../hooks/useToken";
import toast from "react-hot-toast";
import { GoogleAuthProvider } from "firebase/auth";
import Loading from "../components/Loading";
const Login = () => {
  const { signIn, providerLogin } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const googleProvider = new GoogleAuthProvider();
  const [loginError, setLoginError] = useState("");
  const [loginUserEmail, setLoginUserEmail] = useState("");
  const [token] = useToken(loginUserEmail);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token]);
  if (loading) {
    return <Loading></Loading>;
  }
  if (loginError) {
    toast.error(loginError);
  }

  const handleLogin = (event) => {
    event.preventDefault();
    setLoginError("");
    setLoading(true);
    const form = event.target;
    const user = {
      email: form.email.value,
      password: form.password.value,
    };
    signIn(user.email, user.password)
      .then((result) => {
        setLoading(false);
        const user = result.user;
        setLoginUserEmail(user.email);
      })
      .catch((error) => {
        setLoading(false);
        setLoginError(error.message);
      });
  };

  const handleGoogleLogin = () => {
    providerLogin(googleProvider)
      .then((result) => {
        const user = result.user;
        const userDetails = {
          name: user.displayName,
          role: "buyer",
          email: user.email,
          image: user.photoURL,
        };
        saveUser(userDetails);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const saveUser = (userInfo) => {
    fetch(`${process.env.REACT_APP_domain}/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => res.json())
      .then((result) => {
        setLoginUserEmail(userInfo.email);
      });
  };
  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md text-center space-y-8">
        <button
          onClick={handleGoogleLogin}
          className="btn w-full rounded-full bg-transparent border-2 text-primary border-primary hover:bg-primary hover:text-white hover:border-primary uppercase"
        >
          <svg
            width="20"
            height="20"
            fill="currentColor"
            className="mr-2"
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z"></path>
          </svg>
          Continue with Google
        </button>
        <div className="divider">OR</div>
        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-primary hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>
          <label className="label">
            <span className="label-text-alt">
              Don't have an account?
              <Link
                className="font-bold text-base text-primary link link-hover ml-2"
                to="/register"
              >
                Register
              </Link>
            </span>
          </label>
          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-primary group-hover:text-white"
                  aria-hidden="true"
                />
              </span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
