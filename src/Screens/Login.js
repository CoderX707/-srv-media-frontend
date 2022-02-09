import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ApiHelperPost, authChecker, toastMessage } from "../Helpers/Helpers";

export default function Login() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    let user = authChecker();
    if (user?.token) {
      navigate("/");
    }
  }, []);

  function signInHandler() {
    ApiHelperPost("/login", {
      email: email,
      password: password,
    }).then((res) => {
      if (res.status === 200) {
        localStorage.setItem("user-data", JSON.stringify(res.data));
        navigate("/");
      } else {
        toastMessage(res.data.detail);
      }
    });
  }
  return (
    <section className="text-gray-600 body-font">
      <ToastContainer />

      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
        <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 className="title-font font-medium text-3xl text-gray-900">
            Slow-carb next level shoindcgoitch ethical authentic, poko scenester
          </h1>
          <p className="leading-relaxed my-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta,
            tempora. Cum pariatur minima tempora quas optio. Accusamus maxime
            dolor, quas asperiores repellat necessitatibus neque nesciunt.
            Maxime?
          </p>
          <Link to='/register' className="text-white bg-indigo-500 border-0 py-2 mt-5 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Register</Link>
        </div>
        <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
           Login
          </h2>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="password"
              className="leading-7 text-sm text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <button
            onClick={signInHandler}
            className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            Login
          </button>
          <p className="text-xs text-gray-500 mt-3">
            Literally you probably haven't heard of them jean shorts.
          </p>
        </div>
      </div>
    </section>
  );
}
