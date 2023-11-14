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
  inExplorer,
  inExplorerCB,
  inExplorerPath
}: {
  title: string
  icon?: string
  inExplorer?: boolean
  inExplorerCB?: () => void
  inExplorerPath?: string
}) => {

  const {fs} = useFS()

  const { states, dispatch } = useStore()
  const [inputValue, setInputValue] = useState('')



  return (
    <>
      <div

        className={`
        h-24 px-4
        flex flex-col justify-evenly items-center cursor-pointer
        hover:bg-gray-600 transition-all duration-300 ease-in-out
        bg-gray-600
        `}
      >
        {icon && <Image src={icon} alt={title} width={48} height={48} />}
        <input 
          className="w-16 h-6 bg-gray-800 text-white text-xs outline-none text-center "
          onChange={(e) => setInputValue(e.target.value)}
          autoFocus
          value={inputValue}
          onKeyPress={(e) => {
            if(!inExplorer){
              if (e.key === 'Enter') {
                fs?.mkdir(`${states.Mouse.mousePath}/${inputValue}`, () => {
                  console.log('created');
                  dispatch(MouseSetNewFolder(false))
                })
              }
            }else{
              if (e.key === 'Enter') {
                fs?.mkdir(`${inExplorerPath}/${inputValue}`, () => {
                  console.log('created');
                  inExplorerCB && inExplorerCB()
                })
              }
            }
          }}

        />

      </div>
    </>
  )
}

export default NewDirFolderItem
