import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import { whoamiFn } from "../store/auth/whoami";
import { Link } from "react-router-dom";
import { logout } from "../store/auth/loginUser";
import toast from "react-hot-toast";
import { IoLogOutOutline } from "react-icons/io5";

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
    <div className="dropdown">
      <div
        tabIndex={0}
        role="button"
        className="btn m-1 w-14 h-14 rounded-full bg-blue-800 flex items-center justify-center text-white font-bold text-3xl"
      >
        {userState?.data?.user?.image ? (
          <img
            src={userState.data.user.image}
            alt="profile"
            className="w-full h-full rounded-full"
          />
        ) : (
          userState?.data?.user?.name?.charAt(0)
        )}
      </div>

      <ul
        tabIndex={-1}
        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
      >
        <li>
          <Link to="/profile">My Profile</Link>
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
