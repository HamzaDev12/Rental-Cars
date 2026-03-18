import { IoCarSport } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { SiBookingdotcom } from "react-icons/si";
import { MdPending } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { BiListCheck } from "react-icons/bi";
import { useEffect } from "react";
import { getCarsFn } from "../../store/cars/getAllCars";
import { getAllBookingsFn } from "../../store/bookings/getAllBookings";

const Dashboard = () => {
  const carState = useSelector((state: RootState) => state.getAllCars);
  const bookings = carState?.data?.cars?.flatMap((car) => car.bookings) || [];
  const latestBookings = useSelector((state: RootState) => state.getAllBooking);
  const dispatch = useDispatch<AppDispatch>();
  const now = new Date();
  const lastMonth = new Date();
  lastMonth.setMonth(now.getMonth() - 1);

  const booking = latestBookings?.data?.booking || [];

  const revenue = booking
    .filter((b) => b.createdAt && new Date(b.createdAt) >= lastMonth)
    .reduce((total, booking) => total + booking.totalPrice, 0);

  const latest = latestBookings.data.booking?.slice(-3);

  console.log(latest);
  const cars = carState?.data?.cars || [];
  const totalCars = cars.length;

  const pending = bookings.filter((b) => b.status === "PENDING");
  const confirmed = bookings.filter((b) => b.status === "CONFIRMED");

  useEffect(() => {
    dispatch(getAllBookingsFn());
    dispatch(getCarsFn());
  }, [dispatch]);
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
      <div className="mt-10 flex gap-x-2.5 flex-wrap ">
        <div className="border border-gray-300 rounded-lg w-96   p-4">
          <h1 className="text-2xl font-bold text-blue-400 tracking-wide">
            Recent Bookings
          </h1>
          <p className="font-medium text-sm tracking-wide text-gray-300">
            Latest customer bookings
          </p>
          <div className="">
            {latest?.map((booking) => (
              <div
                className="flex justify-between border border-gray-600 rounded-2xl mt-3 p-2"
                key={booking.id}
              >
                <div className="flex items-center gap-x-2">
                  <div className="bg-blue-500 p-2 rounded-full ">
                    <BiListCheck className=" text-blue-300 text-2xl " />
                  </div>
                  <h1 className="flex flex-col-reverse">
                    <span>
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </span>
                    <span>{booking.car?.name}</span>
                  </h1>
                </div>
                <div className="flex items-center gap-x-2">
                  <h1 className="text-lg text-blue-300 font-semibold">
                    {"$" + booking.totalPrice}
                  </h1>
                  <span
                    className={`px-2 py-1 rounded-lg  ${
                      booking.status === "PENDING"
                        ? "bg-yellow-400 text-yellow-800"
                        : booking.status === "CONFIRMED"
                          ? "bg-green-500 text-green-800"
                          : booking.status === "CANCELLED"
                            ? "bg-red-500 text-red-800"
                            : booking.status === "COMPLETED"
                              ? "bg-blue-500 text-blue-800"
                              : ""
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="revenue border border-gray-300 rounded-lg p-4">
          <h1 className="text-blue-400 font-bold tracking-wide text-2xl">
            Monthly Revenue
          </h1>
          <p className="text-sm text-gray-300 tracking-wide ">
            Revenue for current month
          </p>
          <h1 className="text-blue-300 tracking-wide font-bold text-xl">
            {"$" + revenue}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
