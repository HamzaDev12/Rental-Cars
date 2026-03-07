import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Router = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <header className="sticky top-0 left-0 w-full z-50">
        <Header />
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Router;
