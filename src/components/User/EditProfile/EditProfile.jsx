import { useState } from "react";
import "../../User/Userprofile/userprofile.css";
import { useNavigate } from "react-router-dom";
import UserNav from "../Usernavbar/UserNav";
import { useLocation } from "react-router-dom";
import { editProfiledata } from "../../../configure/Userinterceptor";
import toast from "react-hot-toast";

export default function EditProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialValue = location?.state || {};
  const [user, setUser] = useState(initialValue);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const EditSubmit = async () => {
    try {
      const response = await editProfiledata(user);
      if (response.data.success) {
        toast.success("Profile updated successfully");
        navigate("/profile");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating profile");
    }
  };
  return (
    <div className=" h-screen flex justify-center items-center bg-white">
      <UserNav />

      <div className=" w-[50%] h-[80%] mt-16 bg-white  flex justify-center items-center ">
        <div className="w-[52%] h-[95%] bg-gary-200 border  border-red-300 ">
          <div className="flex justify-center ">
            <h1 className="text-lg font-bold mt-3 text-blue-500">
              Edit Profile
            </h1>
          </div>

          <div className="w-96 flex justify-center items-center">
            <label
              htmlFor="name"
              className="common-label text-lg font-semibold pl-5 p-4 mt-4 ml-3 box-border w-32 h-11 flex items-center justify-center border border-sky-300 custom-shadow"
            >
              fName
            </label>

            <input
              type="text"
              id="fname"
              name="fname"
              defaultValue={user.fname}
              className="border border-white p-2 mt-4  pt-3 pl-4 ml-4  bg-white-200 bg-gradient-to-r from-gray-200 via-white-500 to-white-500 custom-shadow "
              onChange={handleChange}
            />
          </div>
          <div className="w-96 flex justify-center items-center">
            <label
              htmlFor="name"
              className="common-label text-lg font-semibold pl-5 p-4 mt-4 ml-3 box-border w-32 h-11 flex items-center justify-center border border-sky-300 custom-shadow"
            >
              lName
            </label>

            <input
              type="text"
              id="lname"
              name="lname"
              defaultValue={user.lname}
              className="border border-white p-2 mt-4  pt-3 pl-4 ml-4  bg-white-200 bg-gradient-to-r from-gray-200 via-white-500 to-white-500 custom-shadow "
              onChange={handleChange}
            />
          </div>
          <div className="w-96 flex justify-center items-center">
            <label
              htmlFor="name"
              className="common-label text-lg font-semibold pl-5 p-4 mt-4 ml-3 box-border w-32 h-11 flex items-center justify-center border border-sky-300 custom-shadow"
            >
              Email
            </label>

            <input
              type="email"
              id="email"
              name="email"
              defaultValue={user.email}
              className=" bg-gray-100 border border-white p-2 mt-4  pt-3 pl-4 ml-4 bg-white-200 bg-gradient-to-r from-gray-200 via-white-500 to-white-500 custom-shadow "
              onChange={handleChange}
            />
          </div>
          <div className="w-96 flex justify-center items-center">
            <label
              htmlFor="name"
              className="common-label text-lg font-semibold pl-5 p-4 mt-4 ml-3 box-border w-32 h-11 flex items-center justify-center border border-sky-300 custom-shadow"
            >
              Phone
            </label>

            <input
              type="text"
              id="phone"
              name="phone"
              defaultValue={user.phone}
              className=" bg-gray-100 border border-white p-2 mt-4  pt-3 pl-4 ml-4 bg-white-200 bg-gradient-to-r from-gray-200 via-white-500 to-white-500 custom-shadow "
              onChange={handleChange}
            />
          </div>
          <div className="w-96 flex justify-center items-center">
            <label
              htmlFor="name"
              className="common-label text-lg font-semibold pl-5 p-4 mt-4 ml-3 box-border w-32 h-11 flex items-center justify-center border border-sky-300 custom-shadow"
            >
              State
            </label>

            <input
              type="text"
              id="state"
              name="state"
              placeholder="Nodata"
              defaultValue={user.state}
              className="bg-gray-100 border border-white p-2 mt-4  pt-3 pl-4 ml-4 bg-white-200 bg-gradient-to-r from-gray-200 via-white-500 to-white-500 custom-shadow "
              onChange={handleChange}
            />
          </div>
          <div className="w-96 flex justify-center items-center">
            <label
              htmlFor="name"
              className="text-lg font-semibold pl-5 p-4 mt-4 ml-3 box-border w-32 h-11 flex items-center justify-center border border-sky-300 custom-shadow"
            >
              Licence:NO
            </label>

            <input
              type="text"
              id="licenceno"
              name="lincenno"
              defaultValue={user.lincenno}
              placeholder="Nodata"
              className=" bg-gray-100 border border-white p-2 mt-4  pt-3 pl-4 ml-4 bg-white-200 bg-gradient-to-r from-gray-200 via-white-500 to-white-500 custom-shadow "
              onChange={handleChange}
            />
          </div>
          <div className="w-96 flex justify-center items-center">
            <label
              htmlFor="name"
              className="common-label text-lg font-semibold pl-5 p-4 mt-4 ml-3 box-border w-32 h-11 flex items-center justify-center border border-sky-300 custom-shadow"
            >
              District
            </label>

            <input
              type="text"
              id="district"
              name="district"
              defaultValue={user.district}
              placeholder="Nodata"
              className=" bg-gray-100 border border-white p-2 mt-4  pt-3 pl-4 ml-4 bg-white-200 bg-gradient-to-r from-gray-200 via-white-500 to-white-500 custom-shadow "
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-center ">
            <button
              type="button"
              className=" w-48  flex justify-center mt-6 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-7 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
              onClick={EditSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
