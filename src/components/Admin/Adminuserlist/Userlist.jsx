import Dashboard from "../Dashboard/Admindashb";
import {
  finduser,
  statuschangeuser,
} from "../../../configure/Admininterceptor";
import { useEffect, useState } from "react";
export default function Userlist() {
  const [user, setUser] = useState([]);

  const findUser = async () => {
    try {
      const response = await finduser();
      if (response.data.success) {
        setUser(response.data.userdata);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    findUser();
  }, []);

  const bolockorunblock = async (id) => {
    try {
      const response = await statuschangeuser(id);
      if (response.data.success) setUser(response.data.userdata);
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
        <h1 className="font-extrabold font-serif flex justify-center text-3xl ">
          User List
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
                        Phone
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3  text-xs font-bold text-left text-gray-800 uppercase "
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {user.length >= 0 &&
                      user.map((user, index) => {
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
                            <td className="px-6 py-4 text-sm font-medium  text-left whitespace-nowrap">
                              <a
                                className="text-green-500 hover:text-green-700"
                                href="#"
                              >
                                {user.phone}
                              </a>
                            </td>

                            <td className="px-6 py-4  text-left whitespace-nowrap">
                              {user.status ? (
                                <button
                                  type="button"
                                  className=" w-[100px] text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                  onClick={() => {
                                    bolockorunblock(user._id);
                                  }}
                                >
                                  Block
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  className=" w-[100px] mtext-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
                                  onClick={() => {
                                    bolockorunblock(user._id);
                                  }}
                                >
                                  Unblock
                                </button>
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
