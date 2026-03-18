import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { BiCalendar, BiSearch } from "react-icons/bi";
import { ImLocation } from "react-icons/im";
import Spinner from "../Spinner";
import { getMyBookingsFn } from "../../store/bookings/getMyBooking";

const Booking = () => {
  const bookingState = useSelector((state: RootState) => state.myBookings);
  const dispatch = useDispatch<AppDispatch>();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 9;
  useEffect(() => {
    dispatch(getMyBookingsFn());
  }, [dispatch]);

  const start = (page - 1) * limit;
  const end = start + limit;

  // Loading
  if (bookingState.loading) return <Spinner />;

  // Empty state
  const bookings = bookingState?.data?.bookings || [];
  if (bookings.length === 0)
    return (
      <div className="text-center mt-10 text-gray-300">No bookings found.</div>
    );

  // Filter bookings based on search
  const filteringBooking = bookings.filter((booking) => {
    const column =
      `${booking?.car?.name ?? ""} ${booking?.car?.model ?? ""}`.trim();
    return column.toLowerCase().includes(search.toLowerCase());
  });

  const totalPages = Math.ceil(filteringBooking.length / limit);

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-between mt-10 items-center max-w-7xl mx-auto">
        <div>
          <h1 className="text-2xl tracking-wide font-bold text-blue-400">
            My Bookings
          </h1>
          <p className="text-sm text-gray-200">
            View and manage all your car bookings
          </p>
        </div>
        <div className="relative">
          <BiSearch className="text-3xl text-blue-500 absolute z-10 top-2 left-2" />
          <input
            type="text"
            name="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search car by name or model"
            className="bg-gray-700 px-10 py-3 border text-white focus:outline-none focus:ring-2 focus:ring-blue-400 border-blue-500 rounded-lg md:rounded-l-lg w-full"
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteringBooking.slice(start, end).map((booking, index) => (
          <div
            key={booking.id}
            className="bg-gray-800 p-4 rounded-lg shadow-md"
          >
            <img
              src={`http://localhost:3000/uploads/${booking?.car?.imageUrl}`}
              alt={booking.car.name}
              className="w-full h-40 object-cover rounded-lg mb-2"
            />
            <h1 className="text-xl font-bold text-blue-400">
              {booking.car.name}
            </h1>
            <p className="text-sm text-gray-300 mb-2">
              {booking.car.year}.{booking.car.model}.{booking.car.location}
            </p>

            <p className="mb-2">
              <span>{"Booking #" + (index + 1)}</span>{" "}
              <span
                className={`px-2 py-1 rounded ${
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
            </p>

            <div className="flex items-center mb-2">
              <BiCalendar className="mr-1" />
              <div>
                <p className="text-gray-300 text-sm">Rental Period</p>
                <p className="font-bold text-sm">
                  {new Date(booking.startDate).toLocaleDateString()} to{" "}
                  {new Date(booking.endDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center mb-2">
              <ImLocation className="mr-1" />
              <div>
                <p className="text-gray-300 text-sm">Pick-up Location</p>
                <p className="font-bold text-sm">{booking.car.location}</p>
              </div>
            </div>

            <div>
              <p className="text-gray-200 text-sm">Total Price</p>
              <p className="text-blue-500 font-bold text-lg">
                ${booking.totalPrice}
              </p>
              <p className="text-gray-200 text-sm">
                Booked on {new Date(booking.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-10">
          <div className="join">
            {page > 1 && (
              <button
                className="join-item btn"
                onClick={() => setPage(page - 1)}
              >
                «
              </button>
            )}

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`join-item btn ${page === i + 1 ? "btn-active" : ""}`}
              >
                {i + 1}
              </button>
            ))}

            {page < totalPages && (
              <button
                className="join-item btn"
                onClick={() => setPage(page + 1)}
              >
                »
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
