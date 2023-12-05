import { useState } from "react";
import { useLocation } from "react-router-dom";
import { editbike } from "../../../configure/Partnerinterceptor";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useForm } from "react-hook-form";

export default function Editbike() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loader, setLoader] = useState(false);
  const initialValue = location.state || {};
  const [bikedata, setBikedata] = useState(initialValue);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()


  const handleChange = async (e) => {
    const { name, value } = e.target;

    if (name === "image") {
      setLoader(true);

      const imageUrl = await ProfleUpload(e.target.files[0]);

      setBikedata((prevData) => ({
        ...prevData,
        image: imageUrl,
      }));

      setLoader(false);
    } else {
      setBikedata((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const ProfleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "kesrrxni");

    let data = "";

    try {
      const response = await Axios.post(
        "https://api.cloudinary.com/v1_1/dotjc7vax/image/upload",
        formData
      );
      data = response.data["secure_url"];
    } catch (error) {
      console.log(error.message, "Error uploading image");
    }

    return data;
  };

  const handleSubmits = async () => {
   
    try {
      const response = await editbike(bikedata);
      if (response.data.success) {
        toast.success("Bike updated successfully");
        navigate("/partner/bikelist");
      } else {
        toast.error("Failed to update bike");
      }
    } catch (error) {
      console.error("Error updating bike:", error);
      toast.error("An error occurred while updating bike");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-2xl font-bold text-center mb-4">Edit Bikes</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="Bikename" className="block text-sm font-medium text-gray-600">
                Bike Name
              </label>
              <input
               {...register("Bikename", {
                required: 'Please fill the Bikename',
                pattern: {
                  value: /^[^\s].*[^\s]$/,
                  message: 'Leading or trailing spaces are not allowed',
                },
              })}
                type="text"
                id="Bikename"
                name="Bikename"
                defaultValue={bikedata.bike?.Bikename}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-indigo-500"
              />
                {errors.Bikename && (
            <span className="flex justify-center  text-red-700">
              {errors.Bikename.message}
            </span>
          )}
            </div>

            <div className="mb-4">
              <label htmlFor="brand" className="block text-sm font-medium text-gray-600">
                Brand
              </label>
              <input
               {...register("brand", {
                required: 'Please fill the brand',
                pattern: {
                  value: /^[^\s].*[^\s]$/,
                  message: 'Leading or trailing spaces are not allowed',
                },
              })}
                type="text"
                id="brand"
                name="brand"
                defaultValue={bikedata.bike?.brand}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-indigo-500"
              />
              {errors.brand && (
            <span className="flex justify-center  text-red-700">
              {errors.brand.message}
            </span>
          )}
            </div>


            <div className="mb-4">
              <label htmlFor="image" className="block text-sm font-medium text-gray-600">
               Category
              </label>
              <input
               {...register("Category", {
                required: 'Please fill the Category',
                pattern: {
                  value: /^[^\s].*[^\s]$/,
                  message: 'Leading or trailing spaces are not allowed',
                },
              })}
                type="text"
                id="Category"
                name="Category"
                defaultValue={bikedata.bike?.Category}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-indigo-500"
              />
                {errors.Category && (
            <span className="flex justify-center  text-red-700">
              {errors.Category.message}
            </span>
          )}
            </div>


      

            <div className="mb-4">
              <label htmlFor="RentPerDay" className="block text-sm font-medium text-gray-600">
                Rent
              </label>
              <input
              {...register("RentPerDay", {
                required: 'Please fill the RentPerDay',
                pattern: {
                  value: /^[^\s].*[^\s]$/,
                  message: 'Leading or trailing spaces are not allowed',
                },
              })}
                type="text"
                id="RentPerDay"
                name="RentPerDay"
                defaultValue={bikedata.bike?.RentPerDay}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-indigo-500"
              />
               {errors.RentPerDay && (
            <span className="flex justify-center  text-red-700">
              {errors.RentPerDay.message}
            </span>
          )}
            </div>
            <div className="mb-4">
              <label htmlFor="RentPerDay" className="block text-sm font-medium text-gray-600">
              VehicleCC
              </label>
              <input
               {...register("VehicleCC", {
                required: 'Please fill the VehicleCC',
                pattern: {
                  value: /^[^\s].*[^\s]$/,
                  message: 'Leading or trailing spaces are not allowed',
                },
              })}
                type="text"
                id="VehicleCC"
                name="VehicleCC"
                defaultValue={bikedata.bike?.
                  VehicleCC}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-indigo-500"
              />
              {errors.VehicleCC && (
            <span className="flex justify-center  text-red-700">
              {errors.VehicleCC.message}
            </span>
          )}
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="block text-sm font-medium text-gray-600">
                Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-300"
              onClick={handleSubmit(handleSubmits)}
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {loader && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <svg
            aria-hidden="true"
            className="animate-spin w-8 h-8 text-gray-200 dark:text-gray-600 fill-yellow-400"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </div>
  );
}
