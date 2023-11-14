'use client'

import React, { useEffect, useState } from "react"
import { extractParentPath, getExtension, uuid } from "@/utils/file"
import Image from "next/image"
import { dirFileItemProps, dirFolderItemProps } from "@/types"
import CustomText from "../atoms/CustomText"
import useStore from "@/hooks/useStore"
import { MouseAddSelectedItem, MouseClearSelectedItems, MouseRemoveSelectedItem, MouseSetIsRenaming, MouseSetMouseOverItem, WindowAddTab } from "@/store/actions"
import useFS from "@/hooks/useFS"

const DirFolderItem = ({
  title,
  icon,
  onClick,
  onDoubleClick,
  path
}: dirFolderItemProps) => {

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
          if (onDoubleClick) {
            dispatch(MouseClearSelectedItems())
            onDoubleClick()
            return
          }
          console.log('path:', path)
          dispatch(WindowAddTab({
            title: 'Explorer',
            tab: {
              uuid: uuid(6),
              title: 'Explorer',
              maximized: false,
              minimized: false,
              value: path
            }
          }))
        }}
        onMouseEnter={() => {
          dispatch(MouseSetMouseOverItem(path))
        }}
        onMouseLeave={() => {
          dispatch(MouseSetMouseOverItem(undefined))
        }}
        className={`
        h-24 px-4
        flex flex-col justify-evenly items-center cursor-pointer
        hover:bg-gray-600 transition-all duration-300 ease-in-out
        ${isItemSelected ? 'bg-gray-600' : ''}
        `}
      >
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

export default DirFolderItem
