import { extendTheme } from '@chakra-ui/react'

import { buttonStyles as Button } from './buttonStyles'

export const theme = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: false,
  components: {
    Button,
    Badge: {
      baseStyle: {
        textTransform: 'lowercase',
        textAlign: 'center',
        container: {
          textAlign: 'center'
        }
      }
    },
    Radio: {
      baseStyle: {
        container: {
          touchAction: 'none'
        }
      }
    }
  },
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
      high: '#FA0707',
      'in-progress': '#FBDE3F',
      finished: '#1EC876'
    },
    error: {
      100: '#FA0707'
    }
  }
})
