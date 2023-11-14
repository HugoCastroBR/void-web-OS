'use client'

import React from 'react'
import CustomText from '../atoms/CustomText'

const AppTaskMenu = ({
  onSave,
  onSaveAs,
  onNewTab
}:{
  onSave?: () => void
  onSaveAs?: () => void
  onNewTab?: () => void
}) => {

  const [isFileMenuOpen, setIsFileMenuOpen] = React.useState(false)

  return (
    <div className='flex h-6  bg-gray-700 px-1 items-center'>
      <div
        onClick={() => {
          setIsFileMenuOpen(!isFileMenuOpen)
        }}
        className='
      flex justify-center items-center cursor-pointer 
      hover:bg-gray-600 transition-all duration-300 ease-in-out
      border border-gray-700  px-2 h-6
      '>
        <span className='i-mdi-file-outline text-white mr-1'></span>
        <CustomText text='File' />
      </div>
      {/* File DropDown */}
      {isFileMenuOpen &&
        <div
          style={{
            top: '60px'
          }}
          className=' absolute w-32 h-44 bg-gray-700 left-2 py-1 flex flex-col'
        >
          <div
            onClick={() => {
              console.log('new tab')
              onNewTab && onNewTab()
              setIsFileMenuOpen(false)
            }}
            className='cursor-pointer h-6 hover:bg-gray-600 transition-all duration-300 pl-1'>
            <CustomText text='New' />
          </div>
          <div
            onClick={() => {
              console.log('save')
              onSave && onSave()
              setIsFileMenuOpen(false)
            }}
            className='cursor-pointer h-6 hover:bg-gray-600 transition-all duration-300 pl-1'>
            <CustomText text='Save' />
          </div>
          <div
            onClick={() => {
              console.log('save as')
              onSaveAs && onSaveAs()
              setIsFileMenuOpen(false)
            }}
            className='cursor-pointer h-6 hover:bg-gray-600 transition-all duration-300 pl-1'>
            <CustomText text='Save As' />
          </div>
        </div>

      }
      <div
        className='
      flex justify-center items-center cursor-pointer 
      hover:bg-gray-600 transition-all duration-300 ease-in-out
      border border-gray-700  px-2 h-6
      '>
        <span className='i-mdi-about-outline text-white mr-1'></span>
        <CustomText text='About' />
      </div>
    </div>
  )
}

export default AppTaskMenu