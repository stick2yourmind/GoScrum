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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Navbar />
      <Grid
        alignItems={{ base: 'center', xl: 'baseline' }}
        height="calc(100vh - 90px)"
        marginY="20px"
        paddingX={1}
        templateColumns={{ xl: 'repeat(2, 1fr)' }}
        templateRows={{ base: 'repeat(2, 1fr)' }}
      >
        <GridItem colSpan="1" rowSpan="1">
          <TaskForm />
        </GridItem>

        <GridItem colSpan="1" height={{ xl: '34%' }} p="14px" rowSpan="1">
          <TaskSection />
        </GridItem>
      </Grid>
    </>
  )
}

export default HomeScreen
