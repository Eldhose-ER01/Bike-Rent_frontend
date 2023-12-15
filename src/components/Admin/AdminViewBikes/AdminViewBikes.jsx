import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  bikepatnerlist,
  statuschangebike,
} from "../../../configure/Admininterceptor";

export default function AdminViewBikes() {
  const [bike, setBike] = useState([]);
  const location = useLocation();
  const data = location.state.id;
  console.log(location.state.id);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [refresh, setRefresh] = useState(true);
  const navigate=useNavigate()
  const lastItemIndex = currentPage * itemsPerPage;
  const firstIndex = lastItemIndex - itemsPerPage;
  const thisPageItems = bike.slice(firstIndex, lastItemIndex);

  const pages = [];
  for (let i = 1; i <= Math.ceil(bike.length / itemsPerPage); i++) {
    pages.push(i);
  }
  const finddata = async () => {
    const response = await bikepatnerlist(data);
    if (response.data.success) {
      setBike(response.data.bikedatas);
    }
  };
  useEffect(() => {
    finddata();
  }, [refresh]);


  const returnpage=()=>{
    navigate('/admin/Partnerlist')
  }
  const bolockorunblock = async (id) => {
    try {
      const response = await statuschangebike(id);
      if (response.data.success)
        refresh == true ? setRefresh(false) : setRefresh(true);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <div className="h-16 w-screen bg-green-400">
        <img
          src="../../../../public/Images/pngwing.com.png"
          className="w-14 h-14 pt-3 pl-3 "
          alt="image"
        onClick={returnpage}/>
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
                            <div className="flex justify-center pt-5">
                              {value.status ? (
                                <button
                                  type="button"
                                  className=" text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 w-32"
                                  onClick={() => {
                                    bolockorunblock(value._id);
                                  }}
                                >
                                  Block
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  className=" w-32 mtext-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
                                  onClick={() => {
                                    bolockorunblock(value._id);
                                  }}
                                >
                                  Unblock
                                </button>
                              )}
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
  );
}
