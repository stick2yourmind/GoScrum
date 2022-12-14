import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  Textarea,
  useToast
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import tasksApi from '../../api/tasksApi'
import { editTask } from '../../store/slices/tasksSlice'
import { TaskSchema } from '../../utils/schema/taskForm'

const CustomInputComponent = (props) => (
  <Input borderRadius="8px" className="form__input" type={props.type && 'text'} {...props} />
)

export const TaskEditModal = ({ isOpen, onClose, task }) => {
  const { inputData } = useSelector((state) => state.tasks)
  const { userData } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const initialRef = useRef(null)
  const toast = useToast()

  const onSubmitTask = async (values) => {
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

      const resp = await tasksApi.patch(`/task/${task._id}`, {
        task: {
          title: values.title,
          importance: values.priority,
          status: values.status,
          description: values.description
        }
      })

      if (resp.status === 200) {
        dispatch(
          editTask({
            id: task._id,
            title: values.title,
            importance: values.priority,
            status: values.status,
            description: values.description
          })
        )
        onClose()
      }

      toast({
        title: 'Operación exitosa!',
        description: 'Se editó correctamente',
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
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <Formik
          initialValues={{
            title: task.title,
            priority: task.importance,
            status: task.status,
            description: task.description
          }}
          validationSchema={TaskSchema}
          onSubmit={(values) => {
            onSubmitTask(values)
          }}
        >
          {({ errors, touched }) => (
            <ModalContent>
              <ModalHeader>Editar Tarea</ModalHeader>
              <ModalCloseButton />
              <Form>
                <ModalBody pb={6}>
                  <Box fontSize={16} p={1} rounded="md" width="100%">
                    <FormControl>
                      <Flex direction="column" gap={4}>
                        <Field
                          as={CustomInputComponent}
                          isDisabled={userData.role !== 'Team Leader' && task.user.userName !== userData.userName}
                          name="title"
                          placeholder="Título"
                          type="text"
                        />
                        {errors.title && touched.title && (
                          <Box className="error">
                            <Text color="tomato">{errors.title}</Text>
                          </Box>
                        )}
                        <Field
                          as={Select}
                          borderRadius="8px"
                          isDisabled={userData.role !== 'Team Leader' && task.user.userName !== userData.userName}
                          name="status"
                          placeholder="Selecciona un estado"
                        >
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
                        <Field
                          as={Select}
                          borderRadius="8px"
                          isDisabled={userData.role !== 'Team Leader' && task.user.userName !== userData.userName}
                          name="priority"
                          placeholder="Selecciona una prioridad"
                        >
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
                        <Field
                          as={Textarea}
                          h={140}
                          isDisabled={userData.role !== 'Team Leader' && task.user.userName !== userData.userName}
                          mt={4}
                          name="description"
                          placeholder="Descripción"
                          type="text"
                        />
                        {errors.description && touched.description && (
                          <Box className="error" pt={2}>
                            <Text color="tomato">{errors.description}</Text>
                          </Box>
                        )}
                      </Flex>
                    </FormControl>
                  </Box>
                </ModalBody>

                <ModalFooter gap={4} justifyContent="end">
                  <Button
                    disabled={userData.role !== 'Team Leader' && task.user.userName !== userData.userName}
                    size="sm"
                    type="submit"
                    variant="primary"
                  >
                    Guardar
                  </Button>
                  <Button size="sm" variant="secondary" onClick={onClose}>
                    Cancelar
                  </Button>
                </ModalFooter>
              </Form>
            </ModalContent>
          )}
        </Formik>
      </Modal>
    </>
  )
}
