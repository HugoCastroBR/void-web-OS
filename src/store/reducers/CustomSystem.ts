import { CustomSystemProps } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

export const CustomSystemSlice = createSlice({
  name: "CustomSystemSlice",
  initialState: {
    background: null,
    consoleColor: "black",
    consoleOpacity: 0.8,
  } as CustomSystemProps,
  reducers: {
    SET_BACKGROUND(state, { payload }: { payload: string | null }) {
      state.background = payload;
    },
    SET_CONSOLE_COLOR(state, { payload }: { payload: string }) {
      state.consoleColor = payload;
    },
    SET_CONSOLE_OPACITY(state, { payload }: { payload: number }) {
      state.consoleOpacity = payload;
    },
  }
});