import UserNav from "../Usernavbar/UserNav";
import { usercoupon } from "../../../configure/Userinterceptor";
import { useState, useEffect } from "react";
export default function Offer() {
  const [coupon, setCoupon] = useState([]);
  const fincoupon = async () => {
    try {
      const response = await usercoupon();
      if (response.data.success) setCoupon(response.data.findcoupon);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fincoupon();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "visible"; // Enable scrolling when modal is closed
  };
  return (
    <div>
      <div>
        <UserNav />
      </div>
      {coupon.map((coupon, index) => {
        return (
          <div
            key={index}
            className=" flex justify-center items-center h-screen"
          >
            <div className="h-80 w-[30%] relative">
              <img
                src="https://www.postergully.com/cdn/shop/products/PG51_8e67dd99-366e-4e30-9d3e-2be0fa7c1ce8.jpeg?v=1578634270"
                className="w-[100%] h-[100%]"
                alt=""
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold pt-2">
                <h1 className="text-xl bg-black text-green-400 ">
                  {" "}
                  The offer Provided by
                </h1>
                <h1 className="bg-black "> {coupon.couponName}</h1>
              </div>
              <button
                className="absolute bottom-0 bg-green-500 text-white px-4 py-2 left-1/2 transform -translate-x-1/2 mb-2"
                onClick={openModal}
              >
                View Your Offer Code
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
                      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3
                              className="text-lg leading-6 font-medium text-gray-900 text-center mt-5"
                              id="modal-title"
                            >
                              This is Your Offer Code
                            </h3>
                            <h1 className="mt-3 pl-4">
                              But Maximum Purchase ₹:{coupon.maximumpurchase}
                            </h1>
                            <div className="mt-2">
                              <p className=" text-black font-bold text-xl">
                                {/* ₹:{user.wallet} */}
                                <div className="flex justify-center mt-4  bg-red-700 border-2">
                                  {coupon.couponCode}
                                </div>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                          onClick={closeModal}
                          type="button"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
