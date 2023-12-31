'use client'
import React from 'react'
import WindowBox from '../templates/WindowBox'
import { consoleCommandProps, nativeWindowProps } from '@/types'
import useFS from '@/hooks/useFS'
import { uuid, verifyIfIsFile } from '@/utils/file'
import useStore from '@/hooks/useStore'
import { WindowAddTab, WindowRemoveTab } from '@/store/actions'

const Console = ({
  tab,
  window
}: nativeWindowProps) => {


  const { fs } = useFS()
  const { states, dispatch } = useStore()

  const [input, setInput] = React.useState('');
  const [CommandHistory, setCommandHistory] = React.useState<string[]>([]);
  const [currentDirectory, setCurrentDirectory] = React.useState<string>('/');
  const [DirectoryHistory, setDirectoryHistory] = React.useState<string[]>([]);

  const availableCommands: string[] = [
    'ls',
    'cd',
    'mkdir',
    'touch',
    'rm',
    'clear',
    'cls',
    'rename',
    'mv',
    'cp',
    'dp',
    'cat',
    'pwd',
    'date',
    'time',
    'exit',
    'grep',
    'echo'
  ];

  const handleTabPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      autoCompleteCommand();
    }
  };

  const autoCompleteCommand = () => {
    const partialCommand = input.split(' ').pop();
    const matchingCommand = availableCommands.find((cmd) =>
      cmd.startsWith(partialCommand || '')
    );

    if (matchingCommand) {
      const updatedInput = input.replace(
        new RegExp(`${partialCommand}$`),
        matchingCommand
      );
      setInput(updatedInput);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const consoleCommands: consoleCommandProps[] = [
    {
      command: 'ls',
      description: 'List all files and folders in the current directory',
      callback: async () => {
        await fs?.readdir(currentDirectory, (err, files) => {
          if (err) throw err
          if (files) {
            const filesList = files.map(file => `- ${file}`);
            setCommandHistory([...CommandHistory, ...filesList]);
          }

        })

      }

    },
    {
      command: 'cd',
      description: 'Change the current directory',
      callback: ({ params }) => {
        setCommandHistory([]);
        if (params[0] === '..') {
          setCurrentDirectory(DirectoryHistory[DirectoryHistory.length - 1] || '/')
          return;
        }
        let pathToGo: string;
        if (Array.isArray(params)) {
          pathToGo = params.join(' ');
        } else {
          pathToGo = params;
        }
        fs?.readdir(`${currentDirectory}/${pathToGo}`, (err, files) => {
          if (err) {
            console.log(`%cError: ${err}`, 'color: red');
          }
          else {
            setCurrentDirectory(`${currentDirectory}/${pathToGo}`.replaceAll('//', '/'));
            setCommandHistory([]);
            console.log(`%cCurrent directory: ${currentDirectory}`, 'color: green');
          }
        })
      },
    },
    {
      command: 'mkdir',
      description: 'Create a new folder',
      callback: ({ params }) => {
        const folderName = params[0];
        const path = `${currentDirectory}/${folderName}`.replaceAll('//', '/');
        fs?.mkdir(path, () => {
          console.log(`%cFolder '${folderName}' created`, 'color: green');
        });
      },
    },
    {
      command: 'rename',
      description: 'Rename a file or folder',
      callback: ({ params }) => {
        const [oldName, newName] = params;
        fs?.rename(`${currentDirectory}/${oldName}`, `${currentDirectory}/${newName}`, (err) => {
          if (!err) {
            console.log(`%c'${oldName}' renamed to '${newName}'`, 'color: green');
            setCommandHistory([...CommandHistory, `'${oldName}' renamed to '${newName}'`]);
          }
          else {
            console.log(`%cError: ${err}`, 'color: red');
          }
        })
      },
    },
    {
      command: 'mv',
      description: 'Move a file or folder',
      callback: ({ params }) => {
        const [itemToMove, pathToMove] = params;
        fs?.rename(`${currentDirectory}/${itemToMove}`, `${currentDirectory}/${pathToMove}/${itemToMove}`, (err) => {
          if (!err) {
            console.log(`%c'${itemToMove}' moved to '${pathToMove}'`, 'color: green');
            setCommandHistory([...CommandHistory, `'${itemToMove}' moved to '${pathToMove}'`]);
          }
          else {
            console.log(`%cError: ${err}`, 'color: red');
          }
        })
      },
    },
    {
      command: 'dp',
      description: 'Duplicate a file or folder',
      callback: ({ params }) => {
        const [itemToDuplicate, newItemName] = params;
        if (verifyIfIsFile(itemToDuplicate)) {
          fs?.readFile(`${currentDirectory}/${itemToDuplicate}`, 'utf8', (err, data) => {
            if (err) throw err
            fs?.writeFile(`${currentDirectory}/${newItemName}`, data, (err) => {
              if (!err) {
                console.log(`%cFile '${itemToDuplicate}' duplicated to '${newItemName}'`, 'color: green');
                setCommandHistory([...CommandHistory, `File '${itemToDuplicate}' duplicated to '${newItemName}'`]);
              }
              else {
                console.log(`%cError: ${err}`, 'color: red');
              }
            })
          })
        } else {
          fs?.mkdir(`${currentDirectory}/${newItemName}`, (err) => {
            if (!err) {
              console.log(`%cFolder '${itemToDuplicate}' duplicated to '${newItemName}'`, 'color: green');
              setCommandHistory([...CommandHistory, `Folder '${itemToDuplicate}' duplicated to '${newItemName}'`]);
            }
            else {
              console.log(`%cError: ${err}`, 'color: red');
            }
          })

        }
      }
    },
    {
      command: 'cp',
      description: 'Copy a file or folder',
      callback({ params }) {
        const [itemToCopy, pathToCopy] = params;

        if (verifyIfIsFile(itemToCopy)) {
          let content: string = '';
          fs?.readFile(`${currentDirectory}/${itemToCopy}`, 'utf8', (err, data) => {
            if (err) throw err
            if (data) {
              content = data;
            }
          });
          fs?.writeFile(`${currentDirectory}/${pathToCopy}/${itemToCopy}`, content, (err) => {
            if (!err) {
              console.log(`%cFile '${itemToCopy}' copied to '${pathToCopy}'`, 'color: green');
              setCommandHistory([...CommandHistory, `File '${itemToCopy}' copied to '${pathToCopy}'`]);
            }
            else {
              console.log(`%cError: ${err}`, 'color: red');
            }
          })
        }
      },
    },
    {
      command: 'touch',
      description: 'Create a new file',
      callback: ({ params }) => {
        fs?.writeFile(`${currentDirectory}/${params[0]}`, '', (err) => {
          if (!err) {
            console.log(`%cFile '${params[0]}' created`, 'color: green');
            setCommandHistory([...CommandHistory, `File '${params[0]}' created`]);
          }
          else {
            console.log(`%cError: ${err}`, 'color: red');
          }
        });
      },
    },
    {
      command: 'cat',
      description: 'Show the content of a file',
      callback: ({ params }) => {
        fs?.readFile(`${currentDirectory}/${params[0]}`, 'utf8', (err, data) => {
          if (err) throw err
          if (data) {
            console.log(`%c${data}`, 'color: green');
            setCommandHistory([...CommandHistory, data]);
          }
        })
      },
    },
    {
      command: 'echo',
      description: 'Print a message in the console',
      callback: ({ params }) => {
        const message = params.join(' ');
        console.log(`%c${message}`, 'color: green');
        setCommandHistory([...CommandHistory, message]);
      },
    },
    {
      command: 'pwd',
      description: 'Show the current directory',
      callback: () => {
        console.log(`%c${currentDirectory}`, 'color: green');
        setCommandHistory([...CommandHistory, currentDirectory]);
      },
    },
    {
      command: 'date',
      description: 'Show the current date',
      callback: () => {
        const date = new Date();
        console.log(`%c${date}`, 'color: green');
        setCommandHistory([...CommandHistory, date.toString()]);
      },
    },
    {
      command: 'time',
      description: 'Show the current time',
      callback: () => {
        const date = new Date();
        console.log(`%c${date.toLocaleTimeString()}`, 'color: green');
        setCommandHistory([...CommandHistory, date.toLocaleTimeString()]);
      },
    },
    {
      command: 'exit',
      description: 'Close the console',
      callback: () => {
        dispatch(WindowRemoveTab({
          uuid: tab.uuid,
          title: tab.title || '',
        }))
      }
    },
    {
      command: 'grep',
      description: 'Find a string in a file',
      callback: ({ params }) => {
        const [stringToFind, fileToFind] = params;
        fs?.readFile(`${currentDirectory}/${fileToFind}`, 'utf8', (err, data) => {
          if (err) throw err
          if (data) {
            const lines = data.split('\n');
            const foundLines = lines.filter(line => line.includes(stringToFind));
            console.log(`%c${foundLines.join('\n')}`, 'color: green');
            setCommandHistory([...CommandHistory, foundLines.join('\n')]);
          }
        })
      },
    },
    {
      command: 'rm',
      description: 'Remove a file or folder',
      callback: ({ params }) => {
        let itemToRemove: string;
        if (params.length === 1) {
          itemToRemove = params[0];
        } else {
          console.log(params)
          if (Array.isArray(params)) {
            itemToRemove = params.join(' ');
          }
          else {
            itemToRemove = params;
          }
        }
        if (verifyIfIsFile(itemToRemove)) {
          fs?.unlink(`${currentDirectory}/${itemToRemove}`, (err) => {
            if (!err) {
              console.log(`%cFile '${itemToRemove}' removed`, 'color: green');
              setCommandHistory([...CommandHistory, `File '${itemToRemove}' removed`]);
            }
            else {
              console.log(`%cError: ${err}`, 'color: red');
              fs?.rmdir(`${currentDirectory}/${itemToRemove}`, (err) => {
                if (!err) {
                  console.log(`%cFolder '${itemToRemove}' removed`, 'color: green');
                  setCommandHistory([...CommandHistory, `Folder '${itemToRemove}' removed`]);
                }
                else {
                  console.log(`%cError: ${err}`, 'color: red');
                }
              })
            }
          });
        } else {
          fs?.rmdir(`${currentDirectory}/${itemToRemove}`, (err) => {
            if (!err) {
              console.log(`%cFolder '${itemToRemove}' removed`, 'color: green');
              setCommandHistory([...CommandHistory, `Folder '${itemToRemove}' removed`]);
            }
            else {
              fs?.unlink(`${currentDirectory}/${itemToRemove}`, (err) => {
                if (!err) {
                  console.log(`%cFile '${itemToRemove}' removed`, 'color: green');
                  setCommandHistory([...CommandHistory, `File '${itemToRemove}' removed`]);
                }
                else {
                  console.log(`%cError: ${err}`, 'color: red');
                }
              });
              console.log(`%cError: ${err}`, 'color: red');
            }
          });
        }
      },
    },
    {
      command: 'clear',
      description: 'Clear the console',
      callback: () => {
        setCommandHistory([]);
      }
    },
    {
      command: 'cls',
      description: 'Clear the console',
      callback: () => {
        setCommandHistory([]);
      }
    },
    {
      command: 'help',
      description: 'Show all commands',
      callback: () => {
        setCommandHistory([]);
        setCommandHistory([
          ...CommandHistory, 'help - Show all commands',
          'ls - List all files and folders in the current directory',
          'cd - Change the current directory',
          'mkdir - Create a new folder',
          'touch - Create a new file',
          'rm - Remove a file or folder',
          'clear - Clear the console',
          'cls - Clear the console',
          'rename - Rename a file or folder',
          'mv - Move a file or folder',
          'cp - Copy a file or folder',
          'dp - Duplicate a file or folder',
          'cat - Show the content of a file',
          'pwd - Show the current directory',
          'date - Show the current date',
          'time - Show the current time',
          'exit - Close the console',
          'grep - Find a string in a file',
          'echo - Print a message in the console'
        ]);
      }
    },
  ];

  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        // Separa o comando e os parâmetros
        const [command, ...params] = input.split(' ');

        setCommandHistory([...CommandHistory, input]);
        const foundCommand = consoleCommands.find(c => c.command === command);

        if (foundCommand) {
          console.log(`%c'${input}' is a valid command`, 'color: green');

          if (foundCommand.callback) {
            console.log(`%cRunning: ${foundCommand.description}`, 'color: green');
            foundCommand.callback({ params });
          } else {
            console.log(`%cCommand Not Implemented`, 'color: orange');
          }
        } else {
          console.log(`%c'${input}' is not a valid command`, 'color: red');
        }

        setInput('');
      }
    };

    inputRef.current?.addEventListener('keydown', handleKeyDown);

    return () => {
      inputRef.current?.removeEventListener('keydown', handleKeyDown);
    };
  }, [CommandHistory, input]);



  return (
    <WindowBox
      title={tab.title || window.title}
      uuid={tab.uuid}
      currentWindow={window}
      currentTab={tab}
      resizable
      className='h-3/5 w-3/5 flex flex-col '
    >
      <div className='h-full flex flex-col items-start justify-end p-1 overflow-hidden'>
        {
          CommandHistory.map((command, index) => {
            return (
              <div key={index} className='text-white text-xs m-px '>
                {currentDirectory}$: {command}
              </div>
            )
          })
        }
        <div className=' flex'>
          <span className='text-white'>
            {currentDirectory}$:
          </span>
          <input
            type="text"
            autoFocus
            value={input}
            onChange={handleChange}
            onKeyDown={handleTabPress}
            className='w-full text-sm bg-transparent text-white outline-none border-none ml-1'
            ref={inputRef}
          />
        </div>

      </div>

    </WindowBox>
  )
}

export default Console