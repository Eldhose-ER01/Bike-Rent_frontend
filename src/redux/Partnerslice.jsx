import { createSlice } from "@reduxjs/toolkit";

const partnerSlice=createSlice({
    name:"partner",
    initialState:{
        partnerD:{
            token:null,
            name:null,
            id:null
        }
    },

    reducers:{
        addUser:(state,action)=>{
            state.partnerD.token=action.payload.token
            // state.partnerD.name=action.payload.name,
            // state.partnerD.id=action.payload.id
        },
        removeUser:(state)=>{
            state.partnerD.token=null
            // state.partnerD.name=null,
            // state.partnerD.id=null
        }
    }


})
export const{addUser,removeUser}=partnerSlice.actions
export default partnerSlice.reducer
