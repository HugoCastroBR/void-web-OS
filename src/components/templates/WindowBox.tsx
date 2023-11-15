'use client'
import useStore from '@/hooks/useStore'
import React, { useEffect } from 'react'
import Draggable from 'react-draggable'
import CustomText from '../atoms/CustomText'
import { ClearAllFocused, MouseSetIsMouseInDesktop, MouseSetMousePath, WindowRemoveTab, WindowSetTabFocused, WindowToggleMaximizeTab, WindowToggleMinimizeTab } from '@/store/actions'
import { windowStateProps, tabStateProps } from '@/types'

export type WindowBoxProps = {
  title: string
  uuid: string
  className?: string
  children?: React.ReactNode
  resizable?: boolean,
  currentWindow: windowStateProps
  currentTab: tabStateProps
  onMouseEnter?: () => void,
  onMouseLeave?: () => void
  onMouseMove?: () => void
  customClose?: () => void
  disableClose?: boolean
  disableMinimize?: boolean
  disableMaximize?: boolean
  style?: React.CSSProperties
}
const WindowBox = ({
  title,
  uuid,
  children,
  resizable,
  className,
  currentWindow,
  currentTab,
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
  customClose,
  disableClose,
  disableMinimize,
  disableMaximize,
  style
}: WindowBoxProps) => {

  const { states, dispatch } = useStore()

  const [isFocused, setIsFocused] = React.useState(false)



  const MinimizeTab = () => {


    dispatch(WindowToggleMinimizeTab({
      title: currentWindow?.title || '',
      uuid: currentTab?.uuid || '',
    }))


  }
  const MaximizeTab = () => {
    dispatch(WindowToggleMaximizeTab({
      title: currentWindow?.title || '',
      uuid: currentTab?.uuid || '',
    }))
  }

  const CloseTab = () => {
    if (customClose) {
      customClose()
    } else {
      dispatch(WindowRemoveTab({
        title: currentWindow?.title || '',
        uuid: currentTab?.uuid || '',
      }))
    }

  }


  return (
    <Draggable
      handle={`.handle-${uuid}`}
      disabled={currentTab?.maximized ? true : false}
      position={currentTab?.maximized ? { x: 0, y: 0 } : undefined}
      key={uuid}
    >
      <div
        onClick={() => {
          dispatch(ClearAllFocused())
          dispatch(WindowSetTabFocused({
            title: currentWindow?.title || '',
            uuid: currentTab?.uuid || '',
          }))
        }}
        onMouseEnter={() => {
          dispatch(MouseSetIsMouseInDesktop(false))
          onMouseEnter && onMouseEnter()
        }}
        onMouseLeave={() => {
          dispatch(MouseSetIsMouseInDesktop(true))
          onMouseLeave && onMouseLeave()
        }}
        // onMouseMove={() => {
        //   onMouseMove && onMouseMove()
        // }}
        style={style || {}}
        className={`
        absolute
        flex flex-col z-20
      bg-black
        bg-opacity-80
        backdrop-filter backdrop-blur-md
        border border-gray-700 
        rounded-md
        ${resizable && !currentTab?.maximized ? 'hover:resize' : ''}
        overflow-hidden
        shadow-md mt-4
        ${currentTab?.minimized ? 'hidden' : ''}
        ${currentTab?.maximized ? '!w-screen !h-screen' : ''}
        ${currentTab?.focused ? 'z-30' : 'z-20'}
        ${currentTab?.maximized ? 'top-0 left-0' : ''}

      ${className}
      
    `}>
        <div
          className={
            `
            h-8 w-full
            bg-black
            backdrop-filter backdrop-blur-sm
            flex justify-between items-center
            p-1 ${`handle-${uuid}`}
            cursor-move
            `
          }
        >
          <div>
            <CustomText text={currentTab.ficTitle || title} />
          </div>
          <div className='flex'>
            <div
              onClick={MinimizeTab}
              className={`
              ${!disableMinimize ? '' : 'hidden'}
              w-6 h-6 m-px border border-gray-700 
              cursor-pointer flex justify-center items-center
             hover:bg-gray-700 hover:border-gray-600
              transition-all duration-300 ease-in-out
        
              `}>
              <span
                className='i-mdi-minimize text-white
          '>

              </span>
            </div>
            <div
              onClick={MaximizeTab}
              className={`
              ${!disableMaximize ? '' : 'hidden'}
              w-6 h-6 m-px border border-gray-700 
              cursor-pointer flex justify-center items-center
              hover:bg-gray-700 hover:border-gray-600
              transition-all duration-300 ease-in-out
              `}>
              <span
                className='i-mdi-maximize text-white
          '>

              </span>
            </div>
            <div
              onClick={CloseTab}
              className={`
              ${!disableClose ? '' : 'hidden'}
              w-6 h-6 m-px border border-gray-700 
              cursor-pointer flex justify-center items-center
              hover:bg-gray-700 hover:border-gray-600
              transition-all duration-300 ease-in-out
              `}>
              <span
                className='i-mdi-close text-white
          '>

              </span>
            </div>
          </div>

        </div>
        <div className='p-1 w-full h-full overflow-hidden'>
          {children}
        </div>
      </div>
    </Draggable>
  )
}

export default WindowBox