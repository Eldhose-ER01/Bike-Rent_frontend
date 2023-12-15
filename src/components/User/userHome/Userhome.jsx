import UserNav from "../Usernavbar/UserNav";
import { useNavigate } from "react-router-dom";
import { getbikes } from "../../../configure/Userinterceptor";
import { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import toast from "react-hot-toast";

export default function Userhome() {
  const [bike, setbike] = useState([]);
  const navigate = useNavigate();
  const handleBookNow = () => {
    navigate("/bikeselect");
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstIndex = lastItemIndex - itemsPerPage;
  const thisPageItems = bike.slice(firstIndex, lastItemIndex);

  const pages = [];
  for (let i = 1; i <= Math.ceil(bike.length / itemsPerPage); i++) {
    pages.push(i);
  }

  useEffect(() => {
    const bikelist = async () => {
      try {
        toast.success("data")
        const response = await getbikes();

        if (response.data.success) {
          setbike(response.data.bikesdata);
        }
      } catch (error) {
        console.error(error);
      }
    };

    bikelist();
  }, []);
  return (
    <div className="w-screen">
      <div className="hidden md:block ">
        <UserNav />
        <div className="relative pt-[5rem] lg:pt-[6rem] w-screen ">
          <div>
            <img
              src="../../../../public/Images/cbr650r-homebanner_new5.jpg"
              alt=""
              className="mx-auto"
            />

            <img
              src="../../../../public/Images/cbr650r.png"
              alt=""
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-4 lg:mt-8 "
            />
            <img
              src="../../../../public/Images/istockphoto-1180824340-612x612-removebg-preview.png"
              alt=""
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-4 lg:mt-[10rem] h-40 w-46 scale-50 hover:scale-90 ease-in duration-300 cursor-pointer"
              onClick={handleBookNow}
            />
          </div>
        </div>
      </div>

      <div className=" md:hidden ">
        <UserNav />
        <div className="pt-[5rem] lg:pt-[6rem] lg:block">
          <img
            src="../../../../public/Images/cbr650r-homebanner_new5.jpg"
            alt=""
            className="mx-auto"
          />
          <img
            src="'../../../../public/Images/cbr650r.png"
            alt=""
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-4 lg:mt-8 pb-[35rem] md:pb-[18rm] "
          />
          <img
            src="../../../../public/Images/istockphoto-1180824340-612x612-removebg-preview.png"
            alt=""
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-4 lg:mt-8 w-36  pb-[32rem] md:pb-[29rem] hover:scale-90 ease-in duration-100 cursor-pointer"
            onClick={handleBookNow}
          />
        </div>
      </div>

      <div className="lg:w-screen bg-black flex flex-col items-center">
        <h1 className="text-green-400 text-4xl mt-8 mb-4 font-extrabold">
          Bikes Gallery
        </h1>
        <div className="flex flex-wrap justify-center">
          {thisPageItems.map((value) => {
            return (
              <div
                key={value.id}
                className="w-full sm:w-72 h-80 bg-red-550 custom-shadow m-3 rounded-md border-2 border-red-700"
              >
                <img
                  src={value.image}
                  alt=""
                  className="w-full h-40 object-cover rounded-t-md"
                />
                <h1 className="font-bold text-center text-lg uppercase text-white">
                  {value.Bikename}
                </h1>
                <div className="p-3">
                  <h1 className="font-bold text-green-400">
                    Brand-{value.brand}
                  </h1>
                  <h1 className="font-bold text-green-400">
                    Engine CC-{value.VehicleCC}
                  </h1>
                  <h1 className="font-bold text-green-400">
                    Fuel Type-{value.FuelType}
                  </h1>
                  <h1 className="font-bold text-green-400">
                    Rent Amount 24 Per Hour
                  </h1>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          {pages
            .slice(
              Math.max(currentPage - 2, 0),
              Math.min(currentPage + 1, pages.length)
            )
            .map((page, index) => (
              <button
                onClick={() => setCurrentPage(page)}
                key={index}
                className={`font-extrabold p-2 ${
                  currentPage === page
                    ? "text-4xl text-sky-300"
                    : "text-xl text-green-600"
                }`}
              >
                {page}
              </button>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
