import { BiLocationPlus, BiSearch, BiShield, BiSupport } from "react-icons/bi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import bmw from "./../../assets/bmw.jpg";
import ford from "./../../assets/ford.png";
import mercedes from "./../../assets/mercedes.jpg";
import volkswagen from "./../../assets/volkswagen.png";
import tesla from "./../../assets/tesla.png";
import porsche from "./../../assets/porsche.png";
import "swiper/css";
import { FaCarSide } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { useEffect, useState, type FormEvent } from "react";
import { getCarsFn } from "../../store/cars/getAllCars";
import { BsFuelPump, BsPeople } from "react-icons/bs";
import { PiTrainSimpleLight } from "react-icons/pi";
import { IoTimerSharp } from "react-icons/io5";
import { GiHelp } from "react-icons/gi";
import { SiTrustedshops } from "react-icons/si";
import { FcFlashAuto } from "react-icons/fc";
import { MdSendToMobile } from "react-icons/md";
import image from "./../../assets/Contact Us.png";
import toast from "react-hot-toast";
import { createNotificationFn } from "../../store/notification/sendMessage";

const HomePage = () => {
  const brands = [
    { name: "BMW", logo: bmw },
    { name: "Ford", logo: ford },
    { name: "Mercedes-Benz", logo: mercedes },
    { name: "Volkswagen", logo: volkswagen },
    { name: "Tesla", logo: tesla },
    { name: "Porsche", logo: porsche },
  ];

  const carState = useSelector((state: RootState) => state.getAllCars);
  const createNotificationState = useSelector(
    (state: RootState) => state.sendMessage,
  );
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const toastId = "loading...";
  useEffect(() => {
    dispatch(getCarsFn());
  }, [dispatch]);

  useEffect(() => {
    if (createNotificationState.error) {
      toast.error(createNotificationState?.error, { id: toastId });
    }

    if (createNotificationState.data.message) {
      toast.success(createNotificationState?.data?.message, { id: toastId });
    }
  }, [createNotificationState]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      createNotificationFn({
        name,
        email,
        message,
        subject,
      }),
    );
  };

  return (
    <div className="flex flex-col justify-center items-center mt-10 px-4">
      <div className="text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-wide text-white">
          Find Your Perfect <span className="text-blue-400">Rental Cars</span>
        </h1>
        <p className="text-gray-300 tracking-wide pt-3 text-lg md:text-xl font-medium">
          Discover amazing deals on quality vehicles. Book now and drive away
          with confidence.
        </p>
      </div>

      <div className="mt-10 flex flex-col md:flex-row w-full max-w-xl">
        <div className="relative w-full">
          <BiSearch className="text-3xl text-blue-500 absolute z-10 top-2 left-2" />
          <input
            type="text"
            placeholder="Search by name, model and year"
            className="bg-gray-700 px-10 py-3 border text-white focus:outline-none focus:ring-2 focus:ring-blue-400 border-blue-500 rounded-lg md:rounded-l-lg w-full"
          />
        </div>

        <button className="bg-blue-500 px-7 cursor-pointer transition-all hover:bg-blue-600 uppercase md:rounded-r-lg py-3 font-bold tracking-wide">
          Search
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-10 mt-16">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold text-blue-500">500+</h1>
          <p>Premium Cars</p>
        </div>

        <div className="text-center text-white">
          <h1 className="text-2xl font-bold text-blue-500">50+</h1>
          <p>Locations</p>
        </div>

        <div className="text-center text-white">
          <h1 className="text-2xl font-bold text-blue-500">24/7</h1>
          <p>Supports</p>
        </div>

        <div className="text-center text-white">
          <h1 className="text-2xl font-bold text-blue-500">100%</h1>
          <p>Satisfactions</p>
        </div>
      </div>

      <section className="py-16 w-full">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 tracking-wide">
            Our Premium Brands
          </h2>

          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={5}
            autoplay={{ delay: 2000 }}
            loop={true}
            breakpoints={{
              320: { slidesPerView: 2 },
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
            }}
          >
            {brands.map((brand, index) => (
              <SwiperSlide key={index}>
                <div className="flex items-center justify-center bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-12 object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <h1 className="text-3xl md:text-4xl mt-16 font-bold tracking-wide flex items-center gap-x-2">
        <FaCarSide className="text-blue-400 text-3xl" /> Featured Cars
      </h1>

      <p className="text-md pt-2 tracking-wide font-medium text-center">
        Discover our handpicked selection of premium vehicles, perfect for any
        journey
      </p>

      <section className="pt-3 pb-16 w-full">
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {carState?.data?.cars?.slice(0, 3).map((car) => (
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
      </section>

      <section className="pt-3 pb-16 w-full">
        <h1 className="text-white text-3xl font-bold text-center">
          Why Choose <span className="text-blue-400">Hargeisa Drive</span>
        </h1>

        <p className="text-md pt-2 tracking-wide font-medium text-center">
          We're commited to providing you with the best car rental experience
        </p>

        <div className="mt-10 flex flex-wrap gap-4 max-w-6xl justify-center mx-auto">
          {[
            BiShield,
            IoTimerSharp,
            BiSupport,
            GiHelp,
            SiTrustedshops,
            FcFlashAuto,
          ].map((Icon, i) => (
            <div
              key={i}
              className="bg-gray-600 rounded-lg text-center p-4 w-72 flex flex-col items-center"
            >
              <p className="bg-blue-700 rounded-full text-white text-2xl p-3">
                <Icon />
              </p>

              <p className="text-lg font-bold pt-2">Service</p>

              <p className="text-sm pt-1">
                Premium services for the best rental experience.
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="pt-3 pb-16 w-full">
        <div className="flex flex-col lg:flex-row justify-between max-w-6xl p-10 items-center gap-10 mx-auto">
          <div>
            <h1 className="text-blue-400 text-3xl font-bold tracking-wide">
              Contact Us
            </h1>

            <form className="flex flex-col gap-y-2 pt-4 w-full md:w-[500px]">
              <label htmlFor="" className="text-md font-medium">
                Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full border border-blue-500 text-white px-3 py-2 rounded-lg"
              />
              <label htmlFor="" className="text-md font-medium">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full border border-blue-500 text-white px-3 py-2 rounded-lg"
              />
              <label htmlFor="" className="text-md font-medium">
                Subject <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject"
                className="bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full border border-blue-500 text-white px-3 py-2 rounded-lg"
              />

              <label htmlFor="" className="text-md font-medium">
                Message <span className="text-red-400">*</span>
              </label>
              <textarea
                rows={5}
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none border border-blue-500 w-full text-white px-3 py-2 rounded-lg"
              />

              <button
                disabled={
                  createNotificationState.loading ||
                  name === null ||
                  subject === null ||
                  message === null ||
                  email === null
                }
                onClick={handleSubmit}
                className="btn btn-soft btn-info disabled:bg-gray-700 text-blue-500"
              >
                <MdSendToMobile />
                {createNotificationState.loading
                  ? "Sending..."
                  : " Send Message"}
              </button>
            </form>
          </div>

          <div>
            <img
              src={image}
              alt=""
              className="bg-white rounded-lg p-5 border border-blue-400 w-full max-w-md"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
