import { Stack, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

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
    <Stack gap={2} height={{ xl: '88vh' }} overflowY="scroll" p={6} width="100%">
      <Text fontSize="18px" fontWeight="semibold">
        Mis tareas
      </Text>
      <FilterForm filter={filter} setFilter={setFilter} />

      <Stack direction={{ base: 'column', md: 'row' }}>
        <CardsContainer status="new" tasks={tasksToShow.filter((task) => task.status === 'NEW')} />
        <CardsContainer status="inProgress" tasks={tasksToShow.filter((task) => task.status === 'IN PROGRESS')} />
        <CardsContainer status="finished" tasks={tasksToShow.filter((task) => task.status === 'FINISHED')} />
      </Stack>
    </Stack>
  )
}

export default TaskSection
