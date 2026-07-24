import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./employeeSlice.js";
import themeReducer from "./themeSlice.js";

const store = configureStore({
  reducer: {
    employees: employeeReducer,
    theme: themeReducer,
  },
});

export default store;
