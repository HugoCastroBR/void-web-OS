'use client'
import { PdfReaderProps } from '@/types'
import React, { useEffect, useState } from 'react'
import WindowBox from '../templates/WindowBox'
import useFS from '@/hooks/useFS';

const PdfReader = ({
  tab,
  window,
  path
}: PdfReaderProps) => {

  const { fs } = useFS();
  const [pdfContent, setPdfContent] = useState<string | null>(null);

  useEffect(() => {
    const loadFile = () => {
      try {
        fs?.readFile(path, 'utf8', (err, data) => {
          if (err) {
            console.error('Error reading file:', err);
            return;
          }
  
          if (data) {
            const base64Data = Buffer.from(data).toString('base64');
            setPdfContent(base64Data);
          } else {
            console.error('Empty data received from file:', path);
          }
        });
      } catch (err) {
        console.error('Error in loadFile:', err);
      }
    };
  
    console.log('Path:', path);
    console.log('FS:', fs);
  
    loadFile();
  }, [fs, path]);

  return (
    <WindowBox
      currentTab={tab}
      currentWindow={window}
      title='PDF Reader'
      uuid={tab.uuid}
      resizable
      className='w-1/4 h-2/5 flex flex-col !bg-white'
    >
      {pdfContent && (
        <iframe
          title={`PDF Viewer - ${tab.ficTitle || 'File'}`}
          src={`data:application/pdf;base64,${pdfContent}`}
          width="100%"
          height="600px"
        ></iframe>
      )}
    </WindowBox>
  );
};

export default PdfReader;
