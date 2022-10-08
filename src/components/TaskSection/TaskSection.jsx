import { Stack, Text, Box, Heading } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDrop } from 'react-dnd'
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

  const [{ canDropNew }, dropNew] = useDrop(() => ({
    accept: ['card_IN PROGRESS', 'card_FINISHED'],
    drop: () => ({ name: 'newBox' }),
    collect: (monitor) => ({
      canDropNew: monitor.canDrop()
    })
  }))

  const [{ canDropIP }, dropInProgress] = useDrop(() => ({
    accept: ['card_NEW', 'card_FINISHED'],
    drop: () => ({ name: 'inProgressBox' }),
    collect: (monitor) => ({
      canDropIP: monitor.canDrop()
    })
  }))

  const [{ canDropFinished }, dropFinished] = useDrop(() => ({
    accept: ['card_NEW', 'card_IN PROGRESS'],
    drop: () => ({ name: 'finishedBox' }),

    collect: (monitor) => ({
      canDropFinished: monitor.canDrop()
    })
  }))

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
    <Stack gap={2} height={{ xl: '88vh' }} overflowY="scroll" p="12px" width="100%">
      <Text fontSize="18px" fontWeight="semibold">
        Mis tareas
      </Text>
      <FilterForm filter={filter} setFilter={setFilter} />

      <Stack direction={{ base: 'column', md: 'row' }}>
        <Box
          ref={dropNew}
          bg="white"
          border="2px"
          borderColor={canDropNew ? '#08FF08' : 'transparent'}
          boxShadow="2xl"
          flex={1}
          overflow="hidden"
          paddingBottom={10}
          paddingTop={2}
          paddingX={2}
          rounded="xl"
        >
          <Heading fontSize="2xl">Nuevas</Heading>
          {tasksToShow.length > 0
            ? tasksToShow.map((task) => {
                if (task.status === 'NEW') {
                  return <Card key={task._id} task={task} />
                }

                return null
              })
            : null}
        </Box>
        <Box
          ref={dropInProgress}
          bg="white"
          border="2px"
          borderColor={canDropIP ? '#08FF08' : 'transparent'}
          boxShadow="2xl"
          flex={1}
          height="100%"
          paddingBottom={10}
          paddingTop={2}
          paddingX={2}
          rounded="xl"
        >
          <Heading fontSize="2xl">En Proceso</Heading>
          {tasksToShow.length > 0
            ? tasksToShow.map((task) => {
                if (task.status === 'IN PROGRESS') {
                  return <Card key={task._id} task={task} />
                }

                return null
              })
            : null}
        </Box>
        <Box
          ref={dropFinished}
          bg="white"
          border="2px"
          borderColor={canDropFinished ? '#08FF08' : 'transparent'}
          boxShadow="2xl"
          flex={1}
          height="100%"
          paddingBottom={10}
          paddingTop={2}
          paddingX={2}
          rounded="xl"
        >
          <Heading fontSize="2xl">Finalizadas</Heading>
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
