import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import { whoamiFn } from "../store/auth/whoami";
import { Link } from "react-router-dom";
import { logout } from "../store/auth/loginUser";
import toast from "react-hot-toast";
import { IoLogOutOutline } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import { BiBell } from "react-icons/bi";

const Profile = () => {
  const userState = useSelector((state: RootState) => state.loginUser);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("You logout successfully");
  };

  useEffect(() => {
    dispatch(whoamiFn());
  }, [dispatch]);

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn m-1 w-14 h-14 rounded-full bg-blue-800 flex items-center justify-center text-white font-bold text-3xl"
      >
        {userState?.data?.user?.image ? (
          <img
            src={`http://localhost:3000/uploads/${userState.data.user.image}`}
            alt="profile"
            className="w-full h-full rounded-full"
          />
        ) : (
          userState?.data?.user?.name?.charAt(0)
        )}
      </div>

      <ul
        tabIndex={-1}
        className="dropdown-content menu bg-base-100 rounded-box z-1 w-72 p-2 shadow-sm"
      >
        <li>
          <div className="flex gap-x-1.5">
            <div className="btn m-1 w-14 h-14 rounded-full bg-blue-800 flex items-center justify-center text-white font-bold text-3xl">
              {userState?.data?.user?.image ? (
                <img
                  src={`http://localhost:3000/uploads/${userState.data.user.image}`}
                  alt="profile"
                  className="w-full h-full rounded-full"
                />
              ) : (
                userState?.data?.user?.name?.charAt(0)
              )}
            </div>
            <div className="">
              <h1 className="text-blue-300 tracking-wide text-sm">
                {userState?.data?.user?.name}
              </h1>
              <p className="text-gray-300 tracking-wide text-sm">
                {userState?.data?.user?.email}
              </p>
            </div>
          </div>
        </li>
        <li>
          <Link
            to="/profile"
            className="text-blue-400 tracking-wide text-lg uppercase items-center flex"
          >
            <ImProfile /> My Profile
          </Link>
          <Link
            to="/profile"
            className="text-blue-400 tracking-wide text-lg uppercase items-center flex"
          >
            <BiBell /> notifications
          </Link>
        </li>

        <li>
          <button onClick={handleLogout} className="btn btn-soft btn-info">
            <IoLogOutOutline />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Profile;
