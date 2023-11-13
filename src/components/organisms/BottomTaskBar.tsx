'use client '
import React from 'react'
import CustomText from '../atoms/CustomText'
import Clock from '../molecules/Clock'
import Image from 'next/image'
import StartMenu from '../molecules/StartMenu'
import BottomTask from '../molecules/BottomTask'
import useStore from '@/hooks/useStore'

const BottomTaskBar = () => {

  const {states, dispatch} = useStore()

  return (
    <footer 
      className='
      w-full h-8 bg-black flex
      border-t border-gray-700
      items-center justify-between
      z-40 overflow-hidden
      '
    >
      <div>
        <StartMenu />
      </div>
      <div className='flex w-full'>
        {
          states.Windows.windows.filter(window => window.tabs.length > 0).map(window => {
            return window.tabs.map(tab => {
              return (
                <BottomTask
                  key={tab.uuid}
                  uuid={tab.uuid}
                  title={tab.title || window.title}
                />
              )
            })
          })
        }
      </div>
      <div>
        <Clock />
      </div>
    </footer>
  )
}

export default BottomTaskBar