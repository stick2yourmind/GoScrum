import { Spacer, Image, Stack, Button, Text } from '@chakra-ui/react'

import Logo from '../assets/GoScrum.png'

const Navbar = () => {
  return (
    <Stack
      align="center"
      bg="#FFFFFF"
      boxShadow="2xl"
      direction="row"
      fontSize="15px"
      fontWeight="semibold"
      h="50px"
      paddingX="20px"
      spacing={10}
    >
      <Image alt="GoScrum Logo" h="20px" src={Logo} w="80px" />
      <Spacer />
      <Button
        _hover={{ bg: 'white', color: 'primary.100', border: '2px', borderColor: 'primary.100' }}
        bg="primary.100"
        border="2px"
        borderColor="primary.100"
        boxShadow="dark-lg"
        color="white"
        h="25px"
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
        h="35px"
      >
        X
      </Button>
    </Stack>
  )
}

export default Navbar
