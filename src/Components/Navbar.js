import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ApiHelperPost, authChecker } from "../Helpers/Helpers";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    var userData = authChecker();
    setUser(userData);
  }, []);

  function logoutHandler() {
    ApiHelperPost("/logout", {}).then((res) => {
      if (res.status === 200) {
        localStorage.removeItem("user-data");
        navigate("/login");
      }
    });
  }

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          to="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">SRV Media</span>
          <span className="ml-3 text-xl">({user?.user?.name})</span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link className="mr-5 hover:text-gray-900" to="/subscription">
            Subscription
          </Link>
        </nav>
        <button
          onClick={logoutHandler}
          className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
