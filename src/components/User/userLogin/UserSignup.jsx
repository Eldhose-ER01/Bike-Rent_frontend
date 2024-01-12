import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { Usersignup} from "../../../configure/Userinterceptor";
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import {auth}  from "../../../components/User/userLogin/GoogleAuth";
import { useDispatch } from "react-redux";
import { addUser } from "../../../redux/Userslice";
import toast from "react-hot-toast";

export default function UserSignup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [err, setErr] = useState();
  const initialValue = {
    fname: "",
    lname: "",
    email: "",
    phone: "",
    password: "",
  };
  const [formValues, setFormvalues] = useState(initialValue);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isValidEmail, setIsValidEmail] = useState(true);

  const validateEmail = (inputEmail) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(inputEmail));
  };

  const handlechange = (e) => {
    const { value, name } = e.target;
    const newValue = value.trim();

    if (name === "email") {
      validateEmail(newValue);
    }
    setFormvalues({
      ...formValues,
      [name]: newValue,
    });
  };

  const handlesubmit = async () => {
    try {
      const response = await Usersignup(formValues);
      console.log("response : ", response);
      if (response.data.success) {
        navigate("/otp", { state: formValues });
      } else {
        console.log("errorm");
      }

      if (response.data.errorMessage) {
        setErr(response.data.errorMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const handleGoogle = async () => {
  //   try {
  //     const provider = new GoogleAuthProvider();

  //     const result = await signInWithPopup(auth, provider);
  //   console.log(result,'handle goodle');


  //     const response = await googleAuth(result);
  //     if (response.data.success) {
  //       navigate("/");
  //       dispatch(
  //         addUser({
  //           id: response.data.userdatas.id,
  //           // name: response.data.userdatas.name,
  //           // token: response.data.userdatas.token,
  //         })
  //       );
  //       localStorage.setItem(
  //         "token",
  //         JSON.stringify(response.data.userdatas.token)
  //       );
  //     } else {
  //       if (
  //         response.data.success === false &&
  //         response.data.message === "authentication failed"
  //       ) {
  //         navigate("/");
  //         toast.success("Enterd in to Home page");
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  return (
    <div>
      <section className="bg-gray-300">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          ></a>
          <div className="w-full h-600 bg-white rounded-lg custom-shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="h-100">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-black-900">
                  Sign up your account
                </h1>
                <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                    <input
                      {...register("fname", {
                        required: "Please fill the firstname",
                        pattern: {
                          value: /^[^\s].*[^\s]$/,
                          message: "Leading or trailing spaces are not allowed",
                        },
                      })}
                      type="text"
                      name="fname"
                      id="fname"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-200 dark:border-gray-300 dark:placeholder-gray-400 dark:text-black"
                      defaultChecked={formValues.fname}
                      onChange={handlechange}
                      placeholder="Enter Your First Name"
                    />

                    {errors.fname && (
                      <span className="flex justify-center  text-red-700">
                        {errors.fname.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <input
                      {...register("lname", {
                        required: "Please fill the lastname",
                        pattern: {
                          value: /^[^\s].*[^\s]$/,
                          message: "Leading or trailing spaces are not allowed",
                        },
                      })}
                      type="text"
                      name="lname"
                      id="lname"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-200 dark:border-gray-300 dark:placeholder-gray-400 dark:text-black"
                      defaultChecked={formValues.lname}
                      onChange={handlechange}
                      placeholder="Enter Your Last Name"
                      required=""
                    />
                    {errors.lname && (
                      <span className="flex justify-center  text-red-700">
                        {errors.lname.message}
                      </span>
                    )}{" "}
                  </div>
                  <div>
                    <input
                      {...register("email", {
                        required: "Please fill the email",
                        pattern: {
                          value: /^[^\s].*[^\s]$/,
                          message: "Leading or trailing spaces are not allowed",
                        },
                      })}
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-200 dark:border-gray-300 dark:placeholder-gray-400 dark:text-black"
                      defaultChecked={formValues.email}
                      onChange={handlechange}
                      placeholder="Enter Your Email"
                      required=""
                    />
                    {errors.fname && (
                      <span className="flex justify-center  text-red-700">
                        {errors.fname.message}
                      </span>
                    )}
                    <div className="flex justify-center">
                      {" "}
                      {err && <span style={{ color: "red" }}>{err}</span>}
                    </div>
                    {!isValidEmail && (
                      <span style={{ color: "red" }}>Invalid Email Format</span>
                    )}
                  </div>
                  <div>
                    <input
                      {...register("phone", {
                        required: "Please fill the phone",
                        pattern: {
                          value: /^[^\s].*[^\s]$/,
                          message: "Leading or trailing spaces are not allowed",
                        },
                      })}
                      type="phone"
                      name="phone"
                      id="phone"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-200 dark:border-gray-300 dark:placeholder-gray-400 dark:text-black"
                      defaultChecked={formValues.phone}
                      onChange={handlechange}
                      placeholder="Enter Your Mob"
                      required=""
                    />
                    {errors.phone && (
                      <span className="flex justify-center  text-red-700">
                        {errors.phone.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <input
                      {...register("password", {
                        required: "Please fill the password",
                        pattern: {
                          value: /^[^\s].*[^\s]$/,
                          message: "Leading or trailing spaces are not allowed",
                        },
                      })}
                      type="password"
                      name="password"
                      id="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-200 dark:border-gray-300 dark:placeholder-gray-400 dark:text-black"
                      defaultChecked={formValues.password}
                      onChange={handlechange}
                      placeholder="Enter Your Password"
                      required=""
                    />
                    {errors.password && (
                      <span className="flex justify-center  text-red-700">
                        {errors.password.message}
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full text-black bg-sky-500 hover:bg-balck-700 focus:ring-2 focus:outline-none  font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-black-600 dark:hover-bg-black-700"
                    onClick={handleSubmit(handlesubmit)}
                  >
                    Sign UP
                  </button>
                  <button
                    type="submit"
                    className="flex items-center justify-center w-full text-black bg-white-500 hover:bg-black-700 focus:ring-2 focus:outline-none border border-sky-500 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-black-600 dark:hover-bg-black-700"
                    onClick={handleGoogle}
                  >
                    Sign up With Google
                    <img
                      src="https://pbs.twimg.com/profile_images/1681345253520084993/nl6KLCBQ_400x400.jpg"
                      className="w-6 h-6 ml-2"
                      alt="Google Logo"
                    />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
