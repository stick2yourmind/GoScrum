import { Stack, Text, Box, Heading } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import Card from '../Card/Card'
import FilterForm from '../FilterForm/FilterForm'

const TaskSection = () => {
  const { tasks: allTasks } = useSelector((state) => state.tasks)
  const { userData } = useSelector((state) => state.auth)

  const [tasksToShow, setTasksToShow] = useState([])
  const [filter, setFilter] = useState({
    titleFilter: '',
    priorityFilter: '',
    radioFilter: 'all'
  })

  const filterTasks = () => {
    let tasks = allTasks

    if (filter.radioFilter === 'user') {
      tasks = tasks.filter((task) => task.user.userId === userData._id)
    }

    if (filter.titleFilter.length > 0) {
      tasks = tasks.filter((task) => task.title.toLowerCase().includes(filter.titleFilter.toLowerCase()))
    }

    if (filter.priorityFilter.length > 0) {
      tasks = tasks.filter((task) => task.importance.toLowerCase() === filter.priorityFilter.toLowerCase())
    }

    setTasksToShow(tasks)
  }

  const onApplyFilters = () => {
    filterTasks()
  }

  useEffect(() => {
    filterTasks()
  }, [allTasks])

  useEffect(() => {
    filterTasks()
  }, [filter])

  return (
    <Stack bg="white" boxShadow={{ sm: 'xl' }} height="100%" m={4} p="20px" rounded="2xl" width="100%">
      <Text fontSize="18px" fontWeight="semibold">
        Mis tareas
      </Text>
      <FilterForm filter={filter} setFilter={setFilter} onApplyFilters={onApplyFilters} />

      <Stack direction={{ base: 'column', md: 'row' }} height="100%">
        <Box bg="white" boxShadow="xl" flex={1} minH="100%" paddingX={2} paddingY={4} rounded="xl">
          <Heading fontSize="2xl" marginBottom={3}>
            Nuevas
          </Heading>
          {tasksToShow.length > 0
            ? tasksToShow.map((task) => {
                if (task.status === 'NEW') {
                  return <Card key={task._id} task={task} />
                }

                return null
              })
            : null}
        </Box>
        <Box bg="white" boxShadow="xl" flex={1} paddingX={2} paddingY={4} rounded="xl">
          <Heading fontSize="2xl" marginBottom={3}>
            En proceso
          </Heading>
          {tasksToShow.length > 0
            ? tasksToShow.map((task) => {
                if (task.status === 'IN PROGRESS') {
                  return <Card key={task._id} task={task} />
                }

                return null
              })
            : null}
        </Box>
        <Box bg="white" boxShadow="xl" flex={1} paddingX={2} paddingY={4} rounded="xl">
          <Heading fontSize="2xl" marginBottom={3}>
            Finalizadas
          </Heading>
          {tasksToShow.length > 0
            ? tasksToShow.map((task) => {
                if (task.status === 'FINISHED') {
                  return <Card key={task._id} task={task} />
                }

                return null
              })
            : null}
        </Box>
      </Stack>
    </Stack>
  )
}

export default TaskSection
