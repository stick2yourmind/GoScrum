import { Stack, Text, Button, Heading, Container, useDisclosure, useToast } from '@chakra-ui/react'
import * as dayjs from 'dayjs'
import timeZonePlugin from 'dayjs-ext/plugin/timeZone'
import { useDrag } from 'react-dnd'
import { useDispatch } from 'react-redux'

import tasksApi from '../../api/tasksApi'
import { startGetUserTasks } from '../../store/slices/tasksSlice'
import { TaskEditModal } from '../TaskEditModal/TaskEditModal'

import Finished from './Badges/Finished'
import High from './Badges/High'
import InProgress from './Badges/InProgress'
import Low from './Badges/Low'
import Medium from './Badges/Medium'
import New from './Badges/New'

const Card = ({ task }) => {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const [{ isDragging }, drag] = useDrag(() => ({
    type: `card_${task.status}`,
    item: task,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()

      if (dropResult) {
        if (dropResult.name === 'newBox' && item.status !== 'NEW') {
          modifyTaskStatus(task._id, task.title, task.importance, 'NEW', task.description)

          toast({
            title: 'Operación exitosa!',
            description: 'Se cambio a: "Nuevas"',
            status: 'success',
            duration: 2500,
            position: 'top-right',
            isClosable: true
          })
        }
        if (dropResult.name === 'inProgressBox' && item.status !== 'IN PROGRESS') {
          modifyTaskStatus(task._id, task.title, task.importance, 'IN PROGRESS', task.description)

          toast({
            title: 'Operación exitosa!',
            description: 'Se cambio a: "En progreso"',
            status: 'success',
            duration: 2500,
            position: 'top-right',
            isClosable: true
          })
        }
        if (dropResult.name === 'finishedBox' && item.status !== 'FINISHED') {
          modifyTaskStatus(task._id, task.title, task.importance, 'FINISHED', task.description)

          toast({
            title: 'Operación exitosa!',
            description: 'Se cambio a: "Finalizadas"',
            status: 'success',
            duration: 2500,
            position: 'top-right',
            isClosable: true
          })
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId()
    })
  }))

  dayjs.extend(timeZonePlugin)

  const modifyTaskStatus = async (id, title, importance, status, description) => {
    try {
      const resp = await tasksApi.patch(`/task/${id}`, {
        task: {
          title,
          importance,
          status,
          description
        }
      })

      if (resp.status === 200) {
        dispatch(startGetUserTasks())
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Algo salió mal',
        status: 'error',
        duration: 2500,
        position: 'top-right',
        isClosable: true
      })
    }
  }

  const deleteTask = async (id) => {
    try {
      const resp = await tasksApi.delete(`/task/${id}`)

      if (resp.status === 200) {
        dispatch(startGetUserTasks())
      }

      toast({
        title: 'Operación exitosa!',
        description: 'Se eliminó correctamente',
        status: 'success',
        duration: 2500,
        position: 'top-right',
        isClosable: true
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Algo salió mal',
        status: 'error',
        duration: 2500,
        position: 'top-right',
        isClosable: true
      })
    }
  }

  return (
    <>
      <Container
        ref={drag}
        bgColor="#FAFAFA"
        borderColor="gray.300"
        borderWidth="1px"
        flex={1}
        mt={2}
        opacity={isDragging ? '0.5' : '1'}
        paddingY={2}
        rounded="xl"
        shadow="md"
      >
        <Stack align="center" direction="row" justify="space-between">
          <Heading fontSize="15px">{task.title}</Heading>
          <Button size="xs" onClick={() => deleteTask(task._id)}>
            X
          </Button>
        </Stack>
        <Text fontSize="11px" fontWeight="semibold">
          {dayjs(new Date(task.createdAt)).format('DD/MM/YYYY h:mm', { timeZone: 'America/Buenos_Aires' })}
        </Text>
        <Text fontSize="14px" fontWeight="semibold">
          {task.user.userName}
        </Text>
        <Stack direction="row" flexWrap="wrap" mt={2}>
          {task.status === 'NEW' && <New />}
          {task.status === 'IN PROGRESS' && <InProgress />}
          {task.status === 'FINISHED' && <Finished />}
          {task.importance === 'HIGH' && <High />}
          {task.importance === 'MEDIUM' && <Medium />}
          {task.importance === 'LOW' && <Low />}
        </Stack>
        <Text my={2}>{task.description}</Text>
        <Button
          _hover={{ color: 'primary.100', borderColor: 'primary.100', bg: 'white' }}
          bg="primary.100"
          borderColor="primary.100"
          borderWidth={1}
          color="white"
          fontWeight="bold"
          size="xs"
          onClick={onOpen}
        >
          Ver mas
        </Button>
      </Container>
      <TaskEditModal isOpen={isOpen} task={task} onClose={onClose} />
    </>
  )
}

export default Card
