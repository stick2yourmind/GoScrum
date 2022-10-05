import { Stack, Text, Button, Box, Heading } from '@chakra-ui/react'
import * as dayjs from 'dayjs'
import timeZonePlugin from 'dayjs-ext/plugin/timeZone'

import Finished from './Badges/Finished'
import High from './Badges/High'
import InProgress from './Badges/InProgress'
import Low from './Badges/Low'
import Medium from './Badges/Medium'
import New from './Badges/New'

const Card = ({ task }) => {
  dayjs.extend(timeZonePlugin)

  return (
    <Box borderColor="gray.300" borderWidth="1px" mt={2} p={5} rounded="xl" shadow="md" w="100%">
      <Stack align="center" direction="row" justify="space-between">
        <Heading fontSize="15px">{task.title}</Heading>
        <Button size="xs">X</Button>
      </Stack>
      <Text fontSize="11px" fontWeight="semibold">
        {dayjs(new Date(task.createdAt)).format('DD/MM/YYYY h:mm', { timeZone: 'America/Buenos_Aires' })}
      </Text>
      <Text fontSize="14px" fontWeight="semibold">
        {task.user.userName}
      </Text>
      <Stack direction="row" flexWrap="wrap">
        {task.status === 'NEW' && <New />}
        {task.status === 'IN PROGRESS' && <InProgress />}
        {task.status === 'FINISHED' && <Finished />}
        {task.importance === 'HIGH' && <High />}
        {task.importance === 'MEDIUM' && <Medium />}
        {task.importance === 'LOW' && <Low />}
      </Stack>
      <Text mt={4}>{task.description}</Text>
      <Button
        _hover={{ color: 'primary.100', borderColor: 'primary.100', bg: 'white' }}
        bg="primary.100"
        borderColor="primary.100"
        borderWidth={1}
        color="white"
        fontWeight="bold"
        marginTop={2}
        size="xs"
      >
        Ver mas
      </Button>
    </Box>
  )
}

export default Card
