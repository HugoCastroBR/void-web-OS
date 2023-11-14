import React, { useEffect } from 'react'
import BottomTaskBar from '../organisms/BottomTaskBar'
import TopTaskBar from '../organisms/TopTaskBar'
import DesktopView from '../organisms/DesktopView'
import useFS from '@/hooks/useFS'
import { Loader } from '@mantine/core'
import CustomText from '../atoms/CustomText'
import useStore from '@/hooks/useStore'
import { mouseContextMenuOptionsProps } from '@/types'
import { MouseClearSelectedItems, MouseSetCopyItemsPath, MouseSetCutItemsPath, MouseSetNewFile, MouseSetNewFolder, WindowAddTab } from '@/store/actions'
import { uuid, verifyIfIsFile } from '@/utils/file'

const Desktop = () => {

  const { states, dispatch } = useStore()
  const { fs } = useFS()




  // useEffect(() => {
  //   console.log(states.Mouse);
  // }, [states.Mouse])

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



  const MouseOption = ({
    className,
    title,
    onClick,
    disabled,
  }: mouseContextMenuOptionsProps) => {
    return (
      <div
        onClick={(e) => {
          if (disabled) return
          e.preventDefault()
          onClick && onClick()
        }}
        className={`${disabled ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}
        text-white text-sm flex items-center hover:bg-gray-500 
        transition-all duration-300 ease-in-out cursor-pointer pl-1
        w-44 h-6
        `}
      >
        <span className={`${className} text-lg`}></span>
        <CustomText
          className='ml-1'
          text={title}
        />
      </div>
    )
  }

  const MouseOptionOpen = () => {
    return (
      <MouseOption
        title='Open'
        disabled={states.Mouse.selectedItems.length === 0}
        onClick={() => {
          states.Mouse.selectedItems.forEach((item) => {
            if (verifyIfIsFile(item)) {
              console.log('open file')
            } else {
              console.log('open folder')
              dispatch(WindowAddTab({
                title: 'Explorer',
                tab: {
                  uuid: uuid(6),
                  title: 'Explorer',
                  maximized: false,
                  minimized: false,
                  value: item
                }
              }))
            }
            dispatch(MouseClearSelectedItems())
          })
        }}
        className='i-mdi-open-in-app'
      />
    )
  }

  const MouseOptionDelete = () => {
    return (
      <MouseOption
        title='Delete'
        disabled={states.Mouse.selectedItems.length === 0}
        onClick={() => {
          states.Mouse.selectedItems.forEach((item) => {
            if (verifyIfIsFile(item)) {
              fs?.unlink(item, (err) => {
                if (err) {
                  fs?.rmdir(item, (err) => {
                    if (err) throw err
                    console.log('deleted folder');
                  })
                } else {
                  console.log('deleted file');
                }

              })
            } else {
              fs?.rmdir(item, (err) => {
                if (err) {
                  fs?.unlink(item, (err) => {
                    if (err) throw err
                    console.log('deleted file');
                  })
                } else {
                  console.log('deleted folder');
                }


              })
            }
            dispatch(MouseClearSelectedItems())
          })
        }}
        className='i-mdi-delete'
      />
    )
  }

  const MouseOptionNewFolder = () => {


    return (
      <>
        <MouseOption
          title='New Desktop Folder'
          disabled={states.Mouse.selectedItems.length !== 0}
          onClick={() => {
            // dispatch(MouseClearSelectedItems())
            dispatch(MouseSetNewFolder(true))
          }}
          className='i-mdi-create-new-folder'
        />
      </>
    )
  }



  const MouseOptionCut = () => {


    return (
      <>
        <MouseOption
          title='Cut'
          disabled={states.Mouse.selectedItems.length === 0}
          onClick={() => {
            dispatch(MouseSetCutItemsPath(states.Mouse.selectedItems))
            dispatch(MouseSetCopyItemsPath([]))

          }}
          className='i-mdi-content-cut'
        />
      </>
    )
  }

  const MouseOptionCopy= () => {


    return (
      <>
        <MouseOption
          title='Copy'
          disabled={states.Mouse.selectedItems.length === 0}
          onClick={() => {
            dispatch(MouseSetCopyItemsPath(states.Mouse.selectedItems))
            dispatch(MouseSetCutItemsPath([]))
          }}
          className='i-mdi-content-copy'
        />
      </>
    )
  }


  const MouseOptionPaste = () => {


    return (
      <>
        <MouseOption
          title='Paste'
          disabled={states.Mouse.cutItemsPath?.length === 0}
          onClick={async () => {
            try {
              console.log(states.Mouse.mouseContextPath);
              const destinationPath = states.Mouse.mouseContextPath;

              for (const item of states.Mouse.cutItemsPath || []) {
                console.log('move From:', item);
                console.log('move To:', destinationPath);
                fs?.rename(item, `${destinationPath}/${item.split('/').pop()}`, (err) => {
                  if (err) throw err
                  console.log('moved');
                })
                // console.log(res);
              }
            } catch (error) {
              console.error('Error:', error);
            }
            // states.Mouse.copyItemsPath?.forEach((item) => {
            //   const itemToCopy = item;
            //   const pathToCopy = states.Mouse.mouseContextPath;    
            //   console.log('copy From:', itemToCopy);
            //   console.log('copy To:', pathToCopy);  
            //   if(verifyIfIsFile(itemToCopy)){
            //     fs?.writeFile(`/${pathToCopy}/${itemToCopy}`, '', (err) => {
            //       if(!err){
            //         console.log(`%cFile '${itemToCopy}' copied to '${pathToCopy}'`, 'color: green');
            //       }
            //       else{
            //         console.log(`%cError: ${err}`, 'color: red');
            //       }
            //     })
            //   }
            // })
          }}
          className='i-mdi-content-paste'
        />
      </>
    )
  }

  const MouseOptionNewFile = () => {


    return (
      <>
        <MouseOption
          title='New File'
          disabled={states.Mouse.selectedItems.length !== 0}
          onClick={() => {
            // dispatch(MouseClearSelectedItems())
            dispatch(MouseSetNewFile(true))
          }}
          className='i-mdi-file-plus'
        />
      </>
    )
  }

  const MenuContext = () => {
    return (
      <div
        className={`
        bg-gray-300 
          drop-shadow-md shadow-md shadow-gray-800 
          flex flex-col w-44 z-40  
          bg-opacity-20 backdrop-filter backdrop-blur-sm
          py-px
      `}
        style={{
          position: 'absolute',
          top: y,
          left: x,
          zIndex: 100,
        }}
      >
        <MouseOptionOpen />
        {/* <MouseOptionCopy /> */}
        <MouseOptionCut />
        <MouseOptionPaste />
        <MouseOptionNewFolder />
        <MouseOptionNewFile />
        <MouseOptionDelete />
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