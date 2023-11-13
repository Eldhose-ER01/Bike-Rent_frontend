import {Route,Routes } from 'react-router-dom'
import Adminlogin from'../Pages/Admin/AdLogin'
import Admindash from'../Pages/Admin/Adashboard'
import UserList from '../Pages/Admin/UserList'
import PartnerRequist from '../Pages/Admin/PartnerRequist'
import Partnerlist from '../Pages/Admin/Partnerlist'
function Adminroutes() {
  return (
    <div>
      <Routes>
        <Route path='/login'element={<Adminlogin/>}/>
        <Route path='/'element={<Admindash/>}/>
        <Route path='/user'element={<UserList/>}/>
        <Route path='/partnerreq'element={<PartnerRequist />}/>
        <Route path='/Partnerlist'element={<Partnerlist />}/>

        

      </Routes>
    </div>
  )
}

export default Adminroutes
