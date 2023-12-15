import UserNav from "../Usernavbar/UserNav";
import { FiSearch } from "react-icons/fi";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import { getbikes, Datesfind } from "../../../configure/Userinterceptor";
import { useState, useEffect } from "react";
import bikelist, {
  addBiks,
  price,
  districts,
  citys,
  States,
  Search,
} from "../../../redux/bikelist";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function Bikeselect() {
  const dispatch = useDispatch();
  const [district, setDistrict] = useState([]);
  const [bike, setBike] = useState([]);
  const [City, setCity] = useState([]);
  const [states, setStates] = useState([]);
  const [datecity, setdatecity] = useState("");
  const bikes = useSelector((value) => value.BikeSlice);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [Startingdate, Setstartingdate] = useState();
  const [Endingdate, Setendingdate] = useState();

  const [checkState, setCheckState] = useState("check");
  const [checkDistrict, setcheckDistrict] = useState("check");

  const [startime, Setstartime] = useState();
  const [Endtartime, Setendtime] = useState();
  const [refresh, setrefresh] = useState(false);
  const [apply, setApply] = useState(false);
  const navigate = useNavigate();

  const lastItemIndex = currentPage * itemsPerPage;
  const firstIndex = lastItemIndex - itemsPerPage;
  const thisPageItems = bikes.slice(firstIndex, lastItemIndex);

  const pages = [];
  for (let i = 1; i <= Math.ceil(bikes.length / itemsPerPage); i++) {
    pages.push(i);
  }

  useEffect(() => {
    const bikelist = async () => {
      try {
        const response = await getbikes();
        if (response.data.success) {
          const data = response.data.bikesdata;
          dispatch(addBiks(data));
          setBike(data);
          const mapping = data.map((value) => value.ownerid.district);
          const uniqueCities = Array.from(new Set(mapping));
          setDistrict(uniqueCities);
          const findCity = data.map((value) => value.ownerid.city);
          const uniqueCity = Array.from(new Set(findCity));
          setCity(uniqueCity);
          const findState = data.map((value) => value.ownerid.state);
          const uniqueState = Array.from(new Set(findState));
          setStates(uniqueState);
        }
      } catch (error) {
        console.error(error);
      }
    };

    bikelist();
  }, [dispatch, refresh]);

  const datesfind = async () => {
    try {
      if (startime == null) {
        toast.error("please add start time");
      } else if (Startingdate == null) {
        toast.error("please add start Date");
      } else if (Endtartime == null) {
        toast.error("please add Drop Time");
      } else if (Endingdate == null) {
        toast.error("please add Dend Date");
      } else if (datecity == "") {
        toast.error("please Select City");
      } else if (checkDistrict == "check") {
        toast.error("please Select District");
      } else if (states.length == null) {
        toast.error("please Select State");
      } else if (Endingdate < Startingdate) {
        toast.error("please Select properdate");
        return;
      } else if (startime >= Endtartime && Startingdate == Endingdate) {
        toast.error("please Select proper Time");
        return;
      } else if (checkState == "check") {
        toast.error("please Select State");
      } else {
        const data = {
          picktime: startime,
          pickupdate: Startingdate,
          dropdate: Endingdate,
          DropTime: Endtartime,
          city: datecity,
        };
        const response = await Datesfind(data);
        if (response.data.success) {
          toast.success("Applyed");
          setApply(true);
          dispatch(addBiks(response.data.bikedata));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const pickupdate = (e) => {
    const data = e.target.value;
    Setstartingdate(data);
  };

  const picktime = (e) => {
    const data = e.target.value;
    Setstartime(data);
  };
  const dropdate = (e) => {
    const data = e.target.value;
    Setendingdate(data);
  };
  const DropTime = (e) => {
    const data = e.target.value;
    Setendtime(data);
  };

  const handleLowTOHigh = (e) => {
    const data = e.target.value;
    dispatch(price(data));
  };

  const handleDistrict = (e) => {
    const selectedDistrict = e.target.value;
    setcheckDistrict(selectedDistrict);
    dispatch(addBiks(bike));

    // If a district is selected, filter the cities based on the selected district
    if (selectedDistrict) {
      const citiesInDistrict = bike
        .filter((value) => value.ownerid.district === selectedDistrict)
        .map((value) => {
          console.log(value);
          return value.ownerid.city;
        });
      setCity([...new Set(citiesInDistrict)]);
    } else {
      // If no district is selected, display all cities
      const allCities = bike.map((value) => value.ownerid.city);
      setCity([...new Set(allCities)]);
    }

    dispatch(districts(selectedDistrict));
  };

  const handleCity = (e) => {
    const selectedCity = e.target.value;
    setCheckState(selectedCity);
    setdatecity(e.target.value);
    dispatch(addBiks(bike));

    // If a city is selected, filter the districts based on the selected city
    if (selectedCity) {
      const districtsInCity = bike
        .filter((value) => value.ownerid.city === selectedCity)
        .map((value) => value.ownerid.district);
      setDistrict([...new Set(districtsInCity)]);
      // setcategoryset(selectedCity)
    } else {
      // If no city is selected, display all districts
      const allDistricts = bike.map((value) => value.ownerid.district);
      setDistrict([...new Set(allDistricts)]);
    }

    dispatch(citys(selectedCity));
  };

  const handleSearch = (e) => {
    dispatch(addBiks(bike));
    dispatch(Search(e.target.value));
  };

  const handleState = (e) => {
    const selectedState = e.target.value;
    dispatch(addBiks(bike));

    // If a state is selected, filter the districts based on the selected state
    if (selectedState) {
      toast.success(selectedState);
      const districtsInState = bike
        .filter((value) => value.ownerid.state === selectedState)
        .map((value) => value.ownerid.district);
      setDistrict([...new Set(districtsInState)]);
    } else {
      // If no state is selected, display all districts
      const allDistricts = bike.map((value) => value.ownerid.district);
      setDistrict([...new Set(allDistricts)]);
    }

    dispatch(States(selectedState));
  };

  const booking = (bikedetail) => {
    if (!apply) {
      toast.error("please Click Apply Button");
      return;
    } else {
      const bookingData = {
        picktime: startime,
        pickupdate: Startingdate,
        dropdate: Endingdate,
        DropTime: Endtartime,
        city: datecity,
        BikeId: bikedetail,
      };
      navigate("/bikebooking", {
        state: bookingData,
      });
    }
  };
  return (
    <div className="container ">
      <div className="h-20 lg:h-24 ">
        <UserNav />
      </div>
      <div className=" bg-red-600">
        <div className="flex flex-wrap sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4 p-4">
          <div className="flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                onChange={handleSearch}
                className="border-2 border-gray-300 pl-8 pr-2 py-2 ml-2 rounded-md w-44 lg:w-52"
              />
              <div className="absolute left-2 top-2">
                <FiSearch className="h-5 w-5 ml-2 mt-1 text-gray-500" />
              </div>
            </div>
          </div>

          <div className="flex items-center ">
            <select
              onChange={(e) => {
                handleLowTOHigh(e);
              }}
              className="border-2 border-gray-300 ml-2 p-2 rounded-md w-44"
            >
              <option value="">Select Price</option>
              <option value="low">Low To High</option>
              <option value="high">High To Low</option>
            </select>
          </div>

          <div>
            <select
              onChange={handleState}
              className="border-2 border-gray-300 ml-2 p-2 rounded-md w-44"
            >
              <option value="">Select State</option>
              {states.map((value, index) => (
                <option key={index} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center">
            <select
              onChange={handleDistrict}
              className="border-2 border-gray-300 ml-2 p-2 rounded-md w-44"
            >
              <option value="">Select District</option>
              {district.map((value, index) => (
                <option key={index} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center">
            <select
              onChange={handleCity}
              className="border-2 border-gray-300 ml-2 p-2 rounded-md w-44"
            >
              <option value="">Select City</option>
              {City.map((value, index) => (
                <option key={index} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className=" bg-red-600 mt-1">
        <div className="flex flex-wrap sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 p-4">
          <div className="flex items-center">
            <input
              type="date"
              onChange={pickupdate}
              className="border-2 border-gray-300 ml-2 p-2 rounded-md"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div className="flex items-center">
            <select
              onChange={picktime}
              className="border-2 border-gray-300 ml-2 p-2 rounded-md w-44"
            >
              <option value="">Select PickUpTime</option>
              <option value="06:00 AM">06:00 AM</option>
              <option value="07:00 AM">07:00 AM</option>
              <option value="08:00 AM">08:00 AM</option>
              <option value="09:00 AM">09:00 AM</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="11:00 AM">11:00 AM</option>
              <option value="12:00 PM">12:00 PM</option>
              <option value="01:00 PM">01:00 PM</option>
              <option value="02:00 PM">02:00 PM</option>
              <option value="03:00 PM">03:00 PM</option>
              <option value="04:00 PM">04:00 PM</option>
              <option value="05:00 PM">05:00 PM</option>
              <option value="06:00 PM">06:00 PM</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="date"
              onChange={dropdate}
              className="border-2 border-gray-300 ml-2 p-2 rounded-md"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div className="flex items-center">
            <select
              onChange={DropTime}
              className="border-2 border-gray-300 ml-2 p-2 rounded-md w-44"
            >
              <option value="">Select DropTime</option>
              <option value="06:00 AM">06:00 AM</option>
              <option value="07:00 AM">07:00 AM</option>
              <option value="08:00 AM">08:00 AM</option>
              <option value="09:00 AM">09:00 AM</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="11:00 AM">11:00 AM</option>
              <option value="12:00 PM">12:00 PM</option>
              <option value="01:00 PM">01:00 PM</option>
              <option value="02:00 PM">02:00 PM</option>
              <option value="03:00 PM">03:00 PM</option>
              <option value="04:00 PM">04:00 PM</option>
              <option value="05:00 PM">05:00 PM</option>
              <option value="06:00 PM">06:00 PM</option>
            </select>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            onClick={datesfind}
          >
            Apply
          </button>
        </div>
      </div>

      <div className="   bg-black flex flex-col items-center">
        <h1 className="text-green-400 text-4xl mt-8 mb-4 font-extrabold">
          Available Bikes
        </h1>
        <div className="flex flex-wrap justify-center">
          {thisPageItems.map((value) => {
            return (
              <div
                key={value.id}
                className="w-full sm:w-72 h-96 bg-red-550 custom-shadow m-3 rounded-md border-2 border-red-700"
              >
                <img
                  src={value.image}
                  alt=""
                  className="w-full h-40 object-cover rounded-t-md"
                />

                <h1 className="font-bold text-center text-lg uppercase  text-white ">
                  {value.Bikename}
                </h1>
                <div className="p-3">
                  <h1 className="font-bold text-white ">Brand-{value.brand}</h1>
                  <h1 className="font-bold  text-white">
                    Engine-{value.VehicleCC}
                  </h1>
                  <h1 className="font-bold  text-white">
                    Fuel Type-{value.FuelType}
                  </h1>
                  <h1 className="font-bold  text-white">
                    Rent-{value.RentPerDay}
                  </h1>
                  <h1 className="font-bold  text-white">Amount 24 Per Hour</h1>
                  <button>
                    <h1
                      className="font-bold text-white text-center mt-4 box-border h-10 w-full bg-red-600 md:w-64 pt-2 border border-sky-400 hover:bg-sky-500 transition-colors duration-300 ease-in-out rounded cursor-pointer"
                      onClick={() => booking(value)}
                    >
                      Book Now
                    </h1>
                  </button>
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
