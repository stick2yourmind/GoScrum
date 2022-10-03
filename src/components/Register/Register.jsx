import { Field, Formik } from 'formik'
import { Box, Input, Text, Flex, Heading, Button, Select, FormLabel, Switch } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RegisterSchema, registerInit } from '../../utils/schema/register'
import { getRegisterData } from '../../store/slices/registerData'

const Register = () => {
  const [hasTeam, setHasTeam] = useState('')

  const dispatch = useDispatch()
  const { registerData } = useSelector((state) => state.registerData)

  useEffect(() => {
    dispatch(getRegisterData())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { Rol, continente, region } = registerData

  return (
    <Flex align="center" bg="white" h="100vh" justify="center">
      <Box p={6} rounded="md" w={'lg'}>
        <Heading as="h1">Registro</Heading>
        <Formik
          initialValues={registerInit}
          validationSchema={RegisterSchema}
          onSubmit={(values) => {
            console.info(values)
          }}
        >
          {({ errors, touched, handleSubmit, setFieldValue, setFieldTouched, values }) => (
            <form onSubmit={handleSubmit}>
              <FormLabel mb={0} mt={4}>
                Nombre de usuario
              </FormLabel>
              <Field as={Input} name="username" placeholder="Username" type="text" />
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
                  <Field as={Input} name="team" placeholder="Ingrese id del equipo" type="text" />
                  {errors.team && touched.team && (
                    <Box>
                      <Text color="tomato">{errors.team}</Text>
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
              <FormLabel mb={0} mt={4}>
                Región
              </FormLabel>
              <Field
                as={Select}
                placeholder="Selecciona una región"
                onBlur={() => setFieldTouched('region', true)}
                onChange={(e) => setFieldValue('region', e.target.value)}
              >
                <option value="America">América latina</option>
                <option value="America">América del norte</option>
                <option value="America">Brasil</option>
              </Field>
              {errors.region && touched.region && (
                <Box>
                  <Text color="tomato">{errors.region}</Text>
                </Box>
              )}
              <Flex align="center" justify="center" mb={2} mt={4}>
                <Button
                  _hover={{
                    bg: 'background.300',
                    color: 'primary.100',
                    borderColor: 'primary.100',
                    border: '2px'
                  }}
                  bg="primary.100"
                  border="2px"
                  borderColor="primary.100"
                  color="background.300"
                  size="sm"
                  type="submit"
                  width="full"
                >
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
