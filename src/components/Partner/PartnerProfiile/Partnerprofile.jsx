import { useEffect, useState } from "react";
import { findprofile } from "../../../configure/Partnerinterceptor";
import { TbCameraBolt } from "react-icons/tb";
import Axios from 'axios'
import { imageprofile } from "../../../configure/Partnerinterceptor";
import { useNavigate } from "react-router-dom";
export default function Partnerprofile() {
  const[partner,setPartner]=useState(null)
  const [loader,setLoader] = useState(false)
  const navigate=useNavigate()
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const findpartner=async()=>{
    const response=await findprofile()
    if(response.data.success){
        setPartner(response.data.userdata)
    }
  }
  useEffect(() => {
    findpartner()
  }, [loader])


  const ProfleUpload=async(file)=>{
    const formData=new FormData()

    formData.append("file",file)
    formData.append("upload_preset","kesrrxni")
    console.log(formData,"dataaaaaaaaaaaaaaaaaaaaaa");
    let data="";
    await Axios.post(
      "https://api.cloudinary.com/v1_1/dotjc7vax/image/upload",
      formData).then((response)=>{
        data=response.data["secure_url"]
      })
      console.log(data,"kfffffffffffffffffffff");
      return data
    
  }


  const profilepic = async (e) => {
    try {
      setLoader(true);
      const res = await ProfleUpload(e.target.files[0]);
      const newUpload = async () => {
        try {
          const image = res;
          const response = await imageprofile(image);
          
          if (response.data.success) {
            
            setLoader(false);
           
            // setRefresh((refresh) => !refresh);
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


  const profileedit=()=>{
    navigate('/partner/partnereditprofile',{state:partner})
  }

  return (
    <div>
              <div className={loader === false ? "flex justify-center  sm:mt-24 bg-transparent " : "flex justify-center mt-8 sm:mt-24 bg-transparent tracking-tight text-gray-900 dark:text-white opacity-30"}>

       {/* <div className="container mx-auto p-4 border border-blue-900 bg-blue-900 hidden sm:block"> */}
       <div className="container mx-auto p-4 border border-red-300 custom-shadow md:mt-2 md:w-1/2 lg:w-1/2 xl:w-1/2 2xl:w-1/2">
  
    <div className="flex flex-col items-center">
      {/* Profile Picture */}
      <div className="py-3 relative">
            <img
                src={partner?.image}
                alt="Profile Picture"
                className="w-32 h-32 rounded-full"
            />

            <label
                htmlFor="fileInput"
                className="absolute top-[80%]  "
            >
                <TbCameraBolt type="file" style={{ width: "1.5em", height: "1.5em" }} className="" />
            </label>
            <input
                id="fileInput"
                type="file"
                hidden
                onChange={profilepic}
              />
            </div>

      

      {/* Company Name */}
      <h2 className="text-2xl font-bold mb-2"> {partner && `${partner.fname} ${partner.lname}`}</h2>
      {/* Profile Details */}
      <div className="flex flex-col items-start md:mt-3">
        <div className="mb-2">
          <span className="font-bold text-lg">Company Name:</span>{partner?.companyname}
        </div>
        <div className="mb-2">
        <span className="font-bold text-lg">Email:</span> {partner && partner.email}
        </div>
        <div className="mb-2">
          <span className="font-bold text-lg">Phone:</span> { partner?.phone}
        </div>
        <div className="mb-2">
          <span className="font-bold text-lg">District:</span>{partner?.district}
        </div>
        <div className="mb-2">
          <span className="font-bold text-lg">State:</span>{partner?.state}
        </div>
        <div className="mb-2">
          <span className="font-bold text-lg">City:</span> {partner?.city}
        </div>
        <div className="mb-2">
          <span className="font-bold text-lg">SubLocation:</span>{partner?.sublocation}
        </div>
        <div>
        <span className="font-bold">Your Adhaar:</span><button onClick={openModal}>Open</button>

      {isModalOpen && (
        <div className="modal ">
          <div className=" w-96 h-64 bg-blue-400">
<img  src={partner?.aadhaar} alt="" />
          </div>
         
          <button onClick={closeModal}>Close Modal</button>
        </div>
      )}
    </div>
   
      </div>
     
    </div>
    <div className="flex justify-end items-end">

    <button className=" ml-24 box-border p-6 w-36 h-7 mt-3 flex items-center justify-center border border-red-600 bg-green-500 font-bold text-lg custom-shadow hover:bg-sky-400"onClick={profileedit}>
                  Edit
                </button>
</div>
  </div>
  {
        loader==true ?
        <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
<svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>         <span className="sr-only">Loading...</span>
        </div>
        :null
      }
</div>
</div>
  
  );
}
