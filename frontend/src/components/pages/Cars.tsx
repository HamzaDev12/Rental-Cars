import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useState } from "react";
import { BsFuelPump, BsPeople } from "react-icons/bs";
import { PiTrainSimpleLight } from "react-icons/pi";
import { BiLocationPlus, BiSearch } from "react-icons/bi";

const Cars = () => {
  const carState = useSelector((state: RootState) => state.getAllCars);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const limit = 9;

  const filterCars = carState?.data?.cars.filter((car) => {
    const colunm = `${car.name} ${car.model}`.toLowerCase();
    return colunm.toLowerCase().includes(search.toLowerCase());
  });

  const totalPages = Math.ceil((filterCars?.length || 0) / limit);

  const start = (page - 1) * limit;
  const end = start + limit;

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="relative max-w-3xl mx-auto mt-10">
        <BiSearch className="text-3xl text-blue-500 absolute z-10 top-2 left-2" />
        <input
          type="text"
          name="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search car by name, and model "
          className="bg-gray-700 px-10 py-3 border text-white focus:outline-none focus:ring-2 focus:ring-blue-400 border-blue-500 rounded-lg md:rounded-l-lg w-full"
        />
      </div>

      <section className="pt-3 pb-16 w-full">
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterCars?.slice(start, end).map((car) => (
            <div
              key={car.id}
              className="bg-gray-800 border-2 border-gray-200 rounded-lg p-4"
            >
              <div className="relative">
                <h1
                  className={`${car.isAvailable ? "bg-green-500 text-white" : "bg-blue-400 text-gray-900"} absolute top-2 left-2 rounded-full w-24 text-center p-1`}
                >
                  {car.isAvailable ? "Available" : "Taken"}
                </h1>

                <img
                  src={`http://localhost:3000/uploads/${car?.imageUrl}`}
                  alt={car.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>

              <div>
                <h1 className="text-lg font-bold tracking-wide">
                  {car.name} {car.model}
                </h1>

                <p className="text-sm font-medium">{car.year}</p>

                <p className="text-lg font-medium tracking-wide pt-4 flex items-center gap-x-1.5">
                  <BiLocationPlus className="text-blue-300" />
                  {car.location}
                </p>

                <div className="flex gap-x-4 pt-2 flex-wrap">
                  <h1 className="text-md font-medium flex items-center gap-x-1.5">
                    <BsPeople className="text-blue-300" />
                    {car.seats + " seats"}
                  </h1>

                  <h1 className="text-md font-medium flex items-center gap-x-1.5">
                    <PiTrainSimpleLight className="text-blue-300" />
                    {car.transmission}
                  </h1>

                  <h1 className="text-md font-medium flex items-center gap-x-1.5">
                    <BsFuelPump className="text-blue-300" />
                    {car.fuelType}
                  </h1>
                </div>

                <h1 className="text-lg font-bold text-blue-400 pt-3">
                  {"$" + car.pricePerDay}
                  <span className="text-gray-300 text-sm font-medium">
                    /day
                  </span>
                </h1>
              </div>

              <div className="pt-4 flex justify-between flex-wrap gap-2">
                <button className="btn btn-outline btn-info px-10">
                  View Detials
                </button>

                <button className="btn btn-info px-14">Book Now</button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
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
                className={`join-item btn ${
                  page === i + 1 ? "btn-active" : ""
                }`}
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
      </section>
    </div>
  );
};

export default Cars;
