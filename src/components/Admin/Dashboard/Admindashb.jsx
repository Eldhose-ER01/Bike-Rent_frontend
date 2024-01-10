import React, { useState,useEffect } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { FiFolder } from "react-icons/fi";
import { BiSolidOffer } from "react-icons/bi";
import { IoMdLogOut } from "react-icons/io"
import { Link } from "react-router-dom";
import { useDispatch,useSelector} from "react-redux";
import { removeadmin } from "../../../redux/Adminslice";
import { useNavigate } from "react-router-dom";
import { isbookinpagetrue } from "../../../redux/NavbarSlice";
import AdminChart from "../AdminChart/AdminChart";
export default function Admindashb() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
    const menus=[
        {name:"Dashboard",link:'/admin',icon:MdOutlineDashboard},
        {name:"User",link:'/admin/user',icon:AiOutlineUser},
        {name:"PartnerRequest",link:'/admin/partnerreq',icon:AiOutlineUser},
        {name:"Partner",link:'/admin/Partnerlist',icon:AiOutlineUser},
        {name:"PartnerReject",link:'/admin/rejectlist',icon:AiOutlineUser},
        {name:"BikeRequest",link:'/admin/bikerequest',icon:AiOutlineUser},
        {name:"Coupons",link:'/admin/coupon',icon:BiSolidOffer},
        {name:"Sales",link:'/admin/adminsales',icon:FiFolder},
        { name: "Logout", link: '/admin/login', icon: IoMdLogOut }, // Updated link to '/admin/login'
      ];
    
      const [open, setOpen] = useState(true);
    
      const homelogout = () => {
        dispatch(removeadmin());
        localStorage.clear();
        navigate("/admin/login");
      };
      const [change,setChange]=useState(true)
      const isorder=useSelector((store)=>store.navSlice)
      const  changeState =(link)=>{
        if(link =='/admin'){
          dispatch(isbookinpagetrue())
          setChange(true)
        }
      
       }
       useEffect(() => {


       }, [isorder,change])

      return (
        <div>
          <section className="flex gap-6">
            <div className={`bg-green-300 min-h-screen ${open ? "w-72" : "w-16"} duration-500 text-black px-4 font-extrabold`}>
              <div className="py-3 flex justify-end">
                <HiMenuAlt3 size={26} className="cursor-pointer" onClick={() => setOpen(!open)} />
              </div>
              <div className="mt-4 flex flex-col gap-4 relative">
            {menus?.map((menu, i) => (
              <Link
                to={menu?.link }
                key={i}
                onClick={() => { menu.name === "Logout" ? homelogout() : changeState(menu.link) }}

                className={`${menu.margin && "mt-5"} group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-green-200 rounded-md`} >
                <div>{React.createElement(menu?.icon, { size: "20" })}
                </div>
                <h2 style={{ transitionDelay: `${i + 3}00ms` }}
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

            {isorder?.isbookingpage ? (
  <div className="ml-10">
    <AdminChart />
  </div>
) : ''}


          </section>
        </div>
      );
    }
