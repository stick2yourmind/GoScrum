import { Field, Formik } from 'formik'
import { Box, Input, Text, Flex, Heading, Button, Select, FormLabel, Textarea, Stack } from '@chakra-ui/react'

import { TaskSchema, loginInit } from '../../utils/schema/taskForm'

const TaskForm = () => {
  const CustomInputComponent = (props) => (
    <Input borderRadius="8px" className="form__input" type={props.type && 'text'} {...props} />
  )

  return (
    <Flex width="100%">
      <Box fontSize={16} p={6} rounded="md" w={'lg'} width="100%">
        <Heading as="h1" fontSize="24px" mb={15}>
          Crear Tarea
        </Heading>
        <Formik initialValues={loginInit} validationSchema={TaskSchema} onSubmit={(values) => console.info(values)}>
          {({ errors, touched, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <FormLabel fontSize="15px">Crea tus tareas</FormLabel>
              <Stack align="center" direction={{ base: 'column', md: 'row' }} width="100%">
                <Stack width="100%">
                  <Field as={CustomInputComponent} name="title" placeholder="Título" type="text" />
                  {errors.title && touched.title && (
                    <Box className="error" pt={2}>
                      <Text color="tomato">{errors.title}</Text>
                    </Box>
                  )}
                </Stack>
                <Stack width="100%">
                  <Field as={Select} borderRadius="8px" name="state" placeholder="Selecciona un estado">
                    <option value="nueva">Nueva</option>
                    <option value="desarrollando">En desarrollo</option>
                    <option value="finalizada">Finalizado</option>
                  </Field>

                  {errors.state && touched.state && (
                    <Box className="error" pt={2}>
                      <Text color="tomato">{errors.state}</Text>
                    </Box>
                  )}
                </Stack>
                <Stack width="100%">
                  <Field as={Select} borderRadius="8px" name="priority" placeholder="Selecciona una prioridad">
                    <option value="alta">Alta</option>
                    <option value="media">Media</option>
                    <option value="baja">Baja</option>
                  </Field>
                  {errors.priority && touched.priority && (
                    <Box className="error" pt={2}>
                      <Text color="tomato">{errors.priority}</Text>
                    </Box>
                  )}
                </Stack>
              </Stack>
              <Field as={Textarea} h={140} mt={4} name="description" placeholder="Descripción" type="text" />
              {errors.description && touched.description && (
                <Box className="error" pt={2}>
                  <Text color="tomato">{errors.description}</Text>
                </Box>
              )}
              <Button
                _hover={{
                  bg: 'background.300',
                  color: 'primary.100',
                  borderColor: 'primary.100',
                  border: '2px'
                }}
                bg="primary.100"
                border="2px"
                borderColor="primary.100"
                color="background.300"
                marginTop={2}
                size="sm"
                type="submit"
                width="80px"
              >
                Crear
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  )
}

export default TaskForm
