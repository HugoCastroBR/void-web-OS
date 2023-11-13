'use client'
import React from 'react'
import CustomText from '../atoms/CustomText'
import useStore from '@/hooks/useStore'
import { ClearAllFocused, WindowSetTabFocused, WindowToggleMinimizeTab } from '@/store/actions'


export type BottomTaskProps = {
  uuid: string
  title: string
}
const BottomTask = ({
  title,
  uuid
}:BottomTaskProps) => {

  const {states, dispatch} = useStore()

  const ToggleMinimizeTab= () => {
    const currentWindow = states.Windows.windows.find(window => window.tabs.find(tab => tab.uuid === uuid))
    const currentTab = currentWindow?.tabs.find(tab => tab.uuid === uuid)
    console.log(currentWindow)
    dispatch(WindowToggleMinimizeTab({
      title: currentWindow?.title || '',
      uuid: currentTab?.uuid || '',
    }))

    if(currentTab?.minimized){
      dispatch(ClearAllFocused())
      dispatch(WindowSetTabFocused({
        title: currentWindow?.title || '',
        uuid: currentTab?.uuid || '',
      }))
    }
  }
  
  return (
    <div 
    onClick={ToggleMinimizeTab}
    className='
    flex justify-between items-center
    w-24 h-full bg-gray-800 px-2 py-1
    cursor-pointer hover:bg-gray-700
    transition duration-300 ease-in-out
    '>
      <CustomText text={title}/>
    </div>
  )
}

export default BottomTask