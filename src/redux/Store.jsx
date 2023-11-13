import { configureStore } from "@reduxjs/toolkit";
import userSlice from './Userslice'
import adminSlice from'./Adminslice'
import Partnerslice from "./Partnerslice";

const store=configureStore({
    reducer:{
        user:userSlice,
        admin:adminSlice,
        partner:Partnerslice
        
    }
})

export default store