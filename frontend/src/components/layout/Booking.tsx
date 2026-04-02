import { BiSearch } from "react-icons/bi";
import { MdCarRental, MdDelete, MdUpdate } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { useEffect, useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { getAllBookingsFn } from "../../store/bookings/getAllBookings";
import { LuDelete } from "react-icons/lu";
import { PiPencil } from "react-icons/pi";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { updateBookingFn } from "../../store/bookings/updateBooking";
import type { IUpdateBookingUI } from "../../types/booking.types";
import { deleteBookingFn } from "../../store/bookings/deleteBooking";

const Booking = () => {
  const bookingState = useSelector((state: RootState) => state.getAllBooking);
  const updateBookingState = useSelector(
    (state: RootState) => state.updateBooking,
  );
  const deleteBookingState = useSelector(
    (state: RootState) => state.deleteBooking,
  );
  const dispatch = useDispatch<AppDispatch>();
  const toastId = "loading...";

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [id, setId] = useState<number | null>(null);
  const [status, setStatus] = useState("");
  const [show, setShow] = useState(false);

  const limit = 10;

  const filterbooking = bookingState.data.booking?.filter((b) => {
    const column = `${b.car?.name} ${b.user?.name}`.toLowerCase();
    return column.toLowerCase().includes(search.toLowerCase());
  });

  const start = (page - 1) * limit;
  const end = start + limit;
  const totalPages = Math.ceil((filterbooking?.length || 0) / limit);

  const handleUpdate = (e: FormEvent) => {
    e.preventDefault();
    dispatch(updateBookingFn({ id, status }));
  };

  const handleEdit = (data: IUpdateBookingUI) => {
    setId(data.id);
    setStatus(data.status);
  };

  const handlDelete = () => {
    if (!id) {
      toast.error("please select id you want to delete");
      return;
    }

    dispatch(deleteBookingFn({ id }));
    if (deleteBookingState?.data?.message) {
      setShow(false);
      setId(null);
      return;
    }
  };

  useEffect(() => {
    if (bookingState.error) {
      toast.error(bookingState?.error, { id: toastId });
    }
    if (bookingState.data.booking) {
      toast.success(bookingState?.data?.message, { id: toastId });
    }
  }, [bookingState]);

  useEffect(() => {
    if (updateBookingState.error) {
      toast.error(updateBookingState?.error, { id: toastId });
    }
    if (updateBookingState.data.message) {
      toast.success(updateBookingState?.data?.message, { id: toastId });
      dispatch(getAllBookingsFn());
    }
  }, [updateBookingState, dispatch]);

  useEffect(() => {
    if (deleteBookingState.error) {
      toast.error(deleteBookingState?.error, { id: toastId });
    }
    if (deleteBookingState.data.message) {
      toast.success(deleteBookingState?.data?.message, { id: toastId });
      dispatch(getAllBookingsFn());
    }
  }, [deleteBookingState, dispatch]);

  useEffect(() => {
    dispatch(getAllBookingsFn());
  }, [dispatch]);
  return (
    <div className="p-4 space-y-10">
      {show && (
        <div className="inset-0 fixed flex justify-center items-center shadow-lg bg-black/30 ">
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-lg text-blue-400 flex gap-x-1.5 tracking-wide items-center">
              <MdDelete /> Delete Booking?
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

      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold flex gap-x-1.5 text-blue-400 items-center">
            <MdUpdate /> Update Booking!
          </h3>
          <form
            action=""
            onSubmit={handleUpdate}
            className="flex flex-col gap-y-1.5 mt-2"
          >
            <input
              type="number"
              name="id"
              disabled={true}
              value={id || ""}
              onChange={(e) => setId(Number(e.target.value))}
              className="bg-gray-700 border w-full text-white placeholder:text-gray-300 border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 rounded-lg py-2 px-2"
            />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="select appearance-none bg-gray-700 border w-full text-white placeholder:text-gray-300 border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 rounded-lg py-2 px-2"
            >
              <option value="" disabled>
                Select Status
              </option>
              <option value="PENDING">Pending</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELED">Canceled</option>
            </select>
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
            <MdCarRental className="text-4xl text-blue-800 font-bold" />
          </div>
          <p className="tracking-wide text-2xl font-bold text-blue-400 uppercase">
            Manage Bookings
          </p>
        </div>

        <div className="flex items-center gap-x-1.5">
          <div className="relative w-full md:w-80">
            <BiSearch className="text-3xl text-blue-500 absolute z-10 top-1/2 left-3 -translate-y-1/2" />
            <input
              type="text"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Car or Customer name"
              className="bg-gray-700 px-12 py-2 border text-white focus:outline-none focus:ring-2 focus:ring-blue-400 border-blue-500 rounded-lg w-full"
            />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg border border-base-content/5 bg-gray-900 shadow">
        <table className="min-w-full table-auto">
          <thead className="text-blue-500 bg-gray-900">
            <tr>
              {/* <th className="px-4 py-2"></th> */}
              <th className="px-4 py-2">Car Name</th>
              <th className="px-4 py-2">Model</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Customer Name</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {filterbooking?.slice(start, end).map((b) => (
              <tr key={b.id} className="border-b border-gray-700">
                <td className="px-4 py-2 text-center ">{b.car?.name}</td>
                <td className="px-4 py-2 text-center ">{b.car?.model}</td>
                <td className="px-4 py-2 text-center ">{"$" + b.totalPrice}</td>
                <td
                  className={`px-4 py-2 text-center ${
                    b.status === "PENDING"
                      ? " text-yellow-600"
                      : b.status === "CONFIRMED"
                        ? " text-green-600"
                        : b.status === "CANCELLED"
                          ? " text-red-600"
                          : b.status === "COMPLETED"
                            ? " text-blue-600"
                            : ""
                  }`}
                >
                  {b.status}
                </td>
                <td className="px-4 py-2 text-center ">{b.user?.name}</td>
                <td className="px-4 py-2 flex gap-x-2.5 items-center justify-center">
                  <button
                    className="btn btn-soft btn-accent "
                    onClick={() => {
                      handleEdit(b);
                      (
                        document.getElementById(
                          "my_modal_6",
                        ) as HTMLInputElement
                      ).checked = true;
                    }}
                  >
                    <PiPencil />
                    Edit
                  </button>
                  <button
                    className="btn btn-soft btn-error "
                    onClick={() => setShow(true)}
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
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="btn btn-soft btn-accent"
          >
            <BsArrowLeft />
          </button>
          <button
            className={`join-item btn btn-square ${page === 1 ? "btn-soft btn-info" : ""}`}
            onClick={() => setPage(1)}
          >
            1
          </button>
          {totalPages >= 2 && (
            <button
              className={`join-item btn btn-square ${page === 2 ? "btn-soft btn-info" : ""}`}
              onClick={() => setPage(2)}
            >
              2
            </button>
          )}
          {totalPages > 4 && (
            <button className="join-item btn btn-disabled">...</button>
          )}
          {totalPages > 3 && (
            <button
              onClick={() => setPage(totalPages - 1)}
              className={`join-item btn btn-square ${page === totalPages - 1 ? "btn-soft btn-active" : ""}`}
            >
              {totalPages - 1}
            </button>
          )}

          {totalPages > 2 && (
            <button
              onClick={() => setPage(totalPages)}
              className={`join-item btn btn-square ${page === totalPages ? "btn-soft btn-active" : ""}`}
            >
              {totalPages}
            </button>
          )}
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

export default Booking;
