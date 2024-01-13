import Dashboard from "../Dashboard/Admindashb";
import { useState, useEffect } from "react";
import { Rejectlists } from "../../../configure/Admininterceptor";
import { isbookinpagefalse } from "../../../redux/NavbarSlice";
import { useDispatch } from "react-redux";
export default function PartnerRejectlist() {
  const Dispatch = useDispatch();
  const [user, setUser] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleClick = (index) => {
    setPage(index + 1);
  };

  const findUser = async () => {
    try {
      const response = await Rejectlists(page);
      if (response.data.success) {
        setUser(response.data.datas);
        setPage(response.data.page);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Dispatch(isbookinpagefalse());
    findUser();
  }, [page]);
  return (
    <div style={{ display: "flex" }} className="w-screen">
      <div style={{ flex: 1 }}>
        <Dashboard />
      </div>

      <div className="container mt-5 pr-10">
        <h1 className="font-extrabold font-serif flex justify-center text-3xl ">
          Reject Partners
        </h1>
        <div></div>
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
                        Company Name
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {user.map((userData, index) => {
                      return (
                        <tr key={userData._id}>
                          <td className="px-6 py-4 text-sm text-left font-medium text-gray-800 whitespace-nowrap">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 text-left whitespace-nowrap">
                            {userData.fname}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 text-left whitespace-nowrap">
                            {userData.email}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                            <a
                              className="text-green-500 hover:text-green-700"
                              href="#"
                            >
                              {userData.phone}
                            </a>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                            <a
                              className="text-green-500 hover:text-green-700"
                              href="#"
                            >
                              {userData.companyname}
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="max-w-[1600px] bg-gray-100 flex justify-center mt-3">
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
