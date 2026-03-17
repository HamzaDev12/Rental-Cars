import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";

const MainPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gray-800 min-h-screen text-white">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Content */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        {/* Header */}
        <Header onClose={() => setIsOpen(true)} />

        {/* Page */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainPage;
