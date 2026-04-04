import { BiLock, BiUser } from "react-icons/bi";
import logo from "./../../assets/Logo.png";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import toast from "react-hot-toast";
import type { IForgetPassword } from "../../types/user.types";
import { forgetPasswordFn } from "../../store/auth/forgetPassword";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Forget = () => {
  const forgetState = useSelector((state: RootState) => state.forgetPassword);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const toastId = "loading...";

  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirm: "",
    },
    onSubmit(values) {
      const data: IForgetPassword = {
        confirm: values.confirm,
        email: values.email,
        password: values.password,
      };
      toast.loading("loading...", { id: toastId });
      dispatch(forgetPasswordFn(data));
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .trim()
        .email("Please enter a valid email address")
        .required("Email is required"),

      password: yup
        .string()
        .trim()
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .required("Password is required"),

      confirm: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Please confirm your password"),
    }),
  });

  useEffect(() => {
    if (forgetState.error) {
      toast.error(forgetState?.error, { id: toastId });
    }
    if (forgetState.data) {
      toast.success(forgetState?.data?.message, { id: toastId });
      navigate("/login");
    }
  }, [forgetState, navigate]);

  useEffect(() => {
    if (!forgetState?.data?.message) {
      navigate("/login");
    }
  }, [navigate, forgetState]);

  return (
    <div className="min-h-screen min-w-full flex justify-center items-center flex-col bg-gray-800 text-white">
      <div className="bg-gray-950 border rounded-lg shadow-[rgba(0,0,0,0.02)_0px_1px_3px_0px,rgba(27,31,35,0.15)_0px_0px_0px_1px] p-8 mt-5 w-[450px]">
        <div className="flex items-center gap-x-2">
          <div className="w-20 bg-gray-700 border border-gray-300 rounded-lg">
            <img src={logo} alt="" className="w-full" />
          </div>
          <div className="">
            <h1 className="text-2xl font-extrabold tracking-wide text-blue-500 uppercase ">
              Hargeisa Drive
            </h1>
            <p className=" text-sm md:text-xl text-gray-300 tracking-wide">
              Welcome back — drive your dream car today.
            </p>
          </div>
          <form action="" className="mt-4" onSubmit={formik.handleSubmit}>
            <label htmlFor="" className="text-md font-bold">
              Email <span className="text-red-400">*</span>
            </label>{" "}
            <div className="relative pt-4">
              <BiUser className="text-gray-300 font-bold text-2xl  absolute top-6 left-2" />
              <input
                type="email"
                placeholder="Enter Your Email"
                value={formik.values.email}
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className="bg-gray-800 placeholder:text-gray-400 w-[390px] text-white border border-gray-300 rounded-lg px-9 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <p className="text-sm text-red-400">
              {formik.touched.email && formik.errors.email}
            </p>
            <label htmlFor="" className="text-md font-bold mt-4">
              Passowrd <span className="text-red-400">*</span>
            </label>{" "}
            <div className="relative pt-4">
              <BiLock className="text-gray-300 font-bold text-2xl  absolute top-6 left-2" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Your password"
                name="password"
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className="bg-gray-800 placeholder:text-gray-400 w-[390px] text-white border border-gray-300 rounded-lg px-9 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute bottom-2 left-[348px] cursor-pointer"
              >
                {showPassword ? (
                  <AiFillEyeInvisible className="text-gery-300 font-bold text-2xl" />
                ) : (
                  <AiFillEye className="text-gery-300 font-bold text-2xl" />
                )}
              </span>
            </div>
            <p className="text-sm text-red-400">
              {formik.touched.password && formik.errors.password}
            </p>
            <label htmlFor="" className="text-md font-bold mt-4">
              Passowrd <span className="text-red-400">*</span>
            </label>{" "}
            <div className="relative pt-4">
              <BiLock className="text-gray-300 font-bold text-2xl  absolute top-6 left-2" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Your confirm password"
                name="confirm"
                value={formik.values.confirm}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className="bg-gray-800 placeholder:text-gray-400 w-[390px] text-white border border-gray-300 rounded-lg px-9 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                onClick={() => setConfirmPassword((prev) => !prev)}
                className="absolute bottom-2 left-[348px] cursor-pointer"
              >
                {confirmPassword ? (
                  <AiFillEyeInvisible className="text-gery-300 font-bold text-2xl" />
                ) : (
                  <AiFillEye className="text-gery-300 font-bold text-2xl" />
                )}
              </span>
            </div>
            <p className="text-sm text-red-400">
              {formik.touched.confirm && formik.errors.confirm}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forget;
