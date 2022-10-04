import { Stack, Text, Box, Heading } from '@chakra-ui/react'

import { tasksData } from '../../mocks/tasksData'
import Card from '../Card/Card'
import FilterForm from '../FilterForm/FilterForm'

const TaskSection = () => {
  const newTasks = tasksData.filter((task) => task.taskData.status === 'new')
  const inprogressTasks = tasksData.filter((task) => task.taskData.status === 'in progress')
  const finishedTasks = tasksData.filter((task) => task.taskData.status === 'finished')

  return (
    <Stack bg="white" boxShadow={{ sm: 'xl' }} height="100%" m={4} p="20px" rounded="2xl" width="100%">
      <Text fontSize="18px" fontWeight="semibold">
        Mis tareas
      </Text>
      <FilterForm />

      <Stack direction={{ base: 'column', md: 'row' }}>
        <Box bg="white" boxShadow="xl" paddingX={2} paddingY={4} rounded="xl">
          <Heading fontSize="2xl" marginBottom={3}>
            Nuevas
          </Heading>
          {newTasks.map((task) => (
            <Card key={task.id} task={task} />
          ))}
        </Box>
        <Box bg="white" boxShadow="xl" paddingX={2} paddingY={4} rounded="xl">
          <Heading fontSize="2xl" marginBottom={3}>
            En proceso
          </Heading>
          {inprogressTasks.map((task) => (
            <Card key={task.id} task={task} />
          ))}
        </Box>
        <Box bg="white" boxShadow="xl" paddingX={2} paddingY={4} rounded="xl">
          <Heading fontSize="2xl" marginBottom={3}>
            Finalizadas
          </Heading>
          {finishedTasks.map((task) => (
            <Card key={task.id} task={task} />
          ))}
        </Box>
      </Stack>
    </Stack>
  )
}

export default TaskSection
