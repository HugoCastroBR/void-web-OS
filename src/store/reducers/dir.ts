import { dirDesktopProps, dirProps } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

export const DirSlice = createSlice({
  name: "DirSlice",
  initialState: {
    desktopItems: [] as dirDesktopProps[]
  } as dirProps,
  reducers: {
    SET_DESKTOP_ITEMS(state, { payload }: { payload: dirDesktopProps[] }) {
      state.desktopItems = payload;
    },
    ADD_DESKTOP_ITEM(state, { payload }: { payload: dirDesktopProps }) {
      state.desktopItems.push(payload);
    },
    REMOVE_DESKTOP_ITEM(state, { payload }: { payload: string }) {
      state.desktopItems = state.desktopItems.filter((item) => item.filename !== payload);
    }
  }
});