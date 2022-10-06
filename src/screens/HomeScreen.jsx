import { Stack, Grid, GridItem } from '@chakra-ui/react'
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
      <Grid
        alignItems={{ base: 'center', xl: 'baseline' }}
        height="calc(100vh - 90px)"
        marginY="20px"
        paddingX={1}
        templateColumns={{ base: '1fr', xl: 'repeat(2, 1fr)' }}
      >
        <Stack height="50%">
          <TaskForm />
        </Stack>

        <Stack height="50%" m={4} p="14px">
          <TaskSection />
        </Stack>
      </Grid>
    </>
  )
}

export default HomeScreen
