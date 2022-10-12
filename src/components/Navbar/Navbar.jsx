import { Spacer, Image, Stack, Button, Text, Box, Link, IconButton, useColorMode } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

import Logo from '../../assets/GoScrum.png'
import DarkLogo from '../../assets/GoScrumDark.png'
import { logoutUser } from '../../store/slices/authSlice'

const Navbar = () => {
  const dispatch = useDispatch()
  const { userName } = useSelector((state) => state.auth.userData)
  const { tasks } = useSelector((state) => state.tasks)
  const { colorMode, toggleColorMode } = useColorMode()

  const onLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <Stack
      align="center"
      bg={colorMode === 'light' ? '#FFFFFF' : 'gray.900'}
      boxShadow="md"
      direction="row"
      fontSize={{ base: '13px', md: '15px' }}
      fontWeight="semibold"
      h="50px"
      paddingX={{ base: '5px', md: '20px' }}
      spacing={{ base: 2, md: 10 }}
    >
      <Image
        alt="GoScrum Logo"
        h={{ base: '15px', sm: '20px' }}
        src={colorMode === 'light' ? Logo : DarkLogo}
        w={{ base: '60px', sm: '80px' }}
      />
      <Spacer />

      <Button
        isExternal
        alignItems="center"
        as={Link}
        display="flex"
        fontSize={{ base: '12px', sm: '15px' }}
        h={{ base: '25px', sm: '25px' }}
        href="https://www.paypal.com/donate/?hosted_button_id=YXRU5ZVBBE984"
        justifyContent="center"
        variant="primary"
        w={{ base: '35px', sm: '80px' }}
      >
        Donar
      </Button>

      <Box display={'flex'} flexDirection={{ base: 'column', md: 'row-reverse' }} gap={{ md: 4 }}>
        <Text>{userName}</Text>
        <Text fontSize={{ base: '10px', md: 'inherit' }}>Tareas Creadas: {tasks.length}</Text>
      </Box>
      <Stack direction="row">
        <IconButton
          aria-label="Color mode switcher"
          h={{ base: '25px', sm: '25px' }}
          icon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
          size={{ base: 'xs' }}
          variant="primary"
          w={{ sm: '45px' }}
          onClick={toggleColorMode}
        >
          Switch mode
        </IconButton>
        <Button
          fontSize={{ base: '12px', sm: '15px' }}
          h={{ base: '25px', sm: '25px' }}
          size="xs"
          variant="primary"
          w={{ sm: '35px' }}
          onClick={onLogout}
        >
          X
        </Button>
      </Stack>
    </Stack>
  )
}

export default Navbar
