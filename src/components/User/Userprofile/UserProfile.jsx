import { useState, useEffect } from "react";
import UserNav from "../Usernavbar/UserNav";
import { useNavigate } from "react-router-dom";
import "./userprofile.css";
import { TbCameraBolt } from "react-icons/tb";
import { Profiledata } from "../../../configure/Userinterceptor";
import toast from "react-hot-toast";
import {
  imageupload,
  imagelicencefront,
  imagelicenceback,
} from "../../../configure/Userinterceptor";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { isbookinpagefalse } from "../../../redux/NavbarSlice";

export default function UserProfile() {
  const [user, setUser] = useState("");
  const [images, setimages] = useState(
    "https://icons-for-free.com/iconfiles/png/512/box+document+outline+share+top+upload+icon-1320195323221671611.png"
  );

  const [image, setimage] = useState(
    "https://icons-for-free.com/iconfiles/png/512/box+document+outline+share+top+upload+icon-1320195323221671611.png"
  );
  const [refresh, setRefresh] = useState(true);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const profileuser = async () => {
    try {
      const response = await Profiledata();
      if (response.data.success) {
        const userDetails = response.data.user;

        setUser(userDetails);
      } else {
        toast.error("Invalid userdetails format:");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const Dispatch = useDispatch();

  useEffect(() => {
    Dispatch(isbookinpagefalse());
    profileuser();
  }, [refresh]);

  const editprofile = () => {
    navigate("/editprofile", { state: user });
  };

  // uplading image using cludinary in front end
  const ProfleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "kesrrxni");
    let data = "";
    await Axios.post(
      "https://api.cloudinary.com/v1_1/dotjc7vax/image/upload",
      formData
    ).then((response) => {
      data = response.data["secure_url"];
    });
    return data;
  };
  const handleimage = async (e) => {
    setLoader(true);
    await ProfleUpload(e.target.files[0])
      .then((res) => {
        const newUpload = async () => {
          const image = res;
          await imageupload(image)
            .then((respose) => {
              console.log(respose);
              setLoader(false);
              refresh == true ? setRefresh(false) : setRefresh(true);
            })
            .catch((err) => console.log(err.message));
        };
        newUpload();
        setLoader(false);
      })
      .catch((err) => console.log(err.message));
  };

  const iicencefrontend = async (e) => {
    try {
      setLoader(true);
      const res = await ProfleUpload(e.target.files[0]);
      const newUpload = async () => {
        try {
          const image = res;
          const response = await imagelicencefront(image);

          if (response.data.success) {
            setLoader(false);
            setRefresh((refresh) => !refresh);
          }
        } catch (err) {
          console.log(err.message);
        }
      };

      await newUpload();
      setLoader(false);
    } catch (err) {
      console.log(err.message);
    }
  };
  const iicencebackend = async (e) => {
    try {
      setLoader(true);
      const res = await ProfleUpload(e.target.files[0]);

      const newUpload = async () => {
        try {
          const image = res;
          const response = await imagelicenceback(image);

          if (response.data.success) {
            setLoader(false);
            setRefresh((refresh) => !refresh);
          }
        } catch (err) {
          console.log(err.message);
        }
      };

      await newUpload();
      setLoader(false);
    } catch (err) {
      console.log(err.message);
    }
  };
  const BookingHistory = () => {
    navigate("/bookingview");
  };

  const wallethistory = () => {
    navigate("/wallethistory");
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "visible"; // Enable scrolling when modal is closed
  };
  return (
    <div>
      <UserNav />
      <div
        className={
          loader === false
            ? "flex justify-center mt-8 sm:mt-24 bg-transparent "
            : "flex justify-center mt-8 sm:mt-24 bg-transparent tracking-tight text-gray-900 dark:text-white opacity-30"
        }
      >
        <div className="bg-white border border-gray-300 sm:height-auto md:height-64 lg:height-80 xl:height-96 flex flex-col sm:flex-row justify-between mt-4 drop-shadow-xl">
          <div className="flex items-center pr-3">
            <div className="w-[179px] h-[34%] bg-white rounded-full mr-5 ml-3 custom-shadow relative ">
              <img
                className="transition duration-300 ease-in-out hover:scale-150 rounded-full  mt-1  ml-0.5  h-[11em] w-[11em] "
                src={user.image}
                alt=""
              />

              <div className="absolute bottom-0 right-0 pl-10 ">
                <label htmlFor="fileInput">
                  <TbCameraBolt
                    type="file"
                    style={{ width: "2em", height: "2em" }}
                  />
                </label>

                <input
                  id="fileInput"
                  type="file"
                  hidden
                  onChange={handleimage}
                />
              </div>
            </div>

            <div className="width-set h-96 bg-neutral-100 custom-shadow">
              <div className="w-96 flex justify-center items-center">
                <label
                  htmlFor="name"
                  className="common-label text-lg font-semibold pl-5 p-4 mt-4 ml-3 box-border w-32 h-11 flex items-center justify-center border border-sky-300 custom-shadow"
                >
                  fName
                </label>

                <input
                  type="text"
                  id="fname"
                  name="fname"
                  readOnly
                  defaultValue={user.fname}
                  className="border border-white p-2 mt-4  pt-3 pl-4 ml-4  bg-white-200 bg-gradient-to-r from-gray-200 via-white-500 to-white-500 custom-shadow "
                />
              </div>

              <div className="w-96 flex justify-center items-center">
                <label
                  htmlFor="name"
                  className="common-label text-lg font-semibold pl-5 p-4 mt-4 ml-3 box-border w-32 h-11 flex items-center justify-center border border-sky-300 custom-shadow"
                >
                  Email
                </label>

                <input
                  type="email"
                  id="email"
                  readOnly
                  name="email"
                  defaultValue={user.email}
                  className=" bg-gray-100 border border-white p-2 mt-4  pt-3 pl-4 ml-4 bg-white-200 bg-gradient-to-r from-gray-200 via-white-500 to-white-500 custom-shadow "
                />
              </div>
              <div className="w-96 flex justify-center items-center">
                <label
                  htmlFor="name"
                  className="common-label text-lg font-semibold pl-5 p-4 mt-4 ml-3 box-border w-32 h-11 flex items-center justify-center border border-sky-300 custom-shadow"
                >
                  Phone
                </label>

                <input
                  type="text"
                  id="phone"
                  readOnly
                  name="phone"
                  defaultValue={user.phone}
                  className=" bg-gray-100 border border-white p-2 mt-4  pt-3 pl-4 ml-4 bg-white-200 bg-gradient-to-r from-gray-200 via-white-500 to-white-500 custom-shadow "
                />
              </div>
              <div className="w-96 flex justify-center items-center">
                <label
                  htmlFor="name"
                  className="common-label text-lg font-semibold pl-5 p-4 mt-4 ml-3 box-border w-32 h-11 flex items-center justify-center border border-sky-300 custom-shadow"
                >
                  State
                </label>

                <input
                  type="text"
                  id="state"
                  readOnly
                  name="state"
                  placeholder="Nodata"
                  defaultValue={user.state}
                  className="bg-gray-100 border border-white p-2 mt-4  pt-3 pl-4 ml-4 bg-white-200 bg-gradient-to-r from-gray-200 via-white-500 to-white-500 custom-shadow "
                />
              </div>
              <div className="w-96 flex justify-center items-center">
                <label
                  htmlFor="name"
                  className="text-lg font-semibold pl-5 p-4 mt-4 ml-3 box-border w-32 h-11 flex items-center justify-center border border-sky-300 custom-shadow"
                >
                  Licence:NO
                </label>

                <input
                  type="text"
                  id="licenceno"
                  readOnly
                  name="lincenno"
                  defaultValue={user.lincenno}
                  placeholder="Nodata"
                  className=" bg-gray-100 border border-white p-2 mt-4  pt-3 pl-4 ml-4 bg-white-200 bg-gradient-to-r from-gray-200 via-white-500 to-white-500 custom-shadow "
                />
              </div>
              <div className="w-96 flex justify-center items-center">
                <label
                  htmlFor="name"
                  className="common-label text-lg font-semibold pl-5 p-4 mt-4 ml-3 box-border w-32 h-11 flex items-center justify-center border border-sky-300 custom-shadow"
                >
                  District
                </label>

                <input
                  type="text"
                  id="district"
                  readOnly
                  name="district"
                  defaultValue={user.district}
                  placeholder="Nodata"
                  className=" bg-gray-100 border border-white p-2 mt-4  pt-3 pl-4 ml-4 bg-white-200 bg-gradient-to-r from-gray-200 via-white-500 to-white-500 custom-shadow "
                />
              </div>
              <div className="flex justify-end mt-3">
                <button
                  className=" ml-24 box-border p-6 w-36 h-7 mt-3 flex items-center justify-center border border-red-600 bg-green-500 font-bold text-lg custom-shadow hover:bg-sky-400"
                  onClick={editprofile}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white width-sets h-[550px] border border-sky-600  ml-12 custom-shadow">
          <p className="font-bold text-lg mt-2 ml-3 ">LIcence Front</p>

          <div className="w-[70%] h-44 bg-slate-50 mt-3 ml-16 custom-shadow border border-red-600 relative">
            <div className="absolute bottom-0 right-0 pl-10 mt-4 ">
              <label htmlFor="fileInputs">
                <TbCameraBolt
                  type="file"
                  style={{ width: "2em", height: "2em" }}
                />
              </label>

              <input
                id="fileInputs"
                type="file"
                hidden
                onChange={iicencefrontend}
              />
            </div>
            <img
              className="transition duration-500 ease-in-out hover:scale-110 h-[11em] w-[25em]"
              src={
                user.licenseFrontSide
                  ? `${user.licenseFrontSide}?${user.licenseFrontSide}`
                  : `${image}?${image}`
              }
              alt=""
            />
          </div>
          <p className="font-bold text-lg mt-7 ml-3">LIcence Back</p>

          <div className="w-[70%] h-44 bg-slate-50 mt-3 ml-16 custom-shadow border border-red-600 relative">
            <div className="absolute bottom-0 right-0 pl-10 mt-4 ">
              <label htmlFor="fileInputdata">
                <TbCameraBolt
                  type="file"
                  style={{ width: "2em", height: "2em" }}
                />
              </label>

              <input
                id="fileInputdata"
                type="file"
                hidden
                onChange={iicencebackend}
              />
            </div>
            <img
              className="transition duration-500 ease-in-out hover:scale-110 h-[11em] w-[25em]"
              src={
                user.licenseBackSide
                  ? `${user.licenseBackSide}?${user.licenseBackSide}`
                  : `${images}?${images}`
              }
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <div>
          <button
            className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
            onClick={() => {
              wallethistory(user._id);
            }}
          >
            Wallet History
          </button>
        </div>
        <button
          onClick={openModal}
          className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
        >
          Wallet
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                onClick={closeModal}
                className="fixed inset-0 transition-opacity"
              >
                <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
              </div>

              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-lg leading-6 font-medium text-gray-900 text-center mt-5"
                        id="modal-title"
                      >
                        Wallet Amount:
                      </h3>
                      <div className="mt-2">
                        <p className=" text-green-500 font-bold text-xl">
                          ₹:{user.wallet}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    onClick={closeModal}
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <button
          type="button"
          className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
          onClick={BookingHistory}
        >
          Booking History
        </button>
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
  );
}
