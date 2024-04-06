import { configureStore } from "@reduxjs/toolkit";
import  userDetail  from "./UserdetailSlice";


export const store = configureStore({
    reducer:{
        app :userDetail,
    }
})