import { useEffect, useState } from "react";
import { BiLock, BiUser } from "react-icons/bi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { LuLogIn } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import logo from "./../../assets/Logo.png";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import Spinner from "../Spinner";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as yup from "yup";
import { loginUserFn } from "../../store/auth/loginUser";

const LoginForm = () => {
  const loginSate = useSelector((state: RootState) => state.loginUser);
  const dispatch = useDispatch<AppDispatch>();
  const toastId = "loading...";
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (loginSate.error) {
      toast.error(loginSate?.error, { id: toastId });
    } else if (loginSate.data.user) {
      toast.success(loginSate?.data?.message, { id: toastId });
      localStorage.setItem("user", JSON.stringify(loginSate.data));
    }
  }, [loginSate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit(value) {
      const data = {
        email: value.email,
        password: value.password,
      };
      toast.loading("loading....", { id: toastId });
      dispatch(loginUserFn(data));
    },
    validationSchema: yup.object({
      email: yup.string().email().required("Enter your email"),
      password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .required("Enter your password"),
    }),
  });

  useEffect(() => {
    if (loginSate?.data?.user) {
      navigate("/");
    }
  }, [navigate, loginSate]);

  if (loginSate?.loading) return <Spinner />;

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
        </div>
        <form action="" className="mt-4" onSubmit={formik.handleSubmit}>
          {loginSate.error && (
            <p className="text-center bg-[#FEBBBD] w-[325px] m-auto p-1 text-black rounded-md flex justify-center items-center">
              {loginSate.error && loginSate.error}
            </p>
          )}{" "}
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
          <div className="flex justify-between pt-3 items-center">
            <div className="">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-blue-500 rounded focus:ring-2 focus:ring-blue-400"
                />
                <span className="text-sm font-medium text-gray-300">
                  Remember Me
                </span>
              </label>
            </div>
            <span className="text-sm underline text-white cursor-pointer tracking-wide">
              forget password
            </span>
          </div>
          <button
            disabled={loginSate.loading || !formik.isValid}
            className="btn btn-info text-2xl w-[390px] font-black text-blue-700 uppercase tracking-wider mt-4"
          >
            <LuLogIn /> {loginSate.loading ? "Login..." : "Login"}
          </button>
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 underline">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
