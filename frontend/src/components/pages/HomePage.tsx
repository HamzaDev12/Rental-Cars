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
import { useEffect } from "react";
import { getCarsFn } from "../../store/cars/getAllCars";
import { BsFuelPump, BsPeople } from "react-icons/bs";
import { PiTrainSimpleLight } from "react-icons/pi";
import { IoTimerSharp } from "react-icons/io5";
import { GiHelp } from "react-icons/gi";
import { SiTrustedshops } from "react-icons/si";
import { FcFlashAuto } from "react-icons/fc";
import { MdSendToMobile } from "react-icons/md";
import image from "./../../assets/Contact Us.png";

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
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCarsFn());
  }, [dispatch]);

  return (
    <div className="flex flex-col justify-center items-center mt-10 ">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold tracking-wide text-white">
          Find Your Perfect <span className="text-blue-400 ">Rental Cars</span>
        </h1>
        <p className="text-gray-300 tracking-wide pt-3 text-xl font-medium ">
          Discover amazing deals on quality vehicles. Book now and drive away
          with confidence.
        </p>
      </div>
      <div className="mt-10 flex">
        <div className="relative">
          <BiSearch className="text-3xl text-blue-500 absolute z-10 top-2 left-2" />
          <input
            type="text"
            placeholder="Search by name, model and year"
            className="bg-gray-700 px-10 py-3 border text-white focus:outline-none focus:ring-2 focus:ring-blue-400  border-blue-500 rounded-bl-lg rounded-tl-lg w-[540px]"
          />
        </div>
        <button className="bg-blue-500 px-7 cursor-pointer transition-all hover:bg-blue-600  uppercase rounded-br-lg rounded-tr-lg py-1 font-bold tracking-wide  gap-x-2 items-center">
          Search
        </button>
      </div>
      <div className="flex  gap-x-10 mt-16">
        <div className="tracking-wide text-xl text-center text-white">
          <h1 className="tracking-wide text-2xl font-bold text-blue-500">
            500+
          </h1>
          <p>Premium Cars</p>
        </div>
        <div className="tracking-wide text-xl text-center text-white">
          <h1 className="tracking-wide text-2xl font-bold text-blue-500">
            50+
          </h1>
          <p>Locations</p>
        </div>
        <div className="tracking-wide text-xl text-center text-white">
          <h1 className="tracking-wide text-2xl font-bold text-blue-500">
            24/7
          </h1>
          <p>Supports</p>
        </div>
        <div className="tracking-wide text-xl text-center text-white">
          <h1 className="tracking-wide text-2xl font-bold text-blue-500">
            100%
          </h1>
          <p>Satisfactions</p>
        </div>
      </div>

      <section className="py-16 ">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 tracking-wide">
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

      <h1 className="text-4xl mt-16 font-bold tracking-wide flex items-center gap-x-2">
        <FaCarSide className="text-blue-400 text-3xl" /> Featured Cars
      </h1>
      <p className="text-md pt-2 tracking-wide font-medium">
        Discover our handpicked selection of premium vehicles, perfect for any
        journey
      </p>
      <section className="pt-3 pb-16">
        {/* Flex container for cards */}
        <div className="mt-6 flex gap-6 flex-wrap">
          {carState?.data?.cars?.slice(0, 3).map((car) => (
            <div
              key={car.id}
              className="bg-gray-800 border-2 w-96 border-gray-200 rounded-lg p-4"
            >
              <div className="relative">
                <h1
                  className={`${car.isAvailable ? "bg-green-500 text-white" : "bg-blue-400 text-gray-900"} absolute  top-2 left-2 rounded-full  tracking-wide font-medium  w-24 text-center p-1 mb-4`}
                >
                  {car.isAvailable ? "Available" : "Taken"}
                </h1>

                <img
                  src={`http://localhost:3000/uploads/${car?.imageUrl}`}
                  alt={car.name}
                  className="w-full h-48 object-cover rounded-lg"
                />

                <h1 className="bg-gray-900 absolute bottom-[136px] left-60 rounded-full text-white tracking-wide font-medium uppercase w-24 text-center p-1 mb-4">
                  {car.mileage ? car.mileage + " km" : "N/A"}{" "}
                </h1>
              </div>

              <div className="">
                <div className="name">
                  <h1 className="text-lg font-bold tracking-wide">
                    {car.name} {car.model}
                  </h1>
                  <p className="text-sm font-medium">{car.year}</p>
                  <p className="text-lg font-medium tracking-wide pt-4 flex items-center gap-x-1.5">
                    <BiLocationPlus className="text-blue-300 " />
                    {car.location}{" "}
                  </p>
                </div>
                <div className="flex gap-x-4">
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
              <div className="pt-4 flex justify-between">
                <button className="btn btn-outline btn-info px-10">
                  View Detials
                </button>
                <button className="btn btn-info px-14">Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="pt-3 pb-16 ">
        <h1 className="text-white text-3xl font-bold text-center">
          Why Choose <span className="text-blue-400">Hargeisa Drive</span>
        </h1>
        <p className="text-md pt-2 tracking-wide font-medium text-center">
          We're commited to providing you with the best car rental experience
          through our <br /> premium services and customer-first approach
        </p>
        <div className="mt-10  flex flex-wrap gap-3 w-[70%] justify-center ml-60">
          <div className="bg-gray-600  rounded-lg text-center p-2 w-72 items-center justify-center flex flex-col">
            <p className="bg-blue-700 rounded-full text-white text-2xl p-3 ">
              <BiShield className="" />
            </p>
            <p className="text-lg font-bold tracking-wide pt-1.5">
              Fully Insured
            </p>
            <p className="text-sm font-medium tracking-wide pt-1.5">
              All our vehicles come with <br /> comprehensive insurence coverage
              for <br /> your peace of mind
            </p>
          </div>
          <div className="bg-gray-600  rounded-lg text-center p-2 w-72 items-center justify-center flex flex-col">
            <p className="bg-blue-700 rounded-full text-white text-2xl p-3 ">
              <IoTimerSharp className="" />
            </p>
            <p className="text-lg font-bold tracking-wide pt-1.5">
              24/7 Services
            </p>
            <p className="text-sm font-medium tracking-wide pt-1.5">
              Round-the-clock customer support and <br /> roadside assistance
              whenever you need it
            </p>
          </div>
          <div className="bg-gray-600  rounded-lg text-center p-2 w-72 items-center justify-center flex flex-col">
            <p className="bg-blue-700 rounded-full text-white text-2xl p-3 ">
              <BiSupport className="" />
            </p>
            <p className="text-lg font-bold tracking-wide pt-1.5">
              Expert Support
            </p>
            <p className="text-sm font-medium tracking-wide pt-1.5">
              Our dedicated team is here to help you <br />
              find the perfect vehicle for your needs
            </p>
          </div>
          <div className="bg-gray-600  rounded-lg text-center p-2 w-72 items-center justify-center flex flex-col">
            <p className="bg-blue-700 rounded-full text-white text-2xl p-3 ">
              <GiHelp className="" />
            </p>
            <p className="text-lg font-bold tracking-wide pt-1.5">
              Premium Quality
            </p>
            <p className="text-sm font-medium tracking-wide pt-1.5">
              All vehicles are regularly maintained <br />
              and meet our high-quality standards.
            </p>
          </div>
          <div className="bg-gray-600  rounded-lg text-center p-2 w-72 items-center justify-center flex flex-col">
            <p className="bg-blue-700 rounded-full text-white text-2xl p-3 ">
              <SiTrustedshops className="" />
            </p>
            <p className="text-lg font-bold tracking-wide pt-1.5">
              Trusted Thousands
            </p>
            <p className="text-sm font-medium tracking-wide pt-1.5">
              Jion over 100,000 satisfied customer <br />
              who trust us with their transportation.
            </p>
          </div>
          <div className="bg-gray-600  rounded-lg text-center p-2 w-72 items-center justify-center flex flex-col">
            <p className="bg-blue-700 rounded-full text-white text-2xl p-3 ">
              <FcFlashAuto className="" />
            </p>
            <p className="text-lg font-bold tracking-wide pt-1.5">
              Instant Booking
            </p>
            <p className="text-sm font-medium tracking-wide pt-1.5">
              Book your in just a few clicks and <br />
              get instant confirmation via email.
            </p>
          </div>
        </div>
      </section>
      <section className="pt-3 pb-16">
        <div className="flex justify-between w-[1000px] p-10 items-center">
          <div className="">
            <h1 className="text-blue-400 text-3xl font-bold tracking-wide">
              Contact Us
            </h1>
            <p className="text-sm font-normal tracking-wide pt-1.5">
              The Hargeisa Drive support team is available for you 24/7. Don’t{" "}
              <br />
              hesitate to contact us whenever you need assistance. We are here{" "}
              <br />
              to help you with car bookings, rental inquiries, and any support{" "}
              <br />
              related to our services.
            </p>
            <form
              action=""
              className="flex flex-col gap-y-2 pt-4 w-[500px] gap-x-14"
            >
              <label htmlFor="" className="font-bold tracking-wide text-lg  ">
                Name <span className="text-red-400">*</span>
              </label>{" "}
              <input
                type="text"
                placeholder="Enter Name"
                className="bg-gray-500 w-full placeholder:text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 text-white border border-blue-400 px-3 py-1 rounded-lg"
              />
              <label htmlFor="" className="font-bold tracking-wide text-lg  ">
                Email <span className="text-red-400">*</span>
              </label>{" "}
              <input
                type="email"
                placeholder="Enter Email"
                className="bg-gray-500 w-full placeholder:text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 text-white border border-blue-400 px-3 py-1 rounded-lg"
              />
              <label htmlFor="" className="font-bold tracking-wide text-lg  ">
                Subject <span className="text-red-400">*</span>
              </label>{" "}
              <input
                type="text"
                placeholder="Enter Subject"
                className="bg-gray-500 w-full placeholder:text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 text-white border border-blue-400 px-3 py-1 rounded-lg"
              />
              <label htmlFor="" className="font-bold tracking-wide text-lg  ">
                Message <span className="text-red-400">*</span>
              </label>{" "}
              <textarea
                placeholder="Enter Message"
                rows={5}
                className="bg-gray-500 w-full resize-none  placeholder:text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 text-white border border-blue-400 px-3 py-1 rounded-lg"
              ></textarea>
              <button className="btn btn-soft btn-info">
                <MdSendToMobile /> Send Message
              </button>
            </form>
          </div>
          <div className="">
            <img
              src={image}
              alt=""
              className="bg-white rounded-lg p-5 border border-blue-400"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
