import { useEffect, useRef, useState } from "react";
import {
  findprofile,
  Uniquechatuser,
  getChat,
  saveChat,
} from "../../../configure/Partnerinterceptor";
import { isbookinpagefalse } from "../../../redux/NavbarSlice";
import { useDispatch } from "react-redux";
import io from "socket.io-client";
import toast from "react-hot-toast";
const socket = io.connect("https://runrider.site");
// const socket = io.connect("http://localhost:8080");



export default function Chat() {
  const Dispatch = useDispatch();
  const messageref=useRef(null)
  const [partnerdetail, partnerSetDetail] = useState([]);
  const [userlist, setUserlist] = useState([]);
  const [userid, setuserid] = useState();
  const [refresh, setRefresh] = useState();
  const [name, setname] = useState("No user Selected");

  const [image, setimage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB1unljthnNhq11gRkFBXbUgElDzv8g1v0iWSrQ6bi5Yhd_JvrGstVekNgbnF-vvPkC4c&usqp=CAU"
  );

  const findpartner = async () => {
    try {
      const response = await findprofile();
      if (response.data.success) {
        partnerSetDetail(response.data.userdata);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Userlist = async () => {
    const response = await Uniquechatuser();
    if (response.data.success) {
      setUserlist(response.data.booking);

      setuserid(response.data.booking[0]._id);
    }
  };

  useEffect(() => {
    findpartner();
    Dispatch(isbookinpagefalse());
    toast.success("enter in to chat");
    Userlist();
  }, [refresh]);

  const usechatsid = (id, first, last, image) => {
    setuserid(id);
    setRefresh(id);
    setname(first + last);
    setimage(image);
  };

  const [currentMessage, setCurrentMessage] = useState("");
  const [chatPerson, setChatPerson] = useState([]);
  const [Userdetails, setUserdetails] = useState({});

  useEffect(() => {
    if (refresh) {
      const chatTrigar = async () => {
        socket.on("receiveMessage", async () => {
          await getChat(userid).then((res) => {
            setChatPerson(res.data.findChat[0].chat);
            setUserdetails(res.data.findChat[0].partnerId);
          });
        });

        // await getChat(userid).then((res) => {
        //     console.log(res.data.findChat[0].chat, 'oooooo')
        //     setUserdetails(res.data.findChat[0].partnerId);
        //     setChatPerson(res.data.findChat[0].chat);
        // });
      };
      chatTrigar();

      return () => {
        socket.off("receiveMessage");
      };
    }
  }, [refresh, userid]);

  const handleMessage = async () => {
    const test = currentMessage ? currentMessage : "";
    document.getElementById("currentMessage").value = "";
    const chat = {
      user: "",
      partner: test,
    };

    const data = {
      chat: chat,
      userid: userid,
    };

    await saveChat(data).then((response) => {
      socket.emit("sentMessage");
      const items = response?.data?.orderItems;
    });
  };
  useEffect(() => {
    if(messageref?.current){
      messageref.current.scrollIntoView();
    }
}, [currentMessage]);

  return (
    <div className="w-screen flex flex-wrap">
      <div className="w-[25%] border h-screen bg-slate-200">
        <div className="flex  items-center mt-7 ">
          <img
            src={partnerdetail.image}
            alt=""
            className="rounded-full w-20 h-20 ml-4"
          />
          <div className="ml-3">
            <h3 className="text-2xl flex-wrap">
              {partnerdetail.fname} {partnerdetail.lname}
            </h3>
            <div className="border border-primary p-[2px] rounded-full">
              <p className="text-lg font-light">{partnerdetail.email}</p>
            </div>
          </div>
        </div>
        <hr className="bg-black mt-5 h-1" />

        <div className="mx-14 mt-10 bg-slate-200 flex flex-wrap">
          <div className="text-blue-500 text-lg font-semibold ml-1">
            Messages
          </div>
          <div>
            {userlist.map((userl, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-center items-center py-5 border-b border-b-gray-300"
                  onClick={() =>
                    usechatsid(userl._id, userl.fname, userl.lname, userl.image)
                  }
                >
                  <div className="cursor-pointer flex items-center">
                    <img
                      src={userl.image}
                      className="w-20 h-20 rounded-full"
                      alt=""
                    />
                    <div className="ml-6">
                      <h3 className="text-lg font-semibold">
                        {userl.fname} {userl.lname}
                      </h3>
                      <div className="border border-primary p-[2px] rounded-full">
                        <p className="text-sm font-light text-gray-600"></p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-[75%] border h-screen bg-white flex flex-col items-center ">
        <div className="w-[75%] bg-slate-100 h-[80px] mt-14 rounded-full flex items-center px-14 shadow-md">
          <div>
            <img
              src={image ? image : ""}
              width={60}
              height={50}
              className="rounded-full"
              alt=""
            />
          </div>
          <div className="ml-6">
            <h3 className="text-lg">{name ? name : ""}</h3>
            <p className="text-sm font-light text-gray-600">Online</p>
          </div>
        </div>
        <div className="h-[75%] border w-full overflow-scroll overflow-x-hidden shadow-sm">
          {chatPerson?.map((chatPerson, index) => {
            return (
              <div key={index} className="p-2">
                {chatPerson.user != "" ? (
                  <div className="max-w-[30%] bg-slate-200 rounded-b-xl rounded-tr-xl p-2 mb-2">
                    {chatPerson.user}
                  </div>
                ) : (
                  chatPerson.partner != "" && (
                    <div className="max-w-[30%] bg-sky-400 rounded-b-xl rounded-tl-xl ml-auto p-2 text-white mb-2">
                      {chatPerson.partner}
                    </div>
                  )
                )}
              </div>
            );
          })}
          <div ref={messageref}>
           
          </div>

        </div>

        <div className="p-14 w-full flex items-center">
          <input
            placeholder="Type a Message..."
            className="w-full  bg-slate-200 p-4 border-0 shadow-md rounded-full bg focus:ring-0 focus:border-0"
            id="currentMessage"
            onChange={(e) => {
              setCurrentMessage(e.target.value);
            }}
          />
          <div
            className="ml-2 p-3 cursor-pointer bg-sky-200 rounded-full"
            onClick={handleMessage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-send"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#2c3e50"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 14l11 -11" />
              <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
            </svg>
          </div>
          <div className="ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-circle-plus"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#2c3e50"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
              <path d="M9 12h6" />
              <path d="M12 9v6" />
            </svg>
          </div>
        </div>
      </div>

      {/* <div className="w-[25%] border h-screen bg-blend-lighten"></div> */}
    </div>
  );
}
