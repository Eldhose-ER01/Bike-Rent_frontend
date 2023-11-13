import { useState } from "react";
import { useLocation } from "react-router-dom";
import { resetpassword } from "../../../configure/Userinterceptor";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const location = useLocation();
  const value = location.state;
  const navigate = useNavigate();
  const[notpass,setnoPass]=useState('')

  const password = watch("password");

  const resentsubmit = async (data) => {
    try {
      const requestData = {
        resetpassword: data.passwordd,
        password: data.password,
        email: value,
      };
      const response = await resetpassword(requestData);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      }else if(response.data.messages){
        setnoPass(response.data.messages)
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <section className="bg-gray-50 w-screen dark:bg-white-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md  sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-black">
              Change Password
            </h2>
            <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  New Password
                </label>
                <input
                  {...register("password", { required: true })}
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.password && (
                  <span style={{ color: "red" }}>Please fill in the password</span>
                )}
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Confirm password
                </label>
                <input
                  {...register("passwordd", {
                    required: true,
                    validate: (value) => value === password,
                  })}
                  type="password"
                  id="passwordd"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                 {notpass && (
                  <span style={{ color: "red" }}>{notpass}</span>
                )}
                {errors.passwordd && (
                  <span style={{ color: "red" }}>
                    Please fill in the confirm password and make sure it matches the
                    new password
                  </span>
                )}
              </div>
              {/* ... Other form fields ... */}
            </form>
            <button
              className="w-full text-white bg-sky-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-4"
              onClick={handleSubmit(resentsubmit)}
            >
              Reset password
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
