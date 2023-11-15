'use client'
import React, { useEffect, useState } from 'react'
import WindowBox from '../templates/WindowBox'
import { RichTextEditor, Link } from '@mantine/tiptap';
import { BubbleMenu, useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { RichTextEditorProps } from '@/types';
import CustomText from '../atoms/CustomText';
import RichTextTopMenu from '../organisms/RichTextTopMenu';
import { Button, Divider, Loader, LoadingOverlay } from '@mantine/core';
import useStore from '@/hooks/useStore';
import useFS from '@/hooks/useFS';
import { removeExtension, extractParentPath, getExtension } from '@/utils/file';
import RingLoader from '../atoms/RingLoader';


const RichTextEditorComponent = ({
  tab,
  window,
  path,
}: RichTextEditorProps) => {



  const [text, setText] = useState<string>('')
  const { fs } = useFS()
  const { states, dispatch } = useStore()
  
  const [saveAsInputOpen, setSaveAsInputOpen] = useState(false);
  const [saveAsName, setSaveAsName] = useState<string>(`${removeExtension(tab.ficTitle || '')}_new`)
  const [isLoading, setIsLoading] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ]
    ,
    onUpdate({ editor }) {
      const content = editor.getHTML()
      setText(content)
    },
    content: text,
  });
  useEffect(() => {
    if(tab.value){
      setIsLoading(true)
      fs?.readFile(`${tab.value}`, 'utf8', (err, data) => {
        if (err) throw err
        if (data) {
          editor?.commands.setContent(data)
          setText(data)
        }
        setIsLoading(false)
      })
    }
  }, [fs])



  const handlerSaveAs = () => {
    const fileNewName = `${extractParentPath(tab.value || '/')}/${saveAsName}.${getExtension(tab.value || '/')}`
    fs?.writeFile(`${fileNewName}`, text, (err) => {
      if (err) throw err
      console.log('File Saved!')
      setSaveAsInputOpen(false)
    })
  }

  if(isLoading){
    return(
      <WindowBox
      title='Rich Text Editor'
      className='w-2/4 h-3/5 flex flex-col '
      currentTab={tab}
      currentWindow={window}
      uuid={tab.uuid}
      resizable>
        <div className='bg-black h-full w-full flex justify-center items-center'>
          <Loader
            color='white'
            size={100}
          />
        </div>
      </WindowBox>
    )
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
        title='Rich Text Editor'
        className='w-2/4 h-3/5 flex flex-col '
        currentTab={tab}
        currentWindow={window}
        uuid={tab.uuid}
        resizable

      >
        <div className='w-full h-full bg-white'>
          <div className='absolute w-full bg-gray-transparent flex z-30 '>
            <RichTextTopMenu 
            onSave={() => {
              fs?.writeFile(`${tab.value}`, text, (err) => {
                if (err) throw err
                console.log('File Saved!')
              })
            }}
            onSaveAs={() => {
              setSaveAsInputOpen(true)
            }}
            />
          </div>
          <div className='h-full w-full'>
            <RichTextEditor editor={editor}
              className='w-full h-full pt-6'

              styles={{
                content: {
                  width: '100%',
                  height: '100%',
                  minHeight: '100%',
                  overflow: 'auto',
                  padding: '1rem',
                  paddingTop: '0px',
                },
                toolbar: {
                  position: 'sticky',
                  top: -2,
                  zIndex: 0,
                  backgroundColor: '#fff',
                  borderBottom: '1px solid #ddd',
                  width: '100%',
                  padding: '1rem',
                  paddingTop: '10px',
                },

              }}
            >
              {editor && (
                <BubbleMenu editor={editor}>
                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Bold />
                    <RichTextEditor.Italic />
                    <RichTextEditor.Link />
                  </RichTextEditor.ControlsGroup>
                </BubbleMenu>
              )}
              <RichTextEditor.Toolbar sticky stickyOffset={60} >

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.CodeBlock />
                </RichTextEditor.ControlsGroup>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Bold />
                  <RichTextEditor.Italic />
                  <RichTextEditor.Underline />
                  <RichTextEditor.Strikethrough />
                  <RichTextEditor.ClearFormatting />
                  <RichTextEditor.Highlight />
                  <RichTextEditor.Code />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.H1 />
                  <RichTextEditor.H2 />
                  <RichTextEditor.H3 />
                  <RichTextEditor.H4 />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Blockquote />
                  <RichTextEditor.Hr />
                  <RichTextEditor.BulletList />
                  <RichTextEditor.OrderedList />
                  <RichTextEditor.Subscript />
                  <RichTextEditor.Superscript />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Link />
                  <RichTextEditor.Unlink />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.AlignLeft />
                  <RichTextEditor.AlignCenter />
                  <RichTextEditor.AlignJustify />
                  <RichTextEditor.AlignRight />
                </RichTextEditor.ControlsGroup>



              </RichTextEditor.Toolbar>

              <RichTextEditor.Content
                className='!h-full' />
            </RichTextEditor>
          </div>
        </div>
      </WindowBox>
    </>
  )
}

export default RichTextEditorComponent