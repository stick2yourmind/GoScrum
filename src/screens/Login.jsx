import { Field, Form, Formik } from 'formik'
import { Box, Input, Text, Flex, Heading, Button, useToast, FormLabel } from '@chakra-ui/react'
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
              <FormLabel fontSize="15px" mb={0} mt={4}>
                Nombre de usuario
              </FormLabel>
              <Field
                as={Input}
                errorBorderColor="tomato"
                isInvalid={touched.username && errors.username}
                name="username"
                placeholder="Username"
                type="text"
              />
              {errors.username && touched.username && (
                <Box>
                  <Text color="tomato">{errors.username}</Text>
                </Box>
              )}
              <FormLabel fontSize="15px" mb={0} mt={4}>
                Contraseña
              </FormLabel>
              <Field
                as={Input}
                errorBorderColor="tomato"
                isInvalid={touched.password && errors.password}
                name="password"
                placeholder="Password"
                type="password"
              />
              {errors.password && touched.password && (
                <Box>
                  <Text color="tomato">{errors.password}</Text>
                </Box>
              )}
              <Flex align="center" justify="center" my={4}>
                <Button
                  _hover={{ bg: 'white', border: '2px', borderColor: 'primary.100', color: 'primary.100' }}
                  bg="primary.100"
                  border={2}
                  borderColor="primary.100"
                  color="white"
                  type="submit"
                  width="full"
                >
                  Ingresar
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
        <Link replace={true} to="/auth/register">
          <Text color="primary.100" fontWeight="semibold" textAlign="end">
            Crear una cuenta
          </Text>
        </Link>
      </Box>
    </Flex>
  )
}

export default Login
