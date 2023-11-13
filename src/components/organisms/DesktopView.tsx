'use client'
import React, { useEffect } from 'react'
import CustomText from '../atoms/CustomText'
import useFS from '@/hooks/useFS'
import WindowBox from '../templates/WindowBox'
import { Grid, SimpleGrid } from '@mantine/core'
import Console from '../native/Console'
import { uuid } from '@/utils/file'
import { nativeAppProps } from '@/types'
import useStore from '@/hooks/useStore'
import { WindowAddTab } from '@/store/actions'
import Image from 'next/image'
const DesktopView = () => {

  const {states, dispatch} = useStore()
  const generateGrid = () => {
    const grid = []
    for(let i = 0; i < 160; i++){
      grid.push(
      <div 
        key={i}
        className='
        h-28 border border-gray-700 
        flex flex-col justify-evenly items-center
        hover:bg-gray-600 transition-all duration-300 ease-in-out
        '>
          {i +1}
        </div>
      )
    }
    return grid
  }


  const DesktopNativeItem = ({
    title,
    icon,
  }:nativeAppProps) => {
    return (
      <>
        <div 
          onDoubleClick={() => {
            dispatch(WindowAddTab({
              title: title,
              tab:{
                uuid: uuid(6),
                title: title,
                maximized: false,
                minimized: false,
              }
            }))
          }}
          className='
          h-28 
          flex flex-col justify-evenly items-center cursor-pointer
          hover:bg-gray-600 transition-all duration-300 ease-in-out
          '>
            {icon && <Image src={icon} alt={title} width={48} height={48} />}
            <CustomText
              text={title}
            />
          </div>
        </>
    )
  }


  return (
    <div className='bg-gray-800 h-full z-10 '>

      {states.Windows.windows.map((window,index) => {
        return window.tabs.map((tab,index) => {
          if(tab.title === 'Console'){
            return (
              <Console 
                tab={tab}
                key={index}
                window={window}
              />
            )
          }
        })
      })}
      <SimpleGrid cols={20} spacing="1px" verticalSpacing="1px">
        {states.Windows.windows.map((window,index) => {
          return (
            <DesktopNativeItem key={index} title={window.title} icon={window?.icon || ''} />

          )
        })}
    
      </SimpleGrid>
    </div>
  )
}

export default DesktopView