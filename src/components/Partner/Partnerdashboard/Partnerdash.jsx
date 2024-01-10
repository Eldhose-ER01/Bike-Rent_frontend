import React, { useEffect, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { FiFolder } from "react-icons/fi";
import { RiMotorbikeFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../../../redux/Partnerslice";
import { useDispatch, useSelector } from "react-redux";
import { isbookinpagetrue } from "../../../redux/NavbarSlice";
import { FaRocketchat } from "react-icons/fa6";
import PartnerChart from "../PartnerChart/PartnerChart";
export default function Partnerdash() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menus = [
    { name: "Dashboard", link: "/partner/", icon: MdOutlineDashboard },
    {
      name: "partnerprofile",
      link: "/partner/partnerprofile",
      icon: AiOutlineUser,
    },
    { name: "Add Bike", link: "/partner/addbike", icon: RiMotorbikeFill },
    { name: "Bike List", link: "/partner/bikelist", icon: RiMotorbikeFill },
    { name: "Booking", link: "/partner/getbooking", icon: AiOutlineUser },
    { name: "Sales", link: "/partner/partnersale", icon: FiFolder },
    { name: "Chats", link: "/partner/partnerchat", icon: FaRocketchat },
    { name: "Logout", link: "/partner/login", icon: IoMdLogOut },
  ];


  const [open, setOpen] = useState(true);

  const homelogout = () => {
    dispatch(removeUser());

    localStorage.clear();
    navigate("/partner/login");
  };


  const [change, setChange] = useState(true);
  const isorder = useSelector((store) => store.navSlice);

  const changeState = (link) => {
    if (link == "/partner/") {
      window.location.href = "/partner/";
      dispatch(isbookinpagetrue());
      setChange(true);
    }
  };


  

  useEffect(() => {

  }, [isorder, change]);

  return (
    <div>
      <section className="flex gap-6">
        <div
          className={`bg-sky-300 h-screen ${
            open ? "w-72" : "w-16"
          } duration-500 text-black px-4 font-extrabold`}
        >
          <div className="py-3 flex justify-end">
            <HiMenuAlt3
              size={26}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          </div>
          <div className="mt-4 flex flex-col gap-4 relative">
            {menus?.map((menu, i) => (
              <Link
                to={menu?.link}
                key={i}
                onClick={() => {
                  menu.name === "Logout"
                    ? homelogout()
                    : changeState(menu.link);
                }}
                className={`${
                  menu.margin && "mt-5"
                } group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-green-200 rounded-md`}
              >
                <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                <h2
                  style={{ transitionDelay: `${i + 3}00ms` }}
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  {menu?.name}
                </h2>
                <h2
                  className={`${
                    open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                >
                  {menu?.name}
                </h2>
                <h2
                  className={`${
                    open && "hidden"
                  } absolute left-48 bg-white w-0 overflow-hidden font-semibold whitespace-pre text-green-900 rounded-md drop-shadow-lg px-0 py-0 group-hover:px-2 group-hover:py-1 group-hover:left-14
              group-hover:duration-300 group-hover:w-fit`}
                >
                  {menu?.name}
                </h2>
              </Link>
            ))}
          </div>
        </div>

        {isorder?.isbookingpage ? (
          <div className="ml-10">
            <PartnerChart />
          </div>
        ) : (
          ""
        )}
      </section>
    </div>
  );
}
