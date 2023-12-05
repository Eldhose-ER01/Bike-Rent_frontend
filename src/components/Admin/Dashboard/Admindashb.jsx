import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
// import { FiFolder } from "react-icons/fi";
import { IoMdLogOut } from "react-icons/io"
import { Link } from "react-router-dom";
import { useDispatch} from "react-redux";
import { removeadmin } from "../../../redux/Adminslice";
import { useNavigate } from "react-router-dom";
export default function Admindashb() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
    const menus=[
        {name:"Dashboard",link:'/admin',icon:MdOutlineDashboard},
        {name:"User",link:'/admin/user',icon:AiOutlineUser},
        {name:"PartnerRequest",link:'/admin/partnerreq',icon:AiOutlineUser},
        {name:"Partner",link:'/admin/Partnerlist',icon:AiOutlineUser},
        {name:"BikeRequest",link:'/admin/bikerequest',icon:AiOutlineUser},
        {name:"Partners Bikes",link:'/admin/partnerbikeslists',icon:AiOutlineUser},

        // {name:"Sales",link:'/user',icon:FiFolder}
        { name: "Logout", link: '/admin/login', icon: IoMdLogOut }, // Updated link to '/admin/login'
      ];
    
      const [open, setOpen] = useState(true);
    
      const homelogout = () => {
        dispatch(removeadmin());
        localStorage.clear();
        navigate("/admin/login");
      };
    
      return (
        <div>
          <section className="flex gap-6">
            <div className={`bg-green-300 min-h-screen ${open ? "w-72" : "w-16"} duration-500 text-black px-4 font-extrabold`}>
              <div className="py-3 flex justify-end">
                <HiMenuAlt3 size={26} className="cursor-pointer" onClick={() => setOpen(!open)} />
              </div>
              <div className="mt-4 flex flex-col gap-4 relative">
                {menus?.map((menu, i) => (
                  <div key={i}>
                    {menu.name === "Logout" ? (
                      <div
                        className={`group flex items-center text-xl gap-3.5  p-2 font-bold hover:bg-green-200 rounded-md `}
                        onClick={homelogout}
                      >
                        <div>{React.createElement(menu.icon, { size: "20" })}</div>
                        <h2 style={{ transitionDelay: `${i + 3}00ms` }}
                          className={`whitespace-pre duration-500 ${
                            !open && "opacity-0 translate-x-28 overflow-hidden"
                          }`}
                        >{menu.name}</h2>
                      </div>
                    ) : (
                      <Link
                        to={menu.link}
                        className={`${menu.margin && "mt-5"} group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-green-200 rounded-md`}
                      >
                        <div>{React.createElement(menu.icon, { size: "20" })}</div>
                        <h2 style={{ transitionDelay: `${i + 3}00ms` }}
                          className={`whitespace-pre duration-500 ${
                            !open && "opacity-0 translate-x-28 overflow-hidden"
                          }`}
                        >{menu.name}</h2>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      );
    }
