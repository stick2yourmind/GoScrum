import { Field, Form, Formik } from 'formik'
import { Box, Input, Text, Flex, Heading, Button, useToast } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

import { LoginSchema, loginInit } from '../utils/schema/login'
import { loginUser } from '../store/slices/authSlice'
import Spinner from '../components/Spinner/Spinner'

const Login = () => {
  const dispatch = useDispatch()
  const { status, loading, errorMsg } = useSelector((state) => state.auth)
  const toast = useToast()

  useEffect(() => {
    if (!loading && status === 'not-authenticated' && errorMsg) {
      toast({
        title: 'Login error',
        description: 'El nombre de usuario o contraseña es incorrecto.',
        status: 'error',
        duration: 3000,
        position: 'top-right',
        isClosable: true
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMsg])

  const onSubmit = (user, password) => {
    dispatch(loginUser(user, password))
  }

  return loading ? (
    <Spinner />
  ) : (
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
