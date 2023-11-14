'use client'
import React, { useEffect, useState } from "react"
import { getExtension, uuid } from "@/utils/file"
import Image from "next/image"
import { dirFileItemProps } from "@/types"
import CustomText from "../atoms/CustomText"
import { MouseAddSelectedItem, MouseClearSelectedItems, MouseRemoveSelectedItem, MouseSetMouseOverItem, WindowAddTab } from "@/store/actions"
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
          return
        }}
        className={`
        h-24 px-4
        flex flex-col justify-evenly items-center cursor-pointer
        hover:bg-gray-600 
        ${isItemSelected ? 'bg-gray-600' : ''}
        `}>
        {icon && <Image src={icon} alt={title} width={48} height={48} />}
        <CustomText
          text={title}
          className="break-words w-20 text-sm text-center"
        />
      </div>
    </>
  )
}

export default DirFileItem