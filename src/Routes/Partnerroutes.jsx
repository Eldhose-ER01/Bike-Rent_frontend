import {Routes,Route} from 'react-router-dom'
import PartnerLogin from'../Pages/Partner/PartnersLogin'
import PartnerSignup from '../Pages/Partner/PartnerSignup'
import PartnerSucess from '../Pages/Partner/PartnerSucess'
import Partnerdashboard from '../Pages/Partner/Partnerdashboard'
import PartnetProfile from '../Pages/Partner/PartnetProfile'
import PartnerAddbike from '../Pages/Partner/PartnerAddbike'
import PartnerBikelist from '../Pages/Partner/PartnerBikelist'
import PartnerEditprofile from '../Pages/Partner/PartnerEditprofile'
import EditBike from '../Pages/Partner/EditBike'
import {useDispatch,useSelector}from 'react-redux'
import { partnerApi } from '../configure/Api'
import { useEffect } from 'react'
import { addUser } from '../redux/Partnerslice'
import axios from 'axios'
export default function Partnerroutes() {
  const dispatch=useDispatch()
const checkIfparner = async (token) => {
  const response = await axios.post(`${partnerApi}checkispartner`, null, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  

  if (response.data.success) {
    console.log(response.data.userdatas, "responseeeeeeeeeeeeeee");
    dispatch(addUser({ token: response.data.userdatas.token, username: response.data.userdatas.name, id: response.data.userdatas.id }));
  }
};

useEffect(() => {
  const token = JSON.parse(localStorage.getItem('token'));
  token && checkIfparner(token)
  
 
}, []);
const user = useSelector(store=>store.partner.partnerD)
const userToken =user.token
  return (
    <div>
      <Routes>
        <Route path='/'element={<Partnerdashboard/>}/>
        <Route path='/login'element={<PartnerLogin/>}/>
        <Route path='/signup'element={<PartnerSignup />}/>
        <Route path='/signupsuccess'element={<PartnerSucess />}/>
        <Route path='/partnerprofile'element={<PartnetProfile/>}/>
        <Route path='/partnereditprofile'element={<PartnerEditprofile/>}/>
        <Route path='/addbike'element={<PartnerAddbike/>}/>
        <Route path='/bikelist'element={<PartnerBikelist/>}/>
        <Route path='/editbike'element={<EditBike/>}/>

      </Routes>
    </div>
  )
}
