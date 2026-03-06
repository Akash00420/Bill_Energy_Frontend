import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Reducer/AuthSlice";
import billReducer from "../Reducer/BillSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bill: billReducer,
  },
});
export default store;