'use client'
import React, { useEffect } from 'react'
import CustomText from '../atoms/CustomText'
import useFS from '@/hooks/useFS'
import WindowBox from '../templates/WindowBox'
import { Grid, SimpleGrid } from '@mantine/core'
import Console from '../native/Console'
import { getExtension, uuid, verifyIfIsFile } from '@/utils/file'
import { dirFileItemProps, dirFolderItemProps, nativeAppProps } from '@/types'
import useStore from '@/hooks/useStore'
import { MouseClearSelectedItems, MouseSetIsMouseInDesktop, WindowAddTab } from '@/store/actions'
import Image from 'next/image'
import { generateIcon } from '@/utils/icons'
import Explorer from '../native/Explorer'
import DirFileItem from '../native/DirFileItem'
import DirFolderItem from '../native/DirFolderItem'
import NewDirFolderItem from '../native/NewDirFolderItem'
import NewDirFileItem from '../native/NewDirFileItem'
import Notepad from '../native/Notepad'
import ImageReader from '../native/ImageReader'
const DesktopView = () => {

  const {states, dispatch} = useStore()

  const {fs} = useFS()
  const DesktopPath = '/Desktop'
  const [DesktopFiles, setDesktopFiles] = React.useState<string[]>([])

  useEffect(() => {
    fs?.readdir(DesktopPath, (err, files) => {
      if(err) throw err
      if(files){
        setDesktopFiles(files)
      }
    })
  }, [fs])


  useEffect(() => {
    dispatch(MouseSetIsMouseInDesktop(true))
    fs?.readdir(DesktopPath, (err, files) => {
      if(err) throw err
      if(files){
        setDesktopFiles(files)
      }
    })
  }, [states.Mouse,fs])

  const generateGrid = () => {
    const grid = []
    for(let i = 0; i < 160; i++){
      grid.push(
      <div 
        key={i}
        className='
        h-28 border border-gray-700 
        flex flex-col justify-evenly items-center
        hover:bg-gray-600 transition-all duration-300 ease-in-out
        '>
          {i +1}
        </div>
      )
    }
    return grid
  }


  const DesktopNativeItem = ({
    title,
    icon,
  }:nativeAppProps) => {
    return (
      <>
        <div 
          onDoubleClick={() => {
            dispatch(WindowAddTab({
              title: title,
              tab:{
                uuid: uuid(6),
                title: title,
                maximized: false,
                minimized: false,
              }
            }))
          }}
          className='
          h-24 px-4
          flex flex-col justify-evenly items-center cursor-pointer
          hover:bg-gray-600 transition-all duration-300 ease-in-out
          '>
            {icon && <Image src={icon} alt={title} width={48} height={48} />}
            <CustomText
              text={title}
              className="break-words w-20 text-xs text-center"
            />
          </div>
        </>
    )
  }

  

  


  return (
    <div className='bg-transparent h-full z-10  '
      onDoubleClick={
        () => {
          dispatch(MouseClearSelectedItems())
        }
      }
    >
      
      {states.Windows.windows.map((window,index) => {
        return window.tabs.map((tab,index) => {
          if(tab.title === 'Console'){
            return (
              <Console 
                tab={tab}
                key={index}
                window={window}
              />
            )
          }
          if(tab.title === 'Explorer'){
            return (
              <Explorer 
                tab={tab}
                key={index}
                window={window}
                path={tab?.value || '/'}
              />
            )
          }
          if(tab.title === 'NotePad'){
            return (
              <Notepad
                path={'/Desktop'}
                tab={tab}
                key={index}
                window={window}
              />
            )
          }
          {
            if(tab.title === 'ImageReader'){
              return (
                <ImageReader
                  path={tab?.value || '/'}
                  tab={tab}
                  key={index}
                  window={window}
                />
              )
            }
          }
          
        })
      })}
      <SimpleGrid cols={20} spacing="2px" verticalSpacing="2px">
        {states.Windows.windows.map((window,index) => {
          if(window.native){
            return (
              <DesktopNativeItem key={`${window.title}-${index}`} title={window.title} icon={window?.icon || ''} />
            )
          }
        })}
      
        {
          DesktopFiles.map((file,index) => {
            if(verifyIfIsFile(file)){
              return (
                <DirFileItem 
                key={`${file}-${index}`} 
                title={file} 
                icon={generateIcon(getExtension(file)) || '/assets/icons/file.png'}  
                path={`${DesktopPath}/${file}`.replaceAll('//','/')}
                />
              )
            }else{
              return (
                <DirFolderItem 
                  key={`${file}-${index}`} 
                  title={file} 
                  icon='/assets/icons/folder.png' 
                  path={`${DesktopPath}/${file}`.replaceAll('//','/')}
                />
              )
            }
          })
        }
          {
          states.Mouse.newFolder && <NewDirFolderItem 
          title='New Folder'
          icon='/assets/icons/folder.png'

          />
        }
        {
          states.Mouse.newFile && <NewDirFileItem 
          title='New File'
          icon='/assets/icons/file.png'
          />
        }
      </SimpleGrid>

    </div>
  )
}

export default DesktopView