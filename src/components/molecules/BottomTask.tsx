'use client'
import React from 'react'
import CustomText from '../atoms/CustomText'
import useStore from '@/hooks/useStore'
import { ClearAllFocused, WindowSetTabFocused, WindowToggleMinimizeTab } from '@/store/actions'
import { getExtension, verifyIfIsFile } from '@/utils/file'


export type BottomTaskProps = {
  uuid: string
  title: string
}
const BottomTask = ({
  title,
  uuid
}:BottomTaskProps) => {

  const {states, dispatch} = useStore()
  const [extension, setExtension] = React.useState(getExtension(title))

  const ToggleMinimizeTab= () => {
    const currentWindow = states.Windows.windows.find(window => window.tabs.find(tab => tab.uuid === uuid))
    const currentTab = currentWindow?.tabs.find(tab => tab.uuid === uuid)
    console.log(currentWindow)
    dispatch(WindowToggleMinimizeTab({
      title: currentWindow?.title || '',
      uuid: currentTab?.uuid || '',
    }))

    if(currentTab?.minimized){
      dispatch(ClearAllFocused())
      dispatch(WindowSetTabFocused({
        title: currentWindow?.title || '',
        uuid: currentTab?.uuid || '',
      }))
    }
  }


  
  const GenerateIcon = () => {
    if(verifyIfIsFile(title)){
      switch(extension){
        case 'txt':
          return (
            <span className='i-mdi-file-document text-white text-xl' ></span>
          )
        case 'gif':
          return (
            <span className='i-mdi-gif text-white text-xl' ></span>
          )
        case 'jpg':
          return (
            <span className='i-mdi-image text-white text-xl' ></span>
          )
        case 'png':
          return (
            <span className='i-mdi-image text-white text-xl' ></span>
          )
        case 'jpeg':
          return (
            <span className='i-mdi-image text-white text-xl' ></span>
          )
        case 'html':
          return (
            <span className='i-mdi-html5 text-white text-xl' ></span>
          )
        case 'js':
          return (
            <span className='i-mdi-language-javascript text-white text-xl' ></span>
          )
        case 'ts':
          return (
            <span className='i-mdi-language-typescript text-white text-xl' ></span>
          )
        case 'css':
          return (
            <span className='i-mdi-language-css3 text-white text-xl' ></span>
          )
        case 'json':
          return (
            <span className='i-mdi-json text-white text-xl' ></span>
          )
        case 'md':
          return (
            <span className='i-mdi-format-text text-white text-xl' ></span>
          )
        case 'pdf':
          return (
            <span className='i-mdi-file-pdf text-white text-xl' ></span>
          )
        default:
          return (
            <span className='i-mdi-file text-white text-xl' ></span>
          )
      }
    }else{
      switch(title){
        case 'Explorer':
          return (
            <span className='i-mdi-folder-open text-white text-xl' ></span>
          )
        case 'NotePad':
          return (
            <span className='i-mdi-file-document text-white text-xl' ></span>
          )
        case 'Console':
          return (
            <span className='i-mdi-console text-white text-xl' ></span>
          )
        case 'ImageReader':
          return (
            <span className='i-mdi-image text-white text-xl' ></span>
          )
        case 'Code Editor':
          return (
            <span className='i-mdi-vs-code text-white text-xl' ></span>
          )
        case 'Void Browser':
          return (
            <span className='i-mdi-earth text-white text-xl' ></span>
          )
        case 'Rich Text Editor':
          return (
            <span className='i-mdi-format-text text-white text-xl' ></span>
          )
        case 'PDF Reader':
          return (
            <span className='i-mdi-file-pdf text-white text-xl' ></span>
          )
        default:
          return (
            <span className='i-mdi-folder-open text-white text-xl' ></span>
          )
      }
    }
    
  }



  return (
    <div 
    onClick={ToggleMinimizeTab}
    className='
    flex justify-between items-center
    w-32 min-w-max
    h-10 bg-gray-800 px-2 py-1
    cursor-pointer hover:bg-gray-700
    transition duration-300 ease-in-out
    mt-0.5 mx-px
    '>
      <GenerateIcon/>
      <CustomText 
      className='text-xs text-white'
      text={title}/>
    </div>
  )
}

export default BottomTask