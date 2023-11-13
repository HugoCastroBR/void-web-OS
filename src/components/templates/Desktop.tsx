import React, { useEffect } from 'react'
import BottomTaskBar from '../organisms/BottomTaskBar'
import TopTaskBar from '../organisms/TopTaskBar'
import DesktopView from '../organisms/DesktopView'
import useFS from '@/hooks/useFS'
import { Loader } from '@mantine/core'
import CustomText from '../atoms/CustomText'

const Desktop = () => {

  // const {fs} = useFS()
  // const [isFileSystemReady, setIsFileSystemReady] = React.useState(false)

  // useEffect(() => {
  //   console.log('%cSystem: The File System is Loading! ','color: orange');
  //   if(fs !== null){
  //     console.log('%cSystem: File System is Ready! ','color: green');
  //     setIsFileSystemReady(true)
  //   }else{
  //     // console.log('%cKernel panic - not syncing: VOID WEB OS couldn`t mount the root file system (error -101)','color: red');
  //     // console.log('%cKernel panic - not syncing: VOID WEB OS couldn`t mount the root file system (error -101)','color: red');
  //     // console.log('%cKernel panic - Take Your Pills (error -101)','color: red');
  //     // console.log('%cKernel panic - This is a Hallucination','color: red');
  //     // console.log('%cGod Says: Wake UP','color: red');
  //     console.log('%cWake UP','color: red');
  //     // console.log('%cRun','color: red');
  //   }
  // }, [fs])


  const [isRightMenuOpen, setIsRightMenuOpen] = React.useState(false)
  const [x, setX] = React.useState(0)
  const [y, setY] = React.useState(0)

  const MenuContext = () => {
    return (
      <div
        className={`
        bg-gray-300 
          drop-shadow-md shadow-md shadow-gray-800 
          flex flex-col w-40 z-40  
          bg-opacity-20 backdrop-filter backdrop-blur-sm
          py-2
      `}
        style={{
          position: 'absolute',
          top: y,
          left: x,
          zIndex: 100,
        }}
      >
      </div>
    )
  }

  // if(!isFileSystemReady){
  //   return (
  //     <div className='w-screen h-screen bg-black flex flex-col justify-center items-center'>
  //       <Loader
  //         color='white'
  //         size={128}
  //       />
  //       <CustomText
  //         text='Loading...'
  //         className='text-white text-2xl mt-4'
  //       />
  //     </div>
  //   )
  // }

  return (
    <main
      className='
    min-h-full min-w-full w-screen h-screen overflow-hidden bg-gray-600 flex flex-col justify-between
    '
      onContextMenu={(e) => {
        e.preventDefault()
        setX(e.pageX)
        setY(e.pageY)
        setIsRightMenuOpen(true)
      }}
      onClick={() => {
        setIsRightMenuOpen(false)
      }}
    >
      {
        isRightMenuOpen &&
        <MenuContext />
      }
      <TopTaskBar />
      <DesktopView />
      <BottomTaskBar />
    </main>
  )
}

export default Desktop