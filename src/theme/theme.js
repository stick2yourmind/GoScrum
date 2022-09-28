import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    background: {
      100: '#E5E5E5',
      200: '#FAFAFA',
      300: '#FFFFFF'
    },
    primary: {
      100: '#FF452B'
    },
    badges: {
      low: '#007BFF',
      new: '#FF452B',
      high: '#FF452B',
      inprogress: '#FBDE3F',
      finished: '#1EC876'
    },
    error: {
      100: '#FA0707'
    }
  }
})
