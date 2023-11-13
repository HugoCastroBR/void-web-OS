import { tabStateProps, windowStateProps } from '@/types';
import { AppActions,WindowsActions,MouseActions } from './index';





export const SetNotification = (value: boolean) => {
  return AppActions.SET_NOTIFICATION(value)
}
export const SetNotificationMessage = (value: string) => {
  return AppActions.SET_NOTIFICATION_MESSAGE(value)
}
export const AppHandlerNotification = (title:string,message:string) => {
  return AppActions.HANDLER_NOTIFICATION({title,message})
}

export const WindowAddWindow = (payload:windowStateProps) => {
  return WindowsActions.ADD_WINDOW(payload)
}
export const WindowRemoveWindow = (title:string) => {
  return WindowsActions.REMOVE_WINDOW(title)
}
export const WindowAddTab = (payload:{title:string,tab:tabStateProps}) => {
  return WindowsActions.ADD_TAB(payload)
}
export const WindowRemoveTab = (payload:{title:string,uuid:string}) => {
  return WindowsActions.REMOVE_TAB(payload)
}
export const WindowToggleMaximizeTab = (payload:{title:string,uuid:string}) => {
  return WindowsActions.TOGGLE_MAXIMIZE_TAB(payload)
}
export const WindowToggleMinimizeTab = (payload:{title:string,uuid:string}) => {
  return WindowsActions.TOGGLE_MINIMIZE_TAB(payload)
}
export const WindowSetTabTitle = (payload:{title:string,uuid:string,newTitle:string}) => {
  return WindowsActions.SET_TAB_TITLE(payload)
}
export const WindowSetTabFocused = (payload:{title:string,uuid:string}) => {
  return WindowsActions.SET_TAB_FOCUSED(payload)
}
export const ClearAllFocused = () => {
  return WindowsActions.CLEAR_ALL_FOCUSED_TABS()
}

export const MouseSetIsMouseInDesktop = (payload:boolean) => {
  return MouseActions.SET_MOUSE_IN_DESKTOP(payload)
}
export const MouseSetMousePath = (payload:string) => {
  return MouseActions.SET_MOUSE_PATH(payload)
}
export const MouseSetSelectedItems = (payload:string[]) => {
  return MouseActions.SET_SELECTED_ITEMS(payload)
}
export const MouseAddSelectedItem = (payload:string) => {
  return MouseActions.ADD_SELECTED_ITEM(payload)
}
export const MouseRemoveSelectedItem = (payload:string) => {
  return MouseActions.REMOVE_SELECTED_ITEM(payload)
}
export const MouseClearSelectedItems = () => {
  console.log("clear")
  return MouseActions.SET_SELECTED_ITEMS([])
}
export const MouseSetMouseOverItem = (payload:string | undefined) => {
  return MouseActions.SET_MOUSE_OVER_ITEM(payload)
}
export const MouseSetNewFolder = (payload:boolean) => {
  return MouseActions.SET_NEW_FOLDER(payload)
}