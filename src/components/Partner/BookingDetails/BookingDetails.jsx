import { useState,useEffect } from "react"
import { Getbooking } from "../../../configure/Partnerinterceptor"
import Partnerdash from "../Partnerdashboard/Partnerdash"
import { useNavigate } from "react-router-dom"
export default function BookingDetails() {
    const[bookingData,setBookingData]=useState([])
    const navigate=useNavigate()

   const finddata=async()=>{
   const response=await Getbooking()
   if(response.data.success)
   setBookingData(response.data.booking)
   }
   useEffect(() => {
    finddata()
   }, [])
   console.log(bookingData,"bbbb");

  
  const statuschange=()=>{
    
  }

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
                                {data. paymentMethod}
                              </a>
                            </td>

                            <td className="px-6 py-4  text-left whitespace-nowrap uppercase">
                              
                            <button
                                type="button"
                                className=" w-[100px] text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                              >
                                                              {data.status}

                              </button>
                               
                            </td>
                            <td className="px-6 py-4 text-sm font-medium  text-left whitespace-nowrap">
                              <button
                                type="button"
                                className=" w-[100px] text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                              >
                                Cancel
                              </button>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium  text-left whitespace-nowrap">
                            <button type="button" className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                            onClick={() => {
                                navigate("/partner/bookingview", {
                                  state: { bike: data },
                                });
                              }}>
                             View</button>
                            </td>
                          </tr>
                         )
                      })} 
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
