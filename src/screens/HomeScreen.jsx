import { Stack } from '@chakra-ui/react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import Navbar from '../components/Navbar/Navbar'
import TaskSection from '../components/TaskSection/TaskSection'
import TaskForm from '../components/TaskForm/TaskForm'

const HomeScreen = () => {
  return (
    <>
      <Navbar />
      <Stack direction={{ base: 'column', xl: 'row' }} height="calc(100vh - 90px)" marginY="20px" paddingX={1}>
        <TaskForm />
        <DndProvider backend={HTML5Backend}>
          <TaskSection />
        </DndProvider>
      </Stack>
    </>
  )
}

export default HomeScreen
