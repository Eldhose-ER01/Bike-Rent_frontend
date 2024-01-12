import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/Userslice";
import { userApi } from "../configure/Api";
import { useEffect } from "react";
import Userprofile from "../Pages/User/Userprofile";
import Userlogin from "../Pages/User/Userlogin";
import Userhome from "../components/User/userHome/Userhome";
import OTP from "../Pages/User/Otp";
import Signup from "../Pages/User/UserSignup";
// import Google from "../Pages/User/GoogleAuth";
import EmailSubmit from "../Pages/User/EmailSubmit";
import ResetPage from "../Pages/User/ResetPage";
import ForgetOtp from "../Pages/User/ForgetOtp";
import Offers from "../Pages/User/Offers";
import axios from "axios";
import Editprofile from "../Pages/User/Editprofile";
import SelectBooking from "../Pages/User/SelectBooking";
import Page404notfind from "../Pages/ErrrorPages/Page404notfind";
import ServerErr from "../Pages/ErrrorPages/ServerErr";
import BikeBookingPage from "../Pages/User/BikeBooking";
import BookingSucess from "../Pages/User/BookingSucess";
import BookingCancels from "../Pages/User/BookingCancels";
import BookingHIstorys from "../Pages/User/BookingHIstorys";
import BookingsView from "../Pages/User/BookingsView";
import UserChat from "../Pages/User/UserChat";
import WalletHistorys from "../Pages/User/WalletHistorys";
export default function Userroutes() {
  const dispatch = useDispatch();
  const checkIfUser = async (token) => {
    const response = await axios.post(`${userApi}checkIfUser`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success) {
      dispatch(
        addUser({
          token: response.data.userdatas.token,
          username: response.data.userdatas.name,
          id: response.data.userdatas.id,
        })
      );
    }
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    token && checkIfUser(token);
  }, []);
  const user = useSelector((store) => store.user.userD);
  const userToken = user.token;

  return (
    <div>
      <Routes>
      <Route path="/*" element={<Page404notfind />} />
        <Route path="/" element={<Userhome />} />
        <Route
          path="/login"
          element={userToken ? <Navigate to="/" /> : <Userlogin />}
        />
        <Route
          path="/signup"
          element={userToken ? <Navigate to="/" /> : <Signup />}
        />
        <Route
          path="/otp"
          element={userToken ? <Navigate to="/" /> : <OTP />}
        />
        <Route
          path="/profile"
          element={userToken ? <Userprofile /> : <Userlogin />}
        />
        {/* <Route path="/googleauth" element={<Google />} /> */}
        <Route path="/submitemail" element={<EmailSubmit />} />
        <Route path="/resetemail" element={<ResetPage />} />
        <Route path="/successbooking" element={<BookingSucess />} />
        <Route
          path="/forgetotp"
          element={userToken ? <Navigate to="/" /> : <ForgetOtp />}
        />
        <Route
          path="/editprofile"
          element={userToken ? <Editprofile /> : <Userlogin />}
        />
        
        <Route
          path="/bikebooking"
          element={userToken ? <BikeBookingPage /> : <Userlogin />}
        />

        <Route
          path="/bookinghistrory"
          element={userToken ? <BookingHIstorys /> : <Userlogin />}
        />

        <Route
          path="/bookingview"
          element={userToken ? <BookingsView /> : <Userlogin />}
        />

        <Route
          path="/bikeselect"
          element={userToken ? <SelectBooking /> : <Userlogin />}
        />
          <Route
          path="/offer"
          element={userToken ? <Offers /> : <Userlogin />}
        />
        {/* <Route
          path="/chat"
          element={userToken ? <UserChat /> : <Userlogin />}
        /> */}
        <Route
          path="/wallethistory"
          element={userToken ? <WalletHistorys /> : <Userlogin />}
        />
          <Route path="/chat" element={<UserChat />} />
        <Route path="/bookingcancel" element={<BookingCancels />} />

        <Route path="/error404" element={<Page404notfind />} />
        <Route path="/error500" element={<ServerErr />} />
      </Routes>
    </div>
  );
}
