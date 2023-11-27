import UserNav from "../Usernavbar/UserNav";
import { useNavigate } from "react-router-dom";
import { getbikes } from "../../../configure/Userinterceptor";
import { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
export default function Userhome() {
  const [bike, setbike] = useState([]);
  const navigate = useNavigate();
  const handleBookNow = () => {
    navigate("/bikeselect");
  };

  useEffect(() => {
    const bikelist = async () => {
      try {
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
          {bike.map((value) => {
            return (
              <div key={value.id} className="w-full sm:w-72 h-80 bg-red-550 custom-shadow m-3 rounded-md border-2 border-red-700">
                <img
                  src="https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW90b3JiaWtlfGVufDB8fDB8fHww"
                  alt=""
                  className="w-full h-40 object-cover rounded-t-md"
                />
                <h1 className="font-bold text-center text-lg uppercase text-white">
                  {value.Bikename}
                </h1>
                <div className="p-3">
                  <h1 className="font-bold text-green-400">Brand-{value.brand}</h1>
                  <h1 className="font-bold text-green-400">Engine CC-{value.VehicleCC}</h1>
                  <h1 className="font-bold text-green-400">Fuel Type-{value.FuelType}</h1>
                  <h1 className="font-bold text-green-400">
                   Rent Amount 24 Per Hour
                  </h1>
                </div>
              </div>
            );
          })}
        </div>
      </div>
<Footer />

    </div>
  );
}
