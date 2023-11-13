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
  useEffect(() => {
    toast.success("entering into request");
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
      console.log(response.data, "response from making the change");
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
