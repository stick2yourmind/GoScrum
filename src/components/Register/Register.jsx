import { Field, Formik } from 'formik'
import { Box, Input, Text, Flex, Heading, Button, Select } from '@chakra-ui/react'

import { LoginSchema, loginInit } from '../../utils/schema/login'

const Register = () => {
  const CustomInputComponent = (props) => <Input className="form__input" type={props.type && 'text'} {...props} />

  return (
    <Flex align="center" bg="gray.100" h="100vh" justify="center">
      <Box bg="white" p={6} rounded="md" w={'lg'}>
        <Heading as="h1">Registro</Heading>
        <Formik initialValues={loginInit} validationSchema={LoginSchema} onSubmit={(values) => console.info(values)}>
          {({ errors, touched, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field as={CustomInputComponent} name="username" placeholder="Username" type="text" />
              <Box className="error">
                {errors.username && touched.username ? <Text color="tomato">{errors.username}</Text> : null}
              </Box>
              <Field as={CustomInputComponent} name="password" placeholder="Password" type="password" />
              <Box className="error">
                {errors.password && touched.password ? <Text color="tomato">{errors.password}</Text> : null}
              </Box>
              <Select placeholder="Selecciona rol">
                <option value="option1">Team Member</option>
                <option value="option2">Team Leader</option>
              </Select>
              <Select placeholder="Selecciona continente">
                <option value="option1">America</option>
                <option value="option2">Europa</option>
                <option value="option2">Asia</option>
              </Select>
              <Flex align="center" justify="center">
                <Button colorScheme="purple" type="submit" variant="outline" width="full">
                  Registrar
                </Button>
              </Flex>
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  )
}

export default Register
