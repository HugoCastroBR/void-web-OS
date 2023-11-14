import { uuid } from './../utils/file';

export type RightMenuItemProps = {
  disabled?: boolean
  text: string
  onClick: () => void
}


export type tabStateProps = {
  uuid: string
  title?: string
  ficTitle?: string
  maximized: boolean
  minimized: boolean
  focused?: boolean
  value?: string
}


export type windowStateProps = {

  title: string
  icon?: string
  native: boolean
  tabs: tabStateProps[]
}

export type nativeAppProps = {
  title: string
  icon?: string
}

export type dirFileItemProps = {
  title: string
  icon?: string
  path: string
  onDoubleClick?: () => void
  onClick?: () => void
}

export type dirFolderItemProps = {
  title: string
  icon?: string
  path: string
  onDoubleClick?: () => void
  onClick?: () => void
}


export type nativeWindowProps = {
  tab: tabStateProps
  window: windowStateProps
}

export type dirDesktopProps = {
  filename: string
  filepath: string
}

export type dirProps = {
  desktopItems: dirDesktopProps[]
}

export type CommandParams = {
  [key: string]: string;
};

export type consoleCommandProps = {
  command: string;
  description: string;
  callback?: (params: CommandParams) => void;
};

export type explorerProps = nativeWindowProps & {
  path: string
  previousPath?: string
  onBack?: () => void
}

export type explorerActionBarProps = {
  path: string
  onBack: () => void
  onReload: () => void
}

export type mouseContextProps = {
  isMouseInDesktop: boolean
  mousePath: string
  selectedItems: string[]
  mouseOverItem?: string | undefined
  newFolder?: boolean
  newFile?: boolean
  copyItemsPath?: string[]
  cutItemsPath?: string[]
  mouseContextPath?: string

}

export type mouseContextMenuOptionsProps = {
  disabled?: boolean
  className?: string
  title: string
  onClick?: () => void
}

export type NotePadProps = nativeWindowProps & {
  path: string
}

export type ImageReaderProps = nativeWindowProps & {
  path: string
}