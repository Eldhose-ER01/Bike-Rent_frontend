import { useState, useEffect } from "react";
import Dashboard from "../Dashboard/Admindashb";
import {
  partnerdata,
  partnerAccept,
  partnerreject,
} from "../../../configure/Admininterceptor";
import toast from "react-hot-toast";

export default function Partnerreq() {
  const [partner, setPartner] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [singlemodal, setsinglemodal] = useState(0);

  const [ModalOpen, issetModalOpen] = useState(false);
  const openModal = () => {
    issetModalOpen(true);
  };

  const closeModal = () => {
    issetModalOpen(false);
  };

  const toggleModal = (x) => {
    setsinglemodal(x);
    setModalOpen(!isModalOpen);
  };

  const hideModal = () => {
    setModalOpen(false);
  };
  useEffect(() => {
    const findpartner = async () => {
      try {
        const response = await partnerdata();
        if (response.data.success) {
          const data = response.data.partnerdata;
          setPartner(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    findpartner();
  }, [refresh]);
  const rejectuser = async (id) => {
    try {
      const response = await partnerreject(id);
      if (response.data.success) toast.success("Partner is Rejected");
      refresh == true ? setRefresh(false) : setRefresh(true);
    } catch (error) {
      console.log(error.message);
    }
  };
  const acceptreq = async (id) => {
    try {
      const response = await partnerAccept(id);
      if (response.data.success) {
        toast.success("Partner is Accepted");
        refresh == true ? setRefresh(false) : setRefresh(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div style={{ display: "flex" }} className="w-screen">
      <div style={{ flex: 1 }}>
        <Dashboard />
      </div>

      <div className="container mt-5 pr-10">
        <h1 className="font-extrabold font-serif flex justify-center text-3xl mt-2">
          partner Request
        </h1>
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="p-1.5 w-full inline-block align-middle">
              <div className="overflow-hidden border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 mt-7 ">
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
                        Phone
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3  text-xs font-bold text-left text-gray-800 uppercase "
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
                    {partner.length >= 0 &&
                      partner.map((user, index) => {
                        return (
                          <tr key={user._id}>
                            <td className="px-6 py-4 text-sm text-left font-medium text-gray-800 whitespace-nowrap">
                              {index + 1}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 text-left whitespace-nowrap">
                              {user.fname}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 text-left whitespace-nowrap">
                              {user.email}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                              <a
                                className="text-green-500 hover:text-green-700"
                                href="#"
                              >
                                {user.phone}
                              </a>
                            </td>
                            <td className="px-6 py-4 text-left whitespace-nowrap">
                              <button
                                type="button"
                                className="w-[100px] text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                onClick={() => {
                                  rejectuser(user._id);
                                }}
                              >
                                Reject
                              </button>
                            </td>
                            <td className="px-6 py-4 text-left whitespace-nowrap">
                              <button
                                type="button"
                                className="w-[100px] text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
                                onClick={() => {
                                  acceptreq(user._id);
                                }}
                              >
                                Accept
                              </button>
                            </td>

                            <td className="px-3 py-4 text-left whitespace-nowrap">
                              <div>
                                {/* Modal toggle */}
                                <button
                                  onClick={() => {
                                    toggleModal(index);
                                  }}
                                  className="block text-white bg-sky-300 hover:bg-sky-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-500 dark:focus:ring-green-100"
                                  type="button"
                                >
                                  View
                                </button>

                                {/* Main modal */}
                                {isModalOpen && index == singlemodal ? (
                                  <div
                                    id="static-modal"
                                    data-modal-backdrop="static"
                                    tabIndex="-1"
                                    aria-hidden="true"
                                    className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-full bg-blue-300 bg-opacity-50"
                                  >
                                    <div className="relative p-4 w-full max-w-2xl">
                                      {/* Modal content */}
                                      <div className="relative bg-white rounded-lg shadow dark:bg-white-700">
                                        {/* Modal header */}
                                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            <img
                                              src={user?.image}
                                              alt=""
                                              className="w-40 h-40"
                                            />
                                            <h1 className="text-black">
                                              {" "}
                                              {user?.fname} {user?.lname}
                                            </h1>
                                          </h3>
                                          <button
                                            onClick={hideModal}
                                            type="button"
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
                                          <div className="flex flex-col items-start md:mt-3">
                                            <div className="mb-2">
                                              <span className="font-bold text-lg">
                                                Company Name:
                                              </span>
                                              {user?.companyname}
                                            </div>
                                            <div className="mb-2">
                                              <span className="font-bold text-lg">
                                                Email:
                                              </span>{" "}
                                              {user && user.email}
                                            </div>
                                            <div className="mb-2">
                                              <span className="font-bold text-lg">
                                                Phone:
                                              </span>{" "}
                                              {user?.phone}
                                            </div>
                                            <div className="mb-2">
                                              <span className="font-bold text-lg">
                                                District:
                                              </span>
                                              {user?.district}
                                            </div>
                                            <div className="mb-2">
                                              <span className="font-bold text-lg">
                                                State:
                                              </span>
                                              {user?.state}
                                            </div>
                                            <div className="mb-2">
                                              <span className="font-bold text-lg">
                                                City:
                                              </span>{" "}
                                              {user?.city}
                                            </div>
                                            <div className="mb-2">
                                              <span className="font-bold text-lg">
                                                SubLocation:
                                              </span>
                                              {user?.sublocation}
                                            </div>
                                            <div>
                                              {ModalOpen ? (
                                                <>
                                                  <div className="modal ">
                                                    <div className=" w-96 h-64 bg-blue-400">
                                                      <img
                                                        src={user?.aadhaar}
                                                        alt=""
                                                      />
                                                    </div>

                                                    <button
                                                      onClick={closeModal}
                                                    >
                                                      Close
                                                    </button>
                                                  </div>
                                                </>
                                              ) : (
                                                <>
                                                  {" "}
                                                  <span className="font-bold">
                                                    Your Adhaar:
                                                  </span>
                                                  <button onClick={openModal}>
                                                    Open
                                                  </button>{" "}
                                                </>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                        {/* Modal footer */}
                                        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                          <button
                                            onClick={hideModal}
                                            type="button"
                                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                          >
                                            Back
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ) : null}
                              </div>
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
