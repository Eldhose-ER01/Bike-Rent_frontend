import Partnerdashboard from "../../../Pages/Partner/Partnerdashboard"
import { useNavigate } from "react-router-dom"
import { partnerbikefind } from "../../../configure/Partnerinterceptor"
import { useState,useEffect } from "react"
export default function Partnerbikelist() {
    const navigate=useNavigate()
    const [bikedata,setbikedata]=useState([])
    
useEffect(() => {
    const bikeslist=async()=>{
        const response=await partnerbikefind()
        if(response.data.success){
         setbikedata(response.data.bikelist)
        }
     }
     bikeslist()
}, [])
    

    const editpage=()=>{
        navigate('/partner/editbike',{state:bikedata})
    }
  return (
    <div>
         <div style={{ display: "flex" }} className="w-screen">
      <div style={{ flex: 1 }}>
      <Partnerdashboard/>
      </div>
      <div className="container mt-5 pr-10">
        <h1 className="font-extrabold font-serif flex justify-center text-3xl ">
          Bike List
        </h1>
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="p-1.5 w-full inline-block align-middle">
            <div className="lg:w-[95%] bg-white flex flex-col items-center ml-10">
            <div className="flex flex-wrap justify-center">
                {bikedata.map((value)=>{
                    return(

               
            <div key={value.id} className="w-full sm:w-72  bg-gray-100 custom-shadow m-3 rounded-md border-2 border-red-700">
            <img  
            src={value.image}
                  alt=""
                  className="w-full h-40 object-cover rounded-t-md"
                />
                <h1 className="font-bold text-center text-lg uppercase text-sky-500">
                  {value.Bikename}
                </h1>
                <div className="p-3">
                  <h1 className="font-bold text-sky-500">Brand-{value.brand}</h1>
                  <h1 className="font-bold text-sky-500">Engine CC-{value.VehicleCC}</h1>
                  <h1 className="font-bold text-sky-500">Fuel Type-{value.FuelType}</h1>
                  <h1 className="font-bold text-sky-500">Plate No-{value.platenumber}</h1>
                  <h1 className="font-bold text-sky-500">Rent-{value.FuelType}</h1>


                  <h1 className="font-bold text-sky-500">
                   Rent Amount 24 Per Hour
                  </h1>
                  <div className="flex justify-between pt-5">
                  <button type="button" className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"onClick={editpage}>Edit</button>
                  <button type="button" className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">Delete</button>
                  </div>
                </div>
               </div>

)
})}

            




              



               
             </div>
             </div>
            
        </div>
    </div>
    </div>
    </div>
    </div>
    </div>
  )
}
