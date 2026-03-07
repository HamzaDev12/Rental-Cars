import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BiLock, BiPhone, BiRegistered, BiUserCircle } from "react-icons/bi";
import { ImImage } from "react-icons/im";
import { MdCarRental, MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import logo from "./../../assets/Logo.png";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCofirm, setShowCofirm] = useState(false);
  return (
    <div className="min-h-screen min-w-full flex justify-center items-center flex-col text-white bg-gray-800">
      <div className="bg-gray-950 w-[450px] mt-5 p-8 border border-gray-50 rounded-lg ">
        <div className="flex items-center gap-x-2">
          <div className="w-20 bg-gray-700 border border-gray-300 rounded-lg">
            <img src={logo} alt="" className="w-full" />
          </div>
          <div className="">
            <h1 className="text-2xl font-extrabold tracking-wide text-blue-500 uppercase ">
              Hargeisa Drive
            </h1>
            <p className=" text-sm md:text-xl text-gray-300 tracking-wide">
              Join us — your next car is waiting.
            </p>
          </div>
        </div>
        <form action="" className="mt-4">
          <div className="flex gap-x-1.5">
            <div className="">
              <label htmlFor="" className="text-md font-bold">
                Name <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <BiUserCircle className="text-gray-300 font-bold text-2xl absolute top-4 left-2" />
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  className="bg-gray-800 w-48 mt-2 rounded-lg px-9 py-2  text-white placeholder:text-gray-300 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="">
              <label htmlFor="" className="text-md font-bold">
                Email <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <MdEmail className="text-gray-300 font-bold text-2xl absolute top-4 left-2" />
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="bg-gray-800 w-48 mt-2 rounded-lg px-9 py-2  text-white placeholder:text-gray-300 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <label htmlFor="" className="text-md font-bold">
            Phone <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <BiPhone className="text-gray-300 font-bold text-2xl absolute top-4 left-2" />

            <input
              type="number"
              placeholder="Enter your phone"
              className="bg-gray-800 w-[390px] mt-2 rounded-lg px-9 py-2  text-white placeholder:text-gray-300 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <label htmlFor="" className="text-md font-bold">
            Password <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <BiLock className="text-gray-300 font-bold text-2xl absolute top-4 left-2" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your phone"
              className="bg-gray-800 w-[390px] mt-2 rounded-lg px-9 py-2  text-white placeholder:text-gray-300 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute bottom-2 left-[348px] cursor-pointer"
            >
              {" "}
              {showPassword ? (
                <AiFillEyeInvisible className="text-gery-300 font-bold text-2xl" />
              ) : (
                <AiFillEye className="text-gery-300 font-bold text-2xl" />
              )}
            </span>
          </div>
          <label htmlFor="" className="text-md font-bold">
            Cofirm <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <BiLock className="text-gray-300 font-bold text-2xl absolute top-4 left-2" />

            <input
              type={showCofirm ? "text" : "password"}
              placeholder="Enter your phone"
              className="bg-gray-800 w-[390px] mt-2 rounded-lg px-9 py-2  text-white placeholder:text-gray-300 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span
              onClick={() => setShowCofirm((prev) => !prev)}
              className="absolute bottom-2 left-[348px] cursor-pointer"
            >
              {" "}
              {showCofirm ? (
                <AiFillEyeInvisible className="text-gery-300 font-bold text-2xl" />
              ) : (
                <AiFillEye className="text-gery-300 font-bold text-2xl" />
              )}
            </span>
          </div>
          <label htmlFor="" className="text-md font-bold">
            Image <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <ImImage className="text-gray-300 font-bold text-2xl absolute top-4 left-2" />

            <input
              type="file"
              className="bg-gray-800 w-[390px] mt-2 rounded-lg px-9 py-2  text-white placeholder:text-gray-300 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <label htmlFor="" className="text-md font-bold">
            Role <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <MdCarRental className="text-gray-300 font-bold text-2xl absolute top-4 left-2" />

            <select
              name=""
              id=""
              className="bg-gray-800 w-[390px] mt-2 rounded-lg px-9 py-2  text-white placeholder:text-gray-300 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Car Owner</option>
              <option value="">Customer</option>
            </select>
          </div>
          <button className="btn btn-info text-2xl w-[390px] font-black text-blue-700 uppercase tracking-wider mt-4">
            <BiRegistered /> Signup
          </button>
          <p>
            Already have an account?{" "}
            <Link to="/" className="text-blue-600 underline">
              Sign in here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
