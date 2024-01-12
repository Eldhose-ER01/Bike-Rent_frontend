import { useEffect, useState } from "react"
import { Profiledata ,BookingPartner,saveChat,getChat} from "../../../configure/Userinterceptor"
import io from "socket.io-client"
import toast from "react-hot-toast"
const socket = io.connect('http://localhost:8080')
export default function Chat() {
   const[user,setUser]=useState([])
   const[partner,setPartner]=useState([])
   const[partnerId,setPartnerid]=useState()
   const[refresh,setRefresh]=useState()
   const[name,setname]=useState('No user Selected')
   const[image,setimage]=useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB1unljthnNhq11gRkFBXbUgElDzv8g1v0iWSrQ6bi5Yhd_JvrGstVekNgbnF-vvPkC4c&usqp=CAU")

const userdata=async()=>{
    try {
        const response=await Profiledata()
        if(response.data.success){
            setUser(response.data.user)
        }
    } catch (error) {
        console.log(error);
    }
}
const partnerdata=async()=>{
    try {
        const response=await BookingPartner()
        if(response.data.success){
            setPartner(response.data.uniquePartners)
            console.log(response.data.uniquePartners[0]._id,"ffffffffff");
            setPartnerid(response.data.uniquePartners[0]._id)
        }
    } catch (error) {
        console.log(error);
    }
}
useEffect(() => {
  userdata()
  partnerdata()
}, [])

const partnersid=(id,first,last,image)=>{
    setPartnerid(id)
    setRefresh(id)
    setname(first+last)
    setimage(image)

}

const [currentMessage, setCurrentMessage] = useState("");
    const [chatPerson, setChatPerson] = useState([]);
    const [Userdetails, setUserdetails] = useState({});



    useEffect(() => {
      
      if(refresh){
        const chatTrigar = async () => {
            console.log("partnerIdpartnerId",partnerId);

            socket.on("receiveMessage", async () => {
              console.log(partnerId)
                await getChat(partnerId).then((res) => {
                console.log("partnerIdpartnerId",res.data.findChat[0].chat);
                    setChatPerson(res.data.findChat[0].chat);
                setUserdetails(res.data.findChat[0].partnerId);

                })
            })
            //   await getChat(partnerId).then((res) => {
            //     console.log(res.data, 'oooooo')
            //     setUserdetails(res.data.findChat[0].partnerId);
            //     setChatPerson(res.data.findChat[0].chat);
            // });
            
            
        }
        chatTrigar()

        return () => {
            socket.off("receiveMessage");
        }
      }
    }, [refresh]);

    const handleMessage = async () => {
        const test = currentMessage ? currentMessage : '';
       document.getElementById('currentMessage').value = ''
        const chat = {
            user: test,
            partner: '',
        };
        console.log(chat,'this chat undifined')
        const data = {
            chat: chat,
            partnerId: partnerId,
        }

        await saveChat(data).then((response) => {
          console.log(response,'this is my user save chat response...........')
          if(response.data.success){
          // console.log('this is my user save chat response...........2')

            toast.success("working chat")
            socket.emit("sentMessage")

            // const items = response?.data?.orderItems;
          }else{
            toast.error("not working")

          }
        
        });
    }
  return (
    <div className="w-screen flex">
    <div className="w-[25%] border h-screen bg-slate-200">
        <div className="flex  items-center mt-7 ">
           <img src={user.image} alt=""  className="rounded-full w-20 h-20 ml-4" />
           <div className="ml-3">
            <h3 className="text-2xl">{user.fname} {user.lname}</h3>
            <div className="border border-primary p-[2px] rounded-full"><p className="text-lg font-light">{user.email}</p></div>
            
           </div>
           
        </div>
        <hr className="bg-black mt-5 h-1"/>
      
        <div className="mx-14 mt-10 bg-slate-200">
            <div className="text-blue-500 text-lg font-semibold ml-1">Messages</div>
            <div>
            {
  partner.map((partner, index) => {
    return (
      <div key={index} className="flex justify-center items-center py-5 border-b border-b-gray-300" onClick={()=>partnersid(partner._id,partner.fname,partner.lname,partner.image)}>
        <div className="cursor-pointer flex items-center">
          <img src={partner.image} className="w-20 h-20 rounded-full" alt="" />
          <div className="ml-6">
            <h3 className="text-lg font-semibold">{partner.fname} {partner.lname}</h3>
            <div className="border border-primary p-[2px] rounded-full">
              <p className="text-sm font-light text-gray-600"></p>
            </div>
          </div>
        </div>
      </div>
    );
  })
}

            </div>
        </div>
    </div>
    <div className="w-[75%] border h-screen bg-white flex flex-col items-center ">
        <div className="w-[75%] bg-slate-100 h-[80px] mt-14 rounded-full flex items-center px-14 shadow-md">
            <div><img src={image}width={60} height={60} alt=""  />
</div>
<div className="ml-6">
<h3 className="text-lg">{name}</h3>
<p className="text-sm font-light text-gray-600">Online</p>
</div>
</div>
<div className="h-[75%] border w-full overflow-scroll overflow-x-hidden shadow-sm">
{chatPerson?.map((chatPerson, index) => {
  return (
    <div key={index} className="p-14">
   { chatPerson.partner!=''?

      <div className="max-w-[44%] bg-slate-200 rounded-b-xl rounded-tr-xl p-2 mb-6">
      {chatPerson.partner}
      </div>
      :chatPerson.user!='' &&
      <div className="max-w-[44%] bg-sky-400 rounded-b-xl rounded-tl-xl ml-auto p-2 text-white mb-6">
       
        {chatPerson.user}
      </div>
}
    </div>
  );
})}


</div>
<div className="p-14 w-full flex items-center">
    <input  placeholder="Type a Message..."className="w-full  bg-slate-200 p-4 border-0 shadow-md rounded-full bg focus:ring-0 focus:border-0" id="currentMessage" onChange={(e)=>{setCurrentMessage(e.target.value)}}/>
    <div className="ml-2 p-3 cursor-pointer bg-sky-200 rounded-full" onClick={handleMessage}>

    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-send" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M10 14l11 -11" />
  <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
</svg>
    </div>
    <div className="ml-2">
    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-plus" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
  <path d="M9 12h6" />
  <path d="M12 9v6" />
</svg>
    </div>
</div>

        </div>

   
    {/* <div className="w-[25%] border h-screen bg-blend-lighten"></div> */}
    </div>
  )
}
