'use client'
import useStore from '@/hooks/useStore'
import React, { useEffect } from 'react'
import Draggable from 'react-draggable'
import CustomText from '../atoms/CustomText'
import { ClearAllFocused, WindowRemoveTab, WindowSetTabFocused, WindowToggleMaximizeTab, WindowToggleMinimizeTab } from '@/store/actions'
import { windowStateProps, tabStateProps } from '@/types'

export type WindowBoxProps = {
  title: string
  uuid: string
  className?: string
  children?: React.ReactNode
  resizable?: boolean,
  currentWindow: windowStateProps 
  currentTab: tabStateProps 
}
const WindowBox = ({
  title,
  uuid,
  children,
  resizable,
  className,
  currentWindow,
  currentTab,

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
    dispatch(WindowRemoveTab({
      title: currentWindow?.title || '',
      uuid: currentTab?.uuid || '',
    }))
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
        shadow-md 
        ${currentTab?.minimized ? 'hidden' : ''}
        ${currentTab?.maximized ? '!w-screen !h-screen' : 'w-96 h-96'}
        ${currentTab?.focused ? 'z-30' : 'z-20'}
        top-1/3 left-1/3 
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
            <CustomText text={title} />
          </div>
          <div className='flex'>
            <div
              onClick={MinimizeTab}
              className='w-6 h-6 m-px border border-gray-700 
              cursor-pointer flex justify-center items-center
            hover:bg-gray-700 hover:border-gray-600
              transition-all duration-300 ease-in-out
        '>
              <span
                className='i-mdi-minimize text-white
          '>

              </span>
            </div>
            <div
              onClick={MaximizeTab}
              className='w-6 h-6 m-px border border-gray-700 
              cursor-pointer flex justify-center items-center
            hover:bg-gray-700 hover:border-gray-600
              transition-all duration-300 ease-in-out
        '>
              <span
                className='i-mdi-maximize text-white
          '>

              </span>
            </div>
            <div
              onClick={CloseTab}
              className='w-6 h-6 m-px border border-gray-700 
              cursor-pointer flex justify-center items-center
            hover:bg-gray-700 hover:border-gray-600
              transition-all duration-300 ease-in-out
        '>
              <span
                className='i-mdi-close text-white
          '>

              </span>
            </div>
          </div>

        </div>
        <div className='p-1 w-full h-full'>
          {children}
        </div>
      </div>
    </Draggable>
  )
}

export default WindowBox