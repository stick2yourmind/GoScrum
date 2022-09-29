import { Field, Formik } from 'formik'
import { Box, Input, Text, Flex, Heading, Button, Select, FormLabel, Switch } from '@chakra-ui/react'
import { useState } from 'react'

import { RegisterSchema, registerInit } from '../../utils/schema/register'

const Register = () => {
  const [hasTeam, setHasTeam] = useState('')
  const CustomInputComponent = (props) => <Input className="form__input" type={props.type && 'text'} {...props} />

  return (
    <Flex align="center" bg="gray.100" h="100vh" justify="center">
      <Box bg="white" p={6} rounded="md" w={'lg'}>
        <Heading as="h1">Registro</Heading>
        <Formik
          initialValues={registerInit}
          validationSchema={RegisterSchema}
          onSubmit={(values, action) => {
            console.info(values)
            console.info(action)
          }}
        >
          {({ errors, touched, handleSubmit, setFieldValue, setFieldTouched }) => (
            <form onSubmit={handleSubmit}>
              <Field as={CustomInputComponent} name="username" placeholder="Username" type="text" />
              <Box className="error">
                {errors.username && touched.username ? <Text color="tomato">{errors.username}</Text> : null}
              </Box>
              <Field as={CustomInputComponent} name="password" placeholder="Password" type="password" />
              <Box className="error">
                {errors.password && touched.password ? <Text color="tomato">{errors.password}</Text> : null}
              </Box>
              <Flex>
                <Switch
                  name="hasTeam"
                  onChange={(e) => {
                    setHasTeam(e.target.checked)
                    setFieldValue('hasTeam', e.target.checked)
                  }}
                />
                <FormLabel htmlFor="email-alerts" mb="0">
                  ¿Perteneces a un equipo ya creado?
                </FormLabel>
              </Flex>
              {hasTeam && (
                <>
                  <Field as={CustomInputComponent} name="team" placeholder="Ingrese id del equipo" type="text" />
                  <Box className="error">
                    {errors.team && touched.team ? <Text color="tomato">{errors.team}</Text> : null}
                  </Box>
                </>
              )}
              <Select
                as="select"
                placeholder="Selecciona rol"
                onBlur={() => setFieldTouched('rol', true)}
                onChange={(e) => setFieldValue('rol', e.target.value)}
              >
                <option value="Team Member">Team Member</option>
                <option value="Team Leader">Team Leader</option>
              </Select>
              <Box className="error">{errors.rol && touched.rol ? <Text color="tomato">{errors.rol}</Text> : null}</Box>
              <Select
                placeholder="Selecciona continente"
                onBlur={() => setFieldTouched('continent', true)}
                onChange={(e) => setFieldValue('continent', e.target.value)}
              >
                <option value="America">America</option>
                <option value="Europa">Europa</option>
                <option value="Asia">Asia</option>
              </Select>
              <Box className="error">
                {errors.continent && touched.continent ? <Text color="tomato">{errors.continent}</Text> : null}
              </Box>
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
