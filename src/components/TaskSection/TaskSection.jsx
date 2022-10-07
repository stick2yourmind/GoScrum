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

  const [{ canDrop: canDropNew, isOver: isOverNew }, dropNew] = useDrop(() => ({
    accept: 'card',
    drop: () => ({ name: 'newBox' }),
    hover: (item) => item.status !== 'NEW',
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop()
    })
  }))

  useEffect(() => {
    console.log(isOverNew)
  }, [isOverNew])

  const [{}, dropInProgress] = useDrop(() => ({
    accept: 'card',
    drop: () => ({ name: 'inProgressBox' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }))

  const [{}, dropFinished] = useDrop(() => ({
    accept: 'card',
    drop: () => ({ name: 'finishedBox' }),

    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
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

      <Stack direction={{ base: 'column', md: 'row' }} height="100%">
        <Box
          ref={dropNew}
          bg="white"
          border={isOverNew ? '1px solid red' : '1px solid #08FF08'}
          boxShadow="xl"
          flex={1}
          height="max-content"
          paddingBottom={10}
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
          boxShadow="xl"
          flex={1}
          height="max-content"
          paddingBottom={10}
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
          boxShadow="xl"
          flex={1}
          height="max-content"
          paddingBottom={10}
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
