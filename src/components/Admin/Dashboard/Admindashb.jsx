import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { FiFolder } from "react-icons/fi";
import { Link } from "react-router-dom";
export default function Admindashb() {
    const menus=[
        {name:"Dashboard",link:'/admin',icon:MdOutlineDashboard},
        {name:"User",link:'/admin/user',icon:AiOutlineUser},
        {name:"PartnerRequest",link:'/admin/partnerreq',icon:AiOutlineUser},
        {name:"Partner",link:'/admin/Partnerlist',icon:AiOutlineUser},
        {name:"Partner Bike",link:'/user',icon:AiOutlineUser},
        {name:"Sales",link:'/user',icon:FiFolder}
    
    ];
    const[open,setOpen]=useState(true)
  return (
    <div>
      <section className="flex gap-6">
      <div className={`bg-sky-300 min-h-screen ${open ? "w-72" : "w-16"} duration-500 text-black px-4 font-extrabold`}>
       <div className="py-3 flex justify-end">
        <HiMenuAlt3 size={26}
        className="cursor-pointer"
        onClick={()=>setOpen(!open)}/>
       </div>
       <div className="mt-4 flex flex-col gap-4 relative">
        {menus?.map((menu,i)=>(
            <Link
            to={menu?.link}
            key={i}
            className={`${menu.margin && "mt-5"} group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-green-200 rounded-md`} >
                <div>{React.createElement(menu?.icon,{size:"20"})}</div>
                <h2 style={{transitionDelay:`${i+3}00ms`,}}
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >{menu?.name}</h2>
                  <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
              <h2 className={`${open && "hidden"} absolute left-48 bg-white w-0 overflow-hidden font-semibold whitespace-pre text-green-900 rounded-md drop-shadow-lg px-0 py-0 group-hover:px-2 group-hover:py-1 group-hover:left-14
              group-hover:duration-300 group-hover:w-fit`}>
             {menu?.name}
              </h2>
            </Link>
        ))}
       </div>
        </div>
        {/* <div className="m-3 text-xl text-gray-900 font-semibold">
        Admin DashBoard
      </div> */}
      </section>
    </div>
    
  )
}
