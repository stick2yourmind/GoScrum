import { Stack, Text, Button, Box, Heading, Badge } from '@chakra-ui/react'

const Card = () => {
  return (
    <Box borderColor="gray.300" borderWidth="1px" p={5} rounded="xl" shadow="md" w="100%">
      <Stack align="center" direction="row" justify="space-between">
        <Heading fontSize="15px">Hola</Heading>
        <Button size="xs">X</Button>
      </Stack>
      <Text fontSize="11px" fontWeight="semibold">
        6/3/2022, 1:44:26 hs.
      </Text>
      <Text fontSize="14px" fontWeight="semibold">
        User
      </Text>
      <Stack direction="row" flexWrap="wrap">
        <Badge bg="badges.new" color="white" fontSize="10px" rounded="md" size="sm">
          Default
        </Badge>
        <Badge bg="badges.inprogress" color="black" fontSize="10px" rounded="md" size="sm">
          In progress
        </Badge>
      </Stack>
      <Text mt={4}>Lorem IpsiumLorem IpsiumLorem IpsiumLorem IpsiumLorem</Text>
      <Button
        _hover={{ color: 'primary.100', borderColor: 'primary.100', bg: 'white' }}
        bg="primary.100"
        borderColor="primary.100"
        borderWidth={1}
        color="white"
        fontWeight="bold"
        marginTop={2}
        size="xs"
      >
        Ver mas
      </Button>
    </Box>
  )
}

export default Card
