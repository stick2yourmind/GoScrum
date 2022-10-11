import { mode } from '@chakra-ui/theme-tools'

export const buttonStyles = {
  baseStyle: {},
  sizes: {},
  variants: {
    primary: (props) => ({
      bg: mode('primary.100', 'teal.500')(props),
      color: mode('white', 'gray.200')(props),
      border: '2px',
      borderColor: mode('primary.100', 'teal.500')(props),
      _hover: {
        bg: mode('white', 'gray.800')(props),
        color: mode('primary.100', 'teal.500')(props),
        border: '2px',
        borderColor: mode('primary.100', 'teal.500')(props),
        textDecoration: 'none'
      },
      width: 'full'
    }),
    secondary: (props) => ({
      bg: mode('error.100', 'error.100')(props),
      color: mode('white', 'white')(props),
      border: '2px',
      borderColor: mode('error.100', 'error.100')(props),
      _hover: {
        bg: mode('white', 'gray.800')(props),
        color: mode('primary.100', 'white')(props),
        border: '2px',
        borderColor: mode('primary.100', 'error.100')(props),
        textDecoration: 'none'
      },
      width: 'full'
    })
  },
  defaultProps: {}
}
