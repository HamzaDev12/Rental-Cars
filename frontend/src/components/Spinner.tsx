import { FaSpinner } from "react-icons/fa";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <FaSpinner className="animate-spin text-indigo-600" size={50} />
    </div>
  );
};

export default Spinner;
