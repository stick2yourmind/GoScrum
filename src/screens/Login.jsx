import { Field, Form, Formik } from 'formik'
import { Box, Input, Text, Flex, Heading, Button } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { LoginSchema, loginInit } from '../utils/schema/login'
import { loginUser } from '../store/slices/authSlice'

const Login = () => {
  const dispatch = useDispatch()

  const onSubmit = (user, password) => {
    dispatch(loginUser(user, password))
  }

  return (
    <Flex align="center" bg="gray.100" h="100vh" justify="center">
      <Box bg="white" p={6} rounded="md" w={'lg'}>
        <Heading as="h1">Iniciar sesión</Heading>
        <Formik
          initialValues={loginInit}
          validationSchema={LoginSchema}
          onSubmit={(values) => onSubmit(values.username, values.password)}
        >
          {({ errors, touched }) => (
            <Form>
              <Field as={Input} my={2} name="username" placeholder="Username" type="text" />
              {errors.username && touched.username && (
                <Box>
                  <Text color="tomato">{errors.username}</Text>
                </Box>
              )}
              <Field as={Input} my={2} name="password" placeholder="Password" type="password" />
              {errors.password && touched.password && (
                <Box>
                  <Text color="tomato">{errors.password}</Text>
                </Box>
              )}
              <Flex align="center" justify="center" my={4}>
                <Button colorScheme="purple" type="submit" variant="outline" width="full">
                  Ingresar
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
        <Link replace={true} to="/auth/register">
          <Text color="#6B46C1" fontWeight="semibold" textAlign="end">
            Crear una cuenta
          </Text>
        </Link>
      </Box>
    </Flex>
  )
}

export default Login
