import { useEffect, useState } from "react";
import { partnersignup } from "../../../configure/Partnerinterceptor";
import { toast } from "react-hot-toast";
import Partnersuccess from "./Partnersuccess";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
export default function PartnerSignup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate=useNavigate()
  const initialvalues = {
    fname: "",
    lname: "",
    email: "",
    phone: "",
    pin: "",
    password: "",
    city: "",
    cfpassword: "",
    companyname: "",
  };
  const[emilExist,setEmailexist]=useState('')
  const[cpassword,setCfpassord]=useState('')
  const [formValues, setFormvalues] = useState(initialvalues);
  const [modal, setModal] = useState(false);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    setModal(false);
  }, [refresh]);
  const handlechange = (e) => {
    const { value, name } = e.target;
    const newValue = value.trim();

    setFormvalues({
      ...formValues,
      [name]: newValue,
    });
  };

  const Submit = async () => {
    // e.preventDefault();
    try {
      const response = await partnersignup(formValues);
      
      if (response.data.success) {
        navigate('/partner/signupsuccess')
        toast.success("Success!");
      }else if(response.data.messages){
        setEmailexist(response.data.messages)
      }
      else if(response.data.password){
        setCfpassord(response.data.password)
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleRouting = () => {
    refresh == true ? setRefresh(false) : setRefresh(true);
  };
  return (
    <div>
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
                    <span style={{ color: "red" }}>Plese fill firstname</span>
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
                    <span style={{ color: "red" }}>Plese fill lastname</span>
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
                  {errors.email && (
                    <span style={{ color: "red" }}>Plese Provide email </span>
                  )}
                   </div>
                   <div>
                  <input
                    {...register("pin", { required: true })}
                    type="text"
                    placeholder="PIN"
                    name="pin"
                    id="pin"
                    className="border border-gray-400 py-1 px-2 w-full md:w-60 rounded-md"
                    value={formValues.pin}
                    onChange={handlechange}
                  />
                  {errors.pin && (
                    <span style={{ color: "red" }}>Plese Provide pin </span>
                  )}
                  </div>
                </div>
                <div className="mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
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
    </div>
  );
}
