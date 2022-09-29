import { Field, Formik } from 'formik'
import { Box, Input, Text, Flex, Heading, Button, Select, FormLabel, Switch } from '@chakra-ui/react'
import { useState } from 'react'

import { RegisterSchema, registerInit } from '../../utils/schema/register'

const Register = () => {
  const [hasTeam, setHasTeam] = useState('')

  return (
    <Flex align="center" bg="gray.100" h="100vh" justify="center">
      <Box bg="white" p={6} rounded="md" w={'lg'}>
        <Heading as="h1">Registro</Heading>
        <Formik
          initialValues={registerInit}
          validationSchema={RegisterSchema}
          onSubmit={(values) => {
            console.info(values)
          }}
        >
          {({ errors, touched, handleSubmit, setFieldValue, setFieldTouched }) => (
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
              <Flex my={2}>
                <Switch
                  my={2}
                  name="hasTeam"
                  px={2}
                  onChange={(e) => {
                    setHasTeam(e.target.checked)
                    setFieldValue('hasTeam', e.target.checked)
                  }}
                />
                <FormLabel alignSelf="center" htmlFor="email-alerts" mb="0">
                  ¿Perteneces a un equipo ya creado?
                </FormLabel>
              </Flex>
              {hasTeam && (
                <>
                  <Field as={Input} my={2} name="team" placeholder="Ingrese id del equipo" type="text" />
                  {errors.team && touched.team && (
                    <Box>
                      <Text color="tomato">{errors.team}</Text>
                    </Box>
                  )}
                </>
              )}
              <Field
                as={Select}
                my={2}
                placeholder="Selecciona rol"
                onBlur={() => setFieldTouched('rol', true)}
                onChange={(e) => setFieldValue('rol', e.target.value)}
              >
                <option value="Team Member">Team Member</option>
                <option value="Team Leader">Team Leader</option>
              </Field>
              {errors.rol && touched.rol && (
                <Box>
                  <Text color="tomato">{errors.rol}</Text>
                </Box>
              )}
              <Field
                as={Select}
                my={2}
                placeholder="Selecciona continente"
                onBlur={() => setFieldTouched('continent', true)}
                onChange={(e) => setFieldValue('continent', e.target.value)}
              >
                <option value="America">America</option>
                <option value="Europa">Europa</option>
                <option value="Asia">Asia</option>
              </Field>
              {errors.continent && touched.continent && (
                <Box>
                  <Text color="tomato">{errors.continent}</Text>
                </Box>
              )}
              <Flex align="center" justify="center" my={4}>
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
