import logo from "./../../assets/Logo.png";
import { BiBookAdd, BiCar, BiNotification, BiX } from "react-icons/bi";
import { AiFillDashboard } from "react-icons/ai";
import { FcSettings } from "react-icons/fc";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { IoLogOutOutline } from "react-icons/io5";
import { logout } from "../../store/auth/loginUser";
import toast from "react-hot-toast";
import { BsBack } from "react-icons/bs";

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const whoami = useSelector((state: RootState) => state.loginUser);
  const user = whoami?.data?.user;
  const dispatch = useDispatch<AppDispatch>();

  const toastId = "loading..";

  const handleLogout = () => {
    dispatch(logout());
    toast.success("You logout successfully", { id: toastId });
  };

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const location = useLocation();

  const navItems = [
    { name: "Dashboard", icon: <AiFillDashboard />, path: "/dashboard" },
    { name: "Car", icon: <BiCar />, path: "/car" },
    { name: "Booking", icon: <BiBookAdd />, path: "/booking" },
    { name: "Notifications", icon: <BiNotification />, path: "/notification" },
    { name: "Settings", icon: <FcSettings />, path: "/settings" },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-50 h-screen  w-64 bg-[#0f172a] transform transition-transform duration-300
      ${isOpen ? "translate-x-0" : "-translate-x-full"} 
      lg:translate-x-0`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <img src={logo} className="w-10 h-10 rounded" alt="logo" />
          <h1 className="text-white font-bold text-lg">Hargeisa Drive</h1>
        </div>

        <button
          className="lg:hidden text-white text-2xl"
          onClick={() => setIsOpen(false)}
        >
          <BiX />
        </button>
      </div>

      <nav className="p-4 space-y-2">
        {navItems.map((nav, index) => {
          const active = location.pathname === nav.path;

          return (
            <Link
              key={index}
              to={nav.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 p-3 rounded-lg transition
              ${
                active
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <span className="text-xl">{nav.icon}</span>
              <span className="text-sm font-medium">{nav.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
        <div className="flex items-center gap-3">
          <div className="dropdown dropdown-top">
            <div tabIndex={0} role="button" className="btn m-1 bg-transparent">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold">
                {initials || "U"}
              </div>
            </div>
            <ul
              tabIndex={-1}
              className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow-sm"
            >
              <div className="flex items-center">
                <li>
                  <div className="w-10 h-10 flex items-center justify-center rounded-full lbg-blue-600 text-white font-bold bg-blue-600">
                    {initials || "U"}
                  </div>
                </li>
                <li>
                  <div className="text-left flex flex-col items-center">
                    <p className="text-white text-sm">{user?.name || "User"}</p>
                    <p className="text-gray-400 text-xs">{user?.email}</p>
                  </div>
                </li>
              </div>
              <li className="pb-2">
                <Link
                  to="/"
                  className="btn btn-soft btn-info flex items-center gap-2"
                >
                  <BsBack />
                  Back
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="btn btn-soft btn-info flex items-center gap-2"
                >
                  <IoLogOutOutline />
                  Logout
                </button>
              </li>
            </ul>
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-white text-sm">{user?.name || "User"}</p>
            <p className="text-gray-400 text-xs">{user?.email}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
