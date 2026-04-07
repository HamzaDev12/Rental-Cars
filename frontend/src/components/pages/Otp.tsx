import React, { useEffect, useState, type FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import toast from "react-hot-toast";
import { verificationCodeFn } from "../../store/auth/verification";
import { sendOTPCodeFn } from "../../store/auth/re-sendOtp";
import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import Spinner from "../Spinner";

const Otp: React.FC = () => {
  const verifyState = useSelector((state: RootState) => state.verifyCode);
  const sendOtpState = useSelector((state: RootState) => state.sendCode);
  const createState = useSelector((state: RootState) => state.createUser);

  const email = createState?.data?.data?.email;
  // const location = useLocation();
  // const email = location.state?.email;

  const dispatch = useDispatch<AppDispatch>();

  const [timeLeft, setTimeLeft] = useState(600);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const toastId = "loading....";
  const navigate = useNavigate();

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  const handleVerification = (e: FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    dispatch(verificationCodeFn({ code, email }));
  };

  const handleGenerate = (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      sendOTPCodeFn({
        email,
      }),
    );
  };

  useEffect(() => {
    if (verifyState.error) {
      toast.error(verifyState?.error, { id: toastId });
    }
    if (verifyState.data.message) {
      toast.success(verifyState?.data?.message, { id: toastId });
      navigate("/login");
    }
  }, [verifyState, navigate]);

  useEffect(() => {
    if (sendOtpState.error) {
      toast.error(sendOtpState?.error, { id: toastId });
    }
    if (sendOtpState.data.message) {
      toast.success(sendOtpState?.data?.message, { id: toastId });
    }
  }, [sendOtpState]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (verifyState.loading) return <Spinner />;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-900 px-4">
      <div className="w-110  bg-gray-950 border border-gray-300 rounded-2xl p-8 shadow-xl">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-white">
            OTP Verification
          </h1>
          <p className="text-sm text-gray-400">
            Enter the 6-digit code sent to your email
          </p>
        </div>

        <div className="flex justify-between mt-8 gap-3">
          {[...Array(6)].map((_, i) => (
            <input
              key={i}
              type="text"
              name="otp"
              value={otp[i]}
              onChange={(e) => {
                const newOtp = [...otp];
                newOtp[i] = e.target.value;
                setOtp(newOtp);
              }}
              maxLength={1}
              className="w-14 h-14 rounded-lg bg-gray-900 border border-gray-700 text-white text-center text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        <div className="flex justify-between mt-6 text-sm">
          <span className="text-gray-400">Code expires in</span>
          <span className="text-red-400 font-medium">{formattedTime}</span>
        </div>

        <button
          onClick={handleVerification}
          className="w-full mt-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white font-medium"
        >
          Verify Code
        </button>

        <p className="text-center text-gray-400 text-sm mt-6">
          Didn’t receive the code?{" "}
          <span
            onClick={handleGenerate}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Resend
          </span>
        </p>
      </div>
    </div>
  );
};

export default Otp;
