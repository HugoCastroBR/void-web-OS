import React from 'react'
import WindowBox from '../templates/WindowBox'
import { consoleCommandProps, nativeWindowProps } from '@/types'
import useFS from '@/hooks/useFS'
import { verifyIfIsFile } from '@/utils/file'

const Console = ({
  tab,
  window
}:nativeWindowProps) => {


const {fs} = useFS()

const [input, setInput] = React.useState('');
const [CommandHistory, setCommandHistory] = React.useState<string[]>([]);
const [currentDirectory, setCurrentDirectory] = React.useState<string>('/');
const [DirectoryHistory, setDirectoryHistory] = React.useState<string[]>([]);

const consoleCommands: consoleCommandProps[] = [
  {
    command: 'ls',
    description: 'List all files and folders in the current directory',
    callback: async () => {
      await fs?.readdir(currentDirectory, (err, files) => {
        if(err) throw err
        if(files){
          const filesList = files.map(file => `- ${file}`);
          setCommandHistory([...CommandHistory, ...filesList]);
        }
        
      })
      
    }
    
  },
  {
    command: 'cd',
    description: 'Change the current directory',
    callback: ({params}) => {
      setCommandHistory([]);
      if(params[0] === '..'){
        setCurrentDirectory(DirectoryHistory[DirectoryHistory.length - 1] || '/')
        return;
      }
      let pathToGo: string;
      if(Array.isArray(params)){
        pathToGo = params.join(' ');
      }else{
        pathToGo = params;
      }
      fs?.readdir(`${currentDirectory}/${pathToGo}`, (err, files) => {
        if(err){
          console.log(`%cError: ${err}`, 'color: red');
        }
        else{
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
    callback: ({params}) => {
      const folderName = params[0];
      const path = `${currentDirectory}/${folderName}`.replaceAll('//', '/');
      fs?.mkdir(path, () => {
        console.log(`%cFolder '${folderName}' created`, 'color: green');
      });
    },
  },
  {
    command: 'touch',
    description: 'Create a new file',
    callback: ({params}) => {
      fs?.writeFile(`${currentDirectory}/${params[0]}`, '', (err) => {
        if(!err){
          console.log(`%cFile '${params[0]}' created`, 'color: green');
          setCommandHistory([...CommandHistory, `File '${params[0]}' created`]);
        }
        else{
          console.log(`%cError: ${err}`, 'color: red');
        }
      });
    },
  },
  {
    command: 'rm',
    description: 'Remove a file or folder',
    callback: ({params}) => {
      let itemToRemove: string;
      if(params.length === 1){
        itemToRemove = params[0];
      }else{
        console.log(params)
        if(Array.isArray(params)){
          itemToRemove = params.join(' ');
        }
        else{
          itemToRemove = params;
        }
      }
      if(verifyIfIsFile(itemToRemove)){
        fs?.unlink(`${currentDirectory}/${itemToRemove}`, (err) => {
          if(!err){
            console.log(`%cFile '${itemToRemove}' removed`, 'color: green');
            setCommandHistory([...CommandHistory, `File '${itemToRemove}' removed`]);
          }
          else{
            console.log(`%cError: ${err}`, 'color: red');
            fs?.rmdir(`${currentDirectory}/${itemToRemove}`, (err) => {
              if(!err){
                console.log(`%cFolder '${itemToRemove}' removed`, 'color: green');
                setCommandHistory([...CommandHistory, `Folder '${itemToRemove}' removed`]);
              }
              else{
                console.log(`%cError: ${err}`, 'color: red');
              }
            })
          }
        });
      }else{
        fs?.rmdir(`${currentDirectory}/${itemToRemove}`, (err) => {
          if(!err){
            console.log(`%cFolder '${itemToRemove}' removed`, 'color: green');
            setCommandHistory([...CommandHistory, `Folder '${itemToRemove}' removed`]);
          }
          else{
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
    }};

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
      className='w-96 h-96 flex flex-col '
    >
      <div className='h-full flex flex-col items-start justify-end p-1 overflow-hidden'>
        {
          CommandHistory.map((command, index) => {
            return (
              <div key={index} className='text-white text-sm m-px '>
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
            value={input} 
            onChange={(e) => {setInput(e.target.value)}} 
            className='w-full bg-transparent text-white outline-none border-none ml-1'
            ref={inputRef}
            />
        </div>
          
      </div>
      
    </WindowBox>
  )
}

export default Console