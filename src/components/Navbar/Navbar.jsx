import { Spacer, Image, Stack, Button, Text, Box, Link } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'

import Logo from '../../assets/GoScrum.png'
import { logoutUser } from '../../store/slices/authSlice'

const Navbar = () => {
  const dispatch = useDispatch()
  const { userName } = useSelector((state) => state.auth.userData)
  const { tasks } = useSelector((state) => state.tasks)

  const onLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <Stack
      align="center"
      bg="#FFFFFF"
      boxShadow="md"
      direction="row"
      fontSize={{ base: '13px', md: '15px' }}
      fontWeight="semibold"
      h="50px"
      paddingX={{ base: '5px', md: '20px' }}
      spacing={{ base: 4, md: 10 }}
    >
      <Image alt="GoScrum Logo" h={{ base: '15px', sm: '20px' }} src={Logo} w={{ base: '50px', sm: '80px' }} />
      <Spacer />
      <Link
        isExternal
        _hover={{
          bg: 'white',
          color: 'primary.100',
          border: '2px',
          borderColor: 'primary.100'
        }}
        alignItems="center"
        bg="primary.100"
        border="2px"
        borderColor="primary.100"
        borderRadius="md"
        boxShadow="dark-lg"
        color="white"
        display="flex"
        fontSize={{ base: '12px', sm: '15px' }}
        h={{ base: '25px', sm: '25px' }}
        href="https://www.paypal.com/donate/?hosted_button_id=YXRU5ZVBBE984"
        justifyContent="center"
        w={{ base: '35px', sm: '80px' }}
      >
        Donar
      </Link>
      <Box display={'flex'} flexDirection={{ base: 'column', md: 'row-reverse' }} gap={{ md: 4 }}>
        <Text>{userName}</Text>
        <Text fontSize={{ base: '10px', md: 'inherit' }}>Tareas Creadas: {tasks.length}</Text>
      </Box>
      <Button
        _hover={{
          bg: 'white',
          color: 'primary.100',
          border: '2px',
          borderColor: 'primary.100'
        }}
        bg="primary.100"
        border="2px"
        borderColor="primary.100"
        boxShadow="dark-lg"
        color="white"
        fontSize={{ base: '12px', sm: '15px' }}
        h={{ base: '25px', sm: '25px' }}
        size="xs"
        w={{ sm: '35px' }}
        onClick={onLogout}
      >
        X
      </Button>
    </Stack>
  )
}

export default Navbar
