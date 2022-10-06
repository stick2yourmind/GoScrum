import { Stack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Navbar from '../components/Navbar/Navbar'
import TaskSection from '../components/TaskSection/TaskSection'
import TaskForm from '../components/TaskForm/TaskForm'
import { startGetUserTasks } from '../store/slices/tasksSlice'

const HomeScreen = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startGetUserTasks())
  }, [])

  return (
    <>
      <Navbar />
      <Stack direction={{ base: 'column', xl: 'row' }} height="calc(100vh - 90px)" marginY="20px" paddingX={1}>
        <TaskForm />
        <Stack m={4} p="14px">
          <TaskSection />
        </Stack>
      </Stack>
    </>
  )
}

export default HomeScreen
