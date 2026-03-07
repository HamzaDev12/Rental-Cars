import { BiLocationPlus } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { PiPhone } from "react-icons/pi";
import logo from "./../assets/Logo.png";

const Footer = () => {
  return (
    <div>
      <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
        <aside>
          <img src={logo} alt="" className="w-40" />
          <p>
            <span className="text-3xl text-blue-400 uppercase font-bold">
              Hargeisa Drive
            </span>
            <br />
            <span className="mt-3 text-lg md:text-xl font-medium text-gray-300 tracking-wide">
              Join us — your next car is waiting.
            </span>{" "}
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Economy Cars</a>
          <a className="link link-hover">Luxury Vehicles</a>
          <a className="link link-hover">SUVs & Tracks</a>
          <a className="link link-hover">Elevtric Cars</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">Home</a>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Our Cars</a>
        </nav>
        <nav>
          <h6 className="footer-title">Contact Us</h6>
          <a className="link link-hover flex items-center gap-x-2">
            <PiPhone /> +252 63 4872878
          </a>
          <a className="link link-hover flex items-center gap-x-2">
            <MdEmail /> info@outlook.com
          </a>
          <a className="link link-hover flex items-center gap-x-2">
            <BiLocationPlus /> Hargeisa, Somaliland
          </a>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
