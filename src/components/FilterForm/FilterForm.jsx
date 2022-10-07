import { Stack, Radio, RadioGroup, Input, Select } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import useDebouncer from '../../hooks/useDebouncer'

const FilterForm = ({ setFilter, filter }) => {
  const [title, setTitle] = useState('')
  const debouncedTitleFilter = useDebouncer(title, 500)

  const onRadioChange = (value) => {
    setFilter({ ...filter, radioFilter: value })
  }

  const onTitleFilterChange = (value) => {
    setFilter({ ...filter, titleFilter: value })
  }

  const onPriorityFilterChange = (e) => {
    setFilter({ ...filter, priorityFilter: e.target.value })
  }

  useEffect(() => {
    onTitleFilterChange(debouncedTitleFilter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTitleFilter])

  return (
    <Stack align="center" direction={{ base: 'column', sm: 'row' }}>
      <Stack w="100%">
        <RadioGroup
          colorScheme="orange"
          size="md"
          value={filter.radioFilter}
          onChange={(value) => {
            onRadioChange(value)
            setTitle('')
          }}
        >
          <Stack direction="row">
            <Radio value="all">Todas</Radio>
            <Radio value="user">Mis tareas</Radio>
          </Stack>
        </RadioGroup>
      </Stack>
      <Input placeholder="Filtrar por titulo..." size="md" value={title} onChange={(e) => setTitle(e.target.value)} />
      <Select value={filter.priorityFilter} onChange={(e) => onPriorityFilterChange(e)}>
        <option value="">Seleccionar una prioridad</option>
        <option value="HIGH">Alta</option>
        <option value="MEDIUM">Media</option>
        <option value="LOW">Baja</option>
      </Select>
    </Stack>
  )
}

export default FilterForm
