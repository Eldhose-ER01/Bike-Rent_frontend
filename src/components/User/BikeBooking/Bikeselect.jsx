import UserNav from "../Usernavbar/UserNav";
import { FiSearch } from "react-icons/fi";
import Footer from "../Footer/Footer";
import { getbikes } from "../../../configure/Userinterceptor";
import { useState, useEffect } from "react";
export default function Bikeselect() {
  const [bike, setbike] = useState([]);

  useEffect(() => {
    const bikelist = async () => {
      try {
        const response = await getbikes();
        if (response.data.success) {
          setbike(response.data.bikesdata);
        }
      } catch (error) {
        console.error(error);
      }
    };

    bikelist();
  }, []);
  return (
    <div className="container">
      <div className="w-screen h-20 lg:h-24 ">
        <UserNav />
      </div>
      <div className="w-screen bg-red-600">
        <div className="flex flex-wrap sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4 p-4">
          <div className="flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="border-2 border-gray-300 pl-8 pr-2 py-2 ml-2 rounded-md w-44 lg:w-52"
              />
              <div className="absolute left-2 top-2">
                <FiSearch className="h-5 w-5 ml-2 mt-1 text-gray-500" />
              </div>
            </div>
          </div>

          <div className="flex items-center ">
            <select className="border-2 border-gray-300 ml-2 p-2 rounded-md w-44">
              <option value="">Select Price</option>
              <option value="Low">Low To High</option>
              <option value="High">High To Low</option>
            </select>
          </div>

          <div className="flex items-center">
            <select className="border-2 border-gray-300 ml-2 p-2 rounded-md w-44">
              <option value="">Select category</option>
              <option value="normalbuike">Normal Bike</option>
              <option value="Sports">Sports</option>
              <option value="mud">Mud bike</option>
            </select>
          </div>

          <div>
            <select className="border-2 border-gray-300 ml-2 p-2 rounded-md w-44">
              <option value="">Select State</option>
              <option value="normalbuike">Normal Bike</option>
              <option value="Sports">Sports</option>
              <option value="mud">Mud bike</option>
            </select>
          </div>
          <div className="flex items-center">
            <select className="border-2 border-gray-300 ml-2 p-2 rounded-md w-44">
              <option value="">Select District</option>
              <option value="normalbuike">Normal Bike</option>
              <option value="Sports">Sports</option>
              <option value="mud">Mud bike</option>
            </select>
          </div>
          <div className="flex items-center">
            <select className="border-2 border-gray-300 ml-2 p-2 rounded-md w-44">
              <option value="">Select City</option>
              <option value="normalbuike">Normal Bike</option>
              <option value="Sports">Sports</option>
              <option value="mud">Mud bike</option>
            </select>
          </div>
        </div>
      </div>
      <div className="w-screen bg-red-600 mt-1">
        <div className="flex flex-wrap sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 p-4">
          <div className="flex items-center">
            <input
              type="date"
              className="border-2 border-gray-300 ml-2 p-2 rounded-md"
            />
          </div>

          <div className="flex items-center">
            <select className="border-2 border-gray-300 ml-2 p-2 rounded-md w-44">
              <option value="">Select PickUpTime</option>
              <option value="normalbuike">Normal Bike</option>
              <option value="Sports">Sports</option>
              <option value="mud">Mud bike</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="date"
              className="border-2 border-gray-300 ml-2 p-2 rounded-md"
            />
          </div>

          <div className="flex items-center">
            <select className="border-2 border-gray-300 ml-2 p-2 rounded-md w-44">
              <option value="">Select DropTime</option>
              <option value="normalbuike">Normal Bike</option>
              <option value="Sports">Sports</option>
              <option value="mud">Mud bike</option>
            </select>
          </div>

          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
            Apply
          </button>
        </div>
      </div>

      <div className=" lg:w-screen   bg-black flex flex-col items-center">
        <h1 className="text-green-400 text-4xl mt-8 mb-4 font-extrabold">
          Available Bikes
        </h1>
        <div className="flex flex-wrap justify-center">
          {bike.map((value) => {
            return (
              <div
                key={value.id}
                className="w-full sm:w-72 h-96 bg-red-550 custom-shadow m-3 rounded-md border-2 border-red-700"
              >
                <img
                  src="https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW90b3JiaWtlfGVufDB8fDB8fHww"
                  alt=""
                  className="w-full h-40 object-cover rounded-t-md"
                />

                <h1 className="font-bold text-center text-lg uppercase  text-white ">
                  {value.Bikename}
                </h1>
                <div className="p-3">
                  <h1 className="font-bold text-white ">Brand-{value.brand}</h1>
                  <h1 className="font-bold  text-white">
                    Engine-{value.VehicleCC}
                  </h1>
                  <h1 className="font-bold  text-white">
                    Fuel Type-{value.FuelType}
                  </h1>
                  <h1 className="font-bold  text-white">
                    Rent-{value.RentPerDay}
                  </h1>
                  <h1 className="font-bold  text-white">Amount 24 Per Hour</h1>
                  <h1 className="font-bold text-white text-center mt-4 box-border h-10 w-full bg-red-600 md:w-64 pt-2 border border-sky-400 hover:bg-sky-500 transition-colors duration-300 ease-in-out rounded cursor-pointer">
                    Book Now
                  </h1>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}
