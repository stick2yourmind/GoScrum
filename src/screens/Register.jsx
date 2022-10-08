import { Field, Form, Formik } from 'formik'
import { Box, Input, Text, Flex, Heading, Button, Select, FormLabel, Switch, useToast } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { RegisterSchema, registerInit } from '../utils/schema/register'
import { getRegisterData } from '../store/slices/authSlice'
import authApi from '../api/authApi'
import generateRandomID from '../utils/functions/generateId'
import { startLoading, finishLoading } from '../store/slices/tasksSlice'

const Register = () => {
  const [hasTeam, setHasTeam] = useState(false)
  const { registerData } = useSelector((state) => state.auth)
  const { loading } = useSelector((state) => state.tasks)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const toast = useToast()

  const registerUser = async ({ userName, password, email, teamID, role, continent, region }) => {
    dispatch(startLoading())
    try {
      const resp = await authApi.post('/auth/register', {
        user: {
          userName,
          password,
          email,
          teamID: hasTeam && teamID ? teamID : generateRandomID(),
          role,
          continent,
          region: region ? region : 'Otro'
        }
      })

      if (resp.status === 201) {
        toast({
          title: 'Operación exitosa!',
          description: 'Usuario registrado correctamente',
          status: 'success',
          duration: 2000,
          position: 'top-right',
          isClosable: true
        })

        navigate('/auth/login', { replace: true })
      }
    } catch (error) {
      if (error.response.status === 409) {
        toast({
          title: 'Email error',
          description: 'El email ya fue registrado por otro usuario.',
          status: 'error',
          duration: 5000,
          position: 'top-right',
          isClosable: true
        })
      }
    }
    dispatch(finishLoading())
  }

  useEffect(() => {
    dispatch(getRegisterData())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { Rol, continente, region } = registerData

  // The user region must be one of this [Latam, Brazil, Otro]
  const newRegions = region
    ?.filter((region) => region !== 'America del Norte')
    .map((e) => (e === 'Brasil' ? 'Brazil' : e))

  return (
    <Flex align="center" bg="white" justify="center" minH="100vh">
      <Box p={6} rounded="md" w={'lg'}>
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
              <FormLabel mb={0} mt={4}>
                Nombre de usuario
              </FormLabel>
              <Field as={Input} name="userName" placeholder="Username" type="text" />
              {errors.userName && touched.userName && (
                <Box>
                  <Text color="tomato">{errors.userName}</Text>
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
              <FormLabel mb={0} mt={4}>
                Email
              </FormLabel>
              <Field as={Input} name="email" placeholder="Email" type="email" />
              {errors.email && touched.email && (
                <Box>
                  <Text color="tomato">{errors.email}</Text>
                </Box>
              )}
              <Flex mt={4}>
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
                  <Field as={Input} mt={4} name="teamID" placeholder="Ingrese id del equipo" type="text" />
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
                value={values.role}
                onBlur={() => setFieldTouched('role', true)}
                onChange={(e) => setFieldValue('role', e.target.value)}
              >
                {Rol?.map((rol, index) => (
                  <option key={index} value={rol}>
                    {rol}
                  </option>
                ))}
              </Field>
              {errors.role && touched.role && (
                <Box>
                  <Text color="tomato">{errors.role}</Text>
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
                  <FormLabel mb={0} mt={4}>
                    Región
                  </FormLabel>
                  <Field
                    as={Select}
                    placeholder="Selecciona una región"
                    value={values.region}
                    onBlur={() => setFieldTouched('region', true)}
                    onChange={(e) => setFieldValue('region', e.target.value)}
                  >
                    {newRegions?.map((region, index) => (
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
                <Button
                  _hover={{
                    bg: 'white',
                    color: 'primary.100',
                    border: '2px',
                    borderColor: 'primary.100'
                  }}
                  bg="primary.100"
                  border="2px"
                  borderColor="primary.100"
                  color="white"
                  isLoading={loading}
                  type="submit"
                  variant="outline"
                  width="full"
                >
                  Registrar
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
        <Link replace={true} to="/auth/">
          <Text color="primary.100" fontWeight="semibold" textAlign="end">
            Ya tengo una cuenta
          </Text>
        </Link>
      </Box>
    </Flex>
  )
}

export default Register
