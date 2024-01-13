import { useEffect, useState } from "react";
import { WalletHistorys } from "../../../configure/Userinterceptor";
import UserNav from "../Usernavbar/UserNav";
export default function WalletHistory() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const handleClick = (index) => {
    setPage(index + 1);
  };

  const datas = async () => {
    try {
      const response = await WalletHistorys(page);
      if (response.data.success) setData(response.data.history);
      setPage(response.data.page);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    datas();
  }, [page]);
  return (
    <div>
      <div>
        <UserNav />
      </div>
      <div className="flex flex-col mt-24">
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
                      BikeName
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-800 uppercase "
                    >
                      Bike Number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-800 uppercase "
                    >
                      Dates
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3  text-xs font-bold text-left text-gray-800 uppercase "
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3  text-xs font-bold text-left text-gray-800 uppercase "
                    >
                      Payment Method
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3  text-xs font-bold text-left text-gray-800 uppercase "
                    >
                      Toatal Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.length >= 0 &&
                    data.map((data, index) => {
                      return (
                        <tr key={data._id}>
                          <td className="px-6 py-4 text-sm text-left font-medium text-gray-800 whitespace-nowrap">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 text-sm font-bold text-gray-800 text-left whitespace-nowrap">
                            {data.bike.Bikename}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 text-left whitespace-nowrap">
                            {data.bike.platenumber}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium  text-left whitespace-nowrap">
                            <a
                              className="text-green-500 hover:text-green-700"
                              href="#"
                            >
                              {data.pickUpDate} to {data.dropDate}
                            </a>
                          </td>

                          <td className="px-6 py-4 text-sm text-gray-800 text-left whitespace-nowrap">
                            {data.status}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 text-left whitespace-nowrap">
                            {data.paymentMethod}
                          </td>
                          <td className="px-6 py-4 text-xl font-semibold text-gray-800 text-left whitespace-nowrap">
                            ₹:{data.grandTotal}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="max-w-[1600px] bg-gray-100 flex justify-center mt-8">
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
  );
}
