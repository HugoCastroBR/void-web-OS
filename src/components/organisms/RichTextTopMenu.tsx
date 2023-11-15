'use client'

import React from 'react'
import CustomText from '../atoms/CustomText'

const RichTextTopMenu = ({
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
    <div className='flex h-6  
    
    w-full items-center 
    
    '>
      <div
        onClick={() => {
          setIsFileMenuOpen(!isFileMenuOpen)
        }}
        className='
      flex justify-center items-center cursor-pointer 
      hover:bg-gray-100 transition-all duration-300 ease-in-out
      px-4 h-6
      '>
        <span className='i-mdi-file-outline !text-black mr-1'></span>
        <CustomText 
        text='File' 
        className='!text-black'
        />
      </div>
      {/* File DropDown */}
      {isFileMenuOpen &&
        <div
          style={{
            top: '24px'
          }}
          className=' 
          absolute w-24 h-28 bg-white border-1 border-t-0 border-gray-300 rounded-b-md  
          left-0 py-1 flex flex-col drop-shadow-sm shadow-md
          '
        >
          {/* <div
            onClick={() => {
              console.log('new tab')
              onNewTab && onNewTab()
              setIsFileMenuOpen(false)
            }}
            className='cursor-pointer h-6 hover:bg-gray-100 transition-all duration-300 pl-1'>
            <CustomText 
            text='New' />
          </div> */}
          <div
            onClick={() => {
              onSave && onSave()
              setIsFileMenuOpen(false)
            }}
            className='cursor-pointer h-6 hover:bg-gray-100  transition-all duration-300 pl-1'>
            <CustomText 
            text='Save' 
            className='!text-black'
            />
          </div>
          <div
            onClick={() => {
              onSaveAs && onSaveAs()
              setIsFileMenuOpen(false)
            }}
            className='cursor-pointer h-6 hover:bg-gray-100 transition-all duration-300 pl-1'>
            <CustomText 
            text='Save As' 
            className='!text-black'
            />
          </div>
        </div>
      }

    </div>
  )
}

export default RichTextTopMenu