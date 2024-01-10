import { createSlice } from "@reduxjs/toolkit";

const navSlice=createSlice({
    name:"navbar",
    initialState:{
        isbookingpage:true
    },
    reducers:{
        isbookinpagetrue:(state)=>{
           state.isbookingpage=true
        },
        isbookinpagefalse:(state)=>{
            state.isbookingpage=false
         },
    }
    
})
export const{isbookinpagetrue,isbookinpagefalse}=navSlice.actions
export default navSlice.reducer