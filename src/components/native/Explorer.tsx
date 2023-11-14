'use client'

import { explorerProps } from '@/types'
import React, { useEffect, useState } from 'react'
import WindowBox from '../templates/WindowBox'
import { getExtension, uuid, verifyIfIsFile } from '@/utils/file'
import ActionBar from '../organisms/ExplorerActionBar'
import { Group, FileButton, Button, Text, SimpleGrid } from '@mantine/core'
import useFS from '@/hooks/useFS'
import { generateIcon } from '@/utils/icons'
import DirFileItem from './DirFileItem'
import DirFolderItem from './DirFolderItem'
import useStore from '@/hooks/useStore'
import { MouseSetMouseContextPath, MouseSetMousePath } from '@/store/actions'
import NewDirFileItem from './NewDirFileItem'
import NewDirFolderItem from './NewDirFolderItem'


const Explorer = ({
  tab,
  window,
  path
}: explorerProps) => {

  const { states, dispatch } = useStore()

  const { fs } = useFS()


  const [dirFiles, setDirFiles] = useState<string[]>([])
  const [currentPath, setCurrentPath] = useState<string>(path)

  useEffect(() => {
    fs?.readdir(currentPath, (err, files) => {
      if (err) throw err
      if (files) {

        setDirFiles(files)
      }
    })
  }, [fs])

  const Reload = async () => {
    await fs?.readdir(currentPath, (err, files) => {
      if (err) throw err
      if (files) {
        setDirFiles(files)
      }
    })
  }

  useEffect(() => {
    Reload()
  }, [currentPath])

  const [file, setFile] = useState<File | null>(null);

  const [newFolderInputOpen, setNewFolderInputOpen] = useState(false);
  const [newFileInputOpen, setNewFileInputOpen] = useState(false);


  useEffect(() => {
    Reload()
  }, [fs, currentPath,states.Mouse])

  return (
    <WindowBox
      currentTab={tab}
      currentWindow={window}
      title='Explorer'
      uuid={tab.uuid}
      onMouseEnter={() => {
        console.log('mouse enter explorer')
        dispatch(MouseSetMousePath(tab.value || '/'))
        dispatch(MouseSetMouseContextPath(tab.value || '/'))
      }}
      onMouseMove={() => {
        dispatch(MouseSetMouseContextPath(`${currentPath}/`))
      
      }}
      onMouseLeave={() => {
        dispatch(MouseSetMousePath('/Desktop'))
        dispatch(MouseSetMouseContextPath('Desktop'))
      }}
      resizable
      className='w-3/5 h-3/5 flex flex-col '
    >
      <div
        className='w-full h-full bg-gray-800 flex flex-col'>
        <div className='flex w-full h-1/6 bg-gray-900 overflow-hidden'>
          <ActionBar
            onReload={Reload}
            onBack={() => {
              if (currentPath.split('/').slice(0, -1).join('/') === '') {
                setCurrentPath('/')
              } else {
                setCurrentPath(currentPath.split('/').slice(0, -1).join('/'))
              }
            }}
            path={currentPath}
          />
        </div>
        <div className='flex w-full h-5/6'>
          <div className='w-2/12 pt-2'>
            <Group justify="center">
              <FileButton onChange={setFile} >
                {(props) => <Button {...props}
                  className={`hover:bg-gray-700 transition-all duration-300 ease-in-out`}
                  styles={{
                    root: {
                      backgroundColor: '#2d374833',
                      border: '1px solid gray',
                      borderStyle: 'dashed',
                      color: 'white',
                      width: '90%'
                    }
                  }}
                >Upload File</Button>}
              </FileButton>
              {file && (
                  <Text size="sm" ta="center" mt="sm">
                    Picked file: {file.name}
                  </Text>
                )}
              <Button
                onClick={() => {
                  setNewFileInputOpen(true)
      
                }}
                className={`hover:bg-gray-600 transition-all duration-300 ease-in-out`}
                styles={{
                  root: {
                    backgroundColor: '#2d374833',
                    border: '1px solid gray',
                    color: 'white',
                    width: '90%'
                  }
                }}
              >New File</Button>
              <Button
                onClick={() => {
                  setNewFolderInputOpen(true)
                }}
                className={`hover:bg-gray-600 transition-all duration-300 ease-in-out`}
                styles={{
                  root: {
                    backgroundColor: '#2d374833',
                    border: '1px solid gray',
                    color: 'white',
                    width: '90%'
                  }
                }}
              >New Folder</Button>
            </Group>


          </div>
          <div className='bg-gray-700 w-10/12 flex p-2'>
            <SimpleGrid cols={10} spacing="1px" verticalSpacing="1px">
              {
                dirFiles.map((file, index) => {
                  if (verifyIfIsFile(file)) {
                    return (
                      <DirFileItem
                        key={`${file}-${index}`}
                        title={file}
                        icon={generateIcon(getExtension(file)) || '/assets/icons/file.png'}  
                        path={`${currentPath}/${file}`.replaceAll('//', '/')}
                      />
                    )
                  } else {
                    return (
                      <DirFolderItem
                        onDoubleClick={async () => {
                          setCurrentPath(`${currentPath}/${file}`.replaceAll('//', '/'))
                        }}
                        key={`${file}-${index}`}
                        title={file}
                        icon='/assets/icons/folder.png'
                        path={`${currentPath}/${file}`.replaceAll('//', '/')}
                      />
                    )
                  }
                })
              }
              {newFileInputOpen && 
              <NewDirFileItem
                title='New File'
                icon='/assets/icons/file.png'
                inExplorer
                inExplorerPath={currentPath}
                inExplorerCB={() => {
                  setNewFileInputOpen(false)
                  Reload()
                }}
              />
              }
              {
                newFolderInputOpen && 
                <NewDirFolderItem
                  title='New Folder'
                  icon='/assets/icons/folder.png'
                  inExplorer
                  inExplorerPath={currentPath}
                  inExplorerCB={() => {
                    setNewFolderInputOpen(false)
                    Reload()
                  }}
                />
              }
            </SimpleGrid>
          </div>
        </div>
      </div>

    </WindowBox>
  )
}

export default Explorer