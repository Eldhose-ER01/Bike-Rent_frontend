import { useState, useEffect } from "react";
import {
  Getbooking,
  BookingChange,
  Cancelbooking,
} from "../../../configure/Partnerinterceptor";
import Partnerdash from "../Partnerdashboard/Partnerdash";
import { isbookinpagefalse } from "../../../redux/NavbarSlice";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export default function BookingDetails() {
  const [bookingData, setBookingData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const Dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleClick = (index) => {
    setPage(index + 1);
  };
  const finddata = async () => {
    const response = await Getbooking(page);
    if (response.data.success) setBookingData(response.data.booking);
    setPage(response.data.page);
    setTotalPages(response.data.totalPages);
  };
  useEffect(() => {
    Dispatch(isbookinpagefalse());
    finddata();
  }, [refresh, page]);

  const statuschange = async (id) => {
    try {
      const response = await BookingChange(id);
      if (response.data.success) {
        refresh == true ? setRefresh(false) : setRefresh(true);
      }
      if (response.data.complete) {
        toast.success("Running Completed");
      }
      if (response.data.error) {
        toast.success("Wait For Running");
      }
      if (response.data.messages) {
        toast.success("Running started Wait for end");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const cancel = async (id) => {
    try {
      const response = await Cancelbooking(id);
      if (response.data.success) {
        refresh == true ? setRefresh(false) : setRefresh(true);
        toast.success("Cancel Booking");
      } else if (response.data.Running) {
        toast.error("Not Canceld Your Ride has started ");
      } else if (response.data.Completed) {
        toast.error("Not canceld Your Ride Completed");
      } else if (response.data.canceld) {
        toast.error("You Are Alredy Canceld Booking");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div style={{ display: "flex" }} className="w-screen">
      <div style={{ flex: 1 }}>
        <Partnerdash />
      </div>

      <div className="container mt-5 pr-10">
        <h1 className="font-extrabold font-serif flex justify-center text-3xl ">
          Booking List
        </h1>
        <div className="flex flex-col mt-5">
          <div className="overflow-x-auto">
            <div className="p-1.5 w-full inline-block align-middle">
              <div className="overflow-hidden border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 ">
                  <thead className="bg-gray-50 ">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-800 uppercase "
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-800 uppercase "
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-800 uppercase "
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-800 uppercase "
                      >
                        Payment
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-800 uppercase "
                      >
                        Booking Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3  text-xs font-bold text-left text-gray-800 uppercase "
                      >
                        Cancel
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3  text-xs font-bold text-left text-gray-800 uppercase "
                      >
                        View Booking
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {bookingData.length >= 0 &&
                      bookingData.map((data, index) => {
                        return (
                          <tr key={index}>
                            <td className="px-6 py-4 text-sm text-left font-medium text-gray-800 whitespace-nowrap">
                              {index + 1}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 text-left whitespace-nowrap">
                              {data.user.fname} {data.user.lname}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 text-left whitespace-nowrap">
                              {data.user.email}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium  text-left whitespace-nowrap">
                              <a
                                className="text-green-500 hover:text-green-700"
                                href="#"
                              >
                                {data.paymentMethod}
                              </a>
                            </td>

                            <td className="px-6 py-4  text-left whitespace-nowrap uppercase">
                              <button
                                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                                onClick={() => {
                                  statuschange(data._id);
                                }}
                              >
                                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                  {data.status}
                                </span>
                              </button>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium  text-left whitespace-nowrap">
                              <button
                                type="button"
                                className=" w-[100px] text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                onClick={() => {
                                  cancel(data._id);
                                }}
                              >
                                Cancel
                              </button>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium  text-left whitespace-nowrap">
                              <button
                                type="button"
                                className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                                onClick={() => {
                                  navigate("/partner/bookingview", {
                                    state: { bike: data },
                                  });
                                }}
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              <div className="max-w-[1600px] bg-gray-100 flex justify-center">
                {totalPages > 0 &&
                  [...Array(totalPages)].map((val, index) => (
                    <button
                      className={`${
                        page === index + 1 ? "bg-black" : "bg-black"
                      } py-2 px-4 rounded-md m-1 text-white ${
                        page === index + 1 ? "font-bold" : "font-normal"
                      } focus:outline-none focus:ring focus:ring-offset-2`}
                      key={index}
                      onClick={() => handleClick(index)}
                    >
                      {index + 1}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
