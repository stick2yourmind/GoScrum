import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Button, Grid, GridItem, Tag, Text, useClipboard, useColorMode } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Navbar from '../components/Navbar/Navbar'
import TaskSection from '../components/TaskSection/TaskSection'
import TaskForm from '../components/TaskForm/TaskForm'
import { startGetUserTasks } from '../store/slices/tasksSlice'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const { teamID } = useSelector((state) => state.auth.userData)
  const { colorMode } = useColorMode()
  const { hasCopied, onCopy } = useClipboard(teamID)

  useEffect(() => {
    dispatch(startGetUserTasks())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <DndProvider backend={HTML5Backend}>
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
            <Tag bg={colorMode === 'light' ? 'primary.100' : 'teal.500'} mx={6} size={'lg'} variant="solid">
              <Text fontSize={{ base: '12px', sm: '15px' }}>Team ID: {teamID}</Text>
              <Button
                bg={colorMode === 'light' ? '#FAFAFA' : 'gray.900'}
                color={colorMode === 'light' ? 'primary.100' : 'white'}
                ml={5}
                p={3}
                size="xs"
                onClick={onCopy}
              >
                {hasCopied ? 'Copied' : 'Copy'}
              </Button>
            </Tag>
            <TaskForm />
          </GridItem>

          <GridItem
            bg="background.200"
            boxShadow={{ sm: 'xl' }}
            colSpan="1"
            marginBottom="20px"
            rounded="2xl"
            rowSpan="1"
          >
            <TaskSection />
          </GridItem>
        </Grid>
      </DndProvider>
    </>
  )
}

export default HomeScreen
