import { Route, Routes } from "react-router-dom";
import Adminlogin from "../Pages/Admin/AdLogin";
import Admindash from "../Pages/Admin/Adashboard";
import UserList from "../Pages/Admin/UserList";
import PartnerRequist from "../Pages/Admin/PartnerRequist";
import Partnerlist from "../Pages/Admin/Partnerlist";
import BikeReq from "../Pages/Admin/BikeReq";
import { adminApi } from "../configure/Api";
import { addadmin } from "../redux/Adminslice";
import { useEffect, useState } from "react";
import AdminViewsBikes from "../Pages/Admin/AdminViewsBikes";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function Adminroutes() {
  const dispatch = useDispatch();
  const [chechAdmin, setChedkAdmin] = useState();
  // Optional chaining to prevent errors
  const admin = useSelector((store) => store.admin.adminD);
  const admintoken = admin.token;

  const checkIfadmin = async (token) => {
    console.log("Checking if admin...");

    try {
      const response = await axios.post(`${adminApi}/checkifadmin`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setChedkAdmin(response.data.admindata.token);
        dispatch(
          addadmin({
            token: response.data.admindata.token,
            email: response.data.admindata.email,
          })
        );
      } else {
        console.log("Admin check failed. Response:", response.data);
      }
    } catch (error) {
      console.error("Error checking if user is an admin:", error);
    }
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    token && checkIfadmin(token);
  }, [admintoken]);

  // Add a loading or fallback state for the initial render
  if (admintoken === undefined) {
    return <div>Loading...</div>; // or another loading indicator
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={admintoken ? <Admindash /> : <Adminlogin />} />

        <Route
          path="/login"
          element={admintoken ? <Adminlogin /> : <Admindash />}
        />
        <Route
          path="/user"
          element={admintoken ? <UserList /> : <Adminlogin />}
        />
        <Route
          path="/partnerreq"
          element={admintoken ? <PartnerRequist /> : <Adminlogin />}
        />
        <Route
          path="/Partnerlist"
          element={admintoken ? <Partnerlist /> : <Adminlogin />}
        />
        <Route
          path="/bikerequest"
          element={admintoken ? <BikeReq /> : <Adminlogin />}
        />
        <Route
          path="/partnerbikeslists"
          element={admintoken ? <AdminViewsBikes /> : <Adminlogin />}
        />
      </Routes>
    </div>
  );
}

export default Adminroutes;
