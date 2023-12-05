import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { editpartnerprofiledata } from "../../../configure/Partnerinterceptor";
import { useForm } from "react-hook-form";

export default function PartnereditProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialValue = location?.state || {};
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [formData, setFormData] = useState(initialValue);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmits = async () => {
    try {
      const response = await editpartnerprofiledata(formData);
      if (response.data.success) {
        toast.success("Profile updated successfully");
        navigate("/partner/partnerprofile");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating profile");
    }
  };

  return (
    <div className="container mx-auto bg-green-200 custom-shadow my-auto md:w-2/3 p-4 md:mt-20">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      <form onSubmit={handleSubmit(handleSubmits)}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* First Name */}
          <div className="mb-4">
            <label
              htmlFor="fname"
              className="block text-sm font-medium text-gray-600"
            >
              First Name
            </label>
            <input
              {...register("fname", {
                required: "Please fill the fname",
                pattern: {
                  value: /^[^\s].*[^\s]$/,
                  message: "Leading or trailing spaces are not allowed",
                },
              })}
              type="text"
              id="fname"
              name="fname"
              defaultValue={formData.fname}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {errors.fname && (
              <span className="flex justify-center  text-red-700">
                {errors.fname.message}
              </span>
            )}
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label
              htmlFor="lname"
              className="block text-sm font-medium text-gray-600"
            >
              Last Name
            </label>
            <input
              {...register("lname", {
                required: "Please fill the lname",
                pattern: {
                  value: /^[^\s].*[^\s]$/,
                  message: "Leading or trailing spaces are not allowed",
                },
              })}
              type="text"
              id="lname"
              name="lname"
              defaultValue={formData.lname}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {errors.lname && (
              <span className="flex justify-center  text-red-700">
                {errors.lname.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              {...register("email", {
                required: "Please fill the email",
                pattern: {
                  value: /^[^\s].*[^\s]$/,
                  message: "Leading or trailing spaces are not allowed",
                },
              })}
              type="email"
              id="email"
              name="email"
              defaultValue={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {errors.email && (
              <span className="flex justify-center  text-red-700">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-600"
            >
              Phone
            </label>
            <input
              {...register("phone", {
                required: "Please fill the phone",
                pattern: {
                  value: /^[^\s].*[^\s]$/,
                  message: "Leading or trailing spaces are not allowed",
                },
              })}
              type="tel"
              id="phone"
              name="phone"
              defaultValue={formData.phone}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {errors.phone && (
              <span className="flex justify-center  text-red-700">
                {errors.phone.message}
              </span>
            )}
          </div>

          {/* District */}
          <div className="mb-4">
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-600"
            >
              State
            </label>
            <input
              {...register("state", {
                required: "Please fill the state",
                pattern: {
                  value: /^[^\s].*[^\s]$/,
                  message: "Leading or trailing spaces are not allowed",
                },
              })}
              type="text"
              id="state"
              name="state"
              defaultValue={formData.state}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {errors.state && (
              <span className="flex justify-center  text-red-700">
                {errors.state.message}
              </span>
            )}
          </div>

          {/* State */}
          <div className="mb-4">
            <label
              htmlFor="district"
              className="block text-sm font-medium text-gray-600"
            >
              District
            </label>
            <input
              {...register("district", {
                required: "Please fill the district",
                pattern: {
                  value: /^[^\s].*[^\s]$/,
                  message: "Leading or trailing spaces are not allowed",
                },
              })}
              type="text"
              id="district"
              name="district"
              defaultValue={formData.district}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {errors.district && (
              <span className="flex justify-center  text-red-700">
                {errors.district.message}
              </span>
            )}
          </div>
          {/* City */}
          <div className="mb-4">
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-600"
            >
              City
            </label>
            <input
              {...register("city", {
                required: "Please fill the district",
                pattern: {
                  value: /^[^\s].*[^\s]$/,
                  message: "Leading or trailing spaces are not allowed",
                },
              })}
              type="text"
              id="city"
              name="city"
              defaultValue={formData.city}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {errors.city && (
              <span className="flex justify-center  text-red-700">
                {errors.city.message}
              </span>
            )}
          </div>

          {/* Sublocation */}
          <div className="mb-4">
            <label
              htmlFor="sublocation"
              className="block text-sm font-medium text-gray-600"
            >
              Sublocation
            </label>
            <input
              {...register("sublocation", {
                required: "Please fill the sublocation",
                pattern: {
                  value: /^[^\s].*[^\s]$/,
                  message: "Leading or trailing spaces are not allowed",
                },
              })}
              type="text"
              id="sublocation"
              name="sublocation"
              defaultValue={formData.sublocation}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {errors.sublocation && (
              <span className="flex justify-center  text-red-700">
                {errors.sublocation.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="sublocation"
              className="block text-sm font-medium text-gray-600"
            >
              Company
            </label>
            <input
              {...register("companyname", {
                required: "Please fill the companyname",
                pattern: {
                  value: /^[^\s].*[^\s]$/,
                  message: "Leading or trailing spaces are not allowed",
                },
              })}
              type="text"
              id="companyname"
              name="companyname"
              defaultValue={formData.companyname}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {errors.companyname && (
              <span className="flex justify-center  text-red-700">
                {errors.companyname.message}
              </span>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
