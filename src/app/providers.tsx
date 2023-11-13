'use client'
import React from 'react'
import {  Button,  createTheme } from '@mantine/core';
import { Provider } from 'react-redux';
import store from '@/store';
import ThemeProviders from './ThemeProvider';

interface ProvidersProps {
  children: React.ReactNode
}

const theme = createTheme({
  components: {
    Button: Button.extend({
      defaultProps: {
        color: 'cyan',
        variant: 'outline',
      },
    
    }),
    
  },
  
});

const Providers = (
  { children }: ProvidersProps
) => {
  return (
    <Provider store={store}>
        <ThemeProviders>
          {children}
        </ThemeProviders>
    </Provider>


  )
}

export default Providers