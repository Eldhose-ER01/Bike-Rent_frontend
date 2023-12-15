import { useEffect, useState } from "react";
import Partnerdash from "../Partnerdashboard/Partnerdash";
import "./bike.css";
import { useSelector } from "react-redux";
import { partnerbikeadd } from "../../../configure/Partnerinterceptor";
import toast from "react-hot-toast";
import Axios from "axios";
import { useForm } from "react-hook-form";

export default function Addbike() {
  const data = useSelector((state) => state.partner.partnerD);
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [bikeData, setBikeData] = useState({
    Bikename: "",
    brand: "",
    platenumber: "",
    Category: "",
    Sublocation: "",
    VehicleCC: "",
    FuelType: "Petrol",
    RentPerDay: "",
    image: "",
    userid: data.id,
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setBikeData((bikeData) => ({
      ...bikeData,
      [name]: value,
    }));
  };

  const ProfleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "kesrrxni");
    console.log(formData, "fomdatadjdjghjdghhgruhoads");
    let data = "";
    await Axios.post(
      "https://api.cloudinary.com/v1_1/dotjc7vax/image/upload",
      formData
    ).then((response) => {
      data = response.data["secure_url"];
    });
    return data;
  };

  
  const[err,setErr]=useState()

  const imageUpload = async (e) => {
    e.preventDefault();
    setLoader(true);
    const res = await ProfleUpload(e.target.files[0]);
    setBikeData({
      ...bikeData,
      image: res,
    });
    setLoader(false);
  };

  const handleSubmits = async () => {
    try {
      const response = await partnerbikeadd(bikeData);
      if (response.data.success) {
        toast.success("value is adding");
        window.location.reload()
        
      }
      if(response.data.messages){
        setErr(response.data.messages);
        }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

 
  return (
    <div
      className={
        loader === false
          ? "  bg-transparent w-full h-screen"
          : " sbg-transparent tracking-tight text-gray-900 dark:text-white opacity-30 w-full h-screen"
      }
    >  <div style={{ display: "flex" }} className="w-screen">
    <div style={{ flex: 1 }}>
    <Partnerdash/>
    </div>
      <div className="bg-white  text-black flex flex-col  justify-center items-center w-full h-screen gap-y-6">
        <div className="w-full h-11 text-center font-bold text-3xl ">
          Add Bike
        </div>
        <div className="w-full  flex  flex-col items-center justify-center">
          <form
            onSubmit={handleSubmit(handleSubmits)}
            className="w-1/2 p-3 border rounded-lg shadow-md shadow-white  "
          >
            <div className="md:flex w-full  bg-gray-400">
              <div className="md:w-1/2 h-full">
                <div className="w-full h-20 p-3">
                  <h1>Bike Name</h1>
                  <input
                  {...register("Bikename", {
                    required: 'Please fill the Bikename',
                    pattern: {
                      value: /^[^\s].*[^\s]$/,
                      message: 'Leading or trailing spaces are not allowed',
                    },
                  })}
                    className="border w-full h-2/3 rounded-lg px-3 text-black"
                    type="text"
                    id="Bikename"
                    name="Bikename"
                    value={bikeData.Bikename}
                    onChange={handleChange}
                  />
                   {errors.Bikename && (
            <span className="flex justify-center  text-red-700">
              {errors.Bikename.message}
            </span>
          )}
                </div>
                <div className="w-full h-20 p-3">
                  <h1>Bike Brand</h1>
                  <input
                    {...register("brand", {
                      required: 'Please fill the brand',
                      pattern: {
                        value: /^[^\s].*[^\s]$/,
                        message: 'Leading or trailing spaces are not allowed',
                      },
                    })}
                    className="border w-full h-2/3 rounded-lg px-3 text-black"
                    type="text"
                    id="brand"
                    name="brand"
                    value={bikeData.brand}
                    onChange={handleChange}
                  />
                  {errors.brand && (
            <span className="flex justify-center  text-red-700">
              {errors.brand.message}
            </span>
          )}
                </div>
                <div className="w-full h-20 p-3">
                  <h1>Category</h1>
                  <input
                    {...register("Category", {
                      required: 'Please fill the Category',
                      pattern: {
                        value: /^[^\s].*[^\s]$/,
                        message: 'Leading or trailing spaces are not allowed',
                      },
                    })}
                    className="border w-full h-2/3 rounded-lg px-3 text-black "
                    type="text"
                    id="Category"
                    name="Category"
                    value={bikeData.Category}
                    onChange={handleChange}
                  />
                  {errors.Category && (
            <span className="flex justify-center  text-red-700">
              {errors.Category.message}
            </span>
          )}
                </div>

                <div className="w-full h-20 p-3">
                  <h1>Sublocation</h1>
                  <input
                    {...register("Sublocation", {
                      required: 'Please fill the Sublocation',
                      pattern: {
                        value: /^[^\s].*[^\s]$/,
                        message: 'Leading or trailing spaces are not allowed',
                      },
                    })}
                    className="border w-full h-2/3 rounded-lg px-3 text-black "
                    type="text"
                    id="Sublocation"
                    name="Sublocation"
                    value={bikeData.Sublocation}
                    onChange={handleChange}
                  />
                  {errors.Sublocation && (
            <span className="flex justify-center  text-red-700">
              {errors.Sublocation.message}
            </span>
          )}
                </div>
                <div className="w-full h-20 p-3">
                  <h1>VehicleCC</h1>
                  <input
                    {...register("VehicleCC", {
                      required: 'Please fill the VehicleCC',
                      pattern: {
                        value: /^[^\s].*[^\s]$/,
                        message: 'Leading or trailing spaces are not allowed',
                      },
                    })}
                    className="border w-full h-2/3 rounded-lg px-3 text-black"
                    type="text"
                    id="VehicleCC"
                    name="VehicleCC"
                    value={bikeData.VehicleCC}
                    onChange={handleChange}
                  />
                  {errors.VehicleCC && (
            <span className="flex justify-center  text-red-700">
              {errors.VehicleCC.message}
            </span>
          )}
                </div>
              </div>
              <div className="md:w-1/2 h-full">
                <div className="w-full h-20 p-3 ">
                  <h1>Password</h1>

                  <select
                    id="FuelType"
                    name="FuelType"
                    value={bikeData.FuelType ?? "Petrol"}
                    onChange={handleChange}
                    className="border w-full h-2/3 rounded-lg px-3 text-black "
                  >
                    <option value="Petrol">Petrol</option>
                    <option value="Electric">Electric</option>
                    {/* Add other fuel type options as needed */}
                  </select>
                </div>
                <div className="w-full h-20 p-3">
                  <h1>RentPerDay</h1>
                  <input
                     {...register("RentPerDay", {
                      required: 'Please fill the RentPerDay',
                      pattern: {
                        value: /^[^\s].*[^\s]$/,
                        message: 'Leading or trailing spaces are not allowed',
                      },
                    })}
                    className="border w-full h-2/3 rounded-lg px-3 text-black "
                    type="text"
                    id="RentPerDay"
                    name="RentPerDay"
                    value={bikeData.RentPerDay}
                    onChange={handleChange}
                  />
                   {errors.RentPerDay && (
            <span className="flex justify-center  text-red-700">
              {errors.RentPerDay.message}
            </span>
          )}
                </div>

                <div className="w-full h-20 p-3">
  <h1>Plate NO</h1>
  <input
    {...register("platenumber", {
      required: 'Please fill the platenumber',
      pattern: {
        value: /^[A-Z]{2}-[0-9]{2}-[0-9]{1,4}$/,
        message: 'Invalid platenumber format. Example: KL-73A-4444',
      },
    })}
    className="border w-full h-2/3 rounded-lg px-3 text-black"
    type="text"
    id="platenumber"
    name="platenumber"
    value={bikeData.platenumber}
    onChange={handleChange}
  />
  {errors.platenumber && (
    <span className="flex justify-center text-red-700">
      {errors.platenumber.message}
    </span>
  )}
  <div className="flex justify-center">
    {err && <span style={{ color: "red" }}>{err}</span>}
  </div>
</div>


                
                <div className="w-full h-20 p-3">
                  <h1>Image</h1>

                  <input
                    type="file"
                    name="image"
                    id="image"
                    className="border w-full h-2/3 rounded-lg px-3 text-black"
                    defaultValue={bikeData.image}
                    onChange={imageUpload}
                    accept="image/image"
                  />
                </div>
              </div>
            </div>
            <div className="pt-6 w-full flex justify-center">
              <div className="flex items-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                  Add Bike
                </button>
              </div>
            </div>
          </form>

          {loader == true ? (
            <div
              role="status"
              className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
            >
              <svg
                aria-hidden="true"
                className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400"
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
              </svg>{" "}
              <span className="sr-only">Loading...</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
    </div>
  );
}
