import { createSlice } from "@reduxjs/toolkit";

const adminSlice=createSlice({
    name:"admin",
    initialState:{
        adminD:{
            token:null,
            email:null
        }
    },
    reducers:{
        addadmin:(state,action)=>{
            state.adminD.token=action.payload.token,
            state.adminD.email=action.payload.email
        },
        removeadmin:(state)=>{
            state.adminD.token=null,
            state.adminD.email=null
        }

        
    }

})
export const{addadmin,removeadmin}=adminSlice.actions
export default adminSlice.reducer