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
import { MouseSetMousePath } from '@/store/actions'


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
        console.log('files:', files)
        setDirFiles(files)
      }
    })
  }

  useEffect(() => {
    Reload()
  }, [currentPath])

  const [file, setFile] = useState<File | null>(null);


  return (
    <WindowBox
      currentTab={tab}
      currentWindow={window}
      title='Explorer'
      uuid={tab.uuid}
      onMouseEnter={() => {
        dispatch(MouseSetMousePath(currentPath))
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
                    }
                  }}
                >Upload File</Button>}
              </FileButton>
            </Group>
            {file && (
              <Text size="sm" ta="center" mt="sm">
                Picked file: {file.name}
              </Text>
            )}
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
                        icon={generateIcon(getExtension(file))}
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
            </SimpleGrid>
          </div>
        </div>
      </div>

    </WindowBox>
  )
}

export default Explorer