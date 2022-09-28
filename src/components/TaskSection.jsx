import { Stack, Text, Box, Flex, Heading } from '@chakra-ui/react'

import Card from './Card'
import FilterForm from './FilterForm'

const TaskSection = () => {
  return (
    <Stack bg={{ base: 'white', sm: 'background.200' }} boxShadow={{ sm: 'xl' }} m={4} p="20px" rounded="2xl">
      <Text fontSize="18px" fontWeight="semibold">
        Mis tareas
      </Text>
      <FilterForm />

      <Stack direction={{ base: 'column', md: 'row' }}>
        <Box bg="white" boxShadow="xl" paddingX={2} paddingY={4} rounded="xl">
          <Heading fontSize="2xl" marginBottom={3}>
            Nuevas
          </Heading>
          <Card />
        </Box>
        <Box bg="white" boxShadow="xl" paddingX={2} paddingY={4} rounded="xl">
          <Heading fontSize="2xl" marginBottom={3}>
            En proceso
          </Heading>
          <Card />
        </Box>
        <Box bg="white" boxShadow="xl" paddingX={2} paddingY={4} rounded="xl">
          <Heading fontSize="2xl" marginBottom={3}>
            Finalizadas
          </Heading>
          <Card />
        </Box>
      </Stack>
    </Stack>
  )
}

export default TaskSection
