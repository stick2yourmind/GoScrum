import { Heading, Skeleton, useColorMode } from '@chakra-ui/react'
import { useDrop } from 'react-dnd'
import { useSelector } from 'react-redux'

import Card from '../Card/Card'

const statusConfig = {
  new: {
    heading: 'Nuevas',
    accept: ['card_IN PROGRESS', 'card_FINISHED'],
    drop: () => ({ name: 'newBox' })
  },
  inProgress: {
    heading: 'En Progreso',
    accept: ['card_NEW', 'card_FINISHED'],
    drop: () => ({ name: 'inProgressBox' })
  },
  finished: {
    heading: 'Finalizadas',
    accept: ['card_NEW', 'card_IN PROGRESS'],
    drop: () => ({ name: 'finishedBox' })
  }
}

export const CardsContainer = ({ tasks, status }) => {
  const { loading } = useSelector((state) => state.tasks)
  const { colorMode } = useColorMode()

  const [{ canDrop }, drop] = useDrop(() => ({
    accept: statusConfig[status].accept,
    drop: statusConfig[status].drop,
    collect: (monitor) => ({
      canDrop: monitor.canDrop()
    })
  }))

  return (
    <Skeleton
      ref={drop}
      bg={colorMode === 'light' ? 'white' : 'gray.800'}
      border="2px"
      borderColor={canDrop ? '#08FF08' : 'transparent'}
      boxShadow="2xl"
      endColor={colorMode === 'light' ? 'gray.300' : 'gray.700'}
      flex={1}
      isLoaded={!loading}
      minHeight="70vh"
      overflow="hidden"
      paddingBottom={10}
      paddingTop={2}
      paddingX={2}
      rounded="xl"
      startColor={colorMode === 'light' ? 'primary.100' : 'gray.900'}
    >
      <Heading fontSize="2xl">{statusConfig[status].heading}</Heading>
      {tasks.length > 0 ? tasks.map((task) => <Card key={task._id} task={task} />) : null}
    </Skeleton>
  )
}
