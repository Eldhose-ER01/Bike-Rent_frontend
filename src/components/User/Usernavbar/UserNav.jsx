import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { removeUser } from "../../../redux/Userslice";
import { useNavigate } from "react-router-dom";

export default function UserNav() {
    let [open,setOpen]=useState(false)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const { id }=useSelector((store)=>store.user.userD)
  // console.log(id,"useeeeeeeeeeeeee");
  const homelogout = () => {
    dispatch(removeUser());
    localStorage.clear();
    navigate("/login");
  };
 
  return (
    <div>
           <div className='shadow-md w-full fixed top-0 left-0 z-10'>
      <div className='md:flex items-center justify-between bg-black py-4 md:px-10 px-7 md:h-24 h-20'> 
      <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins]  text-gray-800'>
              <img src="../../../../public/Images/run-rider-high-resolution-logo-white.png" alt="" className="w-24 h-16 md:w-36 md:h-24 " />
            </div>
           
            <div className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden text-white'>
      <ion-icon onClick={()=>{
              
              
              setOpen(!open)

            }} name={open ? 'close':'menu'}></ion-icon>
      </div>
            <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static text-sky-200 bg-black  md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ':'top-[-490px]'}`}>   
                    
              <li className="md:ml-8 text-xl md:my-0 my-7">
                <Link to="/" className="font-semibold">
                  Home
                </Link>
              </li>
              <li className="md:ml-8 text-xl cursor-pointer md:my-0 my-7">
                <Link className="font-semibold" to="/bikes">
                  Bikes
                </Link>
              </li>
              <li className="md:ml-8 text-xl semibold md:my-0 my-7">
                <Link className="font-semibold" to="/partner/login">Join Us</Link>
              </li>
              <li className="md:ml-8 text-xl semibold md:my-0 my-7">
                <Link className="font-semibold" to="/profile">Profile</Link>
              </li>
              {id==null ?(
                <li className="md:ml-8 text-xl semibold md:my-0 my-7">
                <Link to={'/login'} className="font-semibold" >Login</Link>
              </li>):(
              <li className="md:ml-8 text-xl semibold md:my-0 my-7">
              <Link to={'/login'} className="font-semibold"onClick={homelogout} >Logout</Link>
            </li>
              
              )}

            </ul>
            <div className="font-bold text-2xl flex items-center font-[Poppins] mr-1 pt-1">
            <Link className="font-semibold" to="/profile">Profile</Link>
              
            </div>
          </div>
        </div>
    </div>
  )
}
