import { Routes, Route } from "react-router-dom";
import PartnerLogin from "../Pages/Partner/PartnersLogin";
import PartnerSignup from "../Pages/Partner/PartnerSignup";
import PartnerSucess from "../Pages/Partner/PartnerSucess";
import Partnerdashboard from "../Pages/Partner/Partnerdashboard";
import PartnetProfile from "../Pages/Partner/PartnetProfile";
import PartnerAddbike from "../Pages/Partner/PartnerAddbike";
import PartnerBikelist from "../Pages/Partner/PartnerBikelist";
import PartnerEditprofile from "../Pages/Partner/PartnerEditprofile";
import EditBike from "../Pages/Partner/EditBike";
import { useDispatch, useSelector } from "react-redux";
import { partnerApi } from "../configure/Api";
import { useEffect } from "react";
import { addUser } from "../redux/Partnerslice";
import axios from "axios";
export default function Partnerroutes() {
  const dispatch = useDispatch();

  const checkIfPartner = async (token) => {
    const response = await axios.post(`${partnerApi}checkispartner`, null, {
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
        <Route
          path="/"
          element={userToken ? <Partnerdashboard /> : <PartnerLogin />}
        />
        <Route
          path="/login"
          element={userToken ? <PartnerLogin /> : <Partnerdashboard />}
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
        <Route path="/signupsuccess" element={<PartnerSucess />} />
      </Routes>
    </div>
  );
}
