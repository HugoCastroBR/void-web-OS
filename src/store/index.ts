import { configureStore } from "@reduxjs/toolkit"
import { AppSlice } from "./reducers/app";
import { WindowsSlice } from "./reducers/windows";
import { MouseSlice } from "./reducers/mouse";
import { CustomSystemSlice } from "./reducers/CustomSystem";

const store = configureStore({
  reducer:{
    App:AppSlice.reducer,
    Windows:WindowsSlice.reducer,
    Mouse:MouseSlice.reducer,
    CustomSystem:CustomSystemSlice.reducer
  }
})

export default store;
export type RootState = ReturnType<typeof store.getState>

export const AppActions = AppSlice.actions
export const WindowsActions = WindowsSlice.actions
export const MouseActions = MouseSlice.actions
export const CustomSystemActions = CustomSystemSlice.actions
