import UserNav from "../Usernavbar/UserNav";
import { useNavigate } from "react-router-dom";
import { findBikes } from "../../../configure/Userinterceptor";
import { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import { useDispatch } from "react-redux";
import { isbookinpagefalse } from "../../../redux/NavbarSlice";

export default function Userhome() {
  const [bike, setbike] = useState([]);
  const navigate = useNavigate();
  const handleBookNow = () => {
    navigate("/bikeselect");
  };

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleClick = (index) => {
    setPage(index + 1);
  };

  const Dispatch = useDispatch();

  useEffect(() => {
    Dispatch(isbookinpagefalse());
    const bikelist = async () => {
      try {
        const response = await findBikes(page);

        if (response.data.success) {
          setbike(response.data.bikesdata);
          setPage(response.data.page);
          setTotalPages(response.data.totalPages);
        }
      } catch (error) {
        console.error(error);
      }
    };

    bikelist();
  }, []);
  return (
    <div className="">
      <div className="hidden md:block ">
        <UserNav />
        <div className="relative pt-[5rem] lg:pt-[6rem]  ">
          <div>
            <img
              src="/static/Images/cbr650r-homebanner_new5.jpg"
              alt=""
              className="mx-auto"
            />

            <img
              src="/static/Images/cbr650r.png"
              alt=""
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-4 lg:mt-8 "
            />
            <img
              src="/static/Images/istockphoto-1180824340-612x612-removebg-preview.png"
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
            src="/static/Images/cbr650r-homebanner_new5.jpg"
            alt=""
            className="mx-auto"
          />
          <img
            src="/static/Images/cbr650r.png"
            // src="'../../../../public/Images/cbr650r.png"
            alt=""
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-4 lg:mt-8 pb-[35rem] md:pb-[18rm] "
          />
          <img
            src="/static/Images/istockphoto-1180824340-612x612-removebg-preview.png"
            // src="../../../../public/Images/istockphoto-1180824340-612x612-removebg-preview.png"
            alt=""
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-4 lg:mt-8 w-36  pb-[32rem] md:pb-[29rem] hover:scale-90 ease-in duration-100 cursor-pointer"
            onClick={handleBookNow}
          />
        </div>
      </div>

      <div className=" bg-black flex flex-col items-center">
        <h1 className="text-green-400 text-4xl mt-8 mb-4 font-extrabold">
          Bikes Gallery
        </h1>
        <div className="flex flex-wrap justify-center">
          {bike.map((value) => {
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

        <div className="max-w-[1600px] bg-gray-500 flex justify-center">
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
      <Footer />
    </div>
  );
}
