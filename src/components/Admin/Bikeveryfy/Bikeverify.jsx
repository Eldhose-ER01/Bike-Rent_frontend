import { useEffect, useState } from "react";
import { bikerequst } from "../../../configure/Admininterceptor";
import Dashboard from "../Dashboard/Admindashb";
import "./shadow.css";
import toast from "react-hot-toast";
import {
  bikeacceptdata,
  bikerejected,
} from "../../../configure/Admininterceptor";
export default function Bikeverify() {
  const [ModalVisibles, setIsModalVisibles] = useState(false);

  const showModals = () => {
    setIsModalVisibles(true);
  };

  const hideModals = () => {
    setIsModalVisibles(false);
  };

  const [bike, setBike] = useState([]);
  const [message, setMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const findbikedata = async () => {
    const response = await bikerequst();
    if (response.data.success) {
      setBike(response.data.bikedata);
    }
  };
  useEffect(() => {
    findbikedata();
  }, [refresh]);

  const bikeaccept = async (id) => {
    try {
      console.log(id, "iddddddddddddddddddddddddddddd");
      const response = await bikeacceptdata(id);
      if (response.data.success) {
        refresh == true ? setRefresh(false) : setRefresh(true);
        toast.success("bike accept");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const bikereject = async (id) => {
    try {
      const data = {
        id: id,
        message: message,
      };
      const response = await bikerejected(data);
      if (response.data.success) {
        refresh == true ? setRefresh(false) : setRefresh(true);
        toast.success("bike rejectd");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div style={{ display: "flex" }} className="w-screen">
      <div style={{ flex: 1 }}>
        <Dashboard />
      </div>

      <div className="container mt-5 pr-10">
        <h1 className="font-extrabold font-serif flex justify-center text-3xl ">
          Bike Request
        </h1>
        <div className="flex flex-col">
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
                        Reject
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3  text-xs font-bold text-left text-gray-800 uppercase "
                      >
                        Accept
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3  text-xs font-bold text-left text-gray-800 uppercase "
                      >
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {bike.length >= 0 &&
                      bike.map((bike, index) => {
                        return (
                          <tr key={bike._id}>
                            <td className="px-6 py-4 text-sm text-left font-medium text-gray-800 whitespace-nowrap">
                              {index + 1}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 text-left whitespace-nowrap">
                              {bike.ownerid.fname} {bike.ownerid.lname}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 text-left whitespace-nowrap">
                              {bike.ownerid.email}
                            </td>
                            <td className="px-6 py-4  text-left whitespace-nowrap">
                              <button
                                onClick={showModals}
                                className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                type="button"
                              >
                                Reject
                              </button>

                              {/* Main modal */}
                              {ModalVisibles && (
                                <div
                                  tabIndex="-1"
                                  aria-hidden="true"
                                  className="fixed top-0 right-0 left-0 z-50 overflow-y-auto overflow-x-hidden flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                                >
                                  <div className="relative p-4 w-full max-w-2xl max-h-full">
                                    {/* Modal content */}
                                    <div className="relative bg-white rounded-lg shadow dark:bg-white border-4 border-red-500 ">
                                      {/* Modal header */}
                                      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-black">
                                          Reject Reason
                                        </h3>
                                        <button
                                          type="button"
                                          onClick={hideModals}
                                          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                          <svg
                                            className="w-3 h-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 14 14"
                                          >
                                            <path
                                              stroke="currentColor"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth="2"
                                              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                            />
                                          </svg>
                                          <span className="sr-only">
                                            Close modal
                                          </span>
                                        </button>
                                      </div>
                                      {/* Modal body */}
                                      <div className="p-4 md:p-5 space-y-4">
                                        <div className="max-w-md mx-auto p-4">
                                          <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="message"
                                          >
                                            Your Message:
                                          </label>
                                          <textarea
                                            id="message"
                                            name="message"
                                            rows="4"
                                            value={message}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                            placeholder="Type your message here..."
                                          ></textarea>
                                        </div>
                                      </div>
                                      {/* Modal footer */}
                                      <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                        <button
                                          onClick={() => {
                                            bikereject(bike._id);
                                          }}
                                          type="button"
                                          className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                        >
                                          Reject
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4 text-left whitespace-nowrap">
                              <button
                                type="button"
                                className="w-[100px] text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
                                onClick={() => {
                                  bikeaccept(bike._id);
                                }}
                              >
                                Accept
                              </button>
                            </td>
                            <td className="px-6 py-4 text-left whitespace-nowrap">
                              {/* Modal toggle */}
                              <button
                                onClick={toggleModal}
                                className="w-[100px] text-green-400 hover:text-white border border-green-400 hover:bg-sky-500 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-sky-300 dark:text-black-300 dark:hover:text-white dark:hover:bg-green-400 dark:focus:ring-sky-200"
                                type="button"
                              >
                                View
                              </button>

                              {/* Main modal */}
                              {modalVisible && (
                                <div
                                  className="fixed top-0 right-0 left-0 z-50 flex overflow-y-auto overflow-x-hidden justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                                  tabIndex="-1"
                                  aria-hidden="true"
                                >
                                  <div className="relative p-4 w-full max-w-2xl max-h-full custom-shadow">
                                    {/* Modal content */}
                                    <div className="relative bg-white rounded-lg shadow dark:bg-white-300 ">
                                      {/* Modal header */}
                                      <div>
                                        <img
                                          src={bike.image}
                                          alt=""
                                          className="w-20 h-20 mt-2"
                                        />
                                      </div>
                                      <div className="flex items-center justify-between p-4 md:p-3 border-b rounded-t dark:border-gray-600">
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-black">
                                          {bike.Bikename}
                                        </h3>
                                        <button
                                          onClick={toggleModal}
                                          type="button"
                                          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                          data-modal-hide="default-modal"
                                        >
                                          <svg
                                            className="w-3 h-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 14 14"
                                          >
                                            <path
                                              stroke="currentColor"
                                              strokeWidth="2"
                                              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                            />
                                          </svg>
                                          <span className="sr-only">
                                            Close modal
                                          </span>
                                        </button>
                                      </div>
                                      {/* Modal body */}
                                      <div className="p-4 md:p-5 space-y-4">
                                        <p className="text-base leading-relaxed text-black dark:text-black">
                                          <h1 className="font-semibold">
                                            Brand:{bike.brand}
                                          </h1>
                                          <h1 className="font-semibold">
                                            Category:{bike.Category}
                                          </h1>
                                          <h1 className="font-semibold">
                                            FuelType:{bike.FuelType}
                                          </h1>
                                          <h1 className="font-semibold">
                                            VehicleCC:{bike.VehicleCC}
                                          </h1>
                                          <h1 className="font-semibold">
                                            Bike Number:{bike.platenumber}
                                          </h1>
                                          <h1 className="font-semibold">
                                            RentPerDay:{bike.RentPerDay}
                                          </h1>
                                        </p>
                                      </div>
                                      {/* Modal footer */}
                                      <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                        <button
                                          onClick={toggleModal}
                                          type="button"
                                          className="w-[100px] text-green-400 hover:text-white border border-green-400 hover:bg-sky-500 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-sky-300 dark:text-black-300 dark:hover:text-white dark:hover:bg-green-400 dark:focus:ring-sky-200"
                                        >
                                          Close
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
