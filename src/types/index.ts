import { uuid } from './../utils/file';

export type RightMenuItemProps = {
  disabled?: boolean
  text: string
  onClick: () => void
}


export type tabStateProps = {
  uuid: string
  title?: string
  maximized: boolean
  minimized: boolean
  focused?: boolean
}


export type windowStateProps = {
  title: string
  icon?: string
  tabs: tabStateProps[]
}

export type nativeAppProps = {
  title: string
  icon?: string
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
