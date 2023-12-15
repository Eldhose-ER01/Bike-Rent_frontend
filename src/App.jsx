
import {BrowserRouter as Router,Routes,Route} from "react-router-dom" 
import {Toaster} from 'react-hot-toast'
import User from'./Routes/Userroutes'
import Admin  from'./Routes/Adminroutes'
import Partner from'./Routes/Partnerroutes'


function App() {


  

  return (
    <>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
    <Router>
      <Routes>
       
        <Route path='/*'element={<User/>}/>
        <Route path='/partner/*'element={<Partner/>}/>
        <Route path='/admin/*'element={<Admin/>}/>
      

      </Routes>
    </Router>
    </>
  )
}

export default App
