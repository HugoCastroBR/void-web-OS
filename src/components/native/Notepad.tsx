'use client'
import { NotePadProps } from '@/types'
import React, { useState } from 'react'
import WindowBox from '../templates/WindowBox'

const Notepad = ({
  tab,
  window,
  path
}:NotePadProps) => {

  const [text, setText] = useState<string>('')

  return (
    <WindowBox
      currentTab={tab}
      currentWindow={window}
      title='Notepad'
      uuid={tab.uuid}
      resizable={true}
    >
      
    </WindowBox>
  )
}

export default Notepad