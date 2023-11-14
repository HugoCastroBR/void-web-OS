'use client'
import React from 'react'
import CustomText from '../atoms/CustomText'
import Image from 'next/image'
import { Menu, Button } from '@mantine/core'
import useStore from '@/hooks/useStore'
import { WindowAddTab } from '@/store/actions'
import { uuid } from '@/utils/file'
const StartMenu = () => {

  const {states, dispatch} = useStore()

  return (

    <Menu 
    shadow="md" 
    width={200}
    transitionProps={{
      duration: 300,
      timingFunction: 'ease',
      transition: 'pop-bottom-left',
    }}
    >
      <Menu.Target>
        <Button
          size='sm'
          styles={{
            root: {
              backgroundColor: 'transparent',
              border: 'none',
              padding: '0px',
              margin: '0px',
              height: '32px',
              paddingBlockEnd: '0px',
            }
          }}
        >
          <div
            className='
          flex items-center w-24 bg-gray-800
          justify-between px-2 h-full cursor-pointer
          '
            onClick={() => {
              console.log('%cBottomTaskBar/Log: Start Menu Clicked','color: cyan')
            }}
          >
            <Image
              src='/assets/icons/eye-start.png'
              alt='eye-start'
              width={20}
              height={20}
            />
            <CustomText
              text='Start'
              className='text-white pl-1 cursor-pointer'
            />
          </div></Button>
      </Menu.Target>
      <Menu.Dropdown
        color='black'
        styles={{
          dropdown:{
            backgroundColor: '#2d374833',
            border: '1px solid #4a5568',
            padding: '0px',
            margin: '0px',
            height: '400px',
            marginTop: '8px',
            borderRadius: '0px',
            backdropFilter: 'blur(10px)',
          }
        }}
      >
        <Menu.Label>
          <CustomText
            text='Void Menu'
            className='text-white'
          />
        </Menu.Label>
        <Menu.Item
          styles={{
            item:{
              backgroundColor: 'transparent',
              padding: '0px',
              margin: '0px',
              height: '40px',
              width: '100%',
              borderRadius: '0px',
              backdropFilter: 'blur(10px)',
            
            }
          }}
        >
          <div 
            onClick={() => {
              console.log('%cBottomTaskBar/Log: Explorer Clicked','color: cyan')
              dispatch(WindowAddTab({
                title: 'Explorer',
                tab: {
                  uuid: uuid(6),
                  title: 'Explorer',
                  maximized: false,
                  minimized: false,
                  value: '/Desktop'
                }
              }))
            }}
            className='
            pl-2
            flex items-center w-full h-10 bg-gray-800
            hover:bg-gray-600 transition-all duration-300 ease-in-out
            '
          >
            <CustomText
              text='Explorer'
              className='text-white'
            />
          </div>
        </Menu.Item>
          


      </Menu.Dropdown>
    </Menu>

  )
}

export default StartMenu