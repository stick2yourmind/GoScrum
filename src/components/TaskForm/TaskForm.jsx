import { Field, Formik } from "formik";
import {
  Box,
  Input,
  Text,
  Flex,
  Heading,
  Button,
  Select,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";

import { TaskSchema, loginInit } from "../../utils/schema/taskForm";

const TaskForm = () => {
  const CustomInputComponent = (props) => (
    <Input
      className="form__input"
      borderRadius="8px"
      mt={2}
      type={props.type && "text"}
      {...props}
    />
  );

  return (
    <Flex align="center" justify="center">
      <Box p={6} rounded="md" w={"lg"} fontSize={16}>
        <Heading as="h1" fontSize="24px" mb={15}>
          Crear Tarea
        </Heading>
        <Formik
          initialValues={loginInit}
          validationSchema={TaskSchema}
          onSubmit={(values) => console.info(values)}
        >
          {({ errors, touched, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <FormLabel fontSize="15px">Crea tus Tareas</FormLabel>
              <Field
                as={CustomInputComponent}
                name="title"
                placeholder="Título"
                type="text"
              />
              {errors.title && touched.title && (
                <Box className="error" pt={2}>
                  <Text color="tomato">{errors.title}</Text>
                </Box>
              )}
              <Field
                as={Select}
                name="state"
                placeholder="Selecciona un estado"
                mt={4}
                borderRadius="8px"
              >
                <option value="nueva">Nueva</option>
                <option value="desarrollando">En desarrollo</option>
                <option value="finalizada">Finalizado</option>
              </Field>

              {errors.state && touched.state && (
                <Box className="error" pt={2}>
                  <Text color="tomato">{errors.state}</Text>
                </Box>
              )}
              <Field
                as={Select}
                name="priority"
                placeholder="Selecciona una prioridad"
                mt={4}
                borderRadius="8px"
              >
                <option value="alta">Alta</option>
                <option value="media">Media</option>
                <option value="baja">Baja</option>
              </Field>
              {errors.priority && touched.priority && (
                <Box className="error" pt={2}>
                  <Text color="tomato">{errors.priority}</Text>
                </Box>
              )}
              <Field
                as={Textarea}
                name="description"
                placeholder="Descripción"
                h={140}
                mt={4}
                type="text"
              />
              {errors.description && touched.description && (
                <Box className="error" pt={2}>
                  <Text color="tomato">{errors.description}</Text>
                </Box>
              )}
              <Flex align="center" justify="center">
                <Button
                  _hover={{
                    bg: "background.300",
                    color: "primary.100",
                    borderColor: "primary.100",
                    border: "2px",
                  }}
                  bg="primary.100"
                  color="background.300"
                  type="submit"
                >
                  Crear
                </Button>
              </Flex>
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};

export default TaskForm;
