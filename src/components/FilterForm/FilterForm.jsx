import { Stack, Radio, RadioGroup, Input, Select } from '@chakra-ui/react'
import { useState } from 'react'

const FilterForm = () => {
  const [titleFilter, setTitleFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  const [radioFilter, setRadioFilter] = useState('all')

  const onRadioChange = (value) => {
    setRadioFilter(value)
  }

  const onTitleFilterChange = (e) => {
    setTitleFilter(e.target.value)
  }

  const onPriorityFilterChange = (e) => {
    setPriorityFilter(e.target.value)
  }

  return (
    <Stack align="center" direction={{ base: 'column', sm: 'row' }}>
      <Stack w="100%">
        <RadioGroup colorScheme="orange" size="md" value={radioFilter} onChange={onRadioChange}>
          <Stack direction="row">
            <Radio value="all">Todas</Radio>
            <Radio value="user">Mis tareas</Radio>
          </Stack>
        </RadioGroup>
      </Stack>
      <Input placeholder="Seleccionar por titulo..." size="md" value={titleFilter} onChange={onTitleFilterChange} />
      <Select value={priorityFilter} onChange={(e) => onPriorityFilterChange(e)}>
        <option value="">Seleccionar una prioridad</option>
        <option value="alta">Alta</option>
        <option value="media">Media</option>
        <option value="baja">Baja</option>
      </Select>
    </Stack>
  )
}

export default FilterForm
