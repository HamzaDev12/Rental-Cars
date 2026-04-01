import { BiCar, BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { useEffect, useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { getCarsFn } from "../../store/cars/getAllCars";
import { FcAddRow } from "react-icons/fc";
import { PiPencil } from "react-icons/pi";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { LuDelete } from "react-icons/lu";
import { createCarsFn } from "../../store/cars/createCar";
import type { ICreateCarIU } from "../../types/car.types";
import { updateCarsFn } from "../../store/cars/updateCar";
import { MdDelete } from "react-icons/md";
import { deleteCarsFn } from "../../store/cars/deleteCar";

const Car = () => {
  const CarState = useSelector((state: RootState) => state.getAllCars);
  const createCarState = useSelector((state: RootState) => state.createCar);
  const updateCarState = useSelector((state: RootState) => state.updateCar);
  const deleteCarState = useSelector((state: RootState) => state.deleteCar);

  const dispatch = useDispatch<AppDispatch>();
  const toastId = "loading....";

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [name, SetName] = useState("");
  const [model, SetModel] = useState("");
  const [transmission, SetTransmission] = useState("");
  const [description, SetDescription] = useState("");
  const [location, SetLocation] = useState("");
  const [fuelType, SetFuelType] = useState("");
  const [year, SetYear] = useState<number | "">("");
  const [mileage, SetMilage] = useState<number | "">("");
  const [price, SetPrice] = useState<number | "">("");
  const [seats, SetSeats] = useState<number | "">("");
  const [image, setImage] = useState<File | string>("");
  const [id, setId] = useState<number | null>(null);
  const [show, setShow] = useState(false);

  const filtering = CarState.data.cars?.filter((car) => {
    const column = `${car.name} ${car.model} `;
    return column.toLowerCase().includes(search.toLowerCase());
  });

  const limit = 10;
  const totalPages = Math.ceil((filtering?.length || 0) / limit);
  const start = (page - 1) * limit;
  const end = start + limit;

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("model", model);
    formData.append("transmission", transmission);
    formData.append("location", location);
    formData.append("fuelType", fuelType);
    formData.append("description", description);
    formData.append("pricePerDay", String(price));
    formData.append("seats", String(seats));
    formData.append("year", String(year));
    formData.append("mileage", String(mileage));

    if (image instanceof File) {
      formData.append("image", image);
    }

    dispatch(createCarsFn(formData));
  };

  const handleUpdate = (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("model", model);
    formData.append("transmission", transmission);
    formData.append("location", location);
    formData.append("fuelType", fuelType);
    formData.append("description", description);
    formData.append("pricePerDay", String(price));
    formData.append("seats", String(seats));
    formData.append("year", String(year));
    formData.append("mileage", String(mileage));

    if (image instanceof File) {
      formData.append("image", image);
    }

    dispatch(updateCarsFn({ formData, id }));
  };

  const handleEdit = (data: ICreateCarIU) => {
    SetDescription(data.description);
    SetFuelType(data.fuelType);
    SetMilage(Number(data.mileage));
    SetLocation(data.location);
    SetModel(data.model);
    SetPrice(Number(data.pricePerDay));
    SetName(data.name);
    SetSeats(Number(data.seats));
    SetTransmission(data.transmission);
    SetYear(Number(data.year));
    setId(data.id);
  };

  const handlDelete = () => {
    if (!id) {
      toast.error("please select id you want to delete");
      return;
    }

    dispatch(deleteCarsFn({ id }));
    if (deleteCarState?.data?.message) {
      setShow(false);
      setId(null);
      return;
    }
  };

  useEffect(() => {
    if (createCarState.error) {
      toast.error(createCarState?.error, { id: toastId });
    }
    if (createCarState.data.data) {
      toast.success(createCarState?.data?.message, { id: toastId });
      dispatch(getCarsFn());
    }
  }, [createCarState, dispatch]);

  useEffect(() => {
    if (updateCarState.error) {
      toast.error(updateCarState?.error, { id: toastId });
    }
    if (updateCarState.data.data) {
      toast.success(updateCarState?.data?.message, { id: toastId });
      dispatch(getCarsFn());
    }
  }, [updateCarState, dispatch]);

  useEffect(() => {
    if (deleteCarState.error) {
      toast.error(deleteCarState?.error, { id: toastId });
    }
    if (deleteCarState.data.data) {
      toast.success(deleteCarState?.data?.message, { id: toastId });
      dispatch(getCarsFn());
    }
  }, [deleteCarState, dispatch]);

  return (
    <div className="p-4 space-y-10">
      {show && (
        <div className="inset-0 fixed flex justify-center items-center shadow-lg bg-black/30 ">
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-lg text-blue-400 flex gap-x-1.5 tracking-wide items-center">
              <MdDelete /> Delete Car?
            </p>
            <p className="text-sm font-medium text-gray-300  tracking-wide">
              This will delete permenantly, do you want click delete{" "}
            </p>
            <div className="flex justify-end gap-x-1.5 mt-2.5 ">
              <button
                className="bg-gray-600 cursor-pointer rounded-full border border-gray-200 px-3 py-2 tracking-wide"
                onClick={() => setShow(false)}
              >
                Cencal
              </button>
              <button
                className="bg-red-600 cursor-pointer rounded-full border-2 border-gray-200 px-3 py-2 tracking-wide"
                onClick={handlDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold flex items-center gap-x-1.5 text-blue-500">
            <BiCar />
            Update Car
          </h3>
          <form
            action=""
            className="mt-3 flex flex-col gap-y-1.5"
            onSubmit={handleUpdate}
          >
            <input
              type="number"
              name="id"
              value={id || ""}
              onChange={(e) => setId(Number(e.target.value))}
              className="bg-gray-700 border w-full text-white placeholder:text-gray-300 border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 rounded-lg py-2 px-2"
            />
            <input
              type="text"
              placeholder="Enter Brand Name"
              name="name"
              value={name}
              onChange={(e) => SetName(e.target.value)}
              className="bg-gray-700 border w-full text-white placeholder:text-gray-300 border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 rounded-lg py-2 px-2"
            />
            <div className="flex gap-x-1.5">
              <input
                type="text"
                placeholder="Enter Model Car"
                className="bg-gray-700 border w-full text-white placeholder:text-gray-300 border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 rounded-lg py-2 px-2"
                name="model"
                value={model}
                onChange={(e) => SetModel(e.target.value)}
              />
              <input
                type="text"
                name="transmission"
                value={transmission}
                onChange={(e) => SetTransmission(e.target.value)}
                placeholder="Enter transmission car"
                className="bg-gray-700 border w-full text-white placeholder:text-gray-300 border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 rounded-lg py-2 px-2"
              />
            </div>
            <input
              type="text"
              placeholder="Enter Location"
              name="location"
              value={location}
              onChange={(e) => SetLocation(e.target.value)}
              className="bg-gray-700 border w-full text-white placeholder:text-gray-300 border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 rounded-lg py-2 px-2"
            />
            <input
              type="text"
              name="fuelType"
              value={fuelType}
              onChange={(e) => SetFuelType(e.target.value)}
              placeholder="Enter Fuel Type"
              className="bg-gray-700 border w-full text-white placeholder:text-gray-300 border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 rounded-lg py-2 px-2"
            />
            <div className="flex gap-x-1.5">
              <input
                type="file"
                name="image"
                className="bg-gray-700 border w-full text-white placeholder:text-gray-300 border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 rounded-lg py-2 px-2"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setImage(file);
                }}
              />
              <input
                type="number"
                name="seats"
                value={seats}
                onChange={(e) => SetSeats(Number(e.target.value))}
                placeholder="Enter Number of seats"
                className="bg-gray-700 border w-full text-white placeholder:text-gray-300 border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 rounded-lg py-2 px-2"
              />
            </div>
            <input
              type="text"
              name="price"
              value={price}
              onChange={(e) => SetPrice(Number(e.target.value))}
              placeholder="Enter price car"
              className="bg-gray-700 border w-full text-white placeholder:text-gray-300 border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 rounded-lg py-2 px-2"
            />
            <div className="flex gap-x-1.5">
              <input
                type="number"
                name="year"
                className="bg-gray-700 border w-full text-white placeholder:text-gray-300 border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 rounded-lg py-2 px-2"
                value={year}
                onChange={(e) => SetYear(Number(e.target.value))}
                placeholder="Enter year of car"
              />
              <input
                type="number"
                name="mileage"
                value={mileage}
                onChange={(e) => SetMilage(Number(e.target.value))}
                placeholder="Enter Number of Mileage"
                className="bg-gray-700 border w-full text-white placeholder:text-gray-300 border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 rounded-lg py-2 px-2"
              />
            </div>
            <input
              type="text"
              name="description"
              value={description}
              onChange={(e) => SetDescription(e.target.value)}
              placeholder="Enter description "
              className="bg-gray-700 border w-full text-white placeholder:text-gray-300 border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 rounded-lg py-2 px-2"
            />
            <div className="modal-action">
              <label htmlFor="my_modal_7" className="btn">
                Close!
              </label>
              <label htmlFor="my_modal_7" className="btn btn-soft btn-accent">
                <button> Save Changes</button>
              </label>
            </div>
          </form>
        </div>
      </div>

      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold flex items-center gap-x-1.5 text-blue-500">
            <BiCar />
            Create Car
          </h3>
          <form
            action=""
            className="mt-3 flex flex-col gap-y-1.5"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Enter Brand Name"
              name="name"
              value={name}
              onChange={(e) => SetName(e.target.value)}
              className="bg-gray-700 border w-full text-white placeholder:text-gray-300 border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 rounded-lg py-2 px-2"
            />
            <div className="flex gap-x-1.5">
              <input
                type="text"
                placeholder="Enter Model Car"
                className="bg-gray-700 border w-full text-white placeholder:text-gray-300 border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 rounded-lg py-2 px-2"
                name="model"
                value={model}
                onChange={(e) => SetModel(e.target.value)}
              />
              <input
                type="text"
                name="transmission"
                value={transmission}
                onChange={(e) => SetTransmission(e.target.value)}
                placeholder="Enter transmission car"
                className="bg-gray-700 border w-full text-white placeholder:text-gray-300 border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 rounded-lg py-2 px-2"
              />
            </div>
            <input
              type="text"
              placeholder="Enter Location"
              name="location"
              value={location}
              onChange={(e) => SetLocation(e.target.value)}
              className="bg-gray-700 border w-full text-white placeholder:text-gray-300 border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 rounded-lg py-2 px-2"
            />
            <input
              type="text"
              name="fuelType"
              value={fuelType}
              onChange={(e) => SetFuelType(e.target.value)}
              placeholder="Enter Fuel Type"
              className="bg-gray-700 border w-full text-white placeholder:text-gray-300 border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 rounded-lg py-2 px-2"
            />
            <div className="flex gap-x-1.5">
              <input
                type="file"
                name="image"
                className="bg-gray-700 border w-full text-white placeholder:text-gray-300 border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 rounded-lg py-2 px-2"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setImage(file);
                }}
              />
              <input
                type="number"
                name="seats"
                value={seats}
                onChange={(e) => SetSeats(Number(e.target.value))}
                placeholder="Enter Number of seats"
                className="bg-gray-700 border w-full text-white placeholder:text-gray-300 border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 rounded-lg py-2 px-2"
              />
            </div>
            <input
              type="text"
              name="price"
              value={price}
              onChange={(e) => SetPrice(Number(e.target.value))}
              placeholder="Enter price car"
              className="bg-gray-700 border w-full text-white placeholder:text-gray-300 border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 rounded-lg py-2 px-2"
            />
            <div className="flex gap-x-1.5">
              <input
                type="number"
                name="year"
                className="bg-gray-700 border w-full text-white placeholder:text-gray-300 border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 rounded-lg py-2 px-2"
                value={year}
                onChange={(e) => SetYear(Number(e.target.value))}
                placeholder="Enter year of car"
              />
              <input
                type="number"
                name="mileage"
                value={mileage}
                onChange={(e) => SetMilage(Number(e.target.value))}
                placeholder="Enter Number of Mileage"
                className="bg-gray-700 border w-full text-white placeholder:text-gray-300 border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 rounded-lg py-2 px-2"
              />
            </div>
            <input
              type="text"
              name="description"
              value={description}
              onChange={(e) => SetDescription(e.target.value)}
              placeholder="Enter description "
              className="bg-gray-700 border w-full text-white placeholder:text-gray-300 border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 rounded-lg py-2 px-2"
            />
            <div className="modal-action">
              <label htmlFor="my_modal_6" className="btn">
                Close!
              </label>
              <label htmlFor="my_modal_6" className="btn btn-soft btn-accent">
                <button> Save Changes</button>
              </label>
            </div>
          </form>
        </div>
      </div>
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
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by name and model car"
              className="bg-gray-700 px-12 py-2 border text-white focus:outline-none focus:ring-2 focus:ring-blue-400 border-blue-500 rounded-lg w-full"
            />
          </div>
          <div className="">
            <label htmlFor="my_modal_6" className="btn btn-soft btn-info py-4">
              <FcAddRow /> Create Car
            </label>
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
              <th className="px-4 py-2">Bookings</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {filtering?.slice(start, end).map((car) => (
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
                <td className="px-4 py-2 text-center">{car.name}</td>
                <td className="px-4 py-2 text-center">{car.model}</td>
                <td className="px-4 py-2 text-center">{car.pricePerDay}</td>
                <td className="px-4 py-2 text-center">{car.seats}</td>
                <td className="px-4 py-2 text-center">{car.location}</td>
                <td className="px-4 py-2 text-center">{car.fuelType}</td>
                <td className="px-4 py-2 text-center">{car.bookings.length}</td>
                <td className="px-4 py-2 flex gap-x-2.5 items-center justify-center">
                  <button
                    className="btn btn-soft btn-accent"
                    onClick={() => {
                      handleEdit(car);
                      (
                        document.getElementById(
                          "my_modal_7",
                        ) as HTMLInputElement
                      ).checked = true;
                    }}
                  >
                    <PiPencil />
                    Edit
                  </button>
                  <button
                    className="btn btn-soft btn-error "
                    onClick={() => {
                      setShow(true);
                      setId(car.id);
                    }}
                  >
                    <LuDelete />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-10">
        <div className="join">
          {/* Previous */}
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="btn btn-soft btn-accent"
          >
            <BsArrowLeft />
          </button>

          {/* First 2 pages */}
          <button
            onClick={() => setPage(1)}
            className={`join-item btn btn-square ${page === 1 ? "btn-soft btn-info" : ""}`}
          >
            1
          </button>

          {totalPages >= 2 && (
            <button
              onClick={() => setPage(2)}
              className={`join-item btn btn-square ${page === 2 ? "btn-soft btn-info" : ""}`}
            >
              2
            </button>
          )}

          {/* Ellipsis if more than 4 pages */}
          {totalPages > 4 && (
            <button className="join-item btn btn-disabled">...</button>
          )}

          {/* Last 2 pages */}
          {totalPages > 3 && (
            <button
              onClick={() => setPage(totalPages - 1)}
              className={`join-item btn btn-square ${page === totalPages - 1 ? "btn-soft btn-info" : ""}`}
            >
              {totalPages - 1}
            </button>
          )}

          {totalPages > 2 && (
            <button
              onClick={() => setPage(totalPages)}
              className={`join-item btn btn-square ${page === totalPages ? "btn-soft btn-info" : ""}`}
            >
              {totalPages}
            </button>
          )}

          {/* Next */}
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="btn btn-soft btn-accent"
          >
            <BsArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Car;
