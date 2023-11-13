import {Routes,Route} from 'react-router-dom'
import PartnerLogin from'../Pages/Partner/PartnersLogin'
import PartnerSignup from '../Pages/Partner/PartnerSignup'
import PartnerSucess from '../Pages/Partner/PartnerSucess'
import Partnerdashboard from '../Pages/Partner/Partnerdashboard'
export default function Partnerroutes() {
  return (
    <div>
      <Routes>
        <Route path='/'element={<Partnerdashboard/>}/>
        <Route path='/login'element={<PartnerLogin/>}/>
        <Route path='/signup'element={<PartnerSignup />}/>
        <Route path='/signupsuccess'element={<PartnerSucess />}/>

      </Routes>
    </div>
  )
}
