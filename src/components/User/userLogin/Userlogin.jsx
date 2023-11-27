import { useState } from "react";
import "./userlogin.css";
import { Userlogin } from "../../../configure/Userinterceptor";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { addUser } from "../../../redux/Userslice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const initailValues = { email: " ", password: "" };
  const [formvalues, setFormvalues] = useState(initailValues);
  const [block, setBlock] = useState("");
  const [nonPassword, setnonPassword] = useState("");
  const [notemail, setnoEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlechange = (e) => {
    const { value, name } = e.target;

    const newValue = value.trim();
    console.log(newValue);
    setFormvalues({ ...formvalues, [name]: newValue });
  };
  const handlesubmit = async () => {
    try {
      // e.preventDefault()

      const response = await Userlogin(formvalues);

      if (response.data.success) {
        navigate("/");
       toast.success("Home Page")
       localStorage.setItem(
        "token",
        JSON.stringify(response.data.userdatas.token)
      );
        dispatch(
          addUser({
            id: response.data.userdatas.id,
            name: response.data.userdatas.name,
            token: response.data.userdatas.token,
          })
        );
      
      } else if (response.data.Block) {
        setBlock(response.data.Block);
      } else if (response.data.incorrectPassword) {
        setnonPassword(response.data.incorrectPassword);
      } else if (response.data.incorrectemail) {
        setnoEmail(response.data.incorrectemail);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const forgetPassword = () => {
    navigate("/submitemail");
  };

  return (
    <section className="bg-gray-100">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-16 h-13 mr-2"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXvH7FslvvuKp0y0EP5g5xwmxmO2fhOH-XRlCKVlqH78aUbElQcD0sKleA-_bL1CaD0b0&usqp=CAU"
            alt="logo"
          />
        </a>
        <div className="w-full bg-white rounded-lg custom-shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-black-900">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black-300"
                >
                  Your email
                </label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-200 dark:border-gray-300 dark:placeholder-gray-400 dark:text-black"
                  placeholder="name@gmail.com"
                  value={formvalues.email}
                  onChange={handlechange}
                />
                {notemail && <span style={{ color: "red" }}>{notemail}</span>}
                {errors.email && (
                  <span style={{ color: "red" }}>Plese fill email</span>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black-300"
                >
                  Password
                </label>

                <input
                  {...register("password", { required: true })}
                  type="password"
                  name="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-200 dark:border-gray-300 dark:placeholder-gray-400 dark:text-black"
                  placeholder="••••••••"
                  value={formvalues.password}
                  onChange={handlechange}
                />
                {nonPassword && (
                  <span style={{ color: "red" }}>{nonPassword}</span>
                )}
                {errors.password && (
                  <span style={{ color: "red" }}>Plese fill password</span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-200 dark:border-gray-300 dark:focus:ring-primary-600"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-black-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-blue-800"
                  onClick={forgetPassword}
                >
                  Forgot password?
                </a>
              </div>
              <div className="flex justify-center">
                {" "}
                {block && <span style={{ color: "red" }}>{block}</span>}
              </div>

              <button
                type="submit"
                className="w-full text-black bg-sky-500 hover:bg-balck-700 focus:ring-2 focus:outline-none  font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-black-600 dark:hover-bg-black-700"
                onClick={handleSubmit(handlesubmit)}
              >
                Sign in
              </button>
              <p className="text-sm font-light text-blue-900 dark:text-black-400">
                Don’t have an account yet?{" "}
                <a
                  href="#"
                  className="font-bold text-blue-1000 hover:underline dark:text-black-500"
               onClick={()=>navigate('/signup')} >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
