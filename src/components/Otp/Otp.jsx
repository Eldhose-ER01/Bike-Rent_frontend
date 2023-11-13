import { useEffect, useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Otpform } from "../../configure/Userinterceptor";
import toast from "react-hot-toast";
import { ResendOTP } from "../../configure/Userinterceptor";

export default function Otp() {
  
  const navigate = useNavigate();

  const location = useLocation();
  const value = location.state;

  const [wrongOTP, setWronotp] = useState("");
  const inputRef = useRef({});
  const [time, setTimer] = useState(20);
  const [otp, setOtp] = useState({
    digitOne: "",
    digitTwo: "",
    digitThree: "",
    digitFour: "",
    digitFive: "",
    digitSix: "",
  });

  const renderInput = () => {
    return Object.keys(otp).map((keys, index) => (
      <input
        ref={(element) => (inputRef.current[index] = element)}
        type="text"
        name={keys}
        className="w-16 h-12 rounded-md mr-3 text-center text-xl bg-black-400"
        onChange={(event) => handleChange(event, index)}
        value={otp[keys]}
        key={index}
        onKeyUp={(event) => handlebackspace(event, index)}
      />
    ));
  };

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    if (/[a-z]/gi.test(value)) return;

    setOtp((prev) => ({
      ...prev,
      [name]: value.slice(-1),
    }));

    if (value && index < 5) {
      inputRef.current[index + 1].focus();
    }
  };

  const handlebackspace = (event, index) => {
    if (index > 0) {
      if (event.key === "Backspace") {
        inputRef.current[index - 1].focus();
      }
    }
  };

  useEffect(() => {
    inputRef.current[0].focus();

    inputRef.current[0].addEventListener("paste", pasteText);

    // //   return () =>
    // //     inputRef.current[0].removeEventListener("paste", pasteText);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (time > 0) {
        setTimer(time - 1);
      }
    }, 1000);

    // Clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [time]);

  const pasteText = (event) => {
    const pastedText = event.clipboardData.getData("text");
    const feildvalues = {};
    Object.keys(otp).forEach((keys, index) => {
      feildvalues[keys] = pastedText[index];
    });
    setOtp(feildvalues);
    inputRef.current[5].focus();
  };

  const otpsubmit = async (e) => {
    try {
      e.preventDefault();

      const datas = { userdetails: value, otp: otp };
      const isOtpFilled = Object.values(otp).every(
        (value) => value.trim() !== ""
      );

      if (!isOtpFilled) {
        setWronotp("Please fill in all the fields");
        return;
      }
      const response = await Otpform(datas);
      if (response.data.success) {
        toast.success("Success Registration");
        navigate("/login");
      } else if (response.data.messages) {
        setWronotp(response.data.messages);
      } else {
        toast.error(`${(response.data.messsage, "error")}`);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const resendotp = async () => {
    const datas = { userdetails: value };
    const response = await ResendOTP(datas);
    if (response.data.success) {
      toast.success(`${response.data.messsage}`);
    } else {
      toast.error(`${(response.data.messsage, "error")}`);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="bg-sky-300 rounded-lg p-8 shadow-md w-full max-w-lg text-center flex flex-col justify-center h-[300px]">
        <div className="w-full h-[28%] flex justify-center">
          <h3 className="text-3xl md:text-3xl text-red-800">
            Please Enter Your OTP
          </h3>
        </div>
        <div className="md:flex md:space-x-3 flex justify-around h-[28%]">
          {renderInput()}
        </div>
        <div>
          {time > 0 ? (
            <p>{time}</p>
          ) : (
            <p
              className="font-bold text-xl"
              onClick={() => {
                setTimer(20);
                resendotp();
              }}
            >
              Resend
            </p>
          )}
          <button
            className="mt-4 w-full md:w-32 bg-[#3b3b3b] rounded hover:bg-red-300 border-solid text-white py-2 mx-auto"
            onClick={otpsubmit}
          >
            Verify
          </button>
        </div>
        {/* {errors.otp && (
                 <span style={{ color: "red" }}>Plese Fill OTP feild</span>
        )} */}
        {wrongOTP && <span style={{ color: "red" }}>{wrongOTP}</span>}
      </form>
    </div>
  );
}
