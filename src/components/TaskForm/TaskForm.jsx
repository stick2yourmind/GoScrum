import { Field, Formik } from 'formik'
import { Box, Input, Text, Heading, Button, Select, FormLabel, Textarea, Stack } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { TaskSchema, loginInit } from '../../utils/schema/taskForm'
import { startGettingInputData, startGetUserTasks } from '../../store/slices/tasksSlice'
import tasksApi from '../../api/tasksApi'

const CustomInputComponent = (props) => (
  <Input borderRadius="8px" className="form__input" type={props.type && 'text'} {...props} />
)

const TaskForm = () => {
  const { inputData } = useSelector((state) => state.tasks)
  const dispatch = useDispatch()

  const postTask = async (values) => {
    const newTask = {
      title: values.title,
      importance: values.priority,
      status: values.status,
      description: values.description
    }

    try {
      const resp = await tasksApi.post('/task', {
        task: newTask
      })

      if (resp.status === 201) {
        dispatch(startGetUserTasks())
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = (values) => {
    postTask(values)
  }

  useEffect(() => {
    dispatch(startGettingInputData())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Stack fontSize={16} heigth="50%" p={6} rounded="md" w={'lg'} width="100%">
      <Heading as="h1" fontSize="24px" mb={15}>
        Crear Tarea
      </Heading>
      <Formik initialValues={loginInit} validationSchema={TaskSchema} onSubmit={handleSubmit}>
        {({ errors, touched, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <FormLabel fontSize="15px">Crea tus tareas</FormLabel>
            <Stack align="flex-start" direction={{ base: 'column', md: 'row' }} width="100%">
              <Stack width="100%">
                <Field as={CustomInputComponent} name="title" placeholder="Título" type="text" />
                {errors.title && touched.title && (
                  <Box className="error">
                    <Text color="tomato">{errors.title}</Text>
                  </Box>
                )}
              </Stack>
              <Stack width="100%">
                <Field as={Select} borderRadius="8px" name="status" placeholder="Selecciona un estado">
                  {!!inputData
                    ? inputData.status.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))
                    : null}
                </Field>

                {errors.status && touched.status && (
                  <Box className="error">
                    <Text color="tomato">{errors.status}</Text>
                  </Box>
                )}
              </Stack>
              <Stack width="100%">
                <Field as={Select} borderRadius="8px" name="priority" placeholder="Selecciona una prioridad">
                  {!!inputData
                    ? inputData.importance.map((imp) => (
                        <option key={imp} value={imp}>
                          {imp}
                        </option>
                      ))
                    : null}
                </Field>
                {errors.priority && touched.priority && (
                  <Box className="error">
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
              marginTop={4}
              size="sm"
              type="submit"
              width="80px"
            >
              Crear
            </Button>
          </form>
        )}
      </Formik>
    </Stack>
  )
}

export default TaskForm
