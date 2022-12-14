import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const handleLogout = () => {
    logOut().then().catch();
  };
  return (
    <div className="container">
      {" "}
      <div className="navbar px-0">
        <div className="flex-1">
          <Link to="/" className="font-bold text-primary text-xl">
            Resale Store
          </Link>
        </div>
        <div>
          <ul className="hidden md:flex gap-14">
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-primary font-bold" : "font-semibold"
                }
                to="/home"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-primary font-bold" : "font-semibold"
                }
                to="/blog"
              >
                Blog
              </NavLink>
            </li>

            {(user?.email && (
              <>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "text-primary font-bold" : "font-semibold"
                    }
                    to="/dashboard"
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <button onClick={handleLogout} className="font-bold mr-3">
                    LogOut
                  </button>
                </li>
              </>
            )) || (
              <>
                {" "}
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary font-bold mr-3"
                        : "font-semibold mr-3"
                    }
                    to="/login"
                  >
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
        <label
          tabIndex={2}
          htmlFor="dashboard-drawer"
          className="btn btn-ghost lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </label>
        <div className="flex-none md:hidden">
          <div className="dropdown dropdown-end"></div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user?.photoURL} alt="" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-primary font-bold" : "font-semibold"
                  }
                  to="/home"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-primary font-bold" : "font-semibold"
                  }
                  to="/blog"
                >
                  Blog
                </NavLink>
              </li>

              {(user?.email && (
                <>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "text-primary font-bold" : "font-semibold"
                      }
                      to="/dashboard"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="font-bold">
                      LogOut
                    </button>
                  </li>
                </>
              )) || (
                <>
                  {" "}
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "text-primary font-bold" : "font-semibold"
                      }
                      to="/login"
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
