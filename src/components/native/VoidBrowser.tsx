'use client'

import { VoidBrowserProps } from '@/types'
import React, { useEffect, useState } from 'react'
import WindowBox from '../templates/WindowBox'
import { loadExternalSite } from '@/api'

const VoidBrowser = ({
  tab,
  window,
  path
}:VoidBrowserProps) => {

  const [text, setText] = React.useState<string>('')
  const [url, setUrl] = React.useState<string>('')

  const handlerEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setUrl(text)
    }
  }

  const [externalSiteContent, setExternalSiteContent] = useState<string>('');


  const loadData = async () => {
    const res = await loadExternalSite(url);
    setExternalSiteContent(res);
    console.log(res);
  }

  useEffect(() => {
    const res = loadData();

  }, [url]);

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
          <div className='w-1/12 ml-16 mt-1'>
            <span 
            className='i-mdi-arrow-left text-white text-2xl
            cursor-pointer hover:text-gray-400 
            ' >
            </span>
          </div>
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
            <span
            onClick={() => {
              loadData();
              setUrl(text)
            }}
            className='i-mdi-magnify text-white text-2xl cursor-pointer hover:text-gray-400'
            ></span>
          </div>
          <div className='w-1/12'>
            <span 
            className='i-mdi-hamburger-menu text-white text-2xl
            cursor-pointer hover:text-gray-400 ' >
            </span>
          </div>
        </div>
        <div className='w-full h-full bg-gray-200'>
          {/* <iframe
            src={url}
            className='w-full h-full'
          >

          </iframe> */}
          <div className='w-full h-full bg-red-50'
          dangerouslySetInnerHTML={{ __html: externalSiteContent }} />
        </div>
      </div>
    </WindowBox>
  )
}

export default VoidBrowser