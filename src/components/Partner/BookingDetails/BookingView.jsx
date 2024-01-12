import { useState } from "react";
import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom";
export default function BookingView() {
    const navigate=useNavigate()
    const[Data,setData]=useState([])
    const location=useLocation()
    const datas=location.state
    Data.push(datas)
    console.log(Data,"datasdatasdatas");
    const returnpage=()=>{
        navigate('/partner/getbooking')
    }

 
      const [isModalOpen, setIsModalOpen] = useState(false);
    
      const openModal = () => {
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = 'visible'; // Enable scrolling when modal is closed
      };
    
  return (
    <div>
          <div className="h-16 w-screen bg-green-400">
        <img
          src="/static/Images/pngwing.com.png"
          className="w-14 h-14 pt-3 pl-3 "
          alt="image"
        onClick={returnpage}/>
      </div>
       <div className="mt-8 md:mt-8 h-auto lg:h-[35rem] flex flex-col lg:flex-row justify-center items-center">
        <div
          className="w-full lg:w-[50rem] mt-12 lg:mt-28 h-full lg:ml-14   mb-3 lg:mb-0 lg:mr-3 flex flex-col items-center lg:items-center pt-5 custom-shadow"
          
        >
          <h2 className="text-3xl font-bold mb-4 text-center md:text-center">
            Booking Details
          </h2>

          <div className="w-full mt-3 lg:mt-0  lg:w-[45rem] h-auto   mb-3 lg:mb-0 lg:mr-3 flex flex-col lg:flex-row">
          
            <div
              
              className="w-full lg:w-[40%] md:h-[130%] lg:h-[100%] flex flex-col justify-center items-center shadow-xl bg-slate-100"
            >
              <h1 className="text-2xl font-bold mb-4">
              {Data[0].bike.bike.Bikename}
              </h1>
              <img
                src={Data[0].bike.bike.image}
                className="w-64 h-48 mb-3 hover:scale-125 transform-gpu transition-transform duration-500 ease-in-out"
                alt=""
              />
            </div>

            <div className="w-full lg:w-[60%] md:h-[130%] lg:h-[100%] py-6 shadow-xl bg-slate-100 ">
              <div className="flex flex-col justify-between pl-2 pr-2">
                <p className="text-lg font-medium flex flex-row justify-between">
                  <span>{Data[0].bike.pickUpDate}</span>
                  <p className="bg-green-500 p-1">TO</p>
                  <span>{Data[0].bike.dropDate}</span>
                </p>
                
                <p className="text-lg font-medium flex flex-row justify-between">
                <span>{Data[0].bike.PickupTime}</span>

                  <span>{Data[0].bike.dropTime}</span>
                </p>
                <p className="text-lg font-medium flex flex-row justify-between">
                  <span>Pick up point</span>
                  <span>{Data[0].bike.bike.Sublocation}</span>
                </p>

                <p className="text-lg font-medium flex flex-row justify-between">
                  <span>Drop up point</span>
                  <span>{Data[0].bike.bike.Sublocation}</span>
                </p>

                <p className="text-lg font-medium flex flex-row justify-between pt-1">
                  <span>Total Rent</span>
                  <span>₹{Data[0].bike.TotalAmount}</span>
                </p>

                <p className="text-lg font-medium flex flex-row justify-between pt-1">
                  <span>Number of Helmet (?)</span>
                   <span>{Data[0].bike.helmet}</span>
                </p>
                <p className="text-lg font-medium flex flex-row justify-between">
                  <span>Plate Number</span>
                  <span>{Data[0].bike.bike.platenumber}</span>
                </p>
                <p className="text-lg font-medium flex flex-row justify-between">
                  <span>CGST</span>
                  <span>₹:{Data[0].bike.Cgst}</span>
                </p>
                <p className="text-lg font-medium flex flex-row justify-between">
                  <span>SGST</span>
                  <span>₹:{Data[0].bike.Sgst}</span>
                </p>
                <p className="text-lg font-medium flex flex-row justify-between">
                  <span>GrandTotal</span>
                  <span className="font-extrabold text-green-800 text-xl">₹:{Data[0].bike.grandTotal}</span>
                </p>
                <div>
                  <div>
                  <p className="text-lg font-medium flex flex-row justify-between">
                  <span>Customer Licencel</span>
                 
      <button
        onClick={openModal}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Open 
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              onClick={closeModal}
              className="fixed inset-0 transition-opacity"
            >
              <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              {/* Modal content goes here */}
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  {/* Your modal content goes here */}
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Licence Frontside
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 ">
                        <img src=  {Data[0].bike.user.licenseFrontSide} alt="" className=""/>
                     
                      </p>
                    </div>
                  </div>
                 
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Licence Backside
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        <img src=  {Data[0].bike.user.licenseBackSide} alt=""/>
                     
                      </p>
                    </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={closeModal}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </p>
       </div>
    </div>
              </div>
            </div>
           
          
          </div>
        </div>
      </div>

    </div>
  )
}
