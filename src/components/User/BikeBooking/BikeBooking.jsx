import { useState, useEffect, useRef } from "react";
import UserNav from "../Usernavbar/UserNav";
import { useLocation } from "react-router-dom";
import Timecalculate from "./TimeCalculation";
import { useNavigate } from "react-router-dom";
import { Applycoupon, Bookingsdatas,alredybook } from "../../../configure/Userinterceptor";
import Footer from "../Footer/Footer";
import "./Style.css";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { isbookinpagetrue } from "../../../redux/NavbarSlice";

export default function BikeBooking() {
  const location = useLocation();
  const bookingData = location.state;

  const navigate = useNavigate();
 const Dispatch=useDispatch()
  // Now, you can access bookingData and use it in your component
  const [bikesdata, setBikedata] = useState([bookingData]);
  const [totalTime, setTotalTime] = useState("");
  const [totalAmount, setAmount] = useState();
  const [finalAmount, setFinalAmount] = useState("");
  const [sgst, setsgst] = useState("");
  const [cgst, setcgst] = useState("");
  const [helmet, sethelmet] = useState(1);
  const [couponAmount,setCouponAmount] = useState(0)
 const codeRef = useRef()

  // const amount=totalTime*bikesdata.BikeId.RentPerDay
  // setAmount(amount)

  useEffect(() => {
    Dispatch(isbookinpagetrue())
    console.log(bikesdata, "this is bike data");
    const time = Timecalculate(
      bikesdata[0].picktime,
      bikesdata[0].pickupdate,
      bikesdata[0].dropdate,
      bikesdata[0].DropTime
    );
    setTotalTime(time);
    const amount = time * bikesdata[0].BikeId.RentPerDay;
    setAmount(amount);

    Cgst(amount);
    Sgst(amount);
    const finalamounts = amount + cgst + sgst;
    setFinalAmount(finalamounts);
  }, [totalTime, totalAmount]);

  const [selectedMethod, setSelectedMethod] = useState("");

  const Cgst = (amount) => {
    setcgst(amount * (3 / 100));
  };
  const Sgst = (amount) => {
    setsgst(amount * (2 / 100));
  };
  const handleMethodSelect = (method) => {
    console.log(method, "this is payment ");
    setSelectedMethod(method);
  };
  const data = {
    finalAmount: finalAmount,
    sgst: sgst,
    cgst: cgst,
    totalAmount: totalAmount,
    helmet: helmet,
    Paymentmethod: selectedMethod,
    coupon:couponAmount
  };

  const finaldatas = [...bikesdata, data];

  const bookingsdata = async () => {
    try {
      console.log('jjjjjjjjjjjjjj')
      if (selectedMethod == "") {
        toast.error("Please Select Payment Method");
      } else {
        const res= await alredybook(finaldatas)
        console.log(res,'this is my resonne')
        if(res.data.success){
        const response = await Bookingsdatas(finaldatas);

        if (response.data.url) {
          window.location.href = response.data.url;

          if (response.data.success) {
            toast.success("Booking success");
          } else {
            toast.error("Booking failed");
          }
        } else if (response.data.wallet) {
          toast.success("Booking Started");
          navigate("/successbooking");
        } else if (response.data.notamount) {
          toast.error(response.data.notamount);
        } else if (response.data.messages) {
          toast.error(response.data.messages); // Display license error message
        }
      }else{
        toast.error("Allready Booked")
      }
    }
    } catch (error) {
      console.error("Error in bookingsdata:", error);
      // Handle errors on the front end
    }
  };
console.log(finaldatas,"bookingDatabookingData");
  
  const helmets = (e) => {
    sethelmet(e.target.value);
  };
const handleCoupon  =async()=>{
  try {
     if(codeRef.current.value){
 
        const data = {
          code:codeRef.current.value,
          amonut:finalAmount?finalAmount:""
        }
      await Applycoupon(data).then((res)=>{
        if(res.data.success){
          toast.success(res.data.message)
          setCouponAmount(res.data.amount)
        }else{
          toast.error(res.data.message)
        }
      })
     }else{
      toast.error("input feild is empty")
     }
  } catch (error) {
    toast.error(error.message)
  }
}
  return (
    <div>
      <div>
        <UserNav />
      </div>

      <div className="mt-8 md:mt-16 h-auto lg:h-[40rem] flex flex-col lg:flex-row justify-center items-center">
        <div className="w-full lg:w-[50rem] mt-10 lg:mt-0 h-full lg:ml-14 lg:h-[31rem]  mb-3 lg:mb-0 lg:mr-3 flex flex-col items-center lg:items-center pt-5 custom-shadow">
          <h2 className="text-3xl font-bold mb-4 text-center md:text-center">
            Booking Summary
          </h2>

          <div className="w-full mt-3 lg:mt-0  lg:w-[45rem] h-auto lg:h-96  mb-3 lg:mb-0 lg:mr-3 flex flex-col lg:flex-row">
            {bikesdata.map((value, index) => (
              <>
                <div
                  key={index}
                  className="w-full lg:w-[40%] md:h-[130%] lg:h-[100%] flex flex-col justify-center items-center shadow-xl bg-slate-100"
                >
                  <h1 className="text-2xl font-bold mb-4">
                    {value.BikeId.Bikename}
                  </h1>
                  <img
                    src={value.BikeId.image}
                    className="w-64 h-48 mb-3 hover:scale-125 transform-gpu transition-transform duration-500 ease-in-out"
                    alt=""
                  />
                </div>

                <div className="w-full lg:w-[60%] md:h-[130%] lg:h-[100%] py-6 shadow-xl bg-slate-100 ">
                  <div className="flex flex-col justify-between pl-2 pr-2">
                    <p className="text-lg font-medium flex flex-row justify-between">
                      <span>{value.pickupdate}</span>
                      <span>{value.dropdate}</span>
                    </p>

                    <p className="text-lg font-medium flex flex-row justify-between">
                      <span>{value.picktime}</span>
                      <span>{value.DropTime}</span>
                    </p>
                    <p className="text-lg font-medium flex flex-row justify-between">
                      <span>Pick up point</span>
                      <span>{value.BikeId.Sublocation}</span>
                    </p>

                    <p className="text-lg font-medium flex flex-row justify-between">
                      <span>Drop up point</span>
                      <span>{value.BikeId.Sublocation}</span>
                    </p>

                    <p className="text-lg font-medium flex flex-row justify-between pt-1">
                      <span>Total rent for {totalTime} Hours</span>
                      <span>Total Amount:{totalAmount}</span>
                    </p>

                    <p className="text-lg font-medium flex flex-row justify-between pt-1">
                      <span>Number of Helmet (?)</span>
                      <select
                        className="w-12 h-6 font-bold rounded-md bg-slate-300 "
                        onChange={(e) => {
                          helmets(e);
                        }}
                        value={helmet} // Add this line to set the selected value
                      >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                      </select>
                    </p>

                    <p className="text-lg font-medium flex flex-row justify-between">
                      <span>Owner Name</span>
                      <span>{value.BikeId.ownerid.fname}</span>
                    </p>
                    <p className="text-lg font-medium flex flex-row justify-between">
                      <span>Plate Number</span>
                      <span>{value.BikeId.platenumber}</span>
                    </p>

                    <p className="text-lg font-medium flex flex-row justify-between">
                      <span>Km limit (?)</span>
                      <span>120/km</span>
                    </p>

                    <p className="text-lg font-medium flex flex-row justify-between">
                      <span>Excess km charges (?)</span>
                      <span>4.0/km</span>
                    </p>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>

        {/* Additional Section */}
        <div className="w-full md:w-96 md:h-80 custom-shadow bg-slate-100 flex-col lg:mb-44 justify-between md:ml-4 ">
          <div>
            <p className="font-bold text-2xl text-center">Checkout</p>
            <div className="flex justify-between mt-6 pl-4 pr-4">
              <p className="font-medium text-lg">Booking Fee</p>

              <p>₹:{totalAmount}</p>
            </div>

            <div className="flex justify-between pl-4 pr-4 mt-1">
              <p className="font-medium text-lg">CGST (2%)</p>

              <p>₹:{cgst}</p>
            </div>

            <div className="flex justify-between pl-4 pr-4 mt-1">
              <p className="font-medium text-lg">SGST (1%)</p>

              <p className="flex">₹:{sgst}</p>
            </div>

            <div className="flex justify-between pl-4 pr-4 mt-1">
              <p className="font-medium text-lg">Discount Amount</p>

              <p>₹:{couponAmount}</p>
            </div>

            <div className="flex justify-between pl-4 pr-4 mt-1">
              <p className="font-medium text-lg">Wallet Amount</p>

              <p>₹:{bikesdata[0].wallet}</p>
            </div>

            <div className="flex  pl-4 pr-4 mt-5 w-80 h-16 bg-red-700 rounded-lg ml-8  justify-between items-center ">
              <input
                className="w-[15rem] ml-2 text-black placeholder:text-black p-1 rounded-md bg-slate-300 h-10  "
                type="text"
                name="code"
                placeholder="Enter Coupon Code"
                 ref={codeRef}
              />
              <button onClick={handleCoupon} className="font-bold ml-3 mb-1 text-green-400">
                Apply
              </button>
            </div>
          </div>
          <div></div>
          <div className="flex flex-col items-center mt-6 md:mt-8 w-full md:w-96  lg:h-56 pt-1 custom-shadow bg-slate-100">
            <h2 className="text-2xl font-bold mb-4">Choose Payment Method</h2>

            <div className="flex flex-col items-center space-y-4">
              <label className="payment-label font-bold">
                <input
                  type="radio"
                  value="wallet"
                  checked={selectedMethod === "wallet"}
                  onChange={() => handleMethodSelect("wallet")}
                />
                Wallet
              </label>

              <label className="payment-label font-bold">
                <input
                  type="radio"
                  value="online"
                  checked={selectedMethod === "online"}
                  onChange={() => handleMethodSelect("online")}
                />
                Online
              </label>
            </div>

            <div className="mt-4">
              <p className="text-lg font-bold">
                Total Amount:{" "}
                <span className="text-green-600" name="finalAmunt">
                  ₹:{finalAmount-couponAmount}
                </span>
              </p>
            </div>

            <button
              className="bg-green-500 text-white px-4 py-2 mt-4 rounded-md"
              // onClick={handlePayment}
              // disabled={!selectedMethod}
              onClick={bookingsdata}
            >
              Make Payment
            </button>
          </div>
        </div>
      </div>
      <div className="mt-1">
        <Footer />
      </div>
    </div>
  );
}
