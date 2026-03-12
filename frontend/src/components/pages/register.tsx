import { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BiLock, BiPhone, BiRegistered, BiUserCircle } from "react-icons/bi";
import { ImImage } from "react-icons/im";
import { MdCarRental, MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import logo from "./../../assets/Logo.png";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import Spinner from "../Spinner";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import type { ICreateUserPayload } from "../../types/user.types";
import { createUserFn } from "../../store/auth/createUser";
import * as yup from "yup";

const RegisterForm = () => {
  const createState = useSelector((state: RootState) => state.createUser);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showCofirm, setShowCofirm] = useState(false);
  const toastId = "loading...";

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirm: "",
      role: "",
      image: "",
      phone: "",
    },
    onSubmit(values) {
      const data: ICreateUserPayload = {
        email: values.email,
        confirm: values.confirm,
        name: values.name,
        password: values.password,
        role: values.role,
        image: values.image,
        phone: values.phone,
      };
      toast.loading("Loding...", { id: toastId });
      dispatch(createUserFn(data));
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

      name: yup
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name is too long")
        .required("Full name is required"),

      role: yup
        .string()
        .oneOf(["ADMIN", "CUSTOMER"], "Role must be ADMIN or CUSTOMER")
        .required("Role is required"),

      phone: yup
        .string()
        .required("Phone number is required")
        .matches(
          /^\+252\s63\s\d{7}$/,
          "Phone must follow this format: +252 63 XXXXXXX",
        ),
    }),
  });

  useEffect(() => {
    if (createState.error) {
      toast.error(createState.error, { id: toastId });
    }

    if (createState?.data?.data) {
      toast.success(createState?.data?.message, { id: toastId });

      localStorage.setItem("email", createState?.data?.data?.email);

      navigate("/otp");
    }
  }, [createState?.data, createState?.error, navigate]);

  if (createState?.loading) return <Spinner />;

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
        <form action="" className="mt-4" onSubmit={formik.handleSubmit}>
          <div className="flex gap-x-1.5">
            <div className="">
              <label htmlFor="" className="text-md font-bold">
                Name <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <BiUserCircle className="text-gray-300 font-bold text-2xl absolute top-4 left-2" />
                <input
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter Your Name"
                  className="bg-gray-800 w-48 mt-2 rounded-lg px-9 py-2  text-white placeholder:text-gray-300 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <p className="text-sm text-red-400">
                {formik.touched.name && formik.errors.name}
              </p>
            </div>
            <div className="">
              <label htmlFor="" className="text-md font-bold">
                Email <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <MdEmail className="text-gray-300 font-bold text-2xl absolute top-4 left-2" />
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter Your Email"
                  className="bg-gray-800 w-48 mt-2 rounded-lg px-9 py-2  text-white placeholder:text-gray-300 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <p className="text-sm text-red-400">
                {formik.touched.email && formik.errors.email}
              </p>
            </div>
          </div>

          <label htmlFor="" className="text-md font-bold">
            Phone <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <BiPhone className="text-gray-300 font-bold text-2xl absolute top-4 left-2" />

            <input
              type="text"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your phone"
              className="bg-gray-800 w-[390px] mt-2 rounded-lg px-9 py-2  text-white placeholder:text-gray-300 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <p className="text-sm text-red-400">
            {formik.touched.phone && formik.errors.phone}
          </p>
          <label htmlFor="" className="text-md font-bold">
            Password <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <BiLock className="text-gray-300 font-bold text-2xl absolute top-4 left-2" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
          <p className="text-sm text-red-400">
            {formik.touched.password && formik.errors.password}
          </p>
          <label htmlFor="" className="text-md font-bold">
            Cofirm <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <BiLock className="text-gray-300 font-bold text-2xl absolute top-4 left-2" />

            <input
              type={showCofirm ? "text" : "password"}
              placeholder="Enter your conform password"
              name="confirm"
              value={formik.values.confirm}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
          <p className="text-sm text-red-400">
            {formik.touched.confirm && formik.errors.confirm}
          </p>
          <label htmlFor="" className="text-md font-bold">
            Image <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <ImImage className="text-gray-300 font-bold text-2xl absolute top-4 left-2" />

            <input
              type="file"
              name="image"
              onChange={(event) => {
                const file = event.currentTarget.files?.[0];
                if (file) {
                  formik.setFieldValue("image", file);
                }
              }}
              onBlur={formik.handleBlur}
              className="bg-gray-800 w-[390px] mt-2 rounded-lg px-9 py-2  text-white placeholder:text-gray-300 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <label htmlFor="" className="text-md font-bold">
            Role <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <MdCarRental className="text-gray-300 font-bold text-2xl absolute top-4 left-2" />

            <select
              defaultValue="Choose role"
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id=""
              className="bg-gray-800 w-[390px] mt-2 rounded-lg px-9 py-2  text-white placeholder:text-gray-300 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option disabled={true}>Choose role</option>
              <option value="ADMIN">ADMIN</option>
              <option value="CUSTOMER">CUSTOMER</option>
            </select>
          </div>
          <p className="text-sm text-red-400">
            {formik.touched.role && formik.errors.role}
          </p>
          <button
            disabled={createState?.loading || !formik.isValid}
            className="btn btn-info text-2xl cursor-pointer w-[390px] font-black text-blue-700 uppercase tracking-wider mt-4"
          >
            <BiRegistered /> {createState.loading ? "Signing" : "Signup"}
          </button>
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 underline">
              Sign in here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
