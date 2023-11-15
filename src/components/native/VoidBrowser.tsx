'use client'

import { VoidBrowserProps } from '@/types'
import React, { useEffect, useState } from 'react'
import WindowBox from '../templates/WindowBox'

import useFS from '@/hooks/useFS'


const VoidBrowser = ({
  tab,
  window,
  path,
  local
}: VoidBrowserProps) => {

  const { fs } = useFS()

  const [text, setText] = React.useState<string>('')
  const [url, setUrl] = React.useState<string>('')

  const handlerEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setUrl(text)
    }
  }

  const [localContent, setLocalContent] = useState<string>('')

  const loadLocalContent = () => {
    fs?.readFile(path, 'utf8', (err, data) => {
      if (err) throw err
      if (data) {
        console.log(data)
        setLocalContent(data)
      }
    })
  }

  useEffect(() => {
    loadLocalContent()
  }, [fs])


  return (
    <WindowBox
      currentTab={tab}
      currentWindow={window}
      title='Void Browser'
      uuid={tab.uuid}
      resizable
      className='w-2/4 h-3/5 flex flex-col '
    >
      <div className='w-full h-full bg-gray-800 flex flex-col'>
        <div
          className='
        flex h-16 p-2 bg-gray-600 border-b border-gray-500 
        justify-evenly items-center'>
          {/* <div className='w-1/12 ml-16 mt-1'>
            <span
              className='i-mdi-arrow-left text-white text-2xl
            cursor-pointer hover:text-gray-400 
            ' >
            </span>
          </div> */}
          <div className='w-1/12 -ml-6 mt-1'>
            <span
              className='i-mdi-reload text-white text-2xl
            cursor-pointer hover:text-gray-400 ' >
            </span>
          </div>
          <div className='w-9/12'>
            <input
              type='url'
              className='w-96 h-8 bg-gray-700 text-white outline-none px-2'
              placeholder='https://'
              value={text}
              onKeyPress={handlerEnter}
              onChange={(e) => {
                setText(e.target.value)
              }}
            />
            {/* <span
              onClick={() => {
                setUrl(text)
              }}
              className='i-mdi-magnify -mb-1 ml-1 text-white text-2xl cursor-pointer hover:text-gray-400'
            ></span> */}
          </div>
          {/* <div className='w-1/12'>
            <span
              className='i-mdi-hamburger-menu text-white text-2xl
            cursor-pointer hover:text-gray-400 ' >
            </span>
          </div> */}
        </div>
        <div className='w-full h-full bg-gray-200'>
          <iframe
            className='w-full h-full'
            srcDoc={localContent || '<h1>loading...</h1>'}
            referrerPolicy='no-referrer'
            sandbox="allow-downloads allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts"
          >
          </iframe>
        </div>
      </div>
    </WindowBox>
  )
}

export default VoidBrowser