import { tabStateProps, windowStateProps,  } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

export const WindowsSlice = createSlice({
  name: "WindowsSlice",
  initialState: {
    windows: [
      {
        title: "Console",
        icon: "/assets/icons/console-icon.png",
        tabs: [] as tabStateProps[],
        native: true
      },
      {
        title: "Explorer",
        icon: "/assets/icons/folder.png",
        tabs: [] as tabStateProps[],
        native: false
      },
      {
        title: "NotePad",
        icon: "/assets/icons/txt.png",
        tabs: [] as tabStateProps[],
        native: false
      },
      {
        title: "ImageReader",
        icon: "/assets/icons/image.png",
        tabs: [] as tabStateProps[],
        native: false
      },
      {
        title: "Code Editor",
        icon: "/assets/icons/vscode.png",
        tabs: [] as tabStateProps[],
        native: true
      },
      {
        title: "Void Browser",
        icon: "/assets/icons/void-browser.png",
        tabs: [] as tabStateProps[],
        native: false
      },
      {
        title: "Rich Text Editor",
        icon: "/assets/icons/md.png",
        tabs: [] as tabStateProps[],
        native: true
      },
      {
        title: "PDF Reader",
        icon: "/assets/icons/pdf.png",
        tabs: [] as tabStateProps[],
        native: false
      }

    ] as windowStateProps[]
  
  },    
  reducers: {
    ADD_WINDOW(state, { payload }: { payload: windowStateProps }) {
      state.windows.push(payload);
    },
    REMOVE_WINDOW(state, { payload }: { payload: string }) {
      state.windows = state.windows.filter((window) => window.title !== payload);
    },
    ADD_TAB(state, { payload }: { payload: { title: string; tab: tabStateProps } }) {
      const window = state.windows.find((window) => window.title === payload.title);
      if (window) {
        window.tabs.push(payload.tab);
      }
    },
    REMOVE_TAB(state, { payload }: { payload: { title: string; uuid: string } }) {
      const window = state.windows.find((window) => window.title === payload.title);
      if (window) {
        window.tabs = window.tabs.filter((tab) => tab.uuid !== payload.uuid);
      }
    },
    TOGGLE_MAXIMIZE_TAB(state, { payload }: { payload: { title: string; uuid: string } }) {
      const window = state.windows.find((window) => window.title === payload.title);
      if (window) {
        const tab = window.tabs.find((tab) => tab.uuid === payload.uuid);
        if (tab) {
          tab.maximized = !tab.maximized;
        }
      }
    },
    TOGGLE_MINIMIZE_TAB(state, { payload }: { payload: { title: string; uuid: string } }) {
      const window = state.windows.find((window) => window.title === payload.title);
      if (window) {
        const tab = window.tabs.find((tab) => tab.uuid === payload.uuid);
        if (tab) {
          tab.minimized = !tab.minimized;
        }
      }
    },
    SET_TAB_TITLE(state, { payload }: { payload: { title: string; uuid: string; newTitle: string } }) {
      const window = state.windows.find((window) => window.title === payload.title);
      if (window) {
        const tab = window.tabs.find((tab) => tab.uuid === payload.uuid);
        if (tab) {
          tab.title = payload.newTitle;
        }
      }
    },
    SET_TAB_FOCUSED(state, { payload }: { payload: { title: string; uuid: string } }) {
      const window = state.windows.find((window) => window.title === payload.title);
      if (window) {
        window.tabs.forEach((tab) => {
          tab.focused = tab.uuid === payload.uuid;
        });
      }
    },
    CLEAR_ALL_FOCUSED_TABS(state) {
      state.windows.forEach((window) => {
        window.tabs.forEach((tab) => {
          tab.focused = false;
        });
      });
    }
  }
});