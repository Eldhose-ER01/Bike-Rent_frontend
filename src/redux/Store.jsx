import { configureStore } from "@reduxjs/toolkit";
import userSlice from './Userslice'
import adminSlice from'./Adminslice'
import Partnerslice from "./Partnerslice";
import BikeSlice from "./bikelist.js";
import NavbarSlice from "./NavbarSlice.jsx";

const store=configureStore({
    reducer:{
        user:userSlice,
        admin:adminSlice,
        partner:Partnerslice,
        BikeSlice:BikeSlice,
        navSlice:NavbarSlice
    }
})

export default store