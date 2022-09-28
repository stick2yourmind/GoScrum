import { Spacer, Image, Stack, Button, Text } from '@chakra-ui/react'

import Logo from '../assets/GoScrum.png'

const Navbar = () => {
  return (
    <Stack
      align="center"
      bg="#FFFFFF"
      boxShadow="2xl"
      direction="row"
      fontSize={{ base: '13px', sm: '15px' }}
      fontWeight="semibold"
      h="50px"
      paddingX={{ base: '5px', sm: '20px' }}
      spacing={{ base: 2, sm: 10 }}
    >
      <Image alt="GoScrum Logo" h={{ base: '15px', sm: '20px' }} src={Logo} w={{ base: '60px', sm: '80px' }} />
      <Spacer />
      <Button
        _hover={{ bg: 'white', color: 'primary.100', border: '2px', borderColor: 'primary.100' }}
        bg="primary.100"
        border="2px"
        borderColor="primary.100"
        boxShadow="dark-lg"
        color="white"
        fontSize={{ base: '12px', sm: '15px' }}
        h={{ base: '15px', sm: '25px' }}
        w={{ base: '35px', sm: '80px' }}
      >
        Donar
      </Button>
      <Text>Tareas Creadas: 3</Text>
      <Text>User</Text>
      <Button
        _hover={{ bg: 'white', color: 'primary.100', border: '2px', borderColor: 'primary.100' }}
        bg="primary.100"
        border="2px"
        borderColor="primary.100"
        boxShadow="dark-lg"
        color="white"
        fontSize={{ base: '12px', sm: '15px' }}
        h={{ base: '15px', sm: '25px' }}
        size="xs"
        w={{ sm: '35px' }}
      >
        X
      </Button>
    </Stack>
  )
}

export default Navbar
