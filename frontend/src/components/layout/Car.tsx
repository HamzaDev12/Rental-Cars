import { BiCar, BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { getCarsFn } from "../../store/cars/getAllCars";
import { FcAddRow } from "react-icons/fc";

const Car = () => {
  const CarState = useSelector((state: RootState) => state.getAllCars);
  const dispatch = useDispatch<AppDispatch>();

  const toastId = "loading....";

  useEffect(() => {
    if (CarState.error) {
      toast.error(CarState?.error, { id: toastId });
    }
    if (CarState.data.cars) {
      toast.success("Your Cars Fetched successfully", { id: toastId });
    }
  }, [CarState]);

  useEffect(() => {
    dispatch(getCarsFn());
  }, [dispatch]);

  return (
    <div className="p-4 space-y-10">
      {/* Header */}
      <div className="border border-blue-400 rounded-lg shadow bg-gray-900 flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-300 w-14 h-14 flex items-center justify-center rounded-lg">
            <BiCar className="text-4xl text-blue-800 font-bold" />
          </div>
          <p className="tracking-wide text-2xl font-bold text-blue-400 uppercase">
            Manage Cars
          </p>
        </div>

        <div className="flex items-center gap-x-1.5">
          <div className="relative w-full md:w-80">
            <BiSearch className="text-3xl text-blue-500 absolute z-10 top-1/2 left-3 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, model and year"
              className="bg-gray-700 px-12 py-3 border text-white focus:outline-none focus:ring-2 focus:ring-blue-400 border-blue-500 rounded-lg w-full"
            />
          </div>
          <div className="">
            <button className="btn btn-soft btn-info py-4">
              <FcAddRow /> Create Car
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-base-content/5 bg-gray-900 shadow">
        <table className="min-w-full table-auto">
          <thead className="text-blue-500 bg-gray-900">
            <tr>
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Model</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Seats</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Fuel Type</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {CarState.data.cars?.slice(0, 10).map((car) => (
              <tr key={car.id} className="border-b border-gray-700 ">
                <td className="px-4 py-2">
                  {car.imageUrl ? (
                    <img
                      className="w-16 h-16 object-cover rounded-full border border-blue-500"
                      src={`http://localhost:3000/uploads/${car.imageUrl}`}
                      alt={car.name}
                    />
                  ) : (
                    <div className="w-16 h-16 bg-blue-600 flex items-center justify-center text-white font-bold rounded-lg">
                      {car.name?.charAt(0).toUpperCase() || "N/A"}
                    </div>
                  )}
                </td>
                <td className="px-4 py-2">{car.name}</td>
                <td className="px-4 py-2">{car.model}</td>
                <td className="px-4 py-2">{car.pricePerDay}</td>
                <td className="px-4 py-2">{car.seats}</td>
                <td className="px-4 py-2">{car.location}</td>
                <td className="px-4 py-2">{car.fuelType}</td>
                <td className="px-4 py-2">
                  {/* Actions like edit/delete can go here */}
                  <button className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-500 text-white">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Car;
