import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { removeUser } from "../../../redux/Userslice";
import { useNavigate } from "react-router-dom";
export default function Userhome() {
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
//  const handlelogin = () => {
//     navigate("/login");
//   };

  return (
    <div>
      <div className="w-full relative">
        <img
         className="w-full h-screen hidden sm:block blur-3"
          src="/Images/wallpaperflare.com_wallpaper (2).jpg"
          alt="Image Description"
        />
        <img
          className="w-full h-screen sm:block md:hidden lg:hidden xl:hidden"
          src="/Images/majestic-lukas-4dZMVjr99pY-unsplash.jpg"
          alt="Image Description"
        />
      <div className='shadow-md w-full fixed top-0 left-0'>
      <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>
      <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins]  text-gray-800'>
              Bike Rent
            </div>
           
            <div className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
      <ion-icon onClick={()=>{
              
              
              setOpen(!open)

            }} name={open ? 'close':'menu'}></ion-icon>
      </div>
            <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white  md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ':'top-[-490px]'}`}>   
                    
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
                <Link className="font-semibold" to="/tarif">Tarif</Link>
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
              Profile
            </div>
          </div>
        </div>
       
      </div>
    </div>
  );
}
