import { LuLogIn } from "react-icons/lu";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="">Home</Link>
              </li>
              <li>
                <Link to="">Cars</Link>
              </li>

              <li>
                <Link to="">MyBookings</Link>
              </li>
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-blue-400  text-xl">
            Hargeisa Drive
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="">Home</Link>
            </li>
            <li>
              <Link to="">Cars</Link>
            </li>
            <li>
              <Link to="">MyBookings</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end gap-x-2">
          <Link to="/login" className="btn btn-soft btn-info">
            <LuLogIn />
            Login
          </Link>
          <Link to="/register" className="btn btn-soft btn-accent">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
