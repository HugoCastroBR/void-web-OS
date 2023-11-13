'use client'
import React, { useEffect, useState } from "react"
import { getExtension } from "@/utils/file"
import Image from "next/image"
import { dirFileItemProps } from "@/types"
import CustomText from "../atoms/CustomText"
import { MouseAddSelectedItem, MouseClearSelectedItems, MouseRemoveSelectedItem, MouseSetMouseOverItem } from "@/store/actions"
import useStore from "@/hooks/useStore"

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
          return
        }}
        onMouseEnter={() => {
          dispatch(MouseSetMouseOverItem(path))
        }}
        onMouseLeave={() => {
          dispatch(MouseSetMouseOverItem(undefined))
        }}
        className={`
        h-28 px-4
        flex flex-col justify-evenly items-center cursor-pointer
        hover:bg-gray-600 transition-all duration-300 ease-in-out
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