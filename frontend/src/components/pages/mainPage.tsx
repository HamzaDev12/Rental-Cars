import { Outlet } from "react-router-dom";
import Sidebar from "./sideBar";

const MainPage = () => {
  return (
    <div className=" relative min-h-screen bg-gray-800">
      {/* Sidebar */}
      <Sidebar />

      {/* Content area */}
      <div className="flex-1 z-0 absolute top-5 left-72  mt-20">
        <Outlet />
      </div>
    </div>
  );
};

export default MainPage;
