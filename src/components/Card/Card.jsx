import { Stack, Text, Button, Heading, Container, useDisclosure, useToast, useColorMode } from '@chakra-ui/react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timeZonePlugin from 'dayjs/plugin/timezone'
import { useDrag } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'

import tasksApi from '../../api/tasksApi'
import { deleteTask, editTaskStatus } from '../../store/slices/tasksSlice'
import { TaskEditModal } from '../TaskEditModal/TaskEditModal'

import Finished from './Badges/Finished'
import High from './Badges/High'
import InProgress from './Badges/InProgress'
import Low from './Badges/Low'
import Medium from './Badges/Medium'
import New from './Badges/New'

dayjs.extend(utc)
dayjs.extend(timeZonePlugin)

const Card = ({ task }) => {
  const dispatch = useDispatch()
  const toast = useToast()
  const { userData } = useSelector((state) => state.auth)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode } = useColorMode()

  const [{ isDragging }, drag] = useDrag(() => ({
    type: `card_${task.status}`,
    item: task,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()

      if (userData.role !== 'Team Leader' && item.user.userName !== userData.userName) {
        return toast({
          title: 'Error!',
          description: 'No tienes los permisos para esta accion',
          status: 'error',
          duration: 2500,
          position: 'top-right',
          isClosable: true
        })
      }

      if (dropResult) {
        if (dropResult.name === 'newBox' && item.status !== 'NEW') {
          modifyTaskStatus(item._id, item.title, item.importance, 'NEW', item.description)

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
          modifyTaskStatus(item._id, item.title, item.importance, 'IN PROGRESS', item.description)

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
          modifyTaskStatus(item._id, item.title, item.importance, 'FINISHED', item.description)

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
        dispatch(
          editTaskStatus({
            id,
            status
          })
        )
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

  const onDelete = async (id) => {
    try {
      if (userData.role !== 'Team Leader' && task.user.userName !== userData.userName) {
        return toast({
          title: 'Error!',
          description: 'No tienes los permisos para esta accion',
          status: 'error',
          duration: 2500,
          position: 'top-right',
          isClosable: true
        })
      }

      const resp = await tasksApi.delete(`/task/${id}`)

      if (resp.status === 200) {
        dispatch(deleteTask({ id }))
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
        bgColor={colorMode === 'light' ? '#FAFAFA' : 'gray.900'}
        borderColor={colorMode === 'light' ? 'gray.300' : 'teal.500'}
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
          <Button size="xs" variant="primary" width="10px" onClick={() => onDelete(task._id)}>
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
        <Button fontWeight="bold" size="xs" variant="primary" width="60px" onClick={onOpen}>
          Ver mas
        </Button>
      </Container>
      <TaskEditModal isOpen={isOpen} task={task} onClose={onClose} />
    </>
  )
}

export default Card
