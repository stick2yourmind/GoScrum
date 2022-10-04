import { Field, Form, Formik } from 'formik'
import { Box, Input, Text, Flex, Heading, Button, Select, FormLabel, Switch } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { RegisterSchema, registerInit } from '../utils/schema/register'
import { getRegisterData } from '../store/slices/authSlice'
import authApi from '../api/authApi'

const Register = () => {
  const [hasTeam, setHasTeam] = useState('')
  const { registerData } = useSelector((state) => state.auth)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const registerUser = async ({ username, password, email, teamID, rol: role, continent, region }) => {
    try {
      const resp = await authApi.post('/auth/register', {
        user: {
          userName: username,
          password,
          email,
          teamID,
          role,
          continent,
          region
        }
      })

      if (resp.status === 201) {
        navigate('/auth/login', { replace: true })
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    dispatch(getRegisterData())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { Rol, continente, region } = registerData

  return (
    <Flex align="center" bg="gray.100" justify="center" minH="100vh">
      <Box bg="white" p={6} rounded="md" w={'lg'}>
        <Heading as="h1">Registro</Heading>
        <Formik
          initialValues={registerInit}
          validationSchema={RegisterSchema}
          onSubmit={(values) => {
            registerUser(values)
          }}
        >
          {({ errors, touched, setFieldValue, setFieldTouched, values }) => (
            <Form>
              <Field as={Input} my={2} name="username" placeholder="Username" type="text" />
              {errors.username && touched.username && (
                <Box>
                  <Text color="tomato">{errors.username}</Text>
                </Box>
              )}
              <FormLabel mb={0} mt={4}>
                Contraseña
              </FormLabel>
              <Field as={Input} name="password" placeholder="Password" type="password" />
              {errors.password && touched.password && (
                <Box>
                  <Text color="tomato">{errors.password}</Text>
                </Box>
              )}
              <Field as={Input} my={2} name="email" placeholder="Email" type="email" />
              {errors.email && touched.email && (
                <Box>
                  <Text color="tomato">{errors.email}</Text>
                </Box>
              )}
              <Flex my={2}>
                <Switch
                  name="hasTeam"
                  pr={2}
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
                  <Field as={Input} my={2} name="teamID" placeholder="Ingrese id del equipo" type="text" />
                  {errors.teamID && touched.teamID && (
                    <Box>
                      <Text color="tomato">{errors.teamID}</Text>
                    </Box>
                  )}
                </>
              )}
              <FormLabel mb={0} mt={4}>
                Rol
              </FormLabel>
              <Field
                as={Select}
                placeholder="Selecciona un rol"
                value={values.rol}
                onBlur={() => setFieldTouched('rol', true)}
                onChange={(e) => setFieldValue('rol', e.target.value)}
              >
                {Rol?.map((rol, index) => (
                  <option key={index} value={rol}>
                    {rol}
                  </option>
                ))}
              </Field>
              {errors.rol && touched.rol && (
                <Box>
                  <Text color="tomato">{errors.rol}</Text>
                </Box>
              )}
              <FormLabel mb={0} mt={4}>
                Continente
              </FormLabel>
              <Field
                as={Select}
                placeholder="Selecciona un continente"
                value={values.continent}
                onBlur={() => setFieldTouched('continent', true)}
                onChange={(e) => setFieldValue('continent', e.target.value)}
              >
                {continente?.map((continente, index) => (
                  <option key={index} value={continente}>
                    {continente}
                  </option>
                ))}
              </Field>
              {errors.continent && touched.continent && (
                <Box>
                  <Text color="tomato">{errors.continent}</Text>
                </Box>
              )}
              {values.continent === 'America' && (
                <>
                  <Field
                    as={Select}
                    my={2}
                    placeholder="Selecciona Region"
                    value={values.region}
                    onBlur={() => setFieldTouched('region', true)}
                    onChange={(e) => setFieldValue('region', e.target.value)}
                  >
                    {region?.map((region, index) => (
                      <option key={region + index} value={region}>
                        {region}
                      </option>
                    ))}
                  </Field>
                  {errors.region && touched.region && (
                    <Box>
                      <Text color="tomato">{errors.region}</Text>
                    </Box>
                  )}
                </>
              )}

              <Flex align="center" justify="center" my={4}>
                <Button colorScheme="purple" type="submit" variant="outline" width="full">
                  Registrar
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  )
}

export default Register
