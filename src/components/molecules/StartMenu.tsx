import React from 'react'
import CustomText from '../atoms/CustomText'
import Image from 'next/image'
import { Menu, Button } from '@mantine/core'
const StartMenu = () => {
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
              width: '98%',
              marginLeft: '2%',
              borderRadius: '0px',
              backdropFilter: 'blur(10px)',
            
            }
          }}
        >
          <CustomText
            text='Void Item'
            className='text-white'
          />
        </Menu.Item>



      </Menu.Dropdown>
    </Menu>

  )
}

export default StartMenu