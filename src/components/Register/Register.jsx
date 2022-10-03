import { Field, Formik } from "formik";
import {
  Box,
  Input,
  Text,
  Flex,
  Heading,
  Button,
  Select,
  FormLabel,
  Switch,
} from "@chakra-ui/react";
import { useState } from "react";

import { RegisterSchema, registerInit } from "../../utils/schema/register";

const Register = () => {
  const [hasTeam, setHasTeam] = useState("");

  return (
    <Flex align="center" bg="gray.100" h="100vh" justify="center">
      <Box bg="white" p={6} rounded="md" w={"lg"}>
        <Heading as="h1">Registro</Heading>
        <Formik
          initialValues={registerInit}
          validationSchema={RegisterSchema}
          onSubmit={(values) => {
            console.info(values);
          }}
        >
          {({
            errors,
            touched,
            handleSubmit,
            setFieldValue,
            setFieldTouched,
          }) => (
            <form onSubmit={handleSubmit}>
              <FormLabel mt={2} mb={0}>
                Nombre de usuario
              </FormLabel>
              <Field
                as={Input}
                name="username"
                placeholder="Username"
                type="text"
              />
              {errors.username && touched.username && (
                <Box>
                  <Text color="tomato">{errors.username}</Text>
                </Box>
              )}
              <FormLabel mt={2} mb={0}>
                Contraseña
              </FormLabel>
              <Field
                as={Input}
                name="password"
                placeholder="Password"
                type="password"
              />
              {errors.password && touched.password && (
                <Box>
                  <Text color="tomato">{errors.password}</Text>
                </Box>
              )}
              <Flex my={2}>
                <Switch
                  my={2}
                  name="hasTeam"
                  pr={2}
                  onChange={(e) => {
                    setHasTeam(e.target.checked);
                    setFieldValue("hasTeam", e.target.checked);
                  }}
                />
                <FormLabel alignSelf="center" htmlFor="email-alerts" mb="0">
                  ¿Perteneces a un equipo ya creado?
                </FormLabel>
              </Flex>
              {hasTeam && (
                <>
                  <Field
                    as={Input}
                    name="team"
                    placeholder="Ingrese id del equipo"
                    type="text"
                  />
                  {errors.team && touched.team && (
                    <Box>
                      <Text color="tomato">{errors.team}</Text>
                    </Box>
                  )}
                </>
              )}
              <FormLabel mt={2} mb={0}>
                Rol
              </FormLabel>
              <Field
                as={Select}
                placeholder="Selecciona un rol"
                onBlur={() => setFieldTouched("rol", true)}
                onChange={(e) => setFieldValue("rol", e.target.value)}
              >
                <option value="Team Member">Team Member</option>
                <option value="Team Leader">Team Leader</option>
              </Field>
              {errors.rol && touched.rol && (
                <Box>
                  <Text color="tomato">{errors.rol}</Text>
                </Box>
              )}
              <FormLabel mt={2} mb={0}>
                Continente
              </FormLabel>
              <Field
                as={Select}
                placeholder="Selecciona un continente"
                onBlur={() => setFieldTouched("continent", true)}
                onChange={(e) => setFieldValue("continent", e.target.value)}
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
              <FormLabel mt={2} mb={0}>
                Región
              </FormLabel>
              <Field
                as={Select}
                placeholder="Selecciona una región"
                onBlur={() => setFieldTouched("region", true)}
                onChange={(e) => setFieldValue("region", e.target.value)}
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
              <Flex align="center" justify="center" my={4}>
                <Button
                  _hover={{
                    bg: "background.300",
                    color: "primary.100",
                    borderColor: "primary.100",
                    border: "2px",
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
  );
};

export default Register;
