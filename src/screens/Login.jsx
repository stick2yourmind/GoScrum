import { Field, Form, Formik } from 'formik'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import {
  Box,
  Input,
  Text,
  Flex,
  Heading,
  Button,
  useToast,
  FormLabel,
  useColorMode,
  IconButton
} from '@chakra-ui/react'
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
  const { colorMode, toggleColorMode } = useColorMode()

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
    <Flex
      align="center"
      bg={{ base: colorMode === 'light' ? 'white' : 'gray.900', sm: colorMode === 'light' ? 'gray.200' : 'gray.900' }}
      h="100vh"
      justify="center"
    >
      <Box bg={{ base: '', sm: colorMode === 'light' ? 'white' : 'gray.800' }} p={6} rounded="md" w={'lg'}>
        <Flex alignItems="center" justifyContent="end">
          <IconButton
            aria-label="Color mode switcher"
            h={{ base: '45px', sm: '45px' }}
            icon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
            size={{ base: 'xs' }}
            variant="primary"
            w={{ sm: '45px' }}
            onClick={toggleColorMode}
          >
            Switch mode
          </IconButton>
        </Flex>

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
                  // _hover={{ bg: 'white', border: '2px', borderColor: 'primary.100', color: 'primary.100' }}
                  // bg={bgColor}
                  // border={2}
                  // borderColor="primary.100"
                  // color="white"
                  type="submit"
                  // width="full"
                  variant="primary"
                >
                  Ingresar
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
        <Link replace={true} to="/auth/register">
          <Text color={colorMode === 'light' ? 'primary.100' : 'gray.100'} fontWeight="semibold" textAlign="end">
            Crear una cuenta
          </Text>
        </Link>
      </Box>
    </Flex>
  )
}

export default Login
