'use client'
import React, { useEffect, useState } from "react"
import { getExtension } from "@/utils/file"
import Image from "next/image"
import { dirFileItemProps } from "@/types"
import CustomText from "../atoms/CustomText"
import { MouseAddSelectedItem, MouseClearSelectedItems, MouseRemoveSelectedItem, MouseSetMouseMovingPath, MouseSetMouseOverItem } from "@/store/actions"
import useStore from "@/hooks/useStore"
import Draggable from "react-draggable"

const DirFileItem = ({
  title,
  icon,
  onClick,
  onDoubleClick,
  path
}: dirFileItemProps) => {

  const { states, dispatch } = useStore()

  const [isItemSelected, setIsItemSelected] = useState(false)

  useEffect(() => {
    if (states.Mouse.selectedItems.includes(path)) {
      setIsItemSelected(true)
    } else {
      setIsItemSelected(false)
    }
  }, [states.Mouse.selectedItems])

  useEffect(() => {
    console.log("path:", states.Mouse.mouseMovingPath)
  }, [states.Mouse.mouseMovingPath])

  return (
    <>
      <div
        onClick={() => {
          onClick && onClick()
          if (isItemSelected) {
            dispatch(MouseRemoveSelectedItem(path))
          } else {
            console.log("??",path)
            dispatch(MouseAddSelectedItem(path))
            
          }
        }}
        onDoubleClick={() => {
          dispatch(MouseClearSelectedItems())
          onDoubleClick && onDoubleClick()
          return
        }}
        className={`
        h-28 px-4
        flex flex-col justify-evenly items-center cursor-pointer
        hover:bg-gray-600 
        ${isItemSelected ? 'bg-gray-600' : ''}
        `}>
        {icon && <Image src={icon} alt={title} width={48} height={48} />}
        <CustomText
          text={title}
        />
      </div>
    </>
  )
}

export default DirFileItem