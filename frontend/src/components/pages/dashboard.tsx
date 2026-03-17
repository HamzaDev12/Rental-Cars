import { IoCarSport } from "react-icons/io5";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { SiBookingdotcom } from "react-icons/si";
import { MdPending } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";

const Dashboard = () => {
  const carState = useSelector((state: RootState) => state.getAllCars);
  const bookings = carState?.data?.cars?.flatMap((car) => car.bookings) || [];

  const cars = carState?.data?.cars || [];
  const totalCars = cars.length;

  const pending = bookings.filter((b) => b.status === "PENDING");
  const confirmed = bookings.filter((b) => b.status === "CONFIRMED");
  return (
    <div>
      <div className="flex flex-wrap gap-4 justify-center md:justify-between ">
        <div className="flex border border-gray-300 rounded-lg items-center w-56 p-1 justify-around h-28">
          <div className="">
            <h1 className="text-md font-bold text-blue-400 tracking-wide">
              Total Cars
            </h1>
            <p className="text-gray-400 tracking-wide text-sm font-medium">
              {totalCars}
            </p>
          </div>
          <div className="icon rounded-full w-10 h-10 p-2 bg-blue-700 flex items-center justify-center">
            <IoCarSport className="text-blue-300 text-lg " />
          </div>
        </div>
        <div className="flex border border-gray-300 rounded-lg items-center w-56 p-1 justify-around h-28">
          <div className="">
            <h1 className="text-md font-bold text-blue-400 tracking-wide">
              Total Bookings
            </h1>
            <p className="text-gray-400 tracking-wide text-sm font-medium">
              {bookings?.length}
            </p>
          </div>
          <div className="icon rounded-full w-10 h-10 p-2 bg-blue-700 flex items-center justify-center">
            <SiBookingdotcom className="text-blue-300 text-lg " />
          </div>
        </div>
        <div className="flex border border-gray-300 rounded-lg items-center w-56 p-1 justify-around h-28">
          <div className="">
            <h1 className="text-md font-bold text-blue-400 tracking-wide">
              Pending
            </h1>
            <p className="text-gray-400 tracking-wide text-sm font-medium">
              {pending.length}
            </p>
          </div>
          <div className="icon rounded-full w-10 h-10 p-2 bg-blue-700 flex items-center justify-center">
            <MdPending className="text-blue-300 text-lg " />
          </div>
        </div>
        <div className="flex border border-gray-300 rounded-lg items-center w-56 p-1 justify-around h-28">
          <div className="">
            <h1 className="text-md font-bold text-blue-400 tracking-wide">
              Confirm
            </h1>
            <p className="text-gray-400 tracking-wide text-sm font-medium">
              {confirmed.length}
            </p>
          </div>
          <div className="icon rounded-full w-10 h-10 p-2 bg-blue-700 flex items-center justify-center">
            <GiConfirmed className="text-blue-300 text-lg " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
