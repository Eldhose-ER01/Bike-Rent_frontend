import { useState } from "react";
import { userEmail } from "../../../configure/Userinterceptor";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function Submitemail() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [email, setEmail] = useState();
  const navigate = useNavigate();

  const handleemail = async () => {
    try {
      // e.preventDefault()
      const useremail = email;
      const response = await userEmail(useremail);
      if (response.data.success) {
        navigate("/forgetotp", { state: email });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center w-full h-screen items-center">
      <div className="w-1/3 h-64 bg-white opacity-100 shadow-2xl flex flex-col justify-center items-center">
        <h2 className="p-4 font-bold">Enter Your Email</h2>
        <input
          {...register("email", { required: true })}
          type="email"
          name="email"
          id="email"
          className="h-10 w-64 ring-2 ring-red-400 ring-inset p-2 mb-4"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        {errors.email && <span style={{ color: "red" }}>Plese fill email</span>}
        <button
          className="bg-blue-500 text-white px-4 py-2"
          onClick={handleSubmit(handleemail)}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
