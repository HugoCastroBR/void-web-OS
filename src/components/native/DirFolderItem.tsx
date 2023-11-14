'use client'

import React, { useEffect, useState } from "react"
import { getExtension, uuid } from "@/utils/file"
import Image from "next/image"
import { dirFileItemProps, dirFolderItemProps } from "@/types"
import CustomText from "../atoms/CustomText"
import useStore from "@/hooks/useStore"
import { MouseAddSelectedItem, MouseClearSelectedItems, MouseRemoveSelectedItem, MouseSetMouseOverItem, WindowAddTab } from "@/store/actions"
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

  const {fs} = useFS()

  useEffect(() => {
    if (states.Mouse.selectedItems.includes(path)) {
      setIsItemSelected(true)
    } else {
      setIsItemSelected(false)
    }
  }, [states.Mouse.selectedItems])

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
        <CustomText
          text={title}
          className="break-words w-20 text-sm text-center"
        />
      </div>
    </>
  )
}

export default DirFolderItem
