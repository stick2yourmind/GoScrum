import { Field, Formik } from 'formik'
import { Box, Input, Text, Flex, Heading, Button } from '@chakra-ui/react'

import { LoginSchema, loginInit } from '../../utils/schema/login'

const Login = () => {
  return (
    <Flex align="center" bg="gray.100" h="100vh" justify="center">
      <Box bg="white" p={6} rounded="md" w={'lg'}>
        <Heading as="h1">Iniciar sesión</Heading>
        <Formik initialValues={loginInit} validationSchema={LoginSchema} onSubmit={(values) => console.info(values)}>
          {({ errors, touched, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
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
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  )
}

export default Login
