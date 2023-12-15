import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const BikeSlice = createSlice({
  name: "BikeSlice",
  initialState: [],

  reducers: {
    addBiks: (state, action) => {
      state = action.payload;
      return state;
    },
    price: (state, action) => {
      let data = state;
      if (action.payload == "low") {
        return [...state].sort((a, b) => a.RentPerDay - b.RentPerDay);
      } else if (action.payload == "high") {
        return [...state].sort((a, b) => b.RentPerDay - a.RentPerDay);
      }
      return data;
    },
    categorys: (state, action) => {
      if (action.payload == "") {
        return state;
      } else {
        const data = state.filter((value) => {
          return value.Category == action.payload;
        });
        return data;
      }
    },
    districts: (state, action) => {
      if (action.payload == "") {
        return state;
      } else {
        console.log(state,"districtstate");
        const data = state.filter((value) => {
          return value.ownerid.district == action.payload;
        });
        return data;
      }
    },
    citys: (state, action) => {
      if (action.payload == "") {
        return state;
      } else {
        console.log(state,"state");
        const data = state.filter((value) => {
          
          return value.ownerid.city == action.payload;
        });
        return data;
      }
    },
    States: (state, action) => {
      if (action.payload == "") {
        return state;
      } else {
        const data = state.filter((value) => {
          return value.ownerid.state == action.payload;
        });
        return data;
      }
    },
    Search: (state, action) => {
      const value = action.payload;
      if (value == "") {
        return state;
      } else {
        const regex = new RegExp(value, "i");
        return state.filter((item) => regex.test(item.Bikename));
      }
    },
  },
});
export const { addBiks, price, categorys, districts, citys, States, Search } =
  BikeSlice.actions;
export default BikeSlice.reducer;
