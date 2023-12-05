import { useEffect, useState } from "react";
import { partnersignup } from "../../../configure/Partnerinterceptor";
import { toast } from "react-hot-toast";
import Partnersuccess from "./Partnersuccess";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
export default function PartnerSignup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const initialvalues = {
    fname: "",
    lname: "",
    email: "",
    phone: "",
    password: "",
    city: "",
    cfpassword: "",
    companyname: "",
    district: "",
    sublocation: "",
    state: "",
    aadhaar: "",
  };

  const [isValidEmail, setIsValidEmail] = useState(true);

  const validateEmail = (inputEmail) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(inputEmail));
  };

  const [emilExist, setEmailexist] = useState("");
  const [cpassword, setCfpassord] = useState("");
  const [formValues, setFormvalues] = useState(initialvalues);
  const [modal, setModal] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [loader, setLoader] = useState(false);

  const ProfleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "kesrrxni");
    console.log(formData, "fomdatadjdjghjdghhgruhoads");
    let data = "";
    await Axios.post(
      "https://api.cloudinary.com/v1_1/dotjc7vax/image/upload",
      formData
    ).then((response) => {
      data = response.data["secure_url"];
      console.log(data, "ddddddddddddddddddddddddddd");
    });
    return data;
  };

  useEffect(() => {}, [formValues]);
  const handlechange = async (e) => {
    const { value, name } = e.target;
    const newValue = value;
    if (name === "email") {
      validateEmail(newValue);
    }
    setFormvalues({
      ...formValues,
      [name]: newValue,
    });
  };
  const imageUpload = async (e) => {
    e.preventDefault();
    setLoader(true);
    const res = await ProfleUpload(e.target.files[0]);
    setFormvalues({
      ...formValues,
      aadhaar: res,
    });
    setLoader(false);
  };

  const Submit = async () => {
    // e.preventDefault();
    try {
      const response = await partnersignup(formValues);

      if (response.data.success) {
        navigate("/partner/signupsuccess");
        toast.success("Success!");
      } else if (response.data.messages) {
        setEmailexist(response.data.messages);
      } else if (response.data.password) {
        setCfpassord(response.data.password);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleRouting = () => {
    refresh == true ? setRefresh(false) : setRefresh(true);
  };
  return (
    <div className="">
      <div
        className={
          loader === false
            ? "  bg-transparent w-full h-screen"
            : " sbg-transparent tracking-tight text-gray-900 dark:text-white opacity-30 w-full h-screen"
        }
      >
        <div className="min-h-screen py-10 md:py-20 lg:py-40 flex justify-center bg-gray-200">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row w-full md:w-7/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden justify-center items-center">
              <div className="py-6 px-6 md:px-12">
                <h2 className="text-2xl md:text-3xl mb-4 font-bold text-center">
                  Partner Signup
                </h2>
                <form onSubmit={handleSubmit(Submit)}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <input
                        {...register("fname", { required: true })}
                        type="text"
                        name="fname"
                        id="fname"
                        placeholder="First Name"
                        className="border border-gray-400 py-1 px-2 w-full md:w-60 rounded-md"
                        value={formValues.fname}
                        onChange={handlechange}
                      />
                      {errors.fname && (
                        <span style={{ color: "red" }}>
                          Plese fill firstname
                        </span>
                      )}
                    </div>
                    <div>
                      <input
                        {...register("lname", { required: true })}
                        type="text"
                        id="lname"
                        placeholder="Last Name"
                        name="lname"
                        className="border border-gray-400 py-1 px-2 w-full md:w-60 rounded-md"
                        value={formValues.lname}
                        onChange={handlechange}
                      />
                      {errors.lname && (
                        <span style={{ color: "red" }}>
                          Plese fill lastname
                        </span>
                      )}
                    </div>
                    <div>
                      <input
                        {...register("companyname", { required: true })}
                        type="text"
                        id="companyname"
                        placeholder="Company Name"
                        name="companyname"
                        className="border border-gray-400 py-1 px-2 w-full md:w-60 rounded-md"
                        value={formValues.companyname}
                        onChange={handlechange}
                      />
                      {errors.companyname && (
                        <span style={{ color: "red" }}>
                          Plese fill Companyname{" "}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <input
                        {...register("phone", { required: true })}
                        type="tel"
                        id="phone"
                        placeholder="Phone"
                        name="phone"
                        className="border border-gray-400 py-1 px-2 w-full md:w-60 rounded-md"
                        value={formValues.phone}
                        onChange={handlechange}
                      />
                      {errors.phone && (
                        <span style={{ color: "red" }}>Plese fill Mob </span>
                      )}
                    </div>
                    <div>
                      <input
                        {...register("email", { required: true })}
                        type="email"
                        placeholder="Email"
                        name="email"
                        id="email"
                        className="border border-gray-400 py-1 px-2 w-full md:w-60 rounded-md"
                        value={formValues.email}
                        onChange={handlechange}
                      />
                      {emilExist && (
                        <span style={{ color: "red" }}>{emilExist}</span>
                      )}
                      {!isValidEmail && (
                        <span style={{ color: "red" }}>
                          Invalid Email Format
                        </span>
                      )}
                      {errors.email && (
                        <span style={{ color: "red" }}>
                          Plese Provide email{" "}
                        </span>
                      )}
                    </div>
                    <div>
                      <input
                        {...register("state", { required: true })}
                        type="text"
                        placeholder="State"
                        name="state"
                        id="state"
                        className="border border-gray-400 py-1 px-2 w-full md:w-60 rounded-md"
                        value={formValues.state}
                        onChange={handlechange}
                      />
                      {errors.state && (
                        <span style={{ color: "red" }}>
                          Plese Provide state{" "}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <input
                        {...register("district", { required: true })}
                        type="text"
                        placeholder="District"
                        name="district"
                        id="district"
                        className="border border-gray-400 py-1 px-2 w-full md:w-60 rounded-md"
                        value={formValues.district}
                        onChange={handlechange}
                      />
                      {errors.district && (
                        <span style={{ color: "red" }}>
                          Plese Provide district{" "}
                        </span>
                      )}
                    </div>
                    <div>
                      <input
                        {...register("city", { required: true })}
                        type="text"
                        placeholder="city"
                        name="city"
                        id="city"
                        className="border border-gray-400 py-1 px-2 w-full md:w-60 rounded-md"
                        value={formValues.city}
                        onChange={handlechange}
                      />
                      {errors.city && (
                        <span style={{ color: "red" }}>Plese fill city </span>
                      )}
                    </div>
                    <div>
                      <input
                        {...register("sublocation", { required: true })}
                        type="text"
                        placeholder="SubLocation"
                        name="sublocation"
                        id="sublocation"
                        className="border border-gray-400 py-1 px-2 w-full md:w-60 rounded-md"
                        value={formValues.sublocation}
                        onChange={handlechange}
                      />
                      {errors.sublocation && (
                        <span style={{ color: "red" }}>
                          Plese Provide sublocation{" "}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* <div>
                    <input
                      {...register("city", { required: true })}
                      type="text"
                      placeholder="city"
                      name="city"
                      id="city"
                      className="border border-gray-400 py-1 px-2 w-full md:w-60 rounded-md"
                      value={formValues.city}
                      onChange={handlechange}
                    />
                    {errors.city && (
                      <span style={{ color: "red" }}>Plese fill city </span>
                    )}
                  </div> */}
                    <div>
                      <input
                        {...register("password", { required: true })}
                        type="password"
                        placeholder="Password"
                        name="password"
                        id="password"
                        className="border border-gray-400  py-1 px-2 w-full md:w-60 rounded-md"
                        value={formValues.password}
                        onChange={handlechange}
                      />
                      {errors.password && (
                        <span style={{ color: "red" }}>
                          Plese provide password{" "}
                        </span>
                      )}
                    </div>

                    <div>
                      <input
                        {...register("cfpassword", { required: true })}
                        type="password"
                        placeholder="Confirm Password"
                        name="cfpassword"
                        id="cfpassword"
                        className="border border-gray-400 py-1 px-2 w-full md:w-60 rounded-md"
                        value={formValues.cfpassword}
                        onChange={handlechange}
                      />
                      {cpassword && (
                        <span style={{ color: "red" }}>{cpassword}</span>
                      )}
                      {errors.cfpassword && (
                        <span style={{ color: "red" }}>
                          {" "}
                          fill Confirm Password{" "}
                        </span>
                      )}
                    </div>
                    <div>
                      <input
                        {...register("aadhaar", { required: true })}
                        type="file"
                        name="aadhaar"
                        id="aadhaar"
                        className="border border-gray-400 py-1 px-2 w-full md:w-60 rounded-md"
                        defaultValue={formValues.aadhaar}
                        onChange={imageUpload}
                        accept="image/aadhaar"
                      />
                      {errors.aadhaar && (
                        <span style={{ color: "red" }}>
                          Please upload image
                        </span>
                      )}
                      <p className="pl-2">Please Upload Your aadhaar</p>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-center items-center">
                    <button
                      type="submit"
                      className="w-full md:w-2/4 text-black bg-blue-500 hover:bg-black-700 focus:ring-2 focus:outline-none font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-black-600 dark:hover-bg-black-700"
                    >
                      Sign in
                    </button>
                    {modal == true ? (
                      <Partnersuccess clickNext={handleRouting} />
                    ) : null}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {loader == true ? (
          <div
            role="status"
            className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
          >
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>{" "}
            <span className="sr-only">Loading...</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
