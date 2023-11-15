'use client'
import { NotePadProps } from '@/types'
import React, { useEffect, useState } from 'react'
import WindowBox from '../templates/WindowBox'
import AppTaskMenu from '../organisms/AppTaskMenu'
import useFS from '@/hooks/useFS'
import useStore from '@/hooks/useStore'
import { Button } from '@mantine/core'
import CustomText from '../atoms/CustomText'
import { extractParentPath, getExtension, removeExtension } from '@/utils/file'

const Notepad = ({
  tab,
  window,
  path
}: NotePadProps) => {

  const [text, setText] = useState<string>('')
  const { fs } = useFS()
  const { states, dispatch } = useStore()
  const [saveAsInputOpen, setSaveAsInputOpen] = useState(false);
  const [saveAsName, setSaveAsName] = useState<string>(`${removeExtension(tab.ficTitle || '')}_new`)
  useEffect(() => {
    fs?.readFile(`${tab.value}`, 'utf8', (err, data) => {
      if (err) throw err
      if (data) {
        setText(data)
      }
    })
  }, [states.Mouse, fs])


  const handlerSaveAs = () => {
    const fileNewName = `${extractParentPath(tab.value || '/')}/${saveAsName}.${getExtension(tab.value || '/')}`
    fs?.writeFile(`${fileNewName}`, text, (err) => {
      if (err) throw err
      console.log('File Saved!')
      setSaveAsInputOpen(false)
    })
  }

  return (
    <>
      {saveAsInputOpen &&
        <WindowBox
        currentTab={tab}
        currentWindow={window}
        title='Save As'
        uuid={tab.uuid}
        disableMaximize
        disableMinimize
        customClose={() => {
          setSaveAsInputOpen(false)
        
        }}
        className='absolute w-64 h-32 bg-gray-800 flex  !z-40  '>
          <div className='w-full h-full flex flex-col justify-evenly items-end'>
            <input
              autoFocus
              defaultValue={`${removeExtension(tab.ficTitle || '')}_new`}
              onChange={(e) => {
                

                setSaveAsName(e.target.value)
              }}
              placeholder='File Name'
              className='
              mr-1 w-60 h-8 bg-gray-200 flex flex-col resize
              outline-none rounded-sm border border-gray-400
            '
            />
            <Button
              onClick={() => {
                handlerSaveAs()
              }}
              styles={{
                root: {
                  backgroundColor: '#4a5568',
                  color: '#fff',
                  width: '6rem',
                  height: '2rem',
                  marginRight: '2px',
                  borderRadius: '0.25rem',
                  border: '1px solid gray',
                  outline: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease-in-out',
                }
              }}
            >
              <CustomText text='Save' />
            </Button>
          </div>
        </WindowBox>
      }
      <WindowBox
        currentTab={tab}
        currentWindow={window}
        title='NotePad'
        uuid={tab.uuid}
        resizable
        className='w-1/4 h-2/5 flex flex-col '
        
      >
        <AppTaskMenu
          onSave={() => {
            console.log(states.Mouse.mousePath)
            fs?.writeFile(`${tab.value}`, text, (err) => {
              if (err) throw err
              console.log('File Saved!')
            })
          }}
          onSaveAs={() => {
            setSaveAsInputOpen(true)
          }}
        />

        <textarea
          value={text}
          autoFocus
          onChange={(e) => {
            setText(e.target.value)
          }}
          className='
          w-full h-full bg-gray-200 flex flex-col resize
          outline-none 
          '
        />

      </WindowBox>
    </>
  )
}

export default Notepad