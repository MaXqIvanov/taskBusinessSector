import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tableSlice from "./tableSlice";


const rootReducer = combineReducers({
    table: tableSlice
})

export const store = configureStore({
    reducer: rootReducer
})