import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'

import App from './App'
<<<<<<< HEAD
import { theme } from './theme/theme'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
=======

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
>>>>>>> 89f27e7100202c6be74de1fd27876005bd3736e0
      <App />
    </ChakraProvider>
  </React.StrictMode>
)
