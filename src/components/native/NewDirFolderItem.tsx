'use client'

import React, { useEffect, useState } from "react"
import { getExtension, uuid } from "@/utils/file"
import Image from "next/image"
import { dirFileItemProps, dirFolderItemProps } from "@/types"
import CustomText from "../atoms/CustomText"
import { MouseAddSelectedItem, MouseClearSelectedItems, MouseRemoveSelectedItem, MouseSetMouseOverItem, MouseSetNewFolder, WindowAddTab } from "@/store/actions"
import useStore from "@/hooks/useStore"
import useFS from "@/hooks/useFS"
const NewDirFolderItem = ({
  title,
  icon,

}: {
  title: string
  icon?: string
}) => {

  const {fs} = useFS()

  const { states, dispatch } = useStore()
  const [inputValue, setInputValue] = useState('')



  return (
    <>
      <div

        className={`
        h-28 px-4
        flex flex-col justify-evenly items-center cursor-pointer
        hover:bg-gray-600 transition-all duration-300 ease-in-out
        bg-gray-600
        `}
      >
        {icon && <Image src={icon} alt={title} width={48} height={48} />}
        <input 
          className="w-16 h-6 bg-gray-800 text-white text-sm outline-none"
          onChange={(e) => setInputValue(e.target.value)}
          autoFocus
          value={inputValue}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              fs?.mkdir(`${states.Mouse.mousePath}/${inputValue}`, () => {
                console.log('created');
                dispatch(MouseSetNewFolder(false))
              })
            }
          }}

        />

      </div>
    </>
  )
}

export default NewDirFolderItem
