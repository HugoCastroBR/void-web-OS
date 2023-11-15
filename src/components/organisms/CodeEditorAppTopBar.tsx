'use client'

import React from 'react'
import CustomText from '../atoms/CustomText'

const CodeEditorAppTopBar = ({
  onSave,
  onSaveAs,
  onNewTab,
  filename,
  onExecute
}: {
  onSave?: (filename:string) => void
  onSaveAs?: () => void
  onNewTab?: () => void
  filename?: string
  onExecute?: () => void
}) => {

  const [fileName, setFileName] = React.useState(filename || '')

  return (
    <div className='flex h-16   bg-gray-800 px-1 items-start !z-20'>
      <div
        onClick={() => {
          onExecute && onExecute()
        }}
        className='
      flex flex-col justify-center items-center cursor-pointer 
      hover:bg-gray-600 transition-all duration-300 ease-in-out
      border border-gray-700  px-1 h-14 m-1
      '>
        <div>
          <span className='i-mdi-play text-white mr-1'></span>
          <CustomText text='Execute' />
        </div>
      </div>
      <div
        onClick={() => {
          onSave && onSave(fileName)
        }}
        className='
      flex flex-col justify-center items-center cursor-pointer 
      hover:bg-gray-600 transition-all duration-300 ease-in-out
      border border-gray-700  px-1 h-14 m-1
      '>
        <div>
          <span className='i-mdi-file-outline text-white mr-1'></span>
          <CustomText text='Save' />
        </div>
        <input 
          type='text'
          className='outline-none bg-gray-200 text-black'
          value={fileName}
          onChange={(e) => {
            setFileName(e.target.value)
          }}
        />
      </div>
    </div>
  )
}

export default CodeEditorAppTopBar