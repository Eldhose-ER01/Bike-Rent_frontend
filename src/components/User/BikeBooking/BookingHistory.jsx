import UserNav from "../Usernavbar/UserNav";
import Footer from "../Footer/Footer";
import { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useLocation } from "react-router-dom";

export default function BookingHistory() {
  const location = useLocation();
  const bookingData = location.state;
  console.log(bookingData, "dhhdiufhh");
  const pdfRef = useRef();
  const [Data, setData] = useState(bookingData);

  console.log(Data,"awsedfghjk");

  const downloadPdf = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imagedata = canvas.toDataURL("img/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imagedata,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("invoice.pdf");
    });
  };

  return (
    <div>
      <div>
        <UserNav />
      </div>

      <div className="mt-8 md:mt-16 h-auto lg:h-[35rem] flex flex-col lg:flex-row justify-center items-center">
        <div
          className="w-full lg:w-[50rem] mt-12 lg:mt-28 h-full lg:ml-14   mb-3 lg:mb-0 lg:mr-3 flex flex-col items-center lg:items-center pt-5 custom-shadow"
          ref={pdfRef}
        >
          <h2 className="text-3xl font-bold mb-4 text-center md:text-center">
            Booking Summary
          </h2>

          <div className="w-full mt-3 lg:mt-0  lg:w-[45rem] h-auto   mb-3 lg:mb-0 lg:mr-3 flex flex-col lg:flex-row">
          
            <div
              
              className="w-full lg:w-[40%] md:h-[130%] lg:h-[100%] flex flex-col justify-center items-center shadow-xl bg-slate-100"
            >
              <h1 className="text-2xl font-bold mb-4">
              {Data?.bike?.bike?.Bikename}
              </h1>
              <img
                src={Data.bike.bike.image}
                className="w-64 h-48 mb-3 hover:scale-125 transform-gpu transition-transform duration-500 ease-in-out"
                alt=""
              />
            </div>

            <div className="w-full lg:w-[60%] md:h-[130%] lg:h-[100%] py-6 shadow-xl bg-slate-100 ">
              <div className="flex flex-col justify-between pl-2 pr-2">
                <p className="text-lg font-medium flex flex-row justify-between">
                  <span>{Data.bike.pickUpDate}</span>
                  <span>{Data.bike.dropDate}</span>
                </p>

                <p className="text-lg font-medium flex flex-row justify-between">
                <span>{Data.bike.PickupTime}</span>

                  <span>{Data.bike.dropTime}</span>
                </p>
                <p className="text-lg font-medium flex flex-row justify-between">
                  <span>Pick up point</span>
                  <span>{Data.bike.bike.Sublocation}</span>
                </p>

                <p className="text-lg font-medium flex flex-row justify-between">
                  <span>Drop up point</span>
                  <span>{Data.bike.bike.Sublocation}</span>
                </p>

                <p className="text-lg font-medium flex flex-row justify-between pt-1">
                  <span>Total Rent</span>
                  <span>₹{Data.bike.TotalAmount}</span>
                </p>

                <p className="text-lg font-medium flex flex-row justify-between pt-1">
                  <span>Number of Helmet (?)</span>
                   <span>{Data.bike.helmet}</span>
                </p>

                <p className="text-lg font-medium flex flex-row justify-between">
                  <span>Owner Name</span>
                  <span>{Data.bike.user.fname}</span>
                </p>
                <p className="text-lg font-medium flex flex-row justify-between">
                  <span>Plate Number</span>
                  <span>{Data.bike.bike.platenumber}</span>
                </p>
                <p className="text-lg font-medium flex flex-row justify-between">
                  <span>CGST</span>
                  <span>₹:{Data.bike.Cgst}</span>
                </p>
                <p className="text-lg font-medium flex flex-row justify-between">
                  <span>SGST</span>
                  <span>₹:{Data.bike.Sgst}</span>
                </p>
                <p className="text-lg font-medium flex flex-row justify-between">
                  <span>GrandTotal</span>
                  <span className="font-extrabold text-green-800 text-xl">₹:{Data.bike.grandTotal}</span>
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
           
          
          </div>
        </div>
      </div>

      
      <div className="flex justify-center mt-16 mb-6">
        <button
          className="bg-red-600 hover:bg-green-600 text-white py-2 px-4 rounded text-xl"
          onClick={downloadPdf}
        >
          Download Pdf
        </button>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
