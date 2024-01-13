import "./PartnerSignup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../../../redux/Partnerslice";
import { useForm } from "react-hook-form";
import { partnerlogin } from "../../../configure/Partnerinterceptor";
export default function PartnerLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const initailValues = { email: " ", password: "" };
  const [formvalues, setFormvalues] = useState(initailValues);
  const [nonPassword, setnonPassword] = useState("");
  const [notemail, setnoEmail] = useState("");
  const [err, seterr] = useState("");
  const [Block, setBlock] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlechange = (e) => {
    const { value, name } = e.target;

    const newValue = value.trim();
    setFormvalues({ ...formvalues, [name]: newValue });
  };

  const handlesubmit = async () => {
    try {
      // e.preventDefault()
      const data = { email: formvalues.email, password: formvalues.password };
      const response = await partnerlogin(data);

      if (response.data.success) {
        navigate("/partner/");
        window.location.href = "/partner/";
        localStorage.setItem(
          "partnertoken",
          JSON.stringify(response.data.partnerdata.token)
        );
        dispatch(
          addUser({
            // id: response.data.partnerdata.id,
            // name: response.data.partnerdata.name,
            token: response.data.partnerdata.token,
          })
        );
      } else if (response.data.incorrectPassword) {
        setnonPassword(response.data.incorrectPassword);
      } else if (response.data.incorrectemail) {
        setnoEmail(response.data.incorrectemail);
      } else if (response.data.messages) {
        seterr(response.data.messages);
      } else if (response.data.Block) {
        setBlock(response.data.Block);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const signup = () => {
    navigate("/partner/signup");
  };
  return (
    <div>
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
          <div className="w-full bg-white rounded-lg custom-shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-[url('https://www.shutterstock.com/shutterstock/photos/2269001627/display_1500/stock-vector-a-man-riding-on-fashion-motocross-motorcycle-abstract-circle-background-best-use-for-sticker-2269001627.jpg)] bg-cover bg-center bg-no-repeat bg-opacity-50">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-black-900">
                Partner Sign in
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
                  {/* <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-blue-800">Forgot password?</a> */}
                </div>
                {err && <span style={{ color: "red" }}>{err}</span>}
                <button
                  type="submit"
                  className="w-full text-black bg-sky-500 hover:bg-balck-700 focus:ring-2 focus:outline-none  font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-black-600 dark:hover-bg-black-700"
                  onClick={handleSubmit(handlesubmit)}
                >
                  Sign in
                </button>
                <div className="flex justify-center">
                  {Block && <span style={{ color: "red" }}>{Block}</span>}
                </div>
                <p className="text-sm font-light text-blue-900 dark:text-black-400">
                  Don’t have an account yet?{" "}
                  <a
                    href="#"
                    className="font-bold text-blue-1000 hover:underline dark:text-black-500"
                    onClick={signup}
                  >
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
