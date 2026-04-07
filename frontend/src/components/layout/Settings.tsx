import { useEffect, useState, type FormEvent } from "react";
import { BiLock } from "react-icons/bi";
import { ImImage, ImProfile } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import toast from "react-hot-toast";
import { updateUserFn } from "../../store/auth/updateUser";
import { MdChangeCircle, MdEmail } from "react-icons/md";
import { FaUserInjured } from "react-icons/fa";
import { changePasswordFn } from "../../store/auth/changePassword";
import type { IChangePasswordPayload } from "../../types/user.types";

const Settings = () => {
  const settingState = useSelector((state: RootState) => state.updateUser);
  const loginState = useSelector((state: RootState) => state.loginUser);
  const changePassword = useSelector(
    (state: RootState) => state.changePassword,
  );
  const dispatch = useDispatch<AppDispatch>();
  const toastId = "loading....";

  const userId = loginState?.data?.user?.id;

  const [name, setName] = useState("");
  const [image, setImage] = useState<File | string>("");
  const [id, setId] = useState<number | null>(null);
  const [current, setCurrent] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    if (image instanceof File) {
      formData.append("image", image);
    }

    dispatch(updateUserFn({ data: formData, id }));
  };

  const handleChangePassword = (e: FormEvent) => {
    e.preventDefault();
    const data: IChangePasswordPayload = {
      confirm,
      currentPassword: current,
      password,
    };
    dispatch(changePasswordFn({ data, id }));
  };

  useEffect(() => {
    setId(userId);
  }, [userId]);

  useEffect(() => {
    if (settingState.error) {
      toast.error(settingState?.error, { id: toastId });
    }
    if (settingState.data.message) {
      toast.success(settingState?.data?.message, { id: toastId });
    }
  }, [settingState]);

  useEffect(() => {
    if (changePassword.error) {
      toast.error(changePassword?.error, { id: toastId });
    }
    if (changePassword.data.message) {
      toast.success(changePassword?.data?.message, { id: toastId });
    }
  }, [changePassword]);

  return (
    <div>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold flex items-center text-blue-400">
            <MdChangeCircle /> Change Email
          </h3>

          <form action="">
            <label htmlFor="" className="text-md font-bold">
              Email <span className="text-red-300">*</span>
            </label>

            <div className="relative pt-4">
              <FaUserInjured className="text-gray-300 font-bold text-2xl  absolute top-6 left-2" />

              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                className="bg-gray-800 placeholder:text-gray-400 w-full text-white border border-gray-300 rounded-lg px-9 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="modal-action">
              <label htmlFor="my_modal_6" className="btn">
                Close!
              </label>
              <button className="btn btn-info">Save Changes</button>
            </div>
          </form>
        </div>
      </div>

      <h1 className="tracking-wide text-2xl font-bold text-blue-400 uppercase ">
        Settings
      </h1>
      <p className="text-sm tracking-wide text-gray-300">
        Manage your account and performence
      </p>
      <div className="mt-3 shadow border border-gray-200 rounded-lg p-3">
        <h1 className="text-blue-400 text-lg tracking-wide flex items-center gap-x-1">
          <ImProfile /> Public Profile
        </h1>
        <form action="" className="mt-2" onSubmit={handleSubmit}>
          <div className="relative pt-4">
            <FaUserInjured className="text-gray-300 font-bold text-2xl  absolute top-6 left-2" />

            <input
              type="number"
              disabled={true}
              name="id"
              value={id || ""}
              onChange={(e) => setId(Number(e.target.value))}
              placeholder="Enter Your Name"
              className="bg-gray-800 placeholder:text-gray-400 w-full text-white border border-gray-300 rounded-lg px-9 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative pt-4">
            <BiLock className="text-gray-300 font-bold text-2xl  absolute top-6 left-2" />

            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Your Name"
              className="bg-gray-800 placeholder:text-gray-400 w-full text-white border border-gray-300 rounded-lg px-9 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative pt-4">
            <ImImage className="text-gray-300 font-bold text-2xl  absolute top-6 left-2" />

            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setImage(file);
                }
              }}
              className="bg-gray-800 placeholder:text-gray-400 w-full text-white border border-gray-300 rounded-lg px-9 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="btn mt-4 btn-accent w-full">Save Changes</button>
        </form>
      </div>
      <div className="mt-3 shadow border border-gray-200 rounded-lg p-3">
        <h1 className="text-blue-400 text-lg tracking-wide flex items-center gap-x-1">
          <MdChangeCircle /> Change Password
        </h1>
        <form action="" className="mt-2" onSubmit={handleChangePassword}>
          <div className="relative pt-4">
            <FaUserInjured className="text-gray-300 font-bold text-2xl  absolute top-6 left-2" />

            <input
              type="number"
              disabled={true}
              name="id"
              value={id || ""}
              onChange={(e) => setId(Number(e.target.value))}
              placeholder="Enter Your Name"
              className="bg-gray-800 placeholder:text-gray-400 w-full text-white border border-gray-300 rounded-lg px-9 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative pt-4">
            <BiLock className="text-gray-300 font-bold text-2xl  absolute top-6 left-2" />

            <input
              type="password"
              name="current"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              placeholder="Enter Your Current Password"
              className="bg-gray-800 placeholder:text-gray-400 w-full text-white border border-gray-300 rounded-lg px-9 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative pt-4">
            <BiLock className="text-gray-300 font-bold text-2xl  absolute top-6 left-2" />

            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your new password"
              className="bg-gray-800 placeholder:text-gray-400 w-full text-white border border-gray-300 rounded-lg px-9 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative pt-4">
            <BiLock className="text-gray-300 font-bold text-2xl  absolute top-6 left-2" />

            <input
              type="password"
              name="confirm"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Enter cofirm password"
              className="bg-gray-800 placeholder:text-gray-400 w-full text-white border border-gray-300 rounded-lg px-9 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button className="btn mt-4 btn-accent w-full">Save Changes</button>
        </form>
      </div>
      <div className="mt-3 shadow border border-gray-200 rounded-lg p-3 flex justify-between">
        <div className="flex items-center gap-x-1.5">
          <div className="bg-blue-500 rounded-full w-14 h-14 items-center flex justify-center">
            <MdEmail className="text-3xl" />
          </div>
          <p className="uppercase text-blue-400 tracking-wide text-2xl font-bold">
            Change Email
          </p>
        </div>
        <button
          className="btn btn-accent flex items-center gap-x-1.5"
          onClick={() =>
            ((
              document.getElementById("my_modal_6") as HTMLInputElement
            ).checked = true)
          }
        >
          <MdChangeCircle />
          Change Email
        </button>
      </div>
    </div>
  );
};

export default Settings;
