'use client'
import { ImageReaderProps } from '@/types'
import React, { useEffect, useState } from 'react'
import CustomText from '../atoms/CustomText'
import WindowBox from '../templates/WindowBox'
import useFS from '@/hooks/useFS'
import useStore from '@/hooks/useStore'
import NextImageRender from '../atoms/NextImageRender'

const ImageReader = ({
  tab,
  window,
  path
}:ImageReaderProps) => {


  const [image, setImage] = useState<string | null>(null)
  const {states, dispatch} = useStore()
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)
  const [margin, setMargin] = useState<number>(0)
  const {fs} = useFS()

  useEffect(() => {
    fs?.readFile(`${tab.value}`, 'utf8', (err, data) => {
      if (err) throw err
      if (data) {
        setImage(data)
      }
    })
  }, [states.Mouse, fs])

  useEffect(() => {
    if(image){
      const img = new Image()
      img.src = `data:image/png;base64,${image}`
      img.onload = () => {
        if(img.width < 64 || img.height < 64){
          setMargin(128)
        }
        if(img.width > 2000 || img.height > 2000){
          setWidth(img.width / 4)
          setHeight(img.height / 4)
          return
        }
        if(img.width > 1512 || img.height > 1512){
          setWidth(img.width / 2)
          setHeight(img.height / 2)
          return
        }
        if(img.width > 1028 || img.height > 1028){
          setWidth(img.width / 1.8)
          setHeight(img.height / 1.8 )
          return
        }
        if(img.width > 812 || img.height > 812){
          setWidth(img.width / 1.4)
          setHeight(img.height / 1.4 )
          return
        }
        setWidth(img.width)
        setHeight(img.height)
        
      }
    }
  }, [image])


  return (
    <WindowBox
      currentTab={tab}
      currentWindow={window}
      title={'ImageReader'}
      uuid={tab.uuid}
      resizable
      className='absolute bg-gray-800 flex  overflow-hidden justify-center items-center '>
      <div className='flex  overflow-hidden justify-center items-center bg-transparent m-8
      max-w-full max-h-full
      '>
        <NextImageRender
          src={`data:image/png;base64,${image}`}
          width={width}
          height={height}
          alt='image'
        />
      </div>
    </WindowBox>
  )
}

export default ImageReader