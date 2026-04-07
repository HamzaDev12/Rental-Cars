import { BiMenu } from "react-icons/bi";
import { FaBullhorn } from "react-icons/fa";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

type HeaderProps = {
  onClose: () => void;
};

const Header = ({ onClose }: HeaderProps) => {
  const whoami = useSelector((state: RootState) => state.loginUser);
  const user = whoami?.data?.user;

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="bg-gray-950 px-4 py-3 flex items-center justify-between">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button className="text-white text-2xl lg:hidden" onClick={onClose}>
          <BiMenu />
        </button>

        <div>
          <h1 className="text-white text-lg font-bold">Welcome Back,</h1>
          <p className="text-gray-400 text-sm">
            Here's what's happening with your cars today.
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">
        {/* Notification */}
        <div className="relative text-cyan-400 text-xl cursor-pointer">
          <FaBullhorn />
          <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] px-1 rounded-full">
            3
          </span>
        </div>

        {/* User */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <p className="text-white text-sm">{user?.name || "User"}</p>
            <p className="text-gray-400 text-xs">{user?.email}</p>
          </div>

          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold">
            {initials || user.image}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
