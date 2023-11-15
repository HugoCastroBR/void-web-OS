'use client'
import React, { useEffect, useState } from "react"
import { extractParentPath, getExtension, uuid } from "@/utils/file"
import Image from "next/image"
import { dirFileItemProps } from "@/types"
import CustomText from "../atoms/CustomText"
import { MouseAddSelectedItem, MouseClearSelectedItems, MouseRemoveSelectedItem, MouseSetIsRenaming, MouseSetMouseOverItem, WindowAddTab } from "@/store/actions"
import useStore from "@/hooks/useStore"
import Draggable from "react-draggable"
import useFS from "@/hooks/useFS"

const DirFileItem = ({
  title,
  icon,
  onClick,
  onDoubleClick,
  path
}: dirFileItemProps) => {

  const { states, dispatch } = useStore()

  const [isItemSelected, setIsItemSelected] = useState(false)
  const [inputValue, setInputValue] = useState(title)
  const [isRename, setIsRename] = useState(false)

  const { fs } = useFS()

  useEffect(() => {
    if (states.Mouse.selectedItems.includes(path)) {
      setIsItemSelected(true)
    } else {
      setIsItemSelected(false)
    }
  }, [states.Mouse.selectedItems])

  useEffect(() => {
    if (states.Mouse.isRenaming && states.Mouse.selectedItems.includes(path)) {
      setIsRename(true)
    } else {
      setIsRename(false)
    }
  }, [states.Mouse.isRenaming])


  const CodeExtension = ["js" || "ts" || "css"]
  return (
    <>
      <div
        onClick={() => {
          onClick && onClick()
          if (isItemSelected) {
            dispatch(MouseRemoveSelectedItem(path))
          } else {
            dispatch(MouseAddSelectedItem(path))
            
          }
        }}
        onDoubleClick={() => {
          dispatch(MouseClearSelectedItems())
          onDoubleClick && onDoubleClick()
          const extension = getExtension(path)
          if(extension === 'txt'){
            dispatch(WindowAddTab({
              title: 'NotePad',
              tab: {
                uuid: uuid(6),
                title: 'NotePad',
                ficTitle: title,
                maximized: false,
                minimized: false,
                value: path
              }
            }))
          }
          if(extension === 'png' || extension === 'jpg' || extension === 'jpeg' || extension === 'gif'){
            dispatch(WindowAddTab({
              title: 'ImageReader',
              tab: {
                uuid: uuid(6),
                title: 'ImageReader',
                ficTitle: title,
                maximized: false,
                minimized: false,
                value: path
              }
            }))
          }
          if(extension === "html"){
            dispatch(WindowAddTab({
              title: 'Void Browser',
              tab: {
                uuid: uuid(6),
                title: 'Void Browser',
                ficTitle: title,
                maximized: false,
                minimized: false,
                value: path,
                extension: extension,
                local: true
              }
            }))
          }
          if(CodeExtension.includes(extension)){
            dispatch(WindowAddTab({
              title: 'Code Editor',
              tab: {
                uuid: uuid(6),
                title: 'Code Editor',
                ficTitle: title,
                maximized: false,
                minimized: false,
                value: path,
                extension: extension
              }
            }))
          }
        }}
        className={`
        h-24 px-4
        flex flex-col justify-evenly items-center cursor-pointer
        hover:bg-gray-600 
        ${isItemSelected ? 'bg-gray-600' : ''}
        `}>
        {icon && <Image src={icon} alt={title} width={48} height={48} />}
        {isRename ?
          <input
            className="w-16 h-6 bg-gray-800 text-white text-xs outline-none text-center "
            onChange={(e) => setInputValue(e.target.value)}
            autoFocus
            value={inputValue}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                const renameFrom = path
                const renameTo = `${extractParentPath(path)}/${inputValue}`
                fs?.rename(renameFrom, renameTo, (err) => {
                  if(err){
                    console.log(err);
                  }else{
                    console.log('renamed');
                  }
                })
                dispatch(MouseClearSelectedItems())
                dispatch(MouseSetIsRenaming(false))
              }
            }}
          />
          :
          <CustomText
            text={title}
            className="break-words w-20 text-xs text-center"
          />
        }
      </div>
    </>
  )
}

export default DirFileItem