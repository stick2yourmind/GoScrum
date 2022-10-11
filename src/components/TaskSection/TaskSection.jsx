import { Stack, Text, useColorMode, useMediaQuery } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import Card from '../Card/Card'
import { CardsContainer } from '../CardsContainer/CardsContainer'
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
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)')
  const { colorMode } = useColorMode()

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

  useEffect(() => {
    filterTasks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTasks])

  useEffect(() => {
    filterTasks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  return (
    <Stack
      bg={{ base: colorMode === 'light' ? 'white' : 'gray.800', sm: colorMode === 'light' ? 'white' : 'gray.900' }}
      gap={2}
      height={{ xl: '88vh' }}
      overflowY="auto"
      p={6}
      rounded="xl"
      width="100%"
    >
      <Text fontSize="18px" fontWeight="semibold">
        Mis tareas
      </Text>
      <FilterForm filter={filter} setFilter={setFilter} />

      {isLargerThan768 ? (
        <Stack direction={{ base: 'column', md: 'row' }}>
          <CardsContainer status="new" tasks={tasksToShow.filter((task) => task.status === 'NEW')} />
          <CardsContainer status="inProgress" tasks={tasksToShow.filter((task) => task.status === 'IN PROGRESS')} />
          <CardsContainer status="finished" tasks={tasksToShow.filter((task) => task.status === 'FINISHED')} />
        </Stack>
      ) : tasksToShow.length > 0 ? (
        <Stack align={'center'} direction={'column'} justify="center">
          {tasksToShow.map((task) => (
            <Card key={task._id} task={task} />
          ))}
        </Stack>
      ) : null}
    </Stack>
  )
}

export default TaskSection
