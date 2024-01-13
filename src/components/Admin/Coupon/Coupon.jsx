import { useNavigate } from "react-router-dom";
import Dashboard from "../Dashboard/Admindashb";
import { findCoupons, couponsblock } from "../../../configure/Admininterceptor";
import { useState, useEffect } from "react";
import { isbookinpagefalse } from "../../../redux/NavbarSlice";
import { useDispatch } from "react-redux";

import toast from "react-hot-toast";
export default function Coupon() {
  const Dispatch = useDispatch();

  const navigate = useNavigate();
  const [coupon, setCoupon] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleClick = (index) => {
    setPage(index + 1);
  };
  const findcoupon = async () => {
    try {
      const response = await findCoupons(page);
      if (response.data.success) {
        setCoupon(response.data.findcoupon);
        setPage(response.data.page);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Dispatch(isbookinpagefalse());

    findcoupon();
  }, [page]);

  const addcoupon = () => {
    navigate("/admin/addcoupon");
  };

  const bolockorunblock = async (id) => {
    const response = await couponsblock(id);
    if (response.data.success) {
      toast.success("status Changed");
      setCoupon(response.data.datas);
    }
  };
  return (
    <div style={{ display: "flex" }} className="w-screen">
      <div style={{ flex: 1 }}>
        <Dashboard />
      </div>

      <div className="container mt-5 pr-10">
        <h1 className="font-extrabold font-serif flex justify-center text-3xl ">
          Coupon Management
        </h1>
        <div className="ml-4 mt-5">
          <button
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            onClick={addcoupon}
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Add Coupon
            </span>
          </button>
        </div>
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
                        Coupon Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-800 uppercase "
                      >
                        Discount
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-800 uppercase "
                      >
                        Max Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-800 uppercase "
                      >
                        Coupon Code
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-800 uppercase "
                      >
                        Expiry Date
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
                    {coupon.length > 0 &&
                      coupon.map((coupon, index) => (
                        <tr key={coupon._id}>
                          <td className="px-6 py-4 text-sm text-left font-medium text-gray-800 whitespace-nowrap">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 text-sm  text-left whitespace-nowrap text-blue-500 font-bold">
                            {coupon.couponName}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 text-left whitespace-nowrap font-bold">
                            {coupon.discountamount}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                            <a
                              className="text-green-500 hover:text-green-700"
                              href="#"
                            ></a>
                            {coupon.maximumpurchase}
                          </td>
                          <td className="px-6 py-4 text-sm font-bold text-green-500 text-left whitespace-nowrap">
                            {coupon.couponCode}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                            <a
                              className="text-green-500 hover:text-green-700"
                              href="#"
                            ></a>
                            {coupon.experirydate}
                          </td>
                          <td className="px-6 py-4  text-left whitespace-nowrap">
                            {coupon.status ? (
                              <button
                                type="button"
                                className="w-[100px] text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                onClick={() => {
                                  bolockorunblock(coupon._id);
                                }}
                              >
                                Block
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="w-[100px] text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
                                onClick={() => {
                                  bolockorunblock(coupon._id);
                                }}
                              >
                                Unblock
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="max-w-[1600px] bg-gray-100 flex justify-center mt-4">
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
