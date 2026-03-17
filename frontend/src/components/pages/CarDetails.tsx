import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { AppDispatch, RootState } from "../../store/store";
import { BsPeople } from "react-icons/bs";
import { LuFuel } from "react-icons/lu";
import { BiCar } from "react-icons/bi";
import { ImLocation } from "react-icons/im";
import { useEffect, useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { createBookingFn } from "../../store/bookings/createBooking";

const CarDetails = () => {
  const { id } = useParams();
  const carState = useSelector((state: RootState) => state.getAllCars);
  const bookingState = useSelector((state: RootState) => state.createBooking);
  const dispatch = useDispatch<AppDispatch>();
  const toastId = "loading...";

  const [carId, setCardId] = useState<number | null>(null);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const carFilter = carState?.data?.cars?.filter(
    (car) => car.id === Number(id),
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(createBookingFn({ carId, endDate: end, startDate: start }));
  };

  useEffect(() => {
    if (bookingState.error) {
      toast.error(bookingState?.error, { id: toastId });
    } else if (bookingState.data.data) {
      toast.success(bookingState?.data?.message, { id: toastId });
    }
  }, [bookingState]);
  return (
    <div className="container mx-auto px-6">
      {carFilter.map((car) => (
        <div key={car.id} className="mt-12 mb-12">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* LEFT SIDE */}
            <div className="flex-1">
              <img
                src={`http://localhost:3000/uploads/${car.imageUrl}`}
                alt=""
                className="w-full lg:w-[750px] rounded-lg"
              />

              <h1 className="text-blue-400 pb-2 pt-4 uppercase text-2xl font-bold tracking-wide">
                {car.name}
              </h1>

              <p className="text-lg uppercase text-gray-300 tracking-wide">
                {car.model} {car.year}
              </p>

              <hr className="text-gray-300 mt-5" />

              {/* FEATURES */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-gray-800 border border-gray-300 p-4 flex flex-col items-center rounded-lg">
                  <BsPeople />
                  <span className="text-blue-300 font-medium text-sm">
                    {car.seats} seats
                  </span>
                </div>

                <div className="bg-gray-800 border border-gray-300 p-4 flex flex-col items-center rounded-lg">
                  <LuFuel />
                  <span className="text-blue-300 font-medium text-sm">
                    {car.fuelType}
                  </span>
                </div>

                <div className="bg-gray-800 border border-gray-300 p-4 flex flex-col items-center rounded-lg">
                  <BiCar />
                  <span className="text-blue-300 font-medium text-sm">
                    {car.transmission}
                  </span>
                </div>

                <div className="bg-gray-800 border border-gray-300 p-4 flex flex-col items-center rounded-lg">
                  <ImLocation />
                  <span className="text-blue-300 font-medium text-sm">
                    {car.location}
                  </span>
                </div>
              </div>

              <h1 className="text-2xl uppercase text-blue-400 tracking-wide pt-6">
                Description
              </h1>

              <p className="text-gray-300 text-sm tracking-wide pt-1 max-w-3xl">
                {car.description}
              </p>
            </div>

            {/* RIGHT SIDE BOOKING */}
            <div className="w-full lg:w-96">
              <div className="bg-gray-800 rounded-lg border border-gray-300 p-5">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-blue-300 font-bold text-2xl tracking-wide">
                    ${car.pricePerDay}
                  </h1>
                  <h1 className="text-sm text-gray-300 font-serif">per day</h1>
                </div>

                <form>
                  <label className="text-md font-medium">
                    Car ID <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    disabled
                    name="carId"
                    value={car.id}
                    onChange={(e) => setCardId(Number(e.target.value))}
                    className="bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full border border-blue-500 text-white px-3 py-2 rounded-lg mb-3"
                  />

                  <label className="text-md font-medium">
                    Pickup Date <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="date"
                    name="start"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                    className="bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full border border-blue-500 text-white px-3 py-2 rounded-lg mb-3"
                  />

                  <label className="text-md font-medium">
                    Return Date <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="date"
                    name="end"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                    className="bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full border border-blue-500 text-white px-3 py-2 rounded-lg mb-3"
                  />

                  <button
                    onClick={handleSubmit}
                    className="w-full btn btn-info text-white tracking-wide mt-2"
                  >
                    Book Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarDetails;
