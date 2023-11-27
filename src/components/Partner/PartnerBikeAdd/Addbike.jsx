import { useState } from "react";
import './bike.css';
import { useSelector } from "react-redux";
import { partnerbikeadd } from "../../../configure/Partnerinterceptor";
import toast from "react-hot-toast";
import Axios from "axios";

export default function Addbike() {
  const data = useSelector((state) => state.partner.partnerD);
  const [loader, setLoader] = useState(false);

  console.log(data, '  kitti');

  const [bikeData, setBikeData] = useState({
    Bikename: '',
    brand: '',
    platenumber: '',
    Category: 'Mountain Bike',
    Sublocation: '',
    VehicleCC: '',
    FuelType: 'Petrol',
    RentPerDay: '',
    image: '',
    userid: data.id
  });

  console.log(bikeData, "fffffffffffffffffff");

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
    console.log(formData, 'fomdatadjdjghjdghhgruhoads');
    let data = "";
    await Axios.post(
      "https://api.cloudinary.com/v1_1/dotjc7vax/image/upload",
      formData
    ).then((response) => {
      data = response.data["secure_url"];
      console.log(data, "ddddddddddddddddddddddddddd");
    });
    return data;
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(bikeData, "bikeeeeeeeeeeeeeeee");
    const response = await partnerbikeadd(bikeData);
    console.log(response, "hfffffffffff");
    if (response.data.success) {
      toast.success("value is adding");
    }
    console.log('Form submitted:', bikeData);
  };

  return (
    <div className={loader === false ? "  bg-transparent w-full h-screen" : " sbg-transparent tracking-tight text-gray-900 dark:text-white opacity-30 w-full h-screen"}>

    <div className="container mx-auto mt-5 ">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-gray-200 p-8 rounded custom-shadow">
        <h2 className="text-2xl font-semibold mb-6 bg-green-300 h-14 text-center flex justify-center items-center">Add Bike</h2>

        {/* Bike Name */}
        <div className="mb-4 relative z-10">
  <label htmlFor="bikeName" className="block text-sm font-medium text-black">
    Bike Name
  </label>
  <input
    type="text"
    id="Bikename"
    name="Bikename"
    value={bikeData.Bikename}
    onChange={handleChange}
    className="mt-1 p-2 w-full border rounded-md relative z-20"
  />
</div>


        {/* Brand */}
        <div className="mb-4">
          <label htmlFor="brand" className="block text-sm font-medium text-black">
            Brand
          </label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={bikeData.brand}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        {/* Plate Number */}
        <div className="mb-4">
          <label htmlFor="plateNumber" className="block text-sm font-medium text-black">
            Plate Number
          </label>
          <input
            type="text"
            id="platenumber"
            name="platenumber"
            value={bikeData.platenumber}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-black">
            Category
          </label>
          <select
  id="Category"
  name="Category"
  value={bikeData.Category }
  onChange={handleChange}
  className="mt-1 p-2 w-full border rounded-md"
>
  <option value="Mountain Bike">Mountain Bike</option>
  <option value="Normal Bike">Normal Bike</option>
  <option value="Sports Bike">Sports Bike</option>
  {/* Add other category options as needed */}
</select>
        </div>

        {/* Sublocation */}
        <div className="mb-4">
          <label htmlFor="subLocation" className="block text-sm font-medium text-black">
            Sublocation
          </label>
          <input
            type="text"
            id="Sublocation"
            name="Sublocation"
            value={bikeData.Sublocation}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        {/* CC */}
        <div className="mb-4">
          <label htmlFor="cc" className="block text-sm font-medium text-black">
           Vehicle CC
          </label>
          <input
            type="text"
            id="VehicleCC"
            name="VehicleCC"
            value={bikeData.VehicleCC}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        {/* Fuel Type */}
        <div className="mb-4">
          <label htmlFor="fuelType" className="block text-sm font-medium text-black">
            Fuel Type
          </label>
          <select
            id="FuelType"
            name="FuelType"
            value={bikeData.FuelType ?? "Petrol"}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          >
            <option value="Petrol">Petrol</option>
            <option value="Electric">Electric</option>
            {/* Add other fuel type options as needed */}
          </select>
        </div>

        {/* Rent Per Day */}
        <div className="mb-4">
          <label htmlFor="rentPerDay" className="block text-sm font-medium text-black">
            Rent Per Day
          </label>
          <input
            type="text"
            id="RentPerDay"
            name="RentPerDay"
            value={bikeData.RentPerDay}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        {/* Image */}
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-600">
            Image URL
          </label>
        <input  type="file"
  name="image"
  id="image"
  className="border border-gray-400 py-1 px-2 w-full md:w-60 rounded-md"
  defaultValue={bikeData.image} 
  onChange={imageUpload}
  accept="image/image"
/>
        </div>
      
        {/* Submit Button */}
        <div className="flex items-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Add Bike
          </button>
        </div>
      </form>
    </div>
    {
        loader==true ?
        <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
<svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>         <span className="sr-only">Loading...</span>
        </div>
        :null
      }
      </div>
    
  )
}
