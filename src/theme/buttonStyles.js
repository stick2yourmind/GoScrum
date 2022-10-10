import { mode } from '@chakra-ui/theme-tools'

export const buttonStyles = {
  baseStyle: {},
  sizes: {},
  variants: {
    primary: (props) => ({
      bg: mode('primary.100', 'teal.500')(props),
      color: mode('black', 'gray.200')(props),
      _hover: {
        bg: mode('white', 'gray.200')(props),
        color: mode('primary.100', 'teal.500')(props),
        border: '2px',
        borderColor: mode('primary.100', 'teal.500')(props)
      },
      width: 'full'
    })
  },
  defaultProps: {}
}
