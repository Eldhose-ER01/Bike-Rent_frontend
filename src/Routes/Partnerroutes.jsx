import { Routes, Route } from "react-router-dom";
import PartnerLogin from "../Pages/Partner/PartnersLogin";
import PartnerSignup from "../Pages/Partner/PartnerSignup";
import PartnerSucess from "../Pages/Partner/PartnerSucess";
import Partnerdashboard from "../Pages/Partner/Partnerdashboard";
import PartnetProfile from "../Pages/Partner/PartnetProfile";
import PartnerAddbike from "../Pages/Partner/PartnerAddbike";
import Page404notfind from "../Pages/ErrrorPages/Page404notfind";
import ServerErr from "../Pages/ErrrorPages/ServerErr";
import PartnerChats from "../Pages/Partner/PartnerChats";
import PartnerBikelist from "../Pages/Partner/PartnerBikelist";
import PartnerEditprofile from "../Pages/Partner/PartnerEditprofile";
import EditBike from "../Pages/Partner/EditBike";
import BookingsDetails from "../Pages/Partner/BookingsDetails";
import BookingViews from "../Pages/Partner/BookingViews";
import PartenerSale from "../Pages/Partner/PartenerSale";
import PartnerChat from "../Pages/Partner/PartnerChat";
import { useDispatch, useSelector } from "react-redux";
import { partnerApi } from "../configure/Api";
import { useEffect } from "react";
import { addUser } from "../redux/Partnerslice";
import axios from "axios";
import { useState } from "react";
export default function Partnerroutes() {
  const dispatch = useDispatch();
  
  const [checkPartner, setChedkPartner] = useState();

  const checkIfPartner = async (token) => {
    const response = await axios.post(`${partnerApi}/checkispartner`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
      if (response.data.success) {
     

        dispatch(
          addUser({
            token: response.data.partnerdata.token,
            username: response.data.partnerdata.name,
            id: response.data.partnerdata.id,
          })
        );
      }
     
   
   
  };

 

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    dispatch(
      addUser({
        token: token,
      })
    );
    token && checkIfPartner(token);
  }, []);

  const user = useSelector((store) => store.partner.partnerD);
  console.log(user, "this si token");
  const userToken = user.token; 

  return (
    <div>
      <Routes>
      <Route path="/*" element={<Page404notfind />} />

        <Route
          path="/"
          element={userToken ? <Partnerdashboard /> : <PartnerLogin />}
        />
        <Route
          path="/login"
          element={userToken ? <Partnerdashboard /> : <PartnerLogin />}
        />
        <Route
          path="/signup"
          element={userToken ? <Partnerdashboard /> : <PartnerSignup />}
        />
        <Route
          path="/partnerprofile"
          element={userToken ? <PartnetProfile /> : <PartnerLogin />}
        />
        <Route
          path="/partnereditprofile"
          element={userToken ? <PartnerEditprofile /> : <PartnerLogin />}
        />
        <Route
          path="/addbike"
          element={userToken ? <PartnerAddbike /> : <PartnerLogin />}
        />
        <Route
          path="/addbike"
          element={userToken ? <EditBike /> : <PartnerLogin />}
        />
        <Route
          path="/bikelist"
          element={userToken ? <PartnerBikelist /> : <PartnerLogin />}
        />
        <Route
          path="/editbike"
          element={userToken ? <EditBike /> : <PartnerLogin />}
        />
          <Route
          path="/getbooking"
          element={userToken ? <BookingsDetails /> : <PartnerLogin />}
        />
         <Route
          path="/bookingview"
          element={userToken ? <BookingViews /> : <PartnerLogin />}
        />
          <Route
          path="/partnerchart"
          element={userToken ? <PartnerChats /> : <PartnerLogin />}
        />
         <Route
          path="/partnersale"
          element={userToken ? <PartenerSale /> : <PartnerLogin />}
        />
          {/* <Route
          path="/partnerchat"
          element={userToken ? <PartnerChat /> : <PartnerLogin />}
        /> */}

        <Route path="/partnerchat" element={<PartnerChat />} />
        <Route path="/signupsuccess" element={<PartnerSucess />} />
        <Route path="/error404" element={<Page404notfind />} />
        <Route path="/error500" element={<ServerErr />} />
      </Routes>
    </div>
  );
}
