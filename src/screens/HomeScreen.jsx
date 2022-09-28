import { Stack } from '@chakra-ui/react'

import Navbar from '../components/Navbar'
import TaskSection from '../components/TaskSection'
import TaskForm from '../components/TaskForm/TaskForm'

const HomeScreen = () => {
  return (
    <>
      <Navbar />
      <Stack direction={{ base: 'column', xl: 'row' }} height="calc(100vh - 90px)" marginY="20px" paddingX={1}>
        <TaskForm />
        <TaskSection />
      </Stack>
    </>
  )
}

export default HomeScreen
