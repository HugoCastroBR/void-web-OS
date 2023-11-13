import { mouseContextProps } from "@/types";
import { createSlice } from "@reduxjs/toolkit";


export const MouseSlice = createSlice({
  name: "MouseSlice",
  initialState: {
    isMouseInDesktop: true,
    mousePath: "/Desktop",
    selectedItems: [] as string[],
    mouseOverItem: undefined,
    newFolder: false
  } as mouseContextProps,
  reducers: {
    SET_MOUSE_IN_DESKTOP(state, { payload }: { payload: boolean }) {
      state.isMouseInDesktop = payload;
      if(payload){
        state.mousePath = "/Desktop";
      }
    },
    SET_MOUSE_PATH(state, { payload }: { payload: string }) {
      state.mousePath = payload;
    },
    SET_SELECTED_ITEMS(state, { payload }: { payload: string[] }) {
      state.selectedItems = payload;
    },
    ADD_SELECTED_ITEM(state, { payload }: { payload: string }) {
      if(payload === "/Desktop") return;
      if(payload === "/") return;
      state.selectedItems.push(payload);
    },
    REMOVE_SELECTED_ITEM(state, { payload }: { payload: string }) {
      state.selectedItems = state.selectedItems.filter((item) => item !== payload);
    },
    SET_MOUSE_OVER_ITEM(state, { payload }: { payload: string | undefined }) {
      state.mouseOverItem = payload;
    },
    SET_NEW_FOLDER(state, { payload }: { payload: boolean }) {
      state.newFolder = payload;
    }
  }
});