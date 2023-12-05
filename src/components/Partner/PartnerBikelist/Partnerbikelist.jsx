import Partnerdashboard from "../../../Pages/Partner/Partnerdashboard";
import { useNavigate } from "react-router-dom";
import {
  partnerbikefind,
  deletebike,
} from "../../../configure/Partnerinterceptor";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addUser } from "../../../redux/Partnerslice";
export default function Partnerbikelist() {
  const navigate = useNavigate();
  const [bikedata, setbikedata] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const dispatch = useDispatch();

  const lastItemIndex = currentPage * itemsPerPage;
  const firstIndex = lastItemIndex - itemsPerPage;
  const thisPageItems = bikedata.slice(firstIndex, lastItemIndex);

  const pages = [];
  for (let i = 1; i <= Math.ceil(bikedata.length / itemsPerPage); i++) {
    pages.push(i);
  }

  useEffect(() => {
    const bikeslist = async () => {
      const response = await partnerbikefind();
      if (response.data.success) {
        setbikedata(response.data.bikelist);
      }
    };
    bikeslist();
  }, [bikedata]);

  const bikedelete = async (id) => {
    try {
      console.log("Deleting bike with ID:", id);
      const response = await deletebike(id);
      console.log("Delete bike response:", response);

      if (response.data.success) {
        toast.success("Bike deleted");

        setbikedata((prevBikes) => prevBikes.filter((bike) => bike.id !== id));
      }
    } catch (error) {
      console.error("Error deleting bike:", error.message);
    }
  };

  return (
    <div>
      <div style={{ display: "flex" }} className="w-screen">
        <div style={{ flex: 1 }}>
          <Partnerdashboard />
        </div>
        <div className="container mt-5 pr-10">
          <h1 className="font-extrabold font-serif flex justify-center text-3xl ">
            Bike List
          </h1>
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="p-1.5 w-full inline-block align-middle">
                <div className="lg:w-[95%] bg-white flex flex-col items-center ml-10">
                  <div className="flex flex-wrap justify-center">
                    {Array.isArray(thisPageItems) &&
                      thisPageItems.map((value) => {
                        return (
                          <div
                            key={value.id}
                            className="w-full sm:w-72  bg-gray-100 custom-shadow m-3 rounded-md border-2 border-red-700"
                          >
                            <img
                              src={value.image}
                              alt=""
                              className="w-full h-40 object-cover rounded-t-md"
                            />
                            <h1 className="font-bold text-center text-lg uppercase text-black">
                              {value.Bikename}
                            </h1>
                            <div className="p-3">
                              <h1 className="font-bold text-black">
                                Brand-{value.brand}
                              </h1>
                              <h1 className="font-bold text-black">
                                Engine CC-{value.VehicleCC}
                              </h1>
                              <h1 className="font-bold text-black">
                                Fuel Type-{value.FuelType}
                              </h1>
                              <h1 className="font-bold text-black">
                                Plate No-{value.platenumber}
                              </h1>
                              <h1 className="font-bold text-black">
                                Rent-{value.RentPerDay}
                              </h1>

                              <h1 className="font-bold text-black">
                                Rent Amount 24 Per Hour
                              </h1>
                              <div className="flex justify-between pt-5">
                                <button
                                  type="button"
                                  className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                                  onClick={() => {
                                    navigate("/partner/editbike", {
                                      state: { id: value._id, bike: value },
                                    });
                                  }}
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                  onClick={() => bikedelete(value?._id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  <div>
                    {pages
                      .slice(
                        Math.max(currentPage - 2, 0),
                        Math.min(currentPage + 1, pages.length)
                      )
                      .map((page, index) => (
                        <button
                          onClick={() => setCurrentPage(page)}
                          key={index}
                          className={`font-extrabold p-2 ${
                            currentPage === page
                              ? "text-4xl text-black"
                              : "text-xl text-green-600"
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
