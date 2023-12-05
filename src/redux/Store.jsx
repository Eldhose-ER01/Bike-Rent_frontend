import { configureStore } from "@reduxjs/toolkit";
import userSlice from './Userslice'
import adminSlice from'./Adminslice'
import Partnerslice from "./Partnerslice";
import BikeSlice from "./bikelist.js";

const store=configureStore({
    reducer:{
        user:userSlice,
        admin:adminSlice,
        partner:Partnerslice,
        BikeSlice:BikeSlice
    }
})

export default store